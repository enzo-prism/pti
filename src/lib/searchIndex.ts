/**
 * Build-time search index.
 *
 * Server-only: this module imports the full content datasets (blog bodies,
 * reviews, etc.) and maps them to trimmed search records. It is used by
 * `scripts/build-search-index.ts` (run via the `prebuild` npm script) and by
 * the unit tests. It must never be imported from a client component; the
 * browser fetches the generated `public/search-index.json` instead.
 */

import { blogPosts, toBlogPostSummary } from "@/data/blogPosts";
import { communityImpactPosts } from "@/data/communityImpactPosts";
import { getUpcomingRawEvents, type RawEvent } from "@/data/events";
import { faqItems } from "@/data/faq";
import { LOCATIONS } from "@/data/locations";
import { PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE } from "@/data/practiceTransitionSeminar";
import { serviceOfferings } from "@/data/services";
import type { SearchRecord, SearchRecordType } from "./search";

const EXCERPT_MAX_LENGTH = 200;

/**
 * Collapse whitespace and trim to a word-boundary snippet. Never leaks a
 * full body: callers pass only summary-length source strings.
 */
export function trimText(text: string, maxLength = EXCERPT_MAX_LENGTH): string {
  const collapsed = text.replace(/\s+/g, " ").trim();
  if (collapsed.length <= maxLength) return collapsed;
  const cut = collapsed.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}...`;
}

const toEventExcerpt = (event: RawEvent): string => {
  const description =
    typeof event.description === "string"
      ? event.description
      : event.description.intro;
  return `${event.date} in ${event.location}. ${description}`;
};

const eventRecords = (referenceDate: Date): SearchRecord[] =>
  getUpcomingRawEvents(referenceDate).map((event) => ({
    title: event.title,
    excerpt: trimText(toEventExcerpt(event)),
    url: event.detailPath ?? "/events",
    type: "event" as const,
  }));

const postRecords = (): SearchRecord[] =>
  [...communityImpactPosts, ...blogPosts].map((post) => {
    const summary = toBlogPostSummary(post);
    return {
      title: summary.title,
      excerpt: trimText(summary.excerpt),
      url: `/blog/${summary.slug}`,
      type: "post" as const,
    };
  });

const faqRecords = (): SearchRecord[] =>
  faqItems.map((item) => ({
    title: item.question,
    excerpt: trimText(item.answer),
    url: "/faq",
    type: "faq" as const,
  }));

const serviceRecords = (): SearchRecord[] =>
  serviceOfferings.map((service) => ({
    title: service.title,
    excerpt: trimText(service.description),
    url: service.url,
    type: "page" as const,
  }));

const locationRecords = (): SearchRecord[] =>
  LOCATIONS.map((location) => ({
    title: location.heroTitle,
    excerpt: trimText(location.summary),
    url: `/locations/${location.slug}`,
    type: "location" as const,
  }));

interface StaticPageRecord {
  title: string;
  excerpt: string;
  url: string;
  type: SearchRecordType;
}

const STATIC_PAGE_RECORDS: StaticPageRecord[] = [
  {
    title: "Practice Transitions Institute",
    excerpt:
      "Advisors for buying, selling, valuing, and transitioning dental practices, led by Dr. Michael Njo.",
    url: "/",
    type: "page",
  },
  {
    title: "About Practice Transitions Institute",
    excerpt:
      "How PTI guides dentists through practice transitions with valuation, brokerage, and advisory services.",
    url: "/about",
    type: "page",
  },
  {
    title: "Michael Njo, DDS: Author & Practice Transition Expert",
    excerpt:
      "Dr. Michael Njo's background, speaking, authorship, and leadership in dental practice transitions.",
    url: "/drnjo",
    type: "page",
  },
  {
    title: "Dental Practice Transition Services",
    excerpt:
      "Valuations, practice sales, acquisitions, partnerships, associateships, and DSO offer reviews.",
    url: "/services",
    type: "page",
  },
  {
    title: "Dental Practice Transition Blog & Insights",
    excerpt:
      "Articles on valuations, selling, buying, partnerships, and the business of dentistry.",
    url: "/blog",
    type: "page",
  },
  {
    title: "Dental Practice Transition Events & Workshops",
    excerpt:
      "Upcoming seminars, workshops, webinars, and dinners for dentists planning a transition.",
    url: "/events",
    type: "page",
  },
  {
    title: PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
    excerpt:
      "A one-day PTI seminar on buying, selling, and transitioning a dental practice. See current dates, locations, pricing, and how to register.",
    url: "/events/practice-transition-seminar",
    type: "event",
  },
  {
    title: "Dental Practice Transition FAQ",
    excerpt:
      "Answers to common questions about practice valuation, selling, partnerships, and associateships.",
    url: "/faq",
    type: "page",
  },
  {
    title: "Dental Practice Transition Testimonials",
    excerpt:
      "What dentists say about working with PTI on sales, purchases, and valuations.",
    url: "/testimonials",
    type: "page",
  },
  {
    title: "PTI Photo Gallery",
    excerpt:
      "Photos from PTI seminars, community events, and Dr. Njo's work with dentists.",
    url: "/gallery",
    type: "page",
  },
  {
    title: "Dental Practice Transition Locations",
    excerpt:
      "Where PTI serves dentists, with state-by-state market context for transitions.",
    url: "/locations",
    type: "page",
  },
  {
    title: "Dental Practice Transition Resources",
    excerpt:
      "Calculators, checklists, guides, and books for planning a practice transition.",
    url: "/resources",
    type: "page",
  },
  {
    title: "How Much Is My Dental Practice Worth?",
    excerpt:
      "Estimate your practice value with the percent-of-collections and earnings-multiple methods.",
    url: "/resources/how-much-is-my-dental-practice-worth",
    type: "resource",
  },
  {
    title: "Practice Sale Readiness Checklist for Dentists",
    excerpt:
      "A step-by-step checklist to prepare your practice for a successful sale.",
    url: "/resources/practice-sale-readiness-checklist",
    type: "resource",
  },
  {
    title: "Dental Practice Transitions Handbook",
    excerpt:
      "Dr. Michael Njo's handbook: a blueprint for buying and selling dental practices.",
    url: "/resources/dental-practice-transitions-handbook",
    type: "resource",
  },
  {
    title: "Dental Practice Transitions Handbook, Second Edition",
    excerpt:
      "The expanded second edition of Dr. Njo's handbook, with new advisor material and appendices.",
    url: "/resources/second-book",
    type: "resource",
  },
  {
    title: "The Right Way to Go Out of Network",
    excerpt:
      "A podcast interview on navigating dental insurance and going out of network.",
    url: "/resources/navigating-dental-insurance-podcast",
    type: "resource",
  },
  {
    title: "Contact PTI for Dental Practice Transitions",
    excerpt:
      "Book a confidential consultation with the Practice Transitions Institute team.",
    url: "/contact",
    type: "page",
  },
];

/**
 * Build the full search index: static pages, services, locations, upcoming
 * events, FAQs, and posts (community impact first, mirroring the blog
 * listing). Every record carries only trimmed fields, never full bodies.
 */
export function buildSearchIndex(referenceDate: Date = new Date()): SearchRecord[] {
  return [
    ...STATIC_PAGE_RECORDS,
    ...serviceRecords(),
    ...locationRecords(),
    ...eventRecords(referenceDate),
    ...faqRecords(),
    ...postRecords(),
  ];
}
