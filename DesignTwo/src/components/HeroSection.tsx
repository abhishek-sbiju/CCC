import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToMenu = () => {
    document.getElementById("menu-nav")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Demo Cafe outdoor dining"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-background/50" />
      
      <div className="relative z-10 text-center px-4">
        <p className="font-heading italic text-gold-light text-xl md:text-2xl mb-2 animate-fade-in">
          Welcome to
        </p>
        <h2 className="font-heading text-4xl md:text-7xl lg:text-8xl font-bold tracking-[0.1em] text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          DEMO CAFE
        </h2>
        
        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <span className="w-12 h-[1px] bg-gold" />
          <span className="w-2 h-2 bg-gold rotate-45" />
          <span className="w-12 h-[1px] bg-gold" />
        </div>
        
        <p className="font-body text-muted-foreground text-sm md:text-base tracking-wide mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Explore our menu — a celebration of flavors from Goa and beyond
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={scrollToMenu}
            className="px-8 py-3 bg-gold/90 text-primary-foreground text-xs tracking-[0.2em] font-body font-semibold hover:bg-gold transition-all"
          >
            VIEW MENU
          </button>
          <a
            href="tel:+19999999999"
            className="px-8 py-3 border border-gold/50 text-gold-light text-xs tracking-[0.2em] font-body font-semibold hover:bg-gold/10 transition-all"
          >
            BOOK A TABLE
          </a>
        </div>
      </div>
      
      <button
        onClick={scrollToMenu}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-gold transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};

export default HeroSection;
