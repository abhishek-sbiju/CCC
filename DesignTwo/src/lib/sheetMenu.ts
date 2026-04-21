import type {
  DietType,
  MenuCategory,
  MenuItem,
  MenuSubCategory,
} from "@/data/menuData";

/**
 * Google Sheet source of truth for this menu.
 * Client edits this sheet → changes appear live on the site.
 * See SETUP.md at the project root.
 */
export const SHEET_CONFIG = {
  sheetId: "1q8LaVr8VJQ5EuPZHQdTUNeWjgku6fGixxbfLd71V1RE",
  gid: "1407695428",
} as const;

const CURRENCY = "₹";

/**
 * Expected sheet column order (header row):
 *   Category | SubCategory | Name | Description | Variant |
 *   Price    | DietType    | Tags | Available
 */
interface SheetRow {
  Category: string;
  SubCategory: string;
  Name: string;
  Description: string;
  Variant: string;
  Price: string;
  DietType: string;
  Tags: string;
  Available: string;
}

// ---------------------------------------------------------------------------
// Fetch + parse CSV export
// ---------------------------------------------------------------------------
//
// We use the CSV export endpoint (not gviz/tq JSON) because gviz types each
// column strictly (e.g. boolean Available, numeric Price) and silently drops
// cells that don't match. CSV export preserves all cell text verbatim.

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ",") {
        row.push(cell);
        cell = "";
      } else if (ch === "\n") {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else if (ch === "\r") {
        /* skip — \n handles line end */
      } else cell += ch;
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

async function fetchSheetRows(): Promise<SheetRow[]> {
  // Cache-buster: a per-minute token keeps edits fresh without hammering
  // the endpoint.
  const bust = Math.floor(Date.now() / 60000);
  const url =
    `https://docs.google.com/spreadsheets/d/${SHEET_CONFIG.sheetId}` +
    `/export?format=csv&gid=${encodeURIComponent(SHEET_CONFIG.gid)}` +
    `&_=${bust}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  const text = await res.text();

  const rows = parseCsv(text).filter((r) => r.some((c) => c.trim() !== ""));
  if (rows.length === 0) return [];

  const header = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const obj: Record<string, string> = {};
    header.forEach((key, i) => {
      obj[key || `col${i}`] = (r[i] ?? "").trim();
    });
    return obj as unknown as SheetRow;
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isAvailable(value: string): boolean {
  const v = String(value).toLowerCase().trim();
  return v === "" || v === "true" || v === "yes" || v === "y" || v === "1";
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeDiet(v: string): DietType | undefined {
  const d = v.toLowerCase().trim();
  if (d === "veg" || d === "non-veg" || d === "both") return d;
  return undefined;
}

function parseTags(raw: string): string[] {
  if (!raw) return [];
  // Accept both "new|seafood" and "new, seafood"
  return raw
    .split(/[|,]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function formatPrice(raw: string): string {
  const v = String(raw).trim();
  if (!v) return "";
  // Preserve existing currency symbol; otherwise prepend ₹.
  if (v.includes(CURRENCY) || /^[₹$€£]/.test(v)) return v;
  return `${CURRENCY}${v}`;
}

/**
 * Fold multiple variant-rows of the same dish into a single MenuItem.
 *
 * Rows are treated as "the same item" when Name + Description + Variant
 * match (case-insensitive, trimmed). This keeps one sheet row per variant
 * as one menu line; slash-separated multi-variant cells stay a single row.
 */
function mergeVariantRows(rows: SheetRow[]): MenuItem[] {
  const items: MenuItem[] = [];
  const index = new Map<string, number>();

  for (const row of rows) {
    const name = row.Name?.trim();
    if (!name) continue;

    const key = `${name.toLowerCase()}|${(row.Description || "")
      .toLowerCase()
      .trim()}|${(row.Variant || "").toLowerCase().trim()}`;

    const existing = index.get(key);
    if (existing === undefined) {
      const diet = normalizeDiet(row.DietType);
      items.push({
        name,
        description: row.Description?.trim() || undefined,
        variants: row.Variant?.trim() || undefined,
        price: formatPrice(row.Price),
        dietType: diet,
        tags: parseTags(row.Tags),
      });
      index.set(key, items.length - 1);
    } else {
      const item = items[existing];
      const newVariant = row.Variant?.trim();
      const newPrice = formatPrice(row.Price);
      const newDiet = normalizeDiet(row.DietType);

      if (newVariant) {
        item.variants = item.variants
          ? `${item.variants} / ${newVariant}`
          : newVariant;
      }
      if (newPrice) {
        item.price = item.price ? `${item.price} / ${newPrice}` : newPrice;
      }
      if (newDiet && item.dietType && item.dietType !== newDiet) {
        item.dietType = "both";
      } else if (newDiet && !item.dietType) {
        item.dietType = newDiet;
      }
      const newTags = parseTags(row.Tags);
      if (newTags.length) {
        const set = new Set([...(item.tags ?? []), ...newTags]);
        item.tags = Array.from(set);
      }
    }
  }

  // Strip empty tags arrays for cleanliness
  return items.map((it) => {
    if (it.tags && it.tags.length === 0) {
      const { tags: _tags, ...rest } = it;
      return rest as MenuItem;
    }
    return it;
  });
}

// ---------------------------------------------------------------------------
// Group flat rows → MenuCategory[]
// ---------------------------------------------------------------------------

function transformRows(rows: SheetRow[]): MenuCategory[] {
  const available = rows.filter((r) => isAvailable(r.Available));

  // Preserve insertion order:  Map<categoryTitle, Map<subCategoryName, rows[]>>
  const byCat = new Map<string, Map<string, SheetRow[]>>();

  for (const row of available) {
    const cat = row.Category?.trim();
    if (!cat) continue;
    const sub = row.SubCategory?.trim() || "";

    if (!byCat.has(cat)) byCat.set(cat, new Map());
    const subMap = byCat.get(cat)!;
    if (!subMap.has(sub)) subMap.set(sub, []);
    subMap.get(sub)!.push(row);
  }

  const categories: MenuCategory[] = [];
  byCat.forEach((subMap, catTitle) => {
    const hasRealSubs =
      subMap.size > 1 || (subMap.size === 1 && !subMap.has(""));

    if (hasRealSubs) {
      const subCategories: MenuSubCategory[] = [];
      subMap.forEach((subRows, subName) => {
        const items = mergeVariantRows(subRows);
        if (items.length === 0) return;
        subCategories.push({ name: subName || catTitle, items });
      });
      if (subCategories.length === 0) return;
      categories.push({
        id: slugify(catTitle),
        title: catTitle,
        subCategories,
      });
    } else {
      const items = mergeVariantRows(subMap.get("") ?? []);
      if (items.length === 0) return;
      categories.push({
        id: slugify(catTitle),
        title: catTitle,
        items,
      });
    }
  });

  return categories;
}

/** Bar + hot/cold drinks always last in the nav, even if the sheet rows list them first. */
const TRAILING_CATEGORY_IDS = ["bar", "hot-beverages", "cold-beverages"] as const;

function reorderCategories(categories: MenuCategory[]): MenuCategory[] {
  const byId = new Map(categories.map((c) => [c.id, c]));
  const trail = TRAILING_CATEGORY_IDS.map((id) => byId.get(id)).filter(
    (c): c is MenuCategory => Boolean(c),
  );
  const trailSet = new Set<string>(TRAILING_CATEGORY_IDS);
  const rest = categories.filter((c) => !trailSet.has(c.id));
  return [...rest, ...trail];
}

// ---------------------------------------------------------------------------
// Public: fetch + transform
// ---------------------------------------------------------------------------

export async function fetchMenuCategories(): Promise<MenuCategory[]> {
  const rows = await fetchSheetRows();
  return reorderCategories(transformRows(rows));
}
