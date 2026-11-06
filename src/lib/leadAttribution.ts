import { hasAnalyticsConsent } from "@/lib/consent";

const STORAGE_KEY = "pti_lead_attribution_v1";
const CAMPAIGN_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const safePath = (path: string) => /^\/[a-zA-Z0-9/_-]*$/.test(path) && path.length <= 250 ? path : "/";

/** Keep campaign labels, never arbitrary URL parameters or contact information. */
const safeLabel = (value: string | null): string => {
  if (!value || value.length > 100 || /[@<>]|https?:|\b\d{7,}\b/i.test(value)) return "";
  return value.replace(/[^a-zA-Z0-9 _.,:+/-]/g, "").trim();
};

export const attributionFromUrl = (url: string, referrer = ""): Record<string, string> => {
  const current = new URL(url);
  const result: Record<string, string> = { landing_page: safePath(current.pathname) };
  try {
    const previous = new URL(referrer);
    if (previous.hostname !== current.hostname) result.referrer_host = previous.hostname;
  } catch { /* A direct visit has no valid referrer. */ }
  for (const field of CAMPAIGN_FIELDS) {
    const value = safeLabel(current.searchParams.get(field));
    if (value) result[field] = value;
  }
  return result;
};

/** Session attribution is stored only after consent, and cleared on withdrawal. */
export const captureLeadAttribution = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const page = { page_path: safePath(window.location.pathname) };
  if (!hasAnalyticsConsent()) {
    try { window.sessionStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be blocked. */ }
    return page;
  }
  let firstTouch = attributionFromUrl(window.location.href, document.referrer);
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const record = parsed as Record<string, unknown>;
        // Revalidate storage rather than trusting old or edited browser values.
        if (typeof record.landing_page === "string" && /^\/[a-zA-Z0-9/_-]*$/.test(record.landing_page)) {
          firstTouch = { landing_page: record.landing_page };
          for (const key of [...CAMPAIGN_FIELDS, "referrer_host"]) {
            const value = typeof record[key] === "string" ? safeLabel(record[key]) : "";
            if (value) firstTouch[key] = value;
          }
        }
      }
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(firstTouch));
  } catch { /* Attribution must never prevent an inquiry. */ }
  return { ...firstTouch, ...page };
};

export const addLeadAttribution = (payload: FormData) => {
  for (const [key, value] of Object.entries(captureLeadAttribution())) payload.set(key, value);
};
