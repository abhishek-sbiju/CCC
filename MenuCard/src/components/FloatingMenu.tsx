import { useState, useRef, useEffect } from "react";
import { BookOpen } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface FloatingMenuProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onCategoryClick: (id: string) => void;
}

export default function FloatingMenu({ categories, activeCategory, onCategoryClick }: FloatingMenuProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (id: string) => {
    onCategoryClick(id);
    setDrawerOpen(false);
    setPopupOpen(false);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupOpen(false);
      }
    };
    if (popupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popupOpen]);

  return (
    <>
      {/* ─── MOBILE: Bottom drawer ─── */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <button className="flex flex-col items-center justify-center bg-[#0d131f] text-white w-16 h-16 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform hover:scale-105 active:scale-95 focus:outline-none">
              <BookOpen className="w-6 h-6 mb-1" strokeWidth={1.5} />
              <span className="text-[10px] font-semibold tracking-wider">MENU</span>
            </button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader className="border-b border-border/50 pb-4">
              <DrawerTitle className="text-center font-heading text-2xl text-gold">Categories</DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto p-4 flex flex-col gap-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    activeCategory === category.id
                      ? "bg-[#669062] text-white"
                      : "text-foreground hover:text-[#669062]"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* ─── DESKTOP: Compact popup ─── */}
      <div className="fixed bottom-8 right-8 z-50 hidden md:block" ref={popupRef}>
        {/* Popup list */}
        {popupOpen && (
          <div className="absolute bottom-[calc(100%+12px)] right-0 w-56 bg-amber-50 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] overflow-hidden animate-fade-in">
            <div className="max-h-[60vh] overflow-y-auto py-2 px-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-[13px] font-medium transition-colors",
                    activeCategory === category.id
                      ? "bg-[#669062] text-white"
                      : "text-stone-800 hover:text-[#669062]"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAB */}
        <button
          onClick={() => setPopupOpen((v) => !v)}
          className="flex flex-col items-center justify-center bg-[#0d131f] text-white w-[72px] h-[72px] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform hover:scale-105 active:scale-95 focus:outline-none"
        >
          <BookOpen className="w-7 h-7 mb-1" strokeWidth={1.5} />
          <span className="text-[11px] font-semibold tracking-wider">MENU</span>
        </button>
      </div>
    </>
  );
}
