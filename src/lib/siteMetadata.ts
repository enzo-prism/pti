import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";

export const SITE_NAME = "Practice Transitions Institute";
export const FALLBACK_SITE_URL = "https://practicetransitionsinstitute.com";

const normalizeSiteUrl = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return FALLBACK_SITE_URL;

  try {
    const url = new URL(trimmed);
    url.protocol = "https:";
    if (url.hostname.toLowerCase() === "www.practicetransitionsinstitute.com") {
      url.hostname = "practicetransitionsinstitute.com";
    }
    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
};

export const CANONICAL_SITE_URL = normalizeSiteUrl(
  (process.env.NEXT_PUBLIC_CANONICAL_SITE_URL as string | undefined) ??
    FALLBACK_SITE_URL
);

export const DEFAULT_OG_IMAGE = "/opengraph.png";

export const BUSINESS_DESCRIPTION =
  "Practice Transitions Institute guides dentists through valuations, sales, partnerships, and associateships with personalized, end-to-end transition support.";

export const BUSINESS_AGGREGATE_RATING = {
  ratingValue: 4.98,
  reviewCount: 49,
} as const;

export const SITE_CONTACT_EMAIL = "info@practicetransitions.com";
export const BUSINESS_ADDRESS = {
  streetAddress: "3182 Campus Drive #274",
  addressLocality: "San Mateo",
  addressRegion: "CA",
  postalCode: "94403",
  addressCountry: "US",
};
export const BUSINESS_LOCATION = `${BUSINESS_ADDRESS.streetAddress}, ${BUSINESS_ADDRESS.addressLocality}, ${BUSINESS_ADDRESS.addressRegion} ${BUSINESS_ADDRESS.postalCode}`;

export const BUSINESS_PRICE_RANGE = "$$";
export const DEFAULT_LOCALE = "en-US";

export const BUSINESS_OPENING_HOURS_SPECIFICATION = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "https://schema.org/Monday",
      "https://schema.org/Tuesday",
      "https://schema.org/Wednesday",
      "https://schema.org/Thursday",
      "https://schema.org/Friday",
    ],
    opens: "09:00",
    closes: "17:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "https://schema.org/Saturday",
    opens: "09:00",
    closes: "12:00",
  },
] as const;

export const SOCIAL_PROFILES: string[] = [];
export const SITE_SEARCH_PATH = "/blog";

export const getSiteUrl = (): string => {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }

  return CANONICAL_SITE_URL;
};

export const buildAbsoluteUrl = (path = "/"): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
};

export const buildPostalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: BUSINESS_ADDRESS.streetAddress,
  addressLocality: BUSINESS_ADDRESS.addressLocality,
  addressRegion: BUSINESS_ADDRESS.addressRegion,
  postalCode: BUSINESS_ADDRESS.postalCode,
  addressCountry: BUSINESS_ADDRESS.addressCountry,
});

export const buildGoogleMapsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    BUSINESS_LOCATION
  )}`;

export const getPhoneNumber = () => PHONE_NUMBER;
