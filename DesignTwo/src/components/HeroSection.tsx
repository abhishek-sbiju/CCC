import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown } from "lucide-react";

import heroBg1 from "@/assets/hero-bg-1.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";

const heroImages = [heroBg1, heroBg2, heroBg3];
const DISPLAY_MS = 7000;
const FADE_MS = 2000;

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(advance, DISPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [advance]);

  const goTo = (i: number) => {
    if (i === currentIndex) return;
    clearInterval(timerRef.current);
    setCurrentIndex(i);
    timerRef.current = setInterval(advance, DISPLAY_MS);
  };

  const scrollToMenu = () => {
    document.getElementById("menu-nav")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background carousel + Ken Burns (same pattern as MadrasSquare menus) */}
      {heroImages.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === currentIndex ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-kenburns blur-[1px]"
            style={{
              backgroundImage: `url(${src})`,
              animationDelay: `${-i * 6}s`,
            }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-background/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/55 pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        <p className="font-heading italic text-gold-light text-xl md:text-2xl mb-2 animate-fade-in">
          Welcome to
        </p>
        <h2
          className="font-heading text-4xl md:text-7xl lg:text-8xl font-bold tracking-[0.1em] text-foreground mb-6 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          DEMO CAFE
        </h2>

        <div
          className="flex items-center justify-center gap-3 mb-6 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="w-12 h-[1px] bg-gold" />
          <span className="w-2 h-2 bg-gold rotate-45" />
          <span className="w-12 h-[1px] bg-gold" />
        </div>

        <p
          className="font-body text-muted-foreground text-sm md:text-base tracking-wide mb-8 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Explore our menu — a celebration of flavors from Goa and beyond
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
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

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show hero image ${i + 1}`}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === currentIndex
                ? "w-6 bg-gold/80"
                : "w-2 bg-white/25 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      <button
        onClick={scrollToMenu}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-gold transition-colors animate-bounce z-10"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};

export default HeroSection;
