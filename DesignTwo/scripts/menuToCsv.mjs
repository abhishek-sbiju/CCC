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

for (const cat of menuCategories) {
  const pushItem = (subName, item) => {
    rows.push(
      [
        cat.title,
        subName ?? "",
        item.name,
        item.description ?? "",
        item.variants ?? "",
        item.price,
        getDietType(item),
        item.tags ? item.tags.join("; ") : "",
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
