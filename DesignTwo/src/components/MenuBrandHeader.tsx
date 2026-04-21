/** Brand mark above the scrollable menu categories (same artwork as Main-pic / tab icon). */
const MenuBrandHeader = () => (
  <section
    id="menu-start"
    className="scroll-mt-[calc(var(--navbar-height,53px)+12px)] bg-background border-b border-gold/15 pt-6 pb-5 md:pt-8 md:pb-7"
    aria-label="Menu"
  >
    <div className="mx-auto flex max-w-4xl flex-col items-center px-4">
      <img
        src="/cafe-logo.png?v=5"
        alt="Cafe Chai Coffee"
        width={176}
        height={176}
        decoding="async"
        className="h-36 w-36 object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)] md:h-44 md:w-44"
      />
      <p className="mt-4 font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-gold md:text-xs">
        Menu
      </p>
    </div>
  </section>
);

export default MenuBrandHeader;
