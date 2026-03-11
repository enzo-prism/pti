"use client";

import { useEffect } from "react";
import { HOTJAR_ID, shouldEnableAnalytics } from "@/lib/analytics";

type HotjarFunction = ((...args: unknown[]) => void) & { q?: unknown[][] };
type AnalyticsWindow = Window & {
  hj?: HotjarFunction;
  _hjSettings?: { hjid: number; hjsv: number };
};

export function HotjarAnalytics() {
  useEffect(() => {
    if (!shouldEnableAnalytics() || !HOTJAR_ID) {
      return;
    }

    const win = window as AnalyticsWindow;

    if (!win.hj) {
      const hj: HotjarFunction = (...args) => {
        hj.q = hj.q || [];
        hj.q.push(args);
      };

      win.hj = hj;
      win._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 };

      const hjScript = document.createElement("script");
      hjScript.async = true;
      hjScript.src = `https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=6`;
      document.head.appendChild(hjScript);
    }
  }, []);

  return null;
}
