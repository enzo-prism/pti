import { CANONICAL_SITE_URL } from "@/lib/siteMetadata";

type GtagFunction = (
  command: "js" | "config" | "event",
  target: string | Date,
  params?: Record<string, unknown>
) => void;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: GtagFunction;
  __gaConfigured?: boolean;
  __gaLastTrackedPath?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFunction;
    __gaConfigured?: boolean;
    __gaLastTrackedPath?: string;
  }
}

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

const LEGACY_GA_MEASUREMENT_ID = "G-XCBKH87HG5";
const LEGACY_HOTJAR_ID = 6575519;
const GA_MEASUREMENT_ID_REGEX = /^G-[A-Z0-9]+$/;
const EVENT_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/;
const RESERVED_CUSTOM_EVENT_NAMES = new Set(["click", "page_view"]);

const CANONICAL_HOSTNAME = new URL(CANONICAL_SITE_URL).hostname.toLowerCase();

const resolveProductionMode = (): boolean => {
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV?.trim().toLowerCase();
  if (vercelEnv) {
    return vercelEnv === "production";
  }

  return process.env.NODE_ENV === "production";
};

const resolveMeasurementId = (): string | null => {
  const configuredId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (typeof configuredId === "string") {
    const normalizedConfiguredId = configuredId.trim().toUpperCase();
    if (!normalizedConfiguredId) {
      return null;
    }

    return GA_MEASUREMENT_ID_REGEX.test(normalizedConfiguredId)
      ? normalizedConfiguredId
      : null;
  }

  return GA_MEASUREMENT_ID_REGEX.test(LEGACY_GA_MEASUREMENT_ID)
    ? LEGACY_GA_MEASUREMENT_ID
    : null;
};

const resolveHotjarId = (): number | null => {
  const configuredId = process.env.NEXT_PUBLIC_HOTJAR_ID;

  if (typeof configuredId !== "string") {
    return LEGACY_HOTJAR_ID;
  }

  const normalizedConfiguredId = configuredId.trim();
  if (!normalizedConfiguredId) {
    return null;
  }

  const parsedHotjarId = Number.parseInt(normalizedConfiguredId, 10);
  if (!Number.isFinite(parsedHotjarId) || parsedHotjarId <= 0) {
    return null;
  }

  return parsedHotjarId;
};

const isCanonicalHostname = (hostname: string): boolean => {
  const normalizedHostname = hostname.toLowerCase();
  return (
    normalizedHostname === CANONICAL_HOSTNAME ||
    normalizedHostname === `www.${CANONICAL_HOSTNAME}`
  );
};

const isProduction = resolveProductionMode();
export const GA_MEASUREMENT_ID = resolveMeasurementId();
export const HOTJAR_ID = resolveHotjarId();

export const isValidGaMeasurementId = (
  measurementId: string | null | undefined
): measurementId is string =>
  typeof measurementId === "string" && GA_MEASUREMENT_ID_REGEX.test(measurementId);

const ensureGtagBridge = (): AnalyticsWindow => {
  const win = window as AnalyticsWindow;
  win.dataLayer = win.dataLayer || [];

  if (typeof win.gtag !== "function") {
    const gtagBridge = function (...args: unknown[]) {
      // Preserve Google’s expected queue shape by pushing an arguments object.
      // eslint-disable-next-line prefer-rest-params
      win.dataLayer?.push(arguments);
    } as GtagFunction;

    win.gtag = gtagBridge;
  }

  return win;
};

export const shouldEnableAnalytics = (): boolean => {
  if (
    !isProduction ||
    typeof window === "undefined" ||
    !isValidGaMeasurementId(GA_MEASUREMENT_ID)
  ) {
    return false;
  }

  return isCanonicalHostname(window.location.hostname);
};

// Initialize Google Analytics. Safe to call multiple times.
export const initializeAnalytics = () => {
  if (!shouldEnableAnalytics() || !GA_MEASUREMENT_ID) {
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

  const win = ensureGtagBridge();
  const normalizedPath =
    path.startsWith("http://") || path.startsWith("https://")
      ? path
      : path.startsWith("/")
        ? path
        : `/${path}`;
  if (win.__gaLastTrackedPath === normalizedPath) {
    return;
  }

  initializeAnalytics();
  const pageLocation =
    normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")
      ? normalizedPath
      : `${window.location.origin}${normalizedPath}`;

  const pagePayload: Record<string, unknown> = {
    page_location: pageLocation,
    page_title: options?.title ?? document.title,
  };

  if (options?.referrer) {
    pagePayload.page_referrer = options.referrer;
  }

  win.gtag?.("event", "page_view", pagePayload);
  win.__gaLastTrackedPath = normalizedPath;
};

// Track custom events.
export const trackEvent = (eventName: string, parameters: AnalyticsParams = {}) => {
  if (!shouldEnableAnalytics()) {
    return;
  }

  if (
    !EVENT_NAME_REGEX.test(eventName) ||
    RESERVED_CUSTOM_EVENT_NAMES.has(eventName)
  ) {
    return;
  }

  initializeAnalytics();

  const filteredParameters = Object.fromEntries(
    Object.entries(parameters).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );

  (window as AnalyticsWindow).gtag?.("event", eventName, {
    ...filteredParameters,
  });
};

export const trackBookConsultationClick = (location: string) => {
  trackEvent("book_consultation_click", {
    location,
  });
};

export const trackPhoneCallClick = (location: string) => {
  trackEvent("phone_call_click", {
    location,
  });
};

export const trackSelectCta = (ctaName: string, ctaLocation: string) => {
  trackEvent("select_cta", {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
};

export const trackBlogPostView = (
  postTitle: string,
  category: string,
  postSlug: string
) => {
  trackEvent("view_blog_post", {
    post_title: postTitle,
    content_category: category,
    post_slug: postSlug,
  });
};

export const trackSeriesNavigation = (
  seriesId: string,
  fromPart: number,
  toPart: number
) => {
  trackEvent("blog_series_navigation", {
    series_id: seriesId,
    from_part: fromPart,
    to_part: toPart,
  });
};

export const trackEventRegistrationClick = (
  eventName: string,
  channel: "phone" | "email" | "external" | "alternative_email"
) => {
  trackEvent("event_registration_click", {
    event_name: eventName,
    channel,
  });
};

export const trackContactFormStart = (
  formId = "contact_form",
  formProvider = "typeform"
) => {
  trackEvent("form_start", {
    form_id: formId,
    form_provider: formProvider,
  });
};

export const trackContactFormSubmit = (
  leadType = "contact",
  formId = "contact_form",
  formProvider = "typeform"
) => {
  trackEvent("generate_lead", {
    lead_type: leadType,
    form_id: formId,
    form_provider: formProvider,
  });
};

export const trackServiceView = (serviceName: string) => {
  trackEvent("view_service", {
    service_name: serviceName,
  });
};

// Backward-compatible alias while components migrate.
export const trackCTAClick = trackSelectCta;
