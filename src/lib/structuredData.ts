import type { BlogPost } from "@/data/blogPosts";
import type { AuthorProfile } from "@/data/authors";
import type { ReviewRecord } from "@/data/reviews";
import {
  BUSINESS_DESCRIPTION,
  BUSINESS_OPENING_HOURS_SPECIFICATION,
  BUSINESS_PRICE_RANGE,
  DEFAULT_LOCALE,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  SITE_CONTACT_EMAIL,
  SOCIAL_PROFILES,
  SITE_SEARCH_PATH,
  buildAbsoluteUrl,
  buildPostalAddress,
  buildGoogleMapsUrl,
} from "@/lib/siteMetadata";
import { PHONE_NUMBER_TEL } from "@/lib/constants";
import { parseEventDate } from "@/lib/dateUtils";
import { blogPosts } from "@/data/blogPosts";
import { serviceOfferings, type ServiceOffering } from "@/data/services";

export type JsonLdShape = Record<string, unknown>;

export const BUSINESS_ID = `${buildAbsoluteUrl()}#business`;
export const WEBSITE_ID = `${buildAbsoluteUrl()}#website`;
export const LOGO_ID = `${buildAbsoluteUrl()}#logo`;
const AREA_SERVED = "United States";

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
    areaServed: AREA_SERVED,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE_NUMBER_TEL,
        email: SITE_CONTACT_EMAIL,
        contactType: "customer service",
        areaServed: AREA_SERVED,
        availableLanguage: "English",
      },
    ],
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

export const buildPersonSchema = (input: {
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  url?: string;
}): JsonLdShape => {
  const person: JsonLdShape = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    ...(input.jobTitle ? { jobTitle: input.jobTitle } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.url ? { url: resolveAbsoluteUrl(input.url) } : {}),
    ...(input.image ? { image: resolveAbsoluteUrl(input.image) } : {}),
    worksFor: {
      "@id": BUSINESS_ID,
    },
  };

  return person;
};

export const buildServiceSchema = (
  service: ServiceOffering,
  options?: { includeContext?: boolean }
): JsonLdShape => {
  const includeContext = options?.includeContext !== false;
  const url = resolveAbsoluteUrl(service.url);

  return {
    ...(includeContext ? { "@context": "https://schema.org" } : {}),
    "@type": "Service",
    name: service.title,
    description: service.description,
    url,
    serviceType: service.title,
    provider: {
      "@id": BUSINESS_ID,
    },
    areaServed: AREA_SERVED,
  };
};

export const buildServiceItemListSchema = (
  services: ServiceOffering[] = serviceOfferings
): JsonLdShape | null => {
  const items = services.filter((service) => service.url && service.title);
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Service Offerings`,
    itemListElement: items.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: buildServiceSchema(service, { includeContext: false }),
    })),
  };
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
  options?: { category?: string; authorProfile?: AuthorProfile }
): JsonLdShape => {
  const postUrl = buildAbsoluteUrl(`/blog/${post.slug}`);
  const publishedDate = new Date(`${post.date}T00:00:00Z`).toISOString();
  const imageSource = resolveAbsoluteUrl(post.featuredImage ?? DEFAULT_OG_IMAGE);
  const authorProfile = options?.authorProfile;
  const authorSchema = authorProfile
    ? {
        "@type": authorProfile.type,
        name: authorProfile.name,
        ...(authorProfile.url
          ? { url: resolveAbsoluteUrl(authorProfile.url) }
          : {}),
        ...(authorProfile.sameAs?.length ? { sameAs: authorProfile.sameAs } : {}),
      }
    : {
        "@type": "Person",
        name: post.author,
      };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#blogposting`,
    headline: post.title,
    description: post.excerpt,
    articleSection: options?.category ?? post.category,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: authorSchema,
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

export const buildBlogItemListSchema = (
  posts: BlogPost[] = blogPosts
): JsonLdShape | null => {
  const items = posts.filter((post) => post.slug);
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Blog Articles`,
    itemListElement: items.map((post, index) => {
      const postUrl = buildAbsoluteUrl(`/blog/${post.slug}`);
      const publishedDate = new Date(`${post.date}T00:00:00Z`).toISOString();
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          name: post.title,
          headline: post.title,
          description: post.excerpt,
          url: postUrl,
          datePublished: publishedDate,
        },
      };
    }),
  };
};

export const buildReviewSchema = (
  review: ReviewRecord,
  pageUrl: string
): JsonLdShape => {
  const url = resolveAbsoluteUrl(pageUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${url}#review`,
    url,
    author: {
      "@type": "Person",
      name: review.sourceAuthorName,
    },
    reviewBody: review.quote,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@type": "ProfessionalService",
      "@id": BUSINESS_ID,
      name: SITE_NAME,
      url: buildAbsoluteUrl(),
    },
    publisher: {
      "@id": BUSINESS_ID,
    },
    inLanguage: DEFAULT_LOCALE,
    ...(review.sourceDateISO ? { datePublished: review.sourceDateISO } : {}),
  };
};

export const buildReviewItemListSchema = (
  records: ReviewRecord[],
  pageUrl: string
): JsonLdShape | null => {
  if (!records.length) return null;

  const url = resolveAbsoluteUrl(pageUrl);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#review-list`,
    name: `${SITE_NAME} Reviews`,
    numberOfItems: records.length,
    itemListElement: records.map((review, index) => {
      const reviewUrl = buildAbsoluteUrl(`/testimonials/${review.slug}`);
      return {
        "@type": "ListItem",
        position: index + 1,
        url: reviewUrl,
        name: `${review.displayAuthorName} review`,
        item: {
          "@id": `${reviewUrl}#review`,
        },
      };
    }),
  };
};

export const buildAggregateRatingSchema = (
  records: ReviewRecord[]
): JsonLdShape | null => {
  if (!records.length) return null;

  const totalRating = records.reduce((sum, review) => sum + review.rating, 0);
  const ratingValue = Number((totalRating / records.length).toFixed(2));

  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "@id": `${buildAbsoluteUrl("/testimonials")}#aggregate-rating`,
    ratingValue,
    reviewCount: records.length,
    bestRating: 5,
    worstRating: 1,
    itemReviewed: {
      "@id": BUSINESS_ID,
    },
  };
};

export interface StructuredEventInput {
  id: string | number;
  title: string;
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  description: string;
  registrationLink: string;
  type: string;
  isVirtual?: boolean;
  detailPath?: string;
  offerPrice?: number;
  offerPriceCurrency?: string;
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
  const endDate = event.endDate
    ? parseEventDate(event.endDate).toISOString()
    : undefined;
  const isVirtual =
    event.isVirtual ||
    /online|virtual/i.test(event.location) ||
    event.type === "webinar";
  const registrationUrl =
    event.registrationLink.startsWith("http") ||
    event.registrationLink.startsWith("tel:")
      ? event.registrationLink
      : buildAbsoluteUrl(event.registrationLink);
  const eventUrl = event.detailPath
    ? `${buildAbsoluteUrl(event.detailPath)}#event-${event.id}`
    : buildAbsoluteUrl(`/events#event-${event.id}`);
  const offerPrice = event.offerPrice ?? 0;
  const offerPriceCurrency = event.offerPriceCurrency ?? "USD";

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": eventUrl,
    name: event.title,
    description: event.description,
    startDate,
    ...(endDate ? { endDate } : {}),
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
      price: offerPrice,
      priceCurrency: offerPriceCurrency,
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
