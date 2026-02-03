"use client";

import { useEffect } from "react";

const GA_ID = "G-XCBKH87HG5";
const HOTJAR_ID = 6575519;
const CANONICAL_HOST = "practicetransitionsinstitute.com";

type GtagArgs = [string, ...unknown[]];
type GtagFunction = (...args: GtagArgs) => void;
type HotjarFunction = ((...args: unknown[]) => void) & { q?: unknown[][] };
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: GtagFunction;
  hj?: HotjarFunction;
  _hjSettings?: { hjid: number; hjsv: number };
};

/**
 * Loads analytics scripts only in production on the canonical host.
 * This ensures preview and production behave identically for non-canonical hosts.
 */
export function useAnalytics() {
  useEffect(() => {
    // Only load analytics in production on canonical host
    const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
    const isProduction =
      typeof vercelEnv === "string"
        ? vercelEnv === "production"
        : process.env.NODE_ENV === "production";
    const isCanonicalHost = 
      typeof window !== "undefined" && 
      window.location.hostname === CANONICAL_HOST;
    
    if (!isProduction || !isCanonicalHost) {
      return;
    }

    // Load Google Analytics
    const win = window as AnalyticsWindow;
    if (!document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(gaScript);

      // Initialize gtag
      win.dataLayer = win.dataLayer || [];
      const gtag: GtagFunction = (...args) => {
        win.dataLayer?.push(args);
      };
      win.gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_ID);
    }

    // Load Hotjar
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
}
