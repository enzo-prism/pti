"use client";

import { useEffect } from "react";
import { HOTJAR_ID, shouldEnableAnalytics } from "@/lib/analytics";

type HotjarFunction = ((...args: unknown[]) => void) & { q?: unknown[][] };
type AnalyticsWindow = Window & {
  hj?: HotjarFunction;
  _hjSettings?: { hjid: number; hjsv: number };
};
type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout?: number }
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const INTERACTION_EVENTS = [
  "scroll",
  "pointerdown",
  "keydown",
  "touchstart",
] as const;

/**
 * Loads Hotjar only in production on the canonical host, and defers the script
 * until the browser is idle or the visitor first interacts. GA4 stays on its
 * own `afterInteractive` path (see GoogleAnalytics.tsx) and is unaffected, so
 * page-view and lead tracking keep working immediately; only the heavier
 * session-recording script is moved off the critical path.
 */
export function useAnalytics() {
  useEffect(() => {
    if (!shouldEnableAnalytics() || !HOTJAR_ID) {
      return;
    }

    const hotjarId = HOTJAR_ID;
    const idleWindow = window as IdleWindow;
    let loaded = false;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const loadHotjar = () => {
      if (loaded) return;
      loaded = true;
      cleanup();

      const win = window as AnalyticsWindow;
      if (win.hj) return;

      const hj: HotjarFunction = (...args) => {
        hj.q = hj.q || [];
        hj.q.push(args);
      };
      win.hj = hj;
      win._hjSettings = { hjid: hotjarId, hjsv: 6 };

      const hjScript = document.createElement("script");
      hjScript.async = true;
      hjScript.src = `https://static.hotjar.com/c/hotjar-${hotjarId}.js?sv=6`;
      document.head.appendChild(hjScript);
    };

    function cleanup() {
      INTERACTION_EVENTS.forEach((event) =>
        window.removeEventListener(event, loadHotjar)
      );
      if (
        idleHandle !== undefined &&
        typeof idleWindow.cancelIdleCallback === "function"
      ) {
        idleWindow.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) {
        window.clearTimeout(timeoutHandle);
      }
    }

    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, loadHotjar, { once: true, passive: true })
    );

    // Fallback so Hotjar still loads without interaction, but never during the
    // initial render/hydration window.
    if (typeof idleWindow.requestIdleCallback === "function") {
      idleHandle = idleWindow.requestIdleCallback(loadHotjar, { timeout: 6000 });
    } else {
      timeoutHandle = window.setTimeout(loadHotjar, 4000);
    }

    return cleanup;
  }, []);
}
