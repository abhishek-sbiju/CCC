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

      <div className="relative z-10 text-center px-3 sm:px-4 max-w-5xl mx-auto">
        <p className="font-body text-xs sm:text-sm tracking-[0.35em] sm:tracking-[0.4em] uppercase text-gold-light mb-3 sm:mb-4 animate-fade-in">
          Welcome to
        </p>

        <h1
          className="font-heading text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em] lg:tracking-[0.16em] text-white mb-4 sm:mb-5 leading-[0.92] sm:leading-[0.95] animate-fade-in px-1 text-balance max-w-[min(100%,22rem)] sm:max-w-none mx-auto"
          style={{
            animationDelay: "0.15s",
            textShadow:
              "0 2px 20px rgba(0,0,0,0.6), 0 4px 48px rgba(0,0,0,0.35), 0 0 1px rgba(0,0,0,0.8)",
          }}
        >
          Cafe Chai Coffee
        </h1>

        <div
          className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5 animate-fade-in"
          style={{ animationDelay: "0.25s" }}
        >
          <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold" />
          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
          <span className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold" />
        </div>

        <p
          className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl italic text-gold-light tracking-wide sm:tracking-widest text-balance mb-8 sm:mb-10 animate-fade-in max-w-2xl mx-auto"
          style={{ animationDelay: "0.35s" }}
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
            href="tel:+918551894992"
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
