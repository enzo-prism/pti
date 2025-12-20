import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { runDeployGuard } from "@/lib/deployGuard";

void runDeployGuard();

// Polyfills for older Chromium used by prerenderers.
if (!Array.prototype.at) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.at = function at<T>(this: T[], index: number): T | undefined {
    const len = this.length;
    const normalizedIndex = index < 0 ? len + index : index;
    return this[normalizedIndex];
  };
}

if (!String.prototype.at) {
  // eslint-disable-next-line no-extend-native
  String.prototype.at = function at(this: string, index: number): string {
    const len = this.length;
    const normalizedIndex = index < 0 ? len + index : index;
    return this.charAt(normalizedIndex);
  };
}

const cleanupForForceReload = () => {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (!url.searchParams.has("forceReload")) return;

  const cleanup = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          registrations.map((registration) =>
            registration.unregister().catch(() => false)
          )
        );
      } catch {
        // Best-effort cleanup only.
      }
    }

    if ("caches" in window && typeof caches.keys === "function") {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      } catch {
        // Best-effort cleanup only.
      }
    }

    try {
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith("pti.") || key.startsWith("build")) {
          localStorage.removeItem(key);
        }
      }
    } catch {
      // Best-effort cleanup only.
    }
  };

  cleanup().finally(() => {
    url.searchParams.delete("forceReload");
    const query = url.searchParams.toString();
    const next = `${url.pathname}${query ? `?${query}` : ""}${url.hash}`;
    window.history.replaceState({}, "", next || "/");
  });
};

cleanupForForceReload();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Missing root element");
}

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
