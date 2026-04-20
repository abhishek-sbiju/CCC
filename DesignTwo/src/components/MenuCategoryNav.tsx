import { useEffect, useRef } from "react";

interface MenuCategoryNavProps {
  activeCategory: string;
  onCategoryClick: (id: string) => void;
  categories: { id: string; label: string }[];
}

const MenuCategoryNav = ({ activeCategory, onCategoryClick, categories }: MenuCategoryNavProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector(`[data-category-id="${activeCategory}"]`) as HTMLElement;
      if (activeElement) {
        const container = scrollContainerRef.current;
        const scrollLeft = activeElement.offsetLeft - (container.clientWidth / 2) + (activeElement.clientWidth / 2);
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeCategory]);

  return (
    <div id="menu-nav" className="sticky z-40 bg-background border-b border-border shadow-sm" style={{ top: "calc(var(--navbar-height, 53px) - 1px)" }}>
      <div
        ref={scrollContainerRef}
        className="menu-categories flex items-center overflow-x-auto gap-0.5 md:gap-1 py-[9px] md:py-[15px] px-2 md:px-6 scroll-smooth min-h-0"
      >
        {categories.map((item) => (
          <button
            key={item.id}
            data-category-id={item.id}
            onClick={() => onCategoryClick(item.id)}
            className={`whitespace-nowrap px-2 md:px-3 py-[7px] md:py-[9px] text-[11px] md:text-sm tracking-[0.08em] md:tracking-[0.1em] font-body font-medium transition-all flex-shrink-0 rounded-sm leading-tight
              ${activeCategory === item.id
                ? "bg-gold text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryNav;
