import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcPath = resolve(__dirname, "../src/data/menuData.ts");
const outPath = resolve(__dirname, "../menu.csv");

let source = readFileSync(srcPath, "utf8");

// Strip TS types: drop interface / type-alias blocks and type annotations on the export.
source = source.replace(/export type [^=]+ = [^;]+;\s*/g, "");
source = source.replace(/export interface [\s\S]*?\n\}\n/g, "");
source = source.replace(/export const menuCategories: MenuCategory\[\] =/, "const menuCategories =");
source = source.replace(/export const categoryNavItems[\s\S]*$/, "");

const menuCategories = new Function(`${source}\nreturn menuCategories;`)();

// Mirror of src/lib/diet.ts — inferred diet type per item.
const getDietType = (item) => {
  const nonVegKeywords = [
    "chicken",
    "egg",
    "mutton",
    "prawn",
    "shrimp",
    "fish",
    "seafood",
    "beef",
    "pork",
  ];
  const vegKeywords = [
    "veg",
    "paneer",
    "mushroom",
    "gobi",
    "cheese",
    "corn",
    "potato",
  ];

  const name = `${item.name}`.toLowerCase();
  const variants = `${item.variants || ""}`.toLowerCase();

  const hasNonVegVariant = nonVegKeywords.some((k) => variants.includes(k));
  const hasVegVariant = vegKeywords.some((k) => variants.includes(k));

  if (hasVegVariant && hasNonVegVariant) return "both";

  const hasNonVegName =
    nonVegKeywords.some((k) => name.includes(k)) ||
    (item.tags && item.tags.includes("seafood"));

  if (hasNonVegName || hasNonVegVariant) return "non-veg";
  return "veg";
};

const escape = (v) => {
  if (v === undefined || v === null) return "";
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
};

const headers = [
  "Category",
  "SubCategory",
  "Name",
  "Description",
  "Variant",
  "Price",
  "DietType",
  "Tags",
  "Available",
];

const rows = [headers.join(",")];

const splitParts = (value) =>
  String(value ?? "")
    .split("/")
    .map((v) => v.trim())
    .filter(Boolean);

const normalizePrice = (value) => String(value ?? "").trim().replace(/^₹\s*/, "");

for (const cat of menuCategories) {
  const pushItem = (subName, item) => {
    const variantParts = splitParts(item.variants);
    const priceParts = splitParts(item.price).map(normalizePrice);
    const tags = item.tags ? item.tags.join("; ") : "";

    // Madras-style row format:
    // - if variants match prices 1:1, split rows
    // - if variants are many but one price is given, repeat that price per variant
    if (variantParts.length > 0 && (variantParts.length === priceParts.length || priceParts.length === 1)) {
      const expandedPrices =
        priceParts.length === 1
          ? Array.from({ length: variantParts.length }, () => priceParts[0])
          : priceParts;
      for (let i = 0; i < variantParts.length; i++) {
        const variant = variantParts[i];
        const dietType = getDietType({ ...item, variants: variant });
        rows.push(
          [
            cat.title,
            subName ?? "",
            item.name,
            item.description ?? "",
            variant,
            expandedPrices[i],
            dietType,
            tags,
            "TRUE",
          ]
            .map(escape)
            .join(",")
        );
      }
      return;
    }

    rows.push(
      [
        cat.title,
        subName ?? "",
        item.name,
        item.description ?? "",
        item.variants ?? "",
        normalizePrice(item.price),
        getDietType(item),
        tags,
        "TRUE",
      ]
        .map(escape)
        .join(",")
    );
  };

  if (cat.subCategories) {
    for (const sub of cat.subCategories) {
      for (const item of sub.items) pushItem(sub.name, item);
    }
  } else if (cat.items) {
    for (const item of cat.items) pushItem("", item);
  }
}

// BOM so Excel renders ₹ and other Unicode correctly.
writeFileSync(outPath, "\uFEFF" + rows.join("\n"), "utf8");
console.log(`Wrote ${rows.length - 1} rows -> ${outPath}`);
