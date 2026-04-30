import type { DietType } from "@/data/menuData";

export const getDietType = (item: {
  name: string;
  variants?: string;
  tags?: string[];
  dietType?: DietType;
}): DietType => {
  // Respect an explicit value coming from the Google Sheet first.
  if (item.dietType) return item.dietType;

  const nonVegKeywords = ['chicken', 'egg', 'mutton', 'prawn', 'shrimp', 'fish', 'seafood', 'beef', 'pork'];
  const vegKeywords = ['veg', 'paneer', 'mushroom', 'gobi', 'cheese', 'corn', 'potato'];

  const textToSearch = `${item.name}`.toLowerCase();
  const variants = `${item.variants || ''}`.toLowerCase();

  const hasNonVegVariant = nonVegKeywords.some(kw => variants.includes(kw));
  const hasVegVariant = vegKeywords.some(kw => variants.includes(kw));

  if (hasVegVariant && hasNonVegVariant) return 'both';

  const hasNonVegName = nonVegKeywords.some(kw => textToSearch.includes(kw)) || item.tags?.includes('seafood');

  if (hasNonVegName || hasNonVegVariant) return 'non-veg';
  return 'veg';
};
