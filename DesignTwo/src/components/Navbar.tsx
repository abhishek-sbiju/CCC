import { Phone } from "lucide-react";
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
      <div className="relative flex items-center justify-between px-3 md:px-8 py-[8px] md:py-[14px]">
        <div className="flex min-w-0 flex-1 basis-0 items-center gap-2 md:gap-3">
          <a
            href="/"
            className="inline-flex shrink-0 rounded-sm outline-none ring-offset-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2"
            aria-label="Cafe Chai Coffee — home"
          >
            <img
              src="/cafe-logo.png?v=5"
              alt=""
              width={40}
              height={40}
              decoding="async"
              className="h-9 w-9 object-contain md:h-10 md:w-10"
            />
          </a>
          <a href="tel:+918551894992" className="flex min-w-0 items-center gap-1 text-muted-foreground transition-colors hover:text-foreground text-[11px] md:text-xs font-body leading-none">
            <Phone size={12} className="shrink-0" />
            <span className="hidden sm:inline">+91 85518 94992</span>
          </a>
        </div>

        <p className="pointer-events-none absolute left-1/2 top-1/2 z-10 m-0 max-w-[min(52vw,14rem)] -translate-x-1/2 -translate-y-1/2 text-center font-heading text-[11px] font-bold uppercase leading-tight tracking-[0.14em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.45)] sm:max-w-[min(46vw,18rem)] sm:text-sm sm:leading-snug sm:tracking-[0.16em] md:max-w-none md:text-base md:leading-normal md:tracking-[0.18em]">
          Cafe Chai Coffee
        </p>

        <div className="flex flex-1 basis-0 items-center justify-end gap-2 md:gap-4">
          <a
            href="tel:+918551894992"
            className="hidden md:inline-block px-4 py-[8px] border border-gold text-gold text-[10px] tracking-[0.12em] font-body font-medium hover:bg-gold hover:text-primary-foreground transition-all"
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
