
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Hook that scrolls the window to the top on route changes
 */
export function useScrollToTop() {
  const pathname = usePathname();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }, [pathname]);
  
  return null;
}
