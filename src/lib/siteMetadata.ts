import {
  MICHAEL_NJO_WEBSITE_URL,
  PHONE_NUMBER,
  PHONE_NUMBER_TEL,
} from "./constants";

export const SITE_NAME = "Practice Transitions Institute";
export const FALLBACK_SITE_URL = "https://practicetransitionsinstitute.com";

export const normalizeSiteUrl = (value: string): string => {
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

export const SITE_CONTACT_EMAIL = "info@practicetransitions.com";
export const BUSINESS_ADDRESS = {
  streetAddress: "3182 Campus Drive #274",
  addressLocality: "San Mateo",
  addressRegion: "CA",
  postalCode: "94403",
  addressCountry: "US",
};
export const BUSINESS_LOCATION = `${BUSINESS_ADDRESS.streetAddress}, ${BUSINESS_ADDRESS.addressLocality}, ${BUSINESS_ADDRESS.addressRegion} ${BUSINESS_ADDRESS.postalCode}`;

// Approximate coordinates for the San Mateo (Campus Drive) office. Used for the
// `geo` field on the LocalBusiness/ProfessionalService schema so search engines
// can place the business; Google reconciles the precise pin from the address.
export const BUSINESS_GEO = {
  latitude: 37.5386,
  longitude: -122.2967,
};

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

// `sameAs` targets that consolidate the brand's identity for search engines.
// michaelnjodds.com is the founder's official professional site (verified,
// same operator). Append the firm's Google Business Profile, LinkedIn, Facebook,
// and YouTube URLs here as they are confirmed to strengthen entity consolidation.
export const SOCIAL_PROFILES: string[] = [MICHAEL_NJO_WEBSITE_URL];
export const SITE_SEARCH_PATH = "/blog";

export const getSiteUrl = (): string => CANONICAL_SITE_URL;

export const buildAbsoluteUrl = (path = "/"): string => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${CANONICAL_SITE_URL}${normalizedPath}`;
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
