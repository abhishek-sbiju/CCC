import type { MenuCategory } from "@/data/menuData";
import FadeIn from "./FadeIn";

// Category image imports
import categoryBar from "@/assets/category-bar.png";
import categoryCoffee from "@/assets/category-coffee.png";
import categoryWraps from "@/assets/category-wraps.png";
import categoryBao from "@/assets/category-bao.png";
import categoryPizza from "@/assets/category-pizza.png";
import categoryPasta from "@/assets/category-pasta.png";
import categoryBurger from "@/assets/category-burger.png";
import categoryBiryani from "@/assets/category-biryani.png";
import categorySandwich from "@/assets/category-sandwich.png";
import categoryDesserts from "@/assets/category-desserts.png";
import categoryBakery from "@/assets/category-bakery.png";
import categoryMomos from "@/assets/category-momos.png";
import categorySoups from "@/assets/category-soups.png";
import categoryColdBev from "@/assets/category-cold-bev.png";
import categoryAppetizers from "@/assets/category-appetizers.png";
import categoryAsianAppetizers from "@/assets/category-asian-appetizers.png";
import categoryChickenWings from "@/assets/category-chicken-wings.png";
import categoryTandoor from "@/assets/category-tandoor.png";
import categoryIndianMains from "@/assets/category-indian-mains.png";
import categoryNoodlesRice from "@/assets/category-noodles-rice.png";
import categoryGraviesSauces from "@/assets/category-gravies-sauces.png";
import categoryContiMeals from "@/assets/category-conti-meals.png";
import categorySizzlers from "@/assets/category-sizzlers.png";
import categoryBowls from "@/assets/category-bowls.png";
import categoryBreads from "@/assets/category-breads.png";

const categoryImages: Record<string, string> = {
  bar: categoryBar,
  "hot-beverages": categoryCoffee,
  "cold-beverages": categoryColdBev,
  wraps: categoryWraps,
  "bao-buns": categoryBao,
  sandwiches: categorySandwich,
  burgers: categoryBurger,
  pizzas: categoryPizza,
  pasta: categoryPasta,
  momos: categoryMomos,
  soups: categorySoups,
  biryani: categoryBiryani,
  desserts: categoryDesserts,
  bakery: categoryBakery,
  appetizers: categoryAppetizers,
  "asian-appetizers": categoryAsianAppetizers,
  "chicken-wings": categoryChickenWings,
  tandoor: categoryTandoor,
  "indian-mains": categoryIndianMains,
  "noodles-rice": categoryNoodlesRice,
  "gravies-sauces": categoryGraviesSauces,
  "conti-meals": categoryContiMeals,
  sizzlers: categorySizzlers,
  bowls: categoryBowls,
  breads: categoryBreads,
};

interface MenuSectionProps {
  category: MenuCategory;
  index: number;
}

import { getDietType } from "@/lib/diet";

const getDietClasses = (item: { name: string; variants?: string; tags?: string[] }) => {
  const type = getDietType(item);
  const baseClasses = "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full flex-shrink-0";
  
  if (type === 'both') {
    return `${baseClasses} bg-[linear-gradient(to_right,#16a34a_50%,#dc2626_50%)] border-none`;
  }
  if (type === 'non-veg') {
    return `${baseClasses} bg-red-600`;
  }
  return `${baseClasses} bg-green-600`;
};

const getBeverageEmoji = (categoryId: string, subCategoryName: string = '', itemName: string = '') => {
  if (categoryId !== 'bar' && categoryId !== 'hot-beverages' && categoryId !== 'cold-beverages') {
    return null;
  }

  const sub = subCategoryName.toLowerCase();
  const name = itemName.toLowerCase();

  if (sub.includes('beer') || name.includes('beer') || name.includes('draught')) {
    return '🍺';
  }
  if (sub.includes('coffee') || name.includes('coffee') || categoryId === 'hot-beverages' && !sub.includes('tea')) {
    return '☕';
  }
  if (sub.includes('tea') || name.includes('tea')) {
    return '🍵';
  }
  if (sub.includes('mocktail') || sub.includes('smoothie') || sub.includes('shake') || sub.includes('soft beverage')) {
    return '🧃';
  }
  if (name.includes('wine')) {
    return '🍷';
  }
  // Default for cocktails and spirits
  return '🍹';
};

const MenuItemRow = ({ item, categoryId, subCategoryName }: { item: { name: string; price: string; description?: string; variants?: string; tags?: string[] }, categoryId: string, subCategoryName?: string }) => {
  const emoji = getBeverageEmoji(categoryId, subCategoryName, item.name);

  return (
  <div className="py-2.5 md:py-4 border-b border-gold/10 last:border-0 hover:bg-white/[0.02] transition-colors md:px-2 rounded-md">
    <div className="flex items-start md:items-baseline justify-between gap-2 md:gap-3">
      <div className="flex items-start md:items-baseline gap-2 md:gap-3 flex-1 min-w-0">
        <div className="mt-1 md:mt-0 pt-[2px] md:pt-0">
          {emoji ? (
            <span className="text-xs md:text-sm flex-shrink-0 opacity-90 block leading-none">{emoji}</span>
          ) : (
            <div className="mt-[2px] md:mt-0"><span className={getDietClasses(item)} style={{ display: 'block' }} /></div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-wrap items-baseline">
          <h4 className="font-heading text-sm md:text-lg font-semibold text-foreground tracking-[0.08em] md:tracking-[0.12em] uppercase leading-tight md:leading-normal">
            {item.name}
          </h4>
          {item.variants && (
            <span className="text-muted-foreground text-[10px] md:text-xs font-body whitespace-nowrap ml-2">{item.variants}</span>
          )}
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[8px] md:text-[9px] tracking-wider font-body font-semibold px-1.5 py-0.5 border border-gold/40 text-gold rounded-sm uppercase whitespace-nowrap ml-2"
            >
              {tag}
            </span>
          ))}
          <span className="hidden md:inline-flex flex-1 border-b border-dotted border-gold/15 mx-2 min-w-[20px]" />
        </div>
      </div>
      <span className="font-body text-sm md:text-base font-medium text-gold whitespace-nowrap mt-0.5 md:mt-0">
        {item.price}
      </span>
    </div>
    {item.description && (
      <p className="text-muted-foreground/70 text-[10px] md:text-xs font-body mt-1 md:mt-1.5 ml-4 md:ml-8 leading-relaxed max-w-[90%] md:max-w-none">{item.description}</p>
    )}
  </div>
  );
};

const DiamondDivider = () => (
  <div className="flex items-center justify-center py-8">
    <div className="w-24 h-px bg-gold/30" />
    <div className="w-3 h-3 rotate-45 border border-gold/50 mx-3 flex-shrink-0" />
    <div className="w-24 h-px bg-gold/30" />
  </div>
);

const MenuSection = ({ category, index }: MenuSectionProps) => {
  const isEven = index % 2 === 0;
  const bgClass = isEven ? "bg-[hsl(var(--section-green))]" : "bg-background";
  const image = categoryImages[category.id];

  return (
    <>
      <div className={bgClass}>
        <DiamondDivider />
      </div>
      <section
        id={category.id}
        className={`px-6 md:px-12 lg:px-20 py-12 md:py-20 ${bgClass}`}
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-10 md:gap-16 items-start">
            {/* Image — always on the right, fixed 1/3 width */}
            {image && (
              <div className="w-full md:w-1/3 flex-shrink-0">
                <FadeIn>
                  <div className="relative overflow-hidden rounded-md group">
                    <img
                      src={image}
                      alt={category.title}
                      loading="lazy"
                      width={640}
                      height={768}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                </FadeIn>
              </div>
            )}

            {/* Content — takes remaining 2/3 */}
            <div className="flex-1 min-w-0">
              <FadeIn delay={100}>
                <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 tracking-wide uppercase">
                  {category.title}
                </h2>
                <div className="w-10 md:w-12 h-[2px] bg-gold mb-4 md:mb-6" />
                
                {category.description && (
                  <p className="text-muted-foreground/70 text-xs md:text-sm font-body mb-6 md:mb-8 max-w-xl italic leading-relaxed">
                    {category.description}
                  </p>
                )}
              </FadeIn>

              {category.subCategories ? (
                category.subCategories.map((sub, subIdx) => (
                  <div key={sub.name} className="mb-6 md:mb-10">
                    <FadeIn delay={150 + (subIdx * 50)}>
                      <h3 className="font-heading text-lg md:text-2xl font-semibold text-gold mb-2 md:mb-4 tracking-[0.08em] md:tracking-[0.1em] uppercase">
                        {sub.name}
                      </h3>
                      {sub.items.map((item, i) => (
                        <MenuItemRow key={`${item.name}-${i}`} item={item} categoryId={category.id} subCategoryName={sub.name} />
                      ))}
                    </FadeIn>
                  </div>
                ))
              ) : (
                <FadeIn delay={150}>
                  {category.items?.map((item, i) => (
                    <MenuItemRow key={`${item.name}-${i}`} item={item} categoryId={category.id} />
                  ))}
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MenuSection;
