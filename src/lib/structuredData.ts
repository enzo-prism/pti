import type { ServiceOffering } from "@/data/services";
import type { BlogPost } from "@/data/blogPosts";
import {
  BUSINESS_DESCRIPTION,
  BUSINESS_OPENING_HOURS_SPECIFICATION,
  SERVICE_AREAS,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  SOCIAL_PROFILES,
  SITE_SEARCH_PATH,
  buildAbsoluteUrl,
  buildContactPoint,
  buildPostalAddress,
} from "@/lib/siteMetadata";
import { PHONE_NUMBER_TEL } from "@/lib/constants";
import { parseEventDate } from "@/lib/dateUtils";

export type JsonLdShape = Record<string, unknown>;

const buildImageObject = (url: string): JsonLdShape => ({
  "@type": "ImageObject",
  url,
});

export const buildOrganizationSchema = (): JsonLdShape => {
  const logoUrl = buildAbsoluteUrl(DEFAULT_OG_IMAGE);
  const base: JsonLdShape = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: BUSINESS_DESCRIPTION,
    url: buildAbsoluteUrl(),
    logo: buildImageObject(logoUrl),
    address: buildPostalAddress(),
    contactPoint: [buildContactPoint()],
    areaServed: SERVICE_AREAS.length === 1 ? SERVICE_AREAS[0] : SERVICE_AREAS,
  };

  if (SOCIAL_PROFILES.length) {
    base.sameAs = SOCIAL_PROFILES;
  }

  return base;
};

export const buildProfessionalServiceSchema = (): JsonLdShape => {
  const imageUrl = buildAbsoluteUrl(DEFAULT_OG_IMAGE);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${buildAbsoluteUrl()}#professional-service`,
    name: SITE_NAME,
    description: BUSINESS_DESCRIPTION,
    url: buildAbsoluteUrl(),
    logo: buildImageObject(imageUrl),
    image: imageUrl,
    contactPoint: buildContactPoint(),
    areaServed: SERVICE_AREAS.length === 1 ? SERVICE_AREAS[0] : SERVICE_AREAS,
    telephone: PHONE_NUMBER_TEL,
    address: buildPostalAddress(),
    openingHoursSpecification: BUSINESS_OPENING_HOURS_SPECIFICATION,
  };
};

export const buildWebSiteSchema = (options?: {
  enableSearch?: boolean;
}): JsonLdShape => {
  const schema: JsonLdShape = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: buildAbsoluteUrl(),
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

export const buildServiceOfferingsSchema = (
  offerings: ServiceOffering[]
): JsonLdShape[] => {
  if (!offerings.length) return [];

  return offerings.map((offering) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: offering.title,
    description: offering.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: buildAbsoluteUrl(),
    },
    areaServed: SERVICE_AREAS,
    url: buildAbsoluteUrl(offering.url),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: offering.title,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offering.title,
            description: offering.description,
          },
        },
      ],
    },
  }));
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
  const publishedDate = new Date(post.date).toISOString();
  const imageSource = post.featuredImage
    ? post.featuredImage.startsWith("http")
      ? post.featuredImage
      : buildAbsoluteUrl(post.featuredImage)
    : buildAbsoluteUrl(DEFAULT_OG_IMAGE);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
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
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: buildAbsoluteUrl(DEFAULT_OG_IMAGE),
      },
    },
    image: imageSource,
    url: buildAbsoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: buildAbsoluteUrl(`/blog/${post.slug}`),
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

export const buildEventSchema = (
  event: StructuredEventInput
): JsonLdShape => {
  const startDate = parseEventDate(event.date).toISOString();
  const isVirtual =
    event.isVirtual ||
    /online|virtual/i.test(event.location) ||
    event.type === "webinar";
  const registrationUrl =
    event.registrationLink.startsWith("http") ||
    event.registrationLink.startsWith("tel:")
      ? event.registrationLink
      : buildAbsoluteUrl(event.registrationLink);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    eventAttendanceMode: isVirtual
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate,
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
      "@type": "Organization",
      name: SITE_NAME,
      url: buildAbsoluteUrl(),
    },
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

  return reviews.map((review) => ({
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

export const buildContactPageSchema = (): JsonLdShape => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  about: {
    "@type": "Organization",
    name: SITE_NAME,
    url: buildAbsoluteUrl(),
  },
  mainEntity: {
    "@type": "Organization",
    name: SITE_NAME,
    contactPoint: [buildContactPoint()],
  },
});
