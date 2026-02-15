import { CANONICAL_SITE_URL } from "@/lib/siteMetadata";

type GtagFunction = (
  command: string,
  target: string | Date,
  params?: Record<string, unknown>
) => void;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: GtagFunction;
  __gaConfigured?: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
    __gaConfigured?: boolean;
  }
}

// Analytics event types
export interface AnalyticsEvent {
  event_category: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

export const GA_MEASUREMENT_ID = "G-XCBKH87HG5";
export const HOTJAR_ID = 6575519;

const CANONICAL_HOSTNAME = new URL(CANONICAL_SITE_URL).hostname.toLowerCase();
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
const isProduction =
  typeof vercelEnv === "string"
    ? vercelEnv === "production"
    : process.env.NODE_ENV === "production";

const ensureGtagBridge = (): AnalyticsWindow => {
  const win = window as AnalyticsWindow;
  win.dataLayer = win.dataLayer || [];

  if (typeof win.gtag !== "function") {
    win.gtag = (...args: unknown[]) => {
      win.dataLayer?.push(args);
    };
  }

  return win;
};

export const shouldEnableAnalytics = (): boolean => {
  if (!isProduction || typeof window === "undefined") {
    return false;
  }

  const hostname = window.location.hostname.toLowerCase();
  return (
    hostname === CANONICAL_HOSTNAME || hostname === `www.${CANONICAL_HOSTNAME}`
  );
};

// Initialize Google Analytics. Safe to call multiple times.
export const initializeAnalytics = () => {
  if (!shouldEnableAnalytics()) {
    return;
  }

  const win = ensureGtagBridge();
  if (win.__gaConfigured) {
    return;
  }

  win.gtag?.("js", new Date());
  win.gtag?.("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });
  win.__gaConfigured = true;
};

// Track page views for SPA route changes.
export const trackPageView = (
  path: string,
  options?: { title?: string; referrer?: string }
) => {
  if (!shouldEnableAnalytics()) {
    return;
  }

  initializeAnalytics();
  const pageLocation =
    path.startsWith("http://") || path.startsWith("https://")
      ? path
      : `${window.location.origin}${path}`;

  const pagePayload: Record<string, unknown> = {
    page_location: pageLocation,
    page_title: options?.title ?? document.title,
  };

  if (options?.referrer) {
    pagePayload.page_referrer = options.referrer;
  }

  (window as AnalyticsWindow).gtag?.("event", "page_view", pagePayload);
};

// Track custom events.
export const trackEvent = (eventName: string, parameters: AnalyticsEvent) => {
  if (!shouldEnableAnalytics()) {
    return;
  }

  initializeAnalytics();

  (window as AnalyticsWindow).gtag?.("event", eventName, {
    event_category: parameters.event_category,
    event_label: parameters.event_label,
    value: parameters.value,
    ...parameters.custom_parameters,
  });
};

// Predefined event tracking functions
export const trackContactFormSubmit = () => {
  trackEvent("form_submit", {
    event_category: "engagement",
    event_label: "contact_form",
  });
};

export const trackServiceView = (serviceName: string) => {
  trackEvent("page_view", {
    event_category: "services",
    event_label: serviceName,
  });
};

export const trackBlogPostView = (postTitle: string, category: string) => {
  trackEvent("page_view", {
    event_category: "blog",
    event_label: postTitle,
    custom_parameters: {
      content_category: category,
    },
  });
};

export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent("click", {
    event_category: "cta",
    event_label: ctaName,
    custom_parameters: {
      click_location: location,
    },
  });
};

export const trackSeriesNavigation = (fromPart: string, toPart: string) => {
  trackEvent("navigation", {
    event_category: "blog_series",
    event_label: `${fromPart}_to_${toPart}`,
  });
};
