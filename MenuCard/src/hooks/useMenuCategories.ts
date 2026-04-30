import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { menuCategories as fallbackCategories } from "@/data/menuData";
import { fetchMenuCategories } from "@/lib/sheetMenu";
import type { MenuCategory } from "@/data/menuData";

/**
 * Live menu data sourced from the client's Google Sheet.
 *
 * Behaviour:
 *  - While loading (first paint), returns the hardcoded fallback so the page
 *    renders instantly and is SEO-friendly.
 *  - On success, swaps in the live data from the sheet.
 *  - After a successful load, keeps showing that sheet snapshot if a later
 *    fetch returns an empty list (transient CSV/export quirks) so the menu
 *    does not flash back to the bundled fallback.
 *  - If the sheet was never loaded successfully this session, errors still
 *    fall back to bundled menu data.
 */
export function useMenuCategories(): {
  categories: MenuCategory[];
  isLive: boolean;
  isLoading: boolean;
  isError: boolean;
} {
  const lastGoodSheetRef = useRef<MenuCategory[] | null>(null);

  const query = useQuery({
    queryKey: ["menu-categories", "ccc-designtwo"],
    queryFn: fetchMenuCategories,
    staleTime: 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const fromQuery =
    query.data && query.data.length > 0 ? query.data : null;
  if (fromQuery) {
    lastGoodSheetRef.current = fromQuery;
  }

  const fromRef =
    lastGoodSheetRef.current && lastGoodSheetRef.current.length > 0
      ? lastGoodSheetRef.current
      : null;

  const categories = fromQuery ?? fromRef ?? fallbackCategories;
  const isLive = Boolean(fromQuery ?? fromRef);

  return {
    categories,
    isLive,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
