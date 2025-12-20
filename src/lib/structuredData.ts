import type { BlogPost } from "@/data/blogPosts";
import {
  BUSINESS_DESCRIPTION,
  BUSINESS_OPENING_HOURS_SPECIFICATION,
  BUSINESS_PRICE_RANGE,
  DEFAULT_LOCALE,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  SOCIAL_PROFILES,
  SITE_SEARCH_PATH,
  buildAbsoluteUrl,
  buildPostalAddress,
  buildGoogleMapsUrl,
} from "@/lib/siteMetadata";
import { PHONE_NUMBER_TEL } from "@/lib/constants";
import { parseEventDate } from "@/lib/dateUtils";

export type JsonLdShape = Record<string, unknown>;

export const BUSINESS_ID = `${buildAbsoluteUrl()}#business`;
export const WEBSITE_ID = `${buildAbsoluteUrl()}#website`;
export const LOGO_ID = `${buildAbsoluteUrl()}#logo`;

const resolveAbsoluteUrl = (value: string): string =>
  value.startsWith("http") ? value : buildAbsoluteUrl(value);

const buildImageObject = (url: string, id?: string): JsonLdShape => ({
  "@type": "ImageObject",
  ...(id ? { "@id": id } : {}),
  url,
});

const buildBusinessSchema = (input: {
  type: "Organization" | "ProfessionalService";
  includeLocalBusinessFields?: boolean;
}): JsonLdShape => {
  const logoUrl = resolveAbsoluteUrl(DEFAULT_OG_IMAGE);

  const base: JsonLdShape = {
    "@context": "https://schema.org",
    "@id": BUSINESS_ID,
    "@type": input.type,
    name: SITE_NAME,
    description: BUSINESS_DESCRIPTION,
    url: buildAbsoluteUrl(),
    logo: buildImageObject(logoUrl, LOGO_ID),
    image: logoUrl,
    address: buildPostalAddress(),
    telephone: PHONE_NUMBER_TEL,
  };

  if (SOCIAL_PROFILES.length) {
    base.sameAs = SOCIAL_PROFILES;
  }

  if (input.includeLocalBusinessFields) {
    const mapUrl = buildGoogleMapsUrl();
    base.openingHoursSpecification = BUSINESS_OPENING_HOURS_SPECIFICATION;
    base.priceRange = BUSINESS_PRICE_RANGE;
    if (mapUrl) {
      base.hasMap = mapUrl;
    }
  }

  return base;
};

export const buildOrganizationSchema = (): JsonLdShape => {
  return buildBusinessSchema({ type: "Organization" });
};

export const buildProfessionalServiceSchema = (): JsonLdShape => {
  return buildBusinessSchema({
    type: "ProfessionalService",
    includeLocalBusinessFields: true,
  });
};

export const buildWebSiteSchema = (options?: {
  enableSearch?: boolean;
}): JsonLdShape => {
  const schema: JsonLdShape = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: buildAbsoluteUrl(),
    publisher: {
      "@id": BUSINESS_ID,
    },
    inLanguage: DEFAULT_LOCALE,
  };

  if (options?.enableSearch) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: `${buildAbsoluteUrl(SITE_SEARCH_PATH)}?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    };
  }

  return schema;
};

export const buildWebPageSchema = (input: {
  url: string;
  name: string;
  description?: string;
  image?: string;
}): JsonLdShape => {
  const page: JsonLdShape = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${input.url}#webpage`,
    url: input.url,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": BUSINESS_ID,
    },
    inLanguage: DEFAULT_LOCALE,
  };

  if (input.image) {
    const imageUrl = resolveAbsoluteUrl(input.image);
    page.primaryImageOfPage = buildImageObject(
      imageUrl,
      `${input.url}#primaryimage`
    );
  }

  return page;
};

export interface FAQItem {
  question: string;
  answer: string;
}

export const buildFAQSchema = (items: FAQItem[]): JsonLdShape | null => {
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
};

export const buildBlogPostingSchema = (
  post: BlogPost,
  options?: { category?: string }
): JsonLdShape => {
  const postUrl = buildAbsoluteUrl(`/blog/${post.slug}`);
  const publishedDate = new Date(post.date).toISOString();
  const imageSource = resolveAbsoluteUrl(post.featuredImage ?? DEFAULT_OG_IMAGE);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#blogposting`,
    headline: post.title,
    description: post.excerpt,
    articleSection: options?.category ?? post.category,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@id": BUSINESS_ID,
    },
    image: buildImageObject(imageSource, `${postUrl}#primaryimage`),
    url: postUrl,
    mainEntityOfPage: {
      "@id": `${postUrl}#webpage`,
    },
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    inLanguage: DEFAULT_LOCALE,
  };
};

export interface StructuredEventInput {
  id: string | number;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  registrationLink: string;
  type: string;
  isVirtual?: boolean;
}

const buildEventStartDate = (date: string, time?: string): string => {
  const baseDate = parseEventDate(date);
  if (!time) return baseDate.toISOString();

  const timeMatch = time.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);
  if (!timeMatch) return baseDate.toISOString();

  let hours = Number.parseInt(timeMatch[1], 10);
  const minutes = timeMatch[2] ? Number.parseInt(timeMatch[2], 10) : 0;
  const meridiem = timeMatch[3]?.toUpperCase();

  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  const withTime = new Date(baseDate);
  withTime.setHours(hours, minutes, 0, 0);
  return withTime.toISOString();
};

export const buildEventSchema = (
  event: StructuredEventInput
): JsonLdShape => {
  const startDate = buildEventStartDate(event.date, event.time);
  const isVirtual =
    event.isVirtual ||
    /online|virtual/i.test(event.location) ||
    event.type === "webinar";
  const registrationUrl =
    event.registrationLink.startsWith("http") ||
    event.registrationLink.startsWith("tel:")
      ? event.registrationLink
      : buildAbsoluteUrl(event.registrationLink);
  const eventUrl = buildAbsoluteUrl(`/events#event-${event.id}`);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": eventUrl,
    name: event.title,
    description: event.description,
    startDate,
    eventAttendanceMode: isVirtual
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: isVirtual
      ? {
          "@type": "VirtualLocation",
          url: registrationUrl,
        }
      : {
          "@type": "Place",
          name: event.location,
          address: event.location,
        },
    offers: {
      "@type": "Offer",
      url: registrationUrl,
      price: 0,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    organizer: {
      "@id": BUSINESS_ID,
    },
    url: eventUrl,
  };
};

export const buildContactPageSchema = (
  url: string = buildAbsoluteUrl("/contact")
): JsonLdShape => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${url}#contactpage`,
  url,
  about: {
    "@id": BUSINESS_ID,
  },
  mainEntity: {
    "@id": BUSINESS_ID,
  },
  isPartOf: {
    "@id": WEBSITE_ID,
  },
  inLanguage: DEFAULT_LOCALE,
});
