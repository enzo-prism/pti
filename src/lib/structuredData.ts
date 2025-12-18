import type { ServiceOffering } from "@/data/services";
import type { BlogPost } from "@/data/blogPosts";
import {
  BUSINESS_DESCRIPTION,
  BUSINESS_HOURS,
  BUSINESS_OPENING_HOURS_SPECIFICATION,
  BUSINESS_PRICE_RANGE,
  DEFAULT_LOCALE,
  SERVICE_AREAS,
  SITE_CONTACT_EMAIL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  SOCIAL_PROFILES,
  SITE_SEARCH_PATH,
  buildAbsoluteUrl,
  buildContactPoint,
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

const normalizeServiceAreas = () =>
  SERVICE_AREAS.length === 1 ? SERVICE_AREAS[0] : SERVICE_AREAS;

const buildImageObject = (url: string, id?: string): JsonLdShape => ({
  "@type": "ImageObject",
  ...(id ? { "@id": id } : {}),
  url,
});

const buildBusinessSchema = (input: {
  types: string[];
  includeLocalBusinessFields?: boolean;
}): JsonLdShape => {
  const logoUrl = resolveAbsoluteUrl(DEFAULT_OG_IMAGE);

  const base: JsonLdShape = {
    "@context": "https://schema.org",
    "@id": BUSINESS_ID,
    "@type": input.types,
    name: SITE_NAME,
    description: BUSINESS_DESCRIPTION,
    url: buildAbsoluteUrl(),
    logo: buildImageObject(logoUrl, LOGO_ID),
    image: [logoUrl],
    address: buildPostalAddress(),
    telephone: PHONE_NUMBER_TEL,
    email: SITE_CONTACT_EMAIL,
    contactPoint: [buildContactPoint()],
    areaServed: normalizeServiceAreas(),
  };

  if (SOCIAL_PROFILES.length) {
    base.sameAs = SOCIAL_PROFILES;
  }

  if (input.includeLocalBusinessFields) {
    const mapUrl = buildGoogleMapsUrl();
    base.openingHours = BUSINESS_HOURS;
    base.openingHoursSpecification = BUSINESS_OPENING_HOURS_SPECIFICATION;
    base.priceRange = BUSINESS_PRICE_RANGE;
    if (mapUrl) {
      base.hasMap = mapUrl;
    }
  }

  return base;
};

export const buildOrganizationSchema = (): JsonLdShape => {
  return buildBusinessSchema({ types: ["Organization"] });
};

export const buildProfessionalServiceSchema = (): JsonLdShape => {
  return buildBusinessSchema({
    types: ["Organization", "ProfessionalService"],
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

export const buildServiceOfferingsSchema = (
  offerings: ServiceOffering[]
): JsonLdShape[] => {
  if (!offerings.length) return [];

  return offerings.map((offering) => {
    const url = buildAbsoluteUrl(offering.url);
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: offering.title,
      description: offering.description,
      serviceType: offering.title,
      provider: {
        "@id": BUSINESS_ID,
      },
      areaServed: normalizeServiceAreas(),
      url,
    };
  });
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

export const buildBlogItemListSchema = (posts: BlogPost[]): JsonLdShape => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${SITE_NAME} Blog`,
  itemListElement: posts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: buildAbsoluteUrl(`/blog/${post.slug}`),
    name: post.title,
  })),
});

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

export interface ReviewInput {
  author: string;
  reviewBody: string;
  rating: number;
  datePublished?: string;
  itemReviewed?: JsonLdShape;
  reviewTitle?: string;
  isVerified?: boolean;
}

export const buildReviewSchemas = (reviews: ReviewInput[]): JsonLdShape[] => {
  if (!reviews.length) return [];

  return reviews
    .filter(
      (review) =>
        review.author &&
        review.reviewBody &&
        Number.isFinite(review.rating) &&
        review.itemReviewed
    )
    .map((review) => ({
      "@context": "https://schema.org",
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.reviewBody,
      ...(review.reviewTitle ? { name: review.reviewTitle } : {}),
      ...(review.datePublished
        ? { datePublished: new Date(review.datePublished).toISOString() }
        : {}),
      ...(review.itemReviewed ? { itemReviewed: review.itemReviewed } : {}),
      ...(review.isVerified ? { isVerified: true } : {}),
    }));
};

export const buildAggregateRatingSchema = (
  reviews: ReviewInput[],
  itemReviewed: {
    "@type": string;
    name: string;
    url?: string;
    "@id"?: string;
  }
): JsonLdShape | null => {
  if (!reviews.length) return null;
  const ratingValue =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return {
    "@context": "https://schema.org",
    "@type": itemReviewed["@type"],
    ...(itemReviewed["@id"] ? { "@id": itemReviewed["@id"] } : {}),
    name: itemReviewed.name,
    ...(itemReviewed.url ? { url: itemReviewed.url } : {}),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(ratingValue.toFixed(2)),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
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
