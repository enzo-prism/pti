const clearServiceWorkers = async () => {
  if (!("serviceWorker" in navigator)) return;
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
};

const clearCaches = async () => {
  if (!("caches" in window) || typeof caches.keys !== "function") return;
  try {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  } catch {
    // Best-effort cleanup only.
  }
};

const setStorageValue = (storage: Storage, key: string, value: string) => {
  try {
    storage.setItem(key, value);
  } catch {
    // Ignore storage failures.
  }
};

const getStorageValue = (storage: Storage, key: string): string | null => {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

export const runDeployGuard = async () => {
  if (typeof window === "undefined") return;

  let buildId = "unknown";
  let builtAt = "unknown";
  let gitSha = "unknown";
  let action: "none" | "reload" = "none";

  try {
    const response = await fetch("/build-info.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`build-info fetch failed: ${response.status}`);
    }

    const data: unknown = await response.json();
    if (data && typeof data === "object") {
      const parsed = data as {
        buildId?: unknown;
        builtAt?: unknown;
        gitSha?: unknown;
      };
      if (typeof parsed.buildId === "string" && parsed.buildId.trim()) {
        buildId = parsed.buildId.trim();
      }
      if (typeof parsed.builtAt === "string" && parsed.builtAt.trim()) {
        builtAt = parsed.builtAt.trim();
      }
      if (typeof parsed.gitSha === "string" && parsed.gitSha.trim()) {
        gitSha = parsed.gitSha.trim();
      }
    }

    const lastSeenKey = "pti.lastSeenBuildId";
    const lastSeen = getStorageValue(localStorage, lastSeenKey);

    if (buildId !== "unknown") {
      setStorageValue(localStorage, lastSeenKey, buildId);
    }

    if (lastSeen && buildId !== "unknown" && lastSeen !== buildId) {
      const reloadKey = `pti.reloadAttempted.${buildId}`;
      const attempted = getStorageValue(sessionStorage, reloadKey);
      if (!attempted) {
        action = "reload";
        setStorageValue(sessionStorage, reloadKey, "1");
        await clearServiceWorkers();
        await clearCaches();

        const url = new URL(window.location.href);
        url.searchParams.set("v", buildId);
        window.location.replace(`${url.pathname}${url.search}${url.hash}`);
        return;
      }
    }
  } catch {
    // Fail open.
  } finally {
    console.log(
      `deployGuard: buildId=${buildId} sha=${gitSha} action=${action}`
    );
  }
};
