import { blogPosts } from "@/data/blogPosts";
import { communityImpactPosts } from "@/data/communityImpactPosts";
import { rawEvents, type RawEvent } from "@/data/events";
import { faqItems } from "@/data/faq";
import { LOCATIONS } from "@/data/locations";
import {
  PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
  PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
  PRACTICE_TRANSITION_SEMINAR_PATH,
} from "@/data/practiceTransitionSeminar";
import { HOME_CRUMB } from "@/lib/breadcrumbs";
import { getBreadcrumbsForPath } from "@/lib/routeBreadcrumbs";
import type { SearchKind, SearchRecord } from "@/lib/siteSearch";

interface StaticSearchPage {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  weight: number;
}

const HUB_WEIGHT = 24;
const PAGE_WEIGHT = 16;
const SUPPORTING_PAGE_WEIGHT = 8;

const STATIC_SEARCH_PAGES: StaticSearchPage[] = [
  {
    path: "/",
    title: "Dental Practice Transition Consulting & Valuation",
    description:
      "Expert guidance for dentists buying, selling, partnering, or valuing a practice. PTI delivers end-to-end transition strategy, negotiation, and support.",
    keywords: ["home", "homepage", "pti", "practice transitions institute"],
    weight: HUB_WEIGHT,
  },
  {
    path: "/about",
    title: "About Practice Transitions Institute",
    description:
      "Meet PTI's leadership and learn how the firm guides dental practice valuations, sales, acquisitions, DSO offers, buy-ins, and partnerships.",
    keywords: ["about us", "team", "leadership", "liz armato"],
    weight: HUB_WEIGHT,
  },
  {
    path: "/services",
    title: "Dental Practice Transition Services",
    description:
      "Explore PTI services for dental practice valuation, sales, acquisitions, DSO offer reviews, partnerships, and associate buy-ins.",
    keywords: ["services at a glance"],
    weight: HUB_WEIGHT,
  },
  {
    path: "/services/value",
    title: "Dental Practice Valuation (Opinion of Value)",
    description:
      "Get a documented dental practice valuation based on financial performance, operations, and market context, with assumptions and limitations explained.",
    keywords: ["valuation", "appraisal", "opinion of value", "worth"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/services/selling",
    title: "Dental Practice Sale Advisory & Brokerage",
    description:
      "Plan a confidential dental practice sale with PTI support for readiness, valuation, buyer screening, offer comparison, negotiation, diligence, and handoff.",
    keywords: ["sell", "selling a practice", "brokerage"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/services/selling-to-a-dso",
    title: "Selling Your Dental Practice to a DSO",
    description:
      "Received a DSO offer? PTI reviews the terms, builds an independent valuation baseline, compares sale paths, and coordinates negotiation with your advisors.",
    keywords: ["dso", "dental service organization"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/services/buying",
    title: "Dental Practice Acquisition Advisory",
    description:
      "Evaluate and buy a dental practice with PTI guidance on readiness, valuation, due diligence, negotiation, financing coordination, and ownership transition.",
    keywords: ["buy", "buying a practice", "acquisition"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/services/associateships",
    title: "Dental Associateships & Buy-In Planning",
    description:
      "Plan a dental associateship or buy-in with guidance on fit, compensation, valuation, milestones, financing coordination, and the ownership transition.",
    keywords: ["associate", "buy-in", "buying in"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/services/partnerships",
    title: "Dental Practice Partnership Structuring",
    description:
      "Plan a dental practice partnership with PTI guidance on fit, valuation, ownership, compensation, governance, exits, and outside-advisor coordination.",
    keywords: ["partner", "partnership"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/blog",
    title: "Dental Practice Transition Blog & Insights",
    description:
      "Expert insights on dental practice valuation, sales, ownership transitions, and growth strategies from PTI.",
    keywords: ["blog", "news", "articles", "insights"],
    weight: HUB_WEIGHT,
  },
  {
    path: "/locations",
    title: "Dental Practice Transition Locations",
    description:
      "Dental practice transition advisors serving California, Texas, Florida, and dentists nationwide — valuations, sales, buy-ins, and DSO offer reviews.",
    keywords: ["locations", "service area", "states"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/resources",
    title: "Dental Practice Transition Resources",
    description:
      "Free dental practice transition tools and guides: a practice value calculator, a sale readiness checklist, a DSO decision guide, and in-depth articles.",
    keywords: ["resources", "tools", "guides"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/resources/practice-sale-readiness-checklist",
    title: "Practice Sale Readiness Checklist for Dentists",
    description:
      "A free checklist of the financial records, valuation numbers, legal documents, and transition decisions to prepare before selling your dental practice.",
    keywords: ["checklist", "readiness"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/resources/how-much-is-my-dental-practice-worth",
    title: "How Much Is My Dental Practice Worth?",
    description:
      "What determines dental practice value (cash flow, patient base, location, team) and how to get a defensible number before you sell or sign a DSO offer.",
    keywords: ["calculator", "practice worth", "value calculator"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/resources/dental-practice-transitions-handbook",
    title: "Dental Practice Transitions Handbook",
    description:
      "Dr. Michael Njo's published guide to buying, selling, and transitioning a dental practice in a changing market.",
    keywords: ["handbook", "book"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/resources/second-book",
    title: "Dental Practice Transitions Handbook, Second Edition",
    description:
      "Coming soon: the expanded second edition of Dr. Michael Njo's Dental Practice Transitions Handbook, with a foreword by Dr. Glenn Vo and new appendices.",
    keywords: ["second edition", "coming soon"],
    weight: SUPPORTING_PAGE_WEIGHT,
  },
  {
    path: "/resources/navigating-dental-insurance-podcast",
    title: "The Right Way to Go Out of Network",
    description:
      "Dr. Michael Njo joins Ben Tuinei and Jordon Comstock on The Navigating Dental Insurance Podcast to talk about going out of network.",
    keywords: ["podcast", "insurance"],
    weight: SUPPORTING_PAGE_WEIGHT,
  },
  {
    path: "/drnjo",
    title: "Michael Njo, DDS: Author & Practice Transition Expert",
    description:
      "How Michael Njo, DDS, author of Dental Practice Transitions Handbook, guides dentists through practice valuations, ownership transitions, and GPR education.",
    keywords: ["dr njo", "njo", "michael njo", "founder", "biography"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/events",
    title: "Dental Practice Transition Events & Workshops",
    description:
      "Upcoming webinars, seminars, and workshops for dentists planning practice transitions.",
    keywords: ["events", "workshop", "webinar", "calendar"],
    weight: HUB_WEIGHT,
  },
  {
    path: PRACTICE_TRANSITION_SEMINAR_PATH,
    title: PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE,
    description: PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION,
    keywords: ["seminar", "workshop", "register"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/events/leadership-retreat",
    title: "2026 Dental Practice Leadership Retreat Archive",
    description:
      "An archive of PTI's participation in the June 2026 dental practice leadership retreat in Savannah, Georgia.",
    keywords: ["retreat", "savannah", "leadership"],
    weight: SUPPORTING_PAGE_WEIGHT,
  },
  {
    path: "/testimonials",
    title: "Dental Practice Transition Testimonials",
    description:
      "Hear from dentists who trusted PTI for practice valuation, sales, partnerships, and transition planning.",
    keywords: ["reviews", "testimonials"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/gallery",
    title: "PTI Photo Gallery",
    description:
      "Photos of PTI speaking engagements, dental-society leadership, published work, the team, and the relationships behind every dental practice transition.",
    keywords: ["photos", "gallery"],
    weight: SUPPORTING_PAGE_WEIGHT,
  },
  {
    path: "/faq",
    title: "Dental Practice Transition FAQ",
    description:
      "Answers to common questions about practice valuation, selling, partnerships, and associateships.",
    keywords: ["faq", "questions"],
    weight: PAGE_WEIGHT,
  },
  {
    path: "/contact",
    title: "Contact PTI for Dental Practice Transitions",
    description:
      "Schedule a consultation with PTI to discuss practice valuation, sales, partnerships, or associateships.",
    keywords: ["contact", "book", "consultation", "phone", "email"],
    weight: HUB_WEIGHT,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description: "Practice Transitions Institute privacy policy and data practices.",
    keywords: ["privacy"],
    weight: SUPPORTING_PAGE_WEIGHT,
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service",
    description: "Practice Transitions Institute terms governing website use.",
    keywords: ["terms"],
    weight: SUPPORTING_PAGE_WEIGHT,
  },
];

const displayTitleForPath = (path: string, fallback: string): string => {
  if (path === "/") return HOME_CRUMB.name;
  return getBreadcrumbsForPath(path)?.at(-1)?.name ?? fallback;
};

const uniqueStrings = (values: string[]): string[] =>
  [...new Set(values.map((value) => value.trim()).filter(Boolean))];

const flattenEventDescription = (event: RawEvent): string => {
  if (typeof event.description === "string") return event.description;
  return event.description.intro;
};

const record = (
  id: string,
  kind: SearchKind,
  path: string,
  title: string,
  description: string,
  keywords: string[],
  weight: number,
): SearchRecord => ({
  id,
  kind,
  path,
  title,
  description,
  keywords: uniqueStrings(keywords),
  weight,
});

export const STATIC_SEARCH_PAGE_PATHS = STATIC_SEARCH_PAGES.map((page) => page.path);

export const buildSiteSearchIndex = (): SearchRecord[] => {
  const pages = STATIC_SEARCH_PAGES.map((page) =>
    record(
      `page:${page.path}`,
      "page",
      page.path,
      displayTitleForPath(page.path, page.title),
      page.description,
      [...page.keywords, page.title],
      page.weight,
    ),
  );

  const articles = [...communityImpactPosts, ...blogPosts]
    .filter((post) => post.slug)
    .map((post) =>
      record(
        `article:${post.slug}`,
        "article",
        `/blog/${post.slug}`,
        post.title,
        post.excerpt,
        [post.category, "blog", "news", "article"],
        6,
      ),
    );

  const events = rawEvents.map((event) =>
    record(
      `event:${String(event.id)}`,
      "event",
      event.detailPath ?? "/events",
      event.title,
      flattenEventDescription(event),
      [event.type, event.location, event.subtitle ?? "", event.dateDisplay ?? event.date],
      10,
    ),
  );

  const faqs = faqItems.map((item, index) =>
    record(`faq:${index}`, "faq", "/faq", item.question, item.answer, ["faq"], 4),
  );

  const locations = LOCATIONS.map((location) =>
    record(
      `location:${location.slug}`,
      "location",
      `/locations/${location.slug}`,
      location.seoTitle,
      location.seoDescription,
      [location.state, ...location.regions, "location", "service area"],
      10,
    ),
  );

  return [...pages, ...articles, ...events, ...faqs, ...locations];
};
