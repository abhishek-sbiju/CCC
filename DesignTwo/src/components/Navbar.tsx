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
      <div className="flex items-center justify-between px-3 md:px-8 py-1.5 md:py-3">
        <a href="tel:+19999999999" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-[11px] md:text-xs font-body leading-none">
          <Phone size={12} className="shrink-0" />
          <span className="hidden sm:inline">+1 999-999-9999</span>
        </a>

        <p className="font-heading text-sm md:text-lg font-semibold tracking-[0.12em] md:tracking-[0.16em] text-foreground m-0 leading-none md:leading-normal">
          DEMO CAFE
        </p>

        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="tel:+19999999999"
            className="hidden md:inline-block px-4 py-1.5 border border-gold text-gold text-[10px] tracking-[0.12em] font-body font-medium hover:bg-gold hover:text-primary-foreground transition-all"
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
