export const ANALYTICS_CONSENT_STORAGE_KEY = "pti_analytics_consent_v1";
export const ANALYTICS_CONSENT_EVENT = "pti:analytics-consent-change";
export const OPEN_COOKIE_PREFERENCES_EVENT = "pti:open-cookie-preferences";

export type AnalyticsConsent = "accepted" | "declined" | "unset";

export const parseAnalyticsConsent = (
  value: string | null | undefined
): AnalyticsConsent => {
  if (value === "accepted" || value === "declined") {
    return value;
  }

  return "unset";
};

export const getAnalyticsConsent = (): AnalyticsConsent => {
  if (typeof window === "undefined") {
    return "unset";
  }

  try {
    return parseAnalyticsConsent(
      window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
    );
  } catch {
    return "unset";
  }
};

export const hasAnalyticsConsent = (): boolean =>
  getAnalyticsConsent() === "accepted";

export const saveAnalyticsConsent = (consent: Exclude<AnalyticsConsent, "unset">) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  } catch {
    // Storage can be unavailable in privacy modes. The current page still
    // receives the event and defaults back to no analytics after navigation.
  }

  window.dispatchEvent(
    new CustomEvent<AnalyticsConsent>(ANALYTICS_CONSENT_EVENT, {
      detail: consent,
    })
  );
};

export const openCookiePreferences = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
  }
};
