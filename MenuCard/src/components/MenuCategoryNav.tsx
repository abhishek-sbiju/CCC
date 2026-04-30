import { useEffect, useRef } from "react";

interface MenuCategoryNavProps {
  activeCategory: string;
  onCategoryClick: (id: string) => void;
  categories: { id: string; label: string }[];
  isVegOnly: boolean;
  onVegToggle: (isVegOnly: boolean) => void;
}

const MenuCategoryNav = ({ activeCategory, onCategoryClick, categories, isVegOnly, onVegToggle }: MenuCategoryNavProps) => {
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
    <div id="menu-nav" className="sticky z-40 bg-background border-b border-border shadow-sm flex items-center justify-between pl-2 md:pl-6 pr-2 md:pr-4" style={{ top: "calc(var(--navbar-height, 53px) - 1px)" }}>
      <div
        ref={scrollContainerRef}
        className="menu-categories flex-1 flex items-center overflow-x-auto gap-0.5 md:gap-1 py-[8px] md:py-[14px] pr-4 scroll-smooth min-h-0"
      >
        {categories.map((item) => (
          <button
            key={item.id}
            data-category-id={item.id}
            onClick={() => onCategoryClick(item.id)}
            className={`whitespace-nowrap px-2 md:px-3 py-[6px] md:py-[8px] text-[11px] md:text-sm tracking-[0.08em] md:tracking-[0.1em] font-body font-medium transition-all flex-shrink-0 rounded-sm leading-tight
              ${activeCategory === item.id
                ? "bg-gold text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      {/* Veg Toggle */}
      <button 
        onClick={() => onVegToggle(!isVegOnly)}
        className="flex items-center gap-1.5 pl-2 md:pl-4 border-l border-border flex-shrink-0 transition-opacity hover:opacity-80"
      >
        <div className="relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold" style={{ backgroundColor: isVegOnly ? '#16a34a' : 'hsl(var(--muted-foreground)/0.3)' }}>
          <span className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${isVegOnly ? 'translate-x-[16px]' : 'translate-x-0'}`} />
        </div>
        <div className="flex flex-col items-start -space-y-0.5">
          <span className={`text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-colors ${isVegOnly ? 'text-green-600' : 'text-muted-foreground'}`}>Veg</span>
          <span className={`text-[8px] md:text-[9px] font-medium tracking-wider uppercase transition-colors ${isVegOnly ? 'text-green-600/70' : 'text-muted-foreground/70'}`}>Only</span>
        </div>
      </button>
    </div>
  );
};

export default MenuCategoryNav;
