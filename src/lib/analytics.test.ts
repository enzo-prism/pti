import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };
const ORIGINAL_WINDOW = globalThis.window;
const ORIGINAL_DOCUMENT = globalThis.document;

const restoreGlobal = <K extends "window" | "document">(
  key: K,
  value: K extends "window" ? Window : Document
) => {
  Object.defineProperty(globalThis, key, {
    configurable: true,
    writable: true,
    value,
  });
};

const removeGlobal = (key: "window" | "document") => {
  Reflect.deleteProperty(globalThis, key);
};

const mockBrowser = (options?: {
  hostname?: string;
  origin?: string;
  title?: string;
  referrer?: string;
}) => {
  const hostname = options?.hostname ?? "practicetransitionsinstitute.com";
  const origin = options?.origin ?? `https://${hostname}`;
  const dataLayer: unknown[] = [];
  const gtag = vi.fn((...args: unknown[]) => {
    dataLayer.push(args);
  });

  restoreGlobal(
    "window",
    {
      location: {
        hostname,
        origin,
      },
      dataLayer,
      gtag,
    } as unknown as Window
  );

  restoreGlobal(
    "document",
    {
      title: options?.title ?? "Default Title",
      referrer: options?.referrer ?? "https://referrer.example.com",
    } as unknown as Document
  );

  return { gtag, dataLayer };
};

const loadAnalytics = async () => {
  vi.resetModules();
  return import("./analytics");
};

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV };
  delete process.env.NEXT_PUBLIC_VERCEL_ENV;
  delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  delete process.env.NEXT_PUBLIC_HOTJAR_ID;
  mockBrowser();
});

afterEach(() => {
  vi.restoreAllMocks();
  process.env = { ...ORIGINAL_ENV };

  if (ORIGINAL_WINDOW) {
    restoreGlobal("window", ORIGINAL_WINDOW);
  } else {
    removeGlobal("window");
  }

  if (ORIGINAL_DOCUMENT) {
    restoreGlobal("document", ORIGINAL_DOCUMENT);
  } else {
    removeGlobal("document");
  }
});

describe("analytics gating", () => {
  it("enables analytics on canonical production host", async () => {
    process.env.NODE_ENV = "production";

    const analytics = await loadAnalytics();
    expect(analytics.shouldEnableAnalytics()).toBe(true);
    expect(analytics.GA_MEASUREMENT_ID).toBe("G-XCBKH87HG5");
  });

  it("disables analytics in non-production", async () => {
    process.env.NODE_ENV = "development";

    const analytics = await loadAnalytics();
    expect(analytics.shouldEnableAnalytics()).toBe(false);
  });

  it("uses NEXT_PUBLIC_VERCEL_ENV when provided", async () => {
    process.env.NODE_ENV = "production";
    process.env.NEXT_PUBLIC_VERCEL_ENV = "preview";

    const previewAnalytics = await loadAnalytics();
    expect(previewAnalytics.shouldEnableAnalytics()).toBe(false);

    process.env.NEXT_PUBLIC_VERCEL_ENV = "production";
    const productionAnalytics = await loadAnalytics();
    expect(productionAnalytics.shouldEnableAnalytics()).toBe(true);
  });

  it("disables analytics on non-canonical hosts", async () => {
    process.env.NODE_ENV = "production";
    mockBrowser({ hostname: "example.com", origin: "https://example.com" });

    const analytics = await loadAnalytics();
    expect(analytics.shouldEnableAnalytics()).toBe(false);
  });

  it("disables analytics when GA ID is invalid", async () => {
    process.env.NODE_ENV = "production";
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "invalid-id";

    const analytics = await loadAnalytics();
    expect(analytics.shouldEnableAnalytics()).toBe(false);
    expect(analytics.GA_MEASUREMENT_ID).toBeNull();
  });
});

describe("analytics events", () => {
  it("initializes GA only once", async () => {
    process.env.NODE_ENV = "production";
    const { gtag } = mockBrowser();
    const analytics = await loadAnalytics();

    analytics.initializeAnalytics();
    analytics.initializeAnalytics();

    const configCalls = gtag.mock.calls.filter(
      (call) => call[0] === "config" && call[1] === "G-XCBKH87HG5"
    );
    expect(configCalls).toHaveLength(1);
  });

  it("tracks page view with expected payload and dedupes duplicate paths", async () => {
    process.env.NODE_ENV = "production";
    const { gtag } = mockBrowser({
      title: "PTI Blog",
      referrer: "https://google.com",
    });
    const analytics = await loadAnalytics();

    analytics.trackPageView("/blog?search=transition", {
      title: "PTI Blog",
      referrer: "https://google.com",
    });
    analytics.trackPageView("/blog?search=transition", {
      title: "PTI Blog",
      referrer: "https://google.com",
    });

    const pageViewCalls = gtag.mock.calls.filter(
      (call) => call[0] === "event" && call[1] === "page_view"
    );
    expect(pageViewCalls).toHaveLength(1);

    const payload = pageViewCalls[0][2] as Record<string, unknown>;
    expect(payload).toMatchObject({
      page_location: "https://practicetransitionsinstitute.com/blog?search=transition",
      page_title: "PTI Blog",
      page_referrer: "https://google.com",
    });
  });

  it("sends lead-focused event wrappers with GA4-friendly names", async () => {
    process.env.NODE_ENV = "production";
    const { gtag } = mockBrowser();
    const analytics = await loadAnalytics();

    analytics.trackBookConsultationClick("navbar_desktop");
    analytics.trackPhoneCallClick("navbar");
    analytics.trackSelectCta("external_form_link", "contact_page_error_fallback");
    analytics.trackBlogPostView("Title", "Culture", "sample-slug");
    analytics.trackSeriesNavigation("debugging-myths", 1, 2);
    analytics.trackEventRegistrationClick("webinar_event", "external");
    analytics.trackEventRegistrationClick("practice_transition_seminar", "form");
    analytics.trackContactFormStart("cYOs5Ma2", "typeform");
    analytics.trackContactFormSubmit("contact", "cYOs5Ma2", "typeform");

    const eventCalls = gtag.mock.calls.filter((call) => call[0] === "event");
    const eventNames = eventCalls.map((call) => call[1]);

    expect(eventNames).toContain("book_consultation_click");
    expect(eventNames).toContain("phone_call_click");
    expect(eventNames).toContain("select_cta");
    expect(eventNames).toContain("view_blog_post");
    expect(eventNames).toContain("blog_series_navigation");
    expect(eventNames).toContain("event_registration_click");
    expect(eventNames).toContain("form_start");
    expect(eventNames).toContain("generate_lead");
    expect(eventNames).not.toContain("click");

    const registrationPayloads = eventCalls
      .filter((call) => call[1] === "event_registration_click")
      .map((call) => call[2] as Record<string, unknown>);
    expect(registrationPayloads).toContainEqual({
      event_name: "practice_transition_seminar",
      channel: "form",
    });
  });

  it("blocks reserved custom event names", async () => {
    process.env.NODE_ENV = "production";
    const { gtag } = mockBrowser();
    const analytics = await loadAnalytics();

    analytics.trackEvent("click", { label: "bad" });
    analytics.trackEvent("page_view", { label: "bad" });

    const blockedEventCalls = gtag.mock.calls.filter(
      (call) => call[0] === "event" && (call[1] === "click" || call[1] === "page_view")
    );
    expect(blockedEventCalls).toHaveLength(0);
  });
});
