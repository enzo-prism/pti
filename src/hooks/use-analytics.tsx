"use client";

import { useEffect } from "react";

const GA_ID = "G-XCBKH87HG5";
const HOTJAR_ID = 6575519;
const CANONICAL_HOST = "practicetransitionsinstitute.com";

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
    if (!document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(gaScript);

      // Initialize gtag
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      (window as any).gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_ID);
    }

    // Load Hotjar
    if (!(window as any).hj) {
      (window as any).hj = function () {
        ((window as any).hj.q = (window as any).hj.q || []).push(arguments);
      };
      (window as any)._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 };

      const hjScript = document.createElement("script");
      hjScript.async = true;
      hjScript.src = `https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=6`;
      document.head.appendChild(hjScript);
    }
  }, []);
}
