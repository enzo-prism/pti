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
// Confirmed postal contact address, not a customer-facing office.
export const BUSINESS_ADDRESS_LABEL = "Mailing address";
export const BUSINESS_ADDRESS = {
  streetAddress: "3182 Campus Drive #274",
  addressLocality: "San Mateo",
  addressRegion: "CA",
  postalCode: "94403",
  addressCountry: "US",
};
export const DEFAULT_LOCALE = "en-US";

// `sameAs` targets that consolidate the brand's identity for search engines.
// Configure via NEXT_PUBLIC_SOCIAL_PROFILES (comma-separated URLs) to add the
// firm's Google Business Profile, LinkedIn, Facebook, and YouTube without a code
// change. When unset, we default to the founder's official professional site
// (michaelnjodds.com) so at least one verified identity link is always emitted.
const parseSocialProfiles = (raw: string | undefined): string[] => {
  const configured = (raw ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter((value) => /^https?:\/\//i.test(value));

  return configured.length ? configured : [MICHAEL_NJO_WEBSITE_URL];
};

export const SOCIAL_PROFILES: string[] = parseSocialProfiles(
  process.env.NEXT_PUBLIC_SOCIAL_PROFILES
);

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
  name: BUSINESS_ADDRESS_LABEL,
  streetAddress: BUSINESS_ADDRESS.streetAddress,
  addressLocality: BUSINESS_ADDRESS.addressLocality,
  addressRegion: BUSINESS_ADDRESS.addressRegion,
  postalCode: BUSINESS_ADDRESS.postalCode,
  addressCountry: BUSINESS_ADDRESS.addressCountry,
});

export const getPhoneNumber = () => PHONE_NUMBER;
