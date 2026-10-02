import {
  blogPosts,
  getBlogMetaDescription,
  type BlogPost,
} from "@/data/blogPosts";
import type { AuthorProfile } from "@/data/authors";
import {
  BUSINESS_DESCRIPTION,
  DEFAULT_LOCALE,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  SITE_CONTACT_EMAIL,
  SOCIAL_PROFILES,
  buildAbsoluteUrl,
  buildPostalAddress,
} from "@/lib/siteMetadata";
import { PHONE_NUMBER_TEL, PODCAST_INTERVIEW_PATH } from "@/lib/constants";
import { PODCAST_INTERVIEW } from "@/data/podcastInterview";
import {
  BUSINESS_TIME_ZONE,
  formatEventDateTime,
  parseEventTimeRange,
} from "@/lib/dateUtils";
import { serviceOfferings, type ServiceOffering } from "@/data/services";

export type JsonLdShape = Record<string, unknown>;

export const BUSINESS_ID = `${buildAbsoluteUrl()}#business`;
export const WEBSITE_ID = `${buildAbsoluteUrl()}#website`;
export const LOGO_ID = `${buildAbsoluteUrl()}#logo`;
const AREA_SERVED = "United States";

const LOGO = {
  path: "/lovable-uploads/pti-logo.webp",
  width: 480,
  height: 466,
} as const;

/** Stable @id for a Person described on the page at `path` (e.g. /drnjo). */
export const buildPersonId = (path: string) =>
  `${buildAbsoluteUrl(path)}#person`;

const resolveAbsoluteUrl = (value: string): string =>
  value.startsWith("http") ? value : buildAbsoluteUrl(value);

const buildImageObject = (url: string, id?: string): JsonLdShape => ({
  "@type": "ImageObject",
  ...(id ? { "@id": id } : {}),
  url,
});

/**
 * The business node. Every page types it ProfessionalService so the shared
 * @id never changes type between pages. The confirmed mailing address does not
 * establish an office, customer-facing hours, coordinates, or a map location.
 */
export const buildBusinessSchema = (): JsonLdShape => {
  const base: JsonLdShape = {
    "@context": "https://schema.org",
    "@id": BUSINESS_ID,
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description: BUSINESS_DESCRIPTION,
    url: buildAbsoluteUrl(),
    logo: {
      ...buildImageObject(resolveAbsoluteUrl(LOGO.path), LOGO_ID),
      width: LOGO.width,
      height: LOGO.height,
    },
    image: resolveAbsoluteUrl(DEFAULT_OG_IMAGE),
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

  return base;
};

export const buildWebSiteSchema = (): JsonLdShape => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: buildAbsoluteUrl(),
  publisher: {
    "@id": BUSINESS_ID,
  },
  inLanguage: DEFAULT_LOCALE,
});

/** schema.org WebPage subtypes a route can declare for its page node. */
export type WebPageType =
  | "WebPage"
  | "AboutPage"
  | "CollectionPage"
  | "ContactPage"
  | "ImageGallery"
  | "ProfilePage";

export const buildWebPageSchema = (input: {
  url: string;
  name: string;
  description?: string;
  image?: string;
  type?: WebPageType;
  /** Extra properties for the page node, e.g. ImageGallery media. */
  properties?: JsonLdShape;
}): JsonLdShape => {
  const page: JsonLdShape = {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
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
    ...input.properties,
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
  /** Page that describes the person; also anchors the Person @id. */
  url: string;
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
}): JsonLdShape => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": buildPersonId(input.url),
  name: input.name,
  ...(input.jobTitle ? { jobTitle: input.jobTitle } : {}),
  ...(input.description ? { description: input.description } : {}),
  url: resolveAbsoluteUrl(input.url),
  ...(input.image ? { image: resolveAbsoluteUrl(input.image) } : {}),
  ...(input.sameAs?.length
    ? { sameAs: input.sameAs.map(resolveAbsoluteUrl) }
    : {}),
  worksFor: {
    "@id": BUSINESS_ID,
  },
});

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
  const modifiedDate = post.dateModified
    ? new Date(`${post.dateModified}T00:00:00Z`).toISOString()
    : publishedDate;
  const imageSource = resolveAbsoluteUrl(post.featuredImage ?? DEFAULT_OG_IMAGE);
  const authorProfile = options?.authorProfile;
  const authorSchema = authorProfile
    ? {
        "@type": authorProfile.type,
        ...(authorProfile.type === "Person" && authorProfile.url
          ? { "@id": buildPersonId(authorProfile.url) }
          : {}),
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
    description: getBlogMetaDescription(post),
    articleSection: options?.category ?? post.category,
    datePublished: publishedDate,
    dateModified: modifiedDate,
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
          description: getBlogMetaDescription(post),
          url: postUrl,
          datePublished: publishedDate,
        },
      };
    }),
  };
};

export interface StructuredEventInput {
  id: string | number;
  title: string;
  date: string;
  endDate?: string;
  time?: string;
  /** IANA zone of the venue; defaults to Pacific, where PTI runs its events. */
  timeZone?: string;
  location: string;
  description: string;
  registrationLink: string;
  type: string;
  isVirtual?: boolean;
  detailPath?: string;
  image?: string;
  /** Omit when there is no published price; 0 marks a free event. */
  offerPrice?: number;
  offerPriceCurrency?: string;
  /**
   * schema.org has no "completed" status: an event that took place as planned
   * stays EventScheduled.
   */
  eventStatus?: "scheduled" | "cancelled";
  registrationOpen?: boolean;
}

const EVENT_STATUS_URLS = {
  scheduled: "https://schema.org/EventScheduled",
  cancelled: "https://schema.org/EventCancelled",
} as const;

const US_STATE_CODE = /^[A-Z]{2}$/;

/**
 * Turn a "Venue, street, City, ST" label into a Place with a PostalAddress.
 * Labels that do not end in a city and state stay as free text.
 */
const buildEventPlace = (location: string): JsonLdShape => {
  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const region = parts[parts.length - 1];

  if (parts.length < 2 || !US_STATE_CODE.test(region)) {
    return { "@type": "Place", name: location, address: location };
  }

  const locality = parts[parts.length - 2];
  const venueParts = parts.slice(0, -2);
  const streetAddress = venueParts.slice(1).join(", ");

  return {
    "@type": "Place",
    name: venueParts[0] ?? `${locality}, ${region}`,
    address: {
      "@type": "PostalAddress",
      ...(streetAddress ? { streetAddress } : {}),
      addressLocality: locality,
      addressRegion: region,
      addressCountry: "US",
    },
  };
};

export const buildEventSchema = (
  event: StructuredEventInput
): JsonLdShape => {
  const timeZone = event.timeZone ?? BUSINESS_TIME_ZONE;
  const { start, end } = parseEventTimeRange(event.time);
  const startDate = formatEventDateTime(event.date, start, timeZone);
  const endDate = event.endDate
    ? formatEventDateTime(event.endDate, end, timeZone)
    : end
      ? formatEventDateTime(event.date, end, timeZone)
      : undefined;
  const isVirtual =
    event.isVirtual ||
    /online|virtual/i.test(event.location) ||
    event.type === "webinar";
  const eventUrl = event.detailPath
    ? `${buildAbsoluteUrl(event.detailPath)}#event-${event.id}`
    : buildAbsoluteUrl(`/events#event-${event.id}`);
  // Offer and VirtualLocation URLs must be web pages; a mailto: or tel:
  // registration link falls back to the event's own page.
  const registrationUrl = event.registrationLink.startsWith("http")
    ? event.registrationLink
    : event.registrationLink.startsWith("/")
      ? buildAbsoluteUrl(event.registrationLink)
      : eventUrl;
  const registrationOpen = event.registrationOpen ?? true;

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
    eventStatus: EVENT_STATUS_URLS[event.eventStatus ?? "scheduled"],
    location: isVirtual
      ? {
          "@type": "VirtualLocation",
          url: registrationUrl,
        }
      : buildEventPlace(event.location),
    image: resolveAbsoluteUrl(event.image ?? DEFAULT_OG_IMAGE),
    ...(registrationOpen && event.offerPrice !== undefined
      ? {
          offers: {
            "@type": "Offer",
            url: registrationUrl,
            price: event.offerPrice,
            priceCurrency: event.offerPriceCurrency ?? "USD",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    organizer: {
      "@id": BUSINESS_ID,
    },
    url: eventUrl,
  };
};

export interface GalleryImageInput {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** ImageGallery page properties for the route's own page node. */
export const buildImageGalleryProperties = (
  images: GalleryImageInput[]
): JsonLdShape => ({
  associatedMedia: images.map((image) => ({
    "@type": "ImageObject",
    contentUrl: resolveAbsoluteUrl(image.src),
    name: image.alt,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
  })),
});

export const buildPodcastEpisodeSchema = (): JsonLdShape => {
  const pageUrl = buildAbsoluteUrl(PODCAST_INTERVIEW_PATH);

  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "@id": `${pageUrl}#episode`,
    name: PODCAST_INTERVIEW.title,
    description:
      "Dr. Michael Njo joins Ben Tuinei and Jordon Comstock on The Navigating Dental Insurance Podcast.",
    datePublished: `${PODCAST_INTERVIEW.datePublished}T00:00:00Z`,
    duration: PODCAST_INTERVIEW.durationIso,
    url: PODCAST_INTERVIEW.appleEpisodeUrl,
    timeRequired: PODCAST_INTERVIEW.durationIso,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: PODCAST_INTERVIEW.showName,
    },
    actor: [
      { "@type": "Person", name: "Dr. Michael Njo" },
      { "@type": "Person", name: "Ben Tuinei" },
      { "@type": "Person", name: "Jordon Comstock" },
    ],
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: DEFAULT_LOCALE,
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
  };
};
