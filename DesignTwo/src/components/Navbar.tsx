import { Phone, Search } from "lucide-react";
import { useRef, useLayoutEffect } from "react";
import MenuSearch from "./MenuSearch";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const sync = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${h}px`
      );
    };

    const ro = new ResizeObserver(sync);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        <a href="tel:+19999999999" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-body">
          <Phone size={14} />
          <span className="hidden sm:inline">+1 999-999-9999</span>
        </a>
        
        <h1 className="font-heading text-xl md:text-2xl font-semibold tracking-[0.2em] text-foreground">
          DEMO CAFE
        </h1>
        
        <div className="flex items-center gap-4">
          <a
            href="tel:+19999999999"
            className="hidden md:inline-block px-5 py-2 border border-gold text-gold text-xs tracking-[0.15em] font-body font-medium hover:bg-gold hover:text-primary-foreground transition-all"
          >
            BOOK A TABLE
          </a>
          <MenuSearch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
