import {
  PRACTICE_TRANSITION_SEMINAR_PATH,
  PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH,
  getSeminarRegistrationPrice,
  practiceTransitionSeminarEvents,
  practiceTransitionSeminarLearningPoints,
} from "@/data/practiceTransitionSeminar";
import { PHONE_NUMBER_TEL } from "@/lib/constants";
import {
  createEventDateKey,
  isEventPast,
  parseEventDate,
  sortEventDates,
} from "@/lib/dateUtils";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";

const ROSEVILLE_AVAILABILITY_MAILTO = `mailto:${SITE_CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Roseville Dinner Availability"
)}`;
const BEYOND_THE_CHAIR_MAILTO = `mailto:${SITE_CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Beyond the Chair Anaheim September 25"
)}`;
const CALL_TO_REGISTER = `tel:${PHONE_NUMBER_TEL}`;

// Event data with type definitions
export interface RawEvent {
  id: string | number;
  title: string;
  date: string;
  /** Last day of a multi-day event, in the same "Month D, YYYY" format. */
  endDate?: string;
  dateDisplay?: string;
  time: string;
  /** IANA zone of the venue when it is outside Pacific time. */
  timeZone?: string;
  location: string;
  description: string | {
    intro: string;
    learningPoints: string[];
    learningPointsHeading?: string;
  };
  type: "webinar" | "seminar" | "workshop" | "conference" | "dinner";
  registrationLink: string;
  detailPath?: string;
  offerPrice?: number;
  offerPriceCurrency?: string;
  flyerImage?: string;
  flyerImageAlt?: string;
  subtitle?: string;
  standalone?: boolean;
  speakers?: Array<{
    name: string;
    title: string;
    imageUrl: string;
  }>;
}

const SACRAMENTO_SEMINAR_EVENT_ID = "pti-seminar-sacramento-2026";

const practiceTransitionSeminarDescription = {
  intro:
    "Whether you are preparing to sell, buy, bring on a partner, or simply understand your practice's value, this one-day seminar gives you practical guidance for making your next move with clarity and confidence.",
  learningPoints: practiceTransitionSeminarLearningPoints,
};

const sacramentoSeminarDescription = {
  intro:
    "Join Practice Transitions Institute for a practical seminar designed to help you evaluate today's transition landscape and make confident decisions about what comes next. Special Sacramento guest: TDIC. TDIC exclusively protects dentists, offering expert guidance as your practice and career evolve from buying and expanding to transitioning and selling.",
  learningPointsHeading: "What you'll learn:",
  learningPoints: [
    "Which transition path may be right for you: start-up, associate buy-in, partnership, private sale, or DSO",
    "When to begin preparing—and why timing can dramatically affect your options",
    "How to evaluate a practice or opportunity beyond the asking price",
    "What buyers are looking for in today's market",
    "How to build the right advisory team and create a transition timeline that protects your future",
  ],
};

const practiceTransitionEvents: RawEvent[] = practiceTransitionSeminarEvents.map(
  (event) => {
    const mapped: RawEvent = {
      id: event.id,
      title: "Mastering Your Dental Transition Into and Out of Practice",
      date: event.date,
      time: event.time,
      location: `${event.venueName}, ${event.addressLines.join(", ")}`,
      description: practiceTransitionSeminarDescription,
      type: "seminar",
      registrationLink: PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH,
      detailPath: PRACTICE_TRANSITION_SEMINAR_PATH,
      offerPrice: event.earlyBirdPrice,
      offerPriceCurrency: "USD",
    };

    if (event.id !== SACRAMENTO_SEMINAR_EVENT_ID) {
      return mapped;
    }

    return {
      ...mapped,
      standalone: true,
      subtitle: "BEFORE YOU BUY, EXPAND, PARTNER, OR SELL / KNOW YOUR OPTIONS",
      flyerImage:
        "/lovable-uploads/drnjo-2026/pti-sacramento-seminar-2026-flyer.webp",
      flyerImageAlt:
        "Practice Transitions Institute Sacramento seminar flyer, October 2 2026 at TDIC Headquarters.",
      description: sacramentoSeminarDescription,
      speakers: [
        {
          name: "Liz Armato",
          title: "COO",
          imageUrl: "/lovable-uploads/dfcf139a-4116-4e53-ac55-479fd8d2bbb8.png",
        },
        {
          name: "Dr. Michael Njo",
          title: "Founder & Lead Transition Consultant",
          imageUrl: "/lovable-uploads/fccc20e2-c4f3-4b29-8473-f24585fbc306.png",
        },
      ],
    };
  }
);

export const rawEvents: RawEvent[] = [
  {
    id: "beyond-the-chair-anaheim-2026",
    title: "The Dental Practice Beyond the Chair",
    date: "September 25, 2026",
    time: "8:30 AM - 1:30 PM",
    location: "The Phillips Group, 2300 E. Katella Ave, Suite 405, Anaheim, CA",
    description:
      "A 5-hour working session for dentists and practice owners who want more than a job—build a practice that gives you options, freedom, and lasting impact. Led by Michael A. Njo, DDS, Director, Dental Strategies. Contact PTI to confirm a seat.",
    type: "workshop",
    registrationLink: BEYOND_THE_CHAIR_MAILTO,
    flyerImage: "/lovable-uploads/drnjo-2026/promotional-flyer-dental-strategies.webp",
    flyerImageAlt:
      "Promotional flyer for The Dental Practice Beyond the Chair, a September 25, 2026 five-hour working session in Anaheim led by Michael A. Njo, DDS",
  },
  {
    id: "practice-blueprint-dinner-roseville-2026",
    title: "The Practice Blueprint Dinner",
    date: "August 27, 2026",
    time: "6:00 PM - 9:00 PM",
    location: "Fats Asia Bistro, Roseville, CA",
    description:
      "Join dentists and industry partners for an evening of practical conversation about building, valuing, and transitioning a dental practice. Contact PTI to confirm current seat availability.",
    type: "dinner",
    registrationLink: ROSEVILLE_AVAILABILITY_MAILTO,
  },
  {
    id: 3,
    title: "2025 & Beyond – Essential Financial & Practice-Transition Insights for Dentists",
    date: "August 27, 2025",
    time: "5:30 PM PT • 8:30 PM ET",
    location: "Online (live)",
    description: "A complimentary live Q&A where Practice Transitions Institute & CBG Financial Planning answer your biggest questions on buying, valuing, and growing a practice—plus key 2026 tax-code changes. Reserve your spot today!",
    type: "webinar",
    registrationLink: "/contact",
    speakers: [
      {
        name: "Michael Njo, DDS",
        title: "Practice Transitions Institute",
        imageUrl: "/lovable-uploads/fccc20e2-c4f3-4b29-8473-f24585fbc306.png"
      },
      {
        name: "Fred Heppner, MBA", 
        title: "Practice Transitions Institute",
        imageUrl: "/lovable-uploads/43207060-d4da-4c88-8fc2-21d04a4fd4a8.png"
      },
      {
        name: "Liz Armato, COO Host",
        title: "Practice Transitions Institute", 
        imageUrl: "/lovable-uploads/dfcf139a-4116-4e53-ac55-479fd8d2bbb8.png"
      },
      {
        name: "Dan Garwood, AAMS, MBA",
        title: "CBG Financial Planning",
        imageUrl: "/lovable-uploads/e6f00790-1898-4889-ae43-440ddf2a39ea.png"
      }
    ]
  },
  {
    id: 1,
    title: "Mastering Your Dental Transition Into and Out of Practice",
    date: "March 28, 2025",
    time: "8am - 3pm",
    location: "Crown Plaza, Costa Mesa CA",
    description: "A comprehensive full-day seminar perfect for doctors pursuing a start-up or purchase, seeking partners/associates, planning ownership, or preparing to exit dentistry. Join us in Orange County for expert guidance on dental practice transitions.",
    type: "seminar",
    registrationLink: CALL_TO_REGISTER
  },
  {
    id: 2,
    title: "Mastering Your Dental Transition Into and Out of Practice",
    date: "July 11, 2025",
    time: "8am - 3pm",
    location: "Arthur A. Dugoni School of Dentistry (UOP Dental School), San Francisco, CA",
    description: "A comprehensive full-day seminar perfect for doctors pursuing a start-up or purchase, seeking partners/associates, planning ownership, or preparing to exit dentistry. Join us at the prestigious University of the Pacific dental school.",
    type: "seminar",
    registrationLink: CALL_TO_REGISTER
  },
  // 2026 Events
  {
    id: 4,
    title: "Mastering Your Dental Transition Into and Out of Practice",
    date: "April 10, 2026",
    time: "8am - 3pm",
    location: "Orange County, CA",
    description: {
      intro: "Whether entering, expanding, or exiting your career, meticulous planning is essential. Practice Transitions Institute's experts guide you through each stage, helping you avoid costly missteps and ensuring a seamless and prosperous transition.",
      learningPoints: [
        "Negotiate a win-win practice transition",
        "Understand the economic climate and its effect on practice value and ownership",
        "Develop clear associate/partnership agreements safeguarding your interests and fostering collaboration",
        "Determine the value of a practice",
        "Maximize your practice value for a lucrative transition",
        "Avoid tax pitfalls by structuring the sale to minimize tax liability and maximize financial gains"
      ]
    },
    type: "seminar",
    registrationLink: CALL_TO_REGISTER
  },
  {
    id: 7,
    title: "Leadership Retreat",
    date: "June 4, 2026",
    endDate: "June 6, 2026",
    dateDisplay: "June 4-6, 2026",
    time: "Multi-day",
    timeZone: "America/New_York",
    location: "Savannah, GA",
    description: "An immersive leadership retreat for practice owners ready to lead with clarity and confidence, hosted by MaryLynn Wheaton and Liz Armato with featured speaker Brian Parsley and a PTI panel on transition readiness.",
    type: "conference",
    registrationLink: "https://www.dentistretreat.com/",
    detailPath: "/events/leadership-retreat"
  },
  ...practiceTransitionEvents,
];

export const getUpcomingRawEvents = (
  referenceDate: Date = new Date()
): RawEvent[] =>
  sortEventDates(
    rawEvents.filter((event) => !isEventPast(event.date, referenceDate))
  ).map((event) => {
    const seminar = practiceTransitionSeminarEvents.find(
      (candidate) => candidate.id === event.id
    );
    return seminar
      ? { ...event, offerPrice: getSeminarRegistrationPrice(seminar, referenceDate) }
      : event;
  });

export interface ListedEventDate {
  date: string;
  time: string;
  location: string;
  isPast: boolean;
}

export interface ListedEvent extends RawEvent {
  isPast: boolean;
  isEventGroup?: boolean;
  eventDates?: ListedEventDate[];
}

/**
 * Build the /events listing: same-title series collapse into one card with
 * every date, standalone events keep their own card, and upcoming events sort
 * ahead of past ones. Past/upcoming is decided on the server in Pacific time
 * so the browser renders exactly what the server did.
 */
export const buildEventListing = (
  referenceDate: Date = new Date()
): ListedEvent[] => {
  const processedEvents: ListedEvent[] = rawEvents.map((event) => ({
    ...event,
    isPast: isEventPast(event.date, referenceDate),
  }));

  // Standalone cards keep their own flyer and copy instead of merging into a
  // same-title series group.
  const titleGroups = new Map<string, ListedEvent[]>();
  for (const event of processedEvents) {
    if (event.standalone) continue;
    const group = titleGroups.get(event.title);
    if (group) {
      group.push(event);
    } else {
      titleGroups.set(event.title, [event]);
    }
  }

  const listing: ListedEvent[] = [];

  titleGroups.forEach((groupEvents) => {
    if (groupEvents.length === 1) {
      listing.push(groupEvents[0]);
      return;
    }

    const sortedGroup = sortEventDates(groupEvents);

    // Use the upcoming detailed event when available so grouped CTAs stay current.
    const detailedEvent =
      sortedGroup.find(
        (event) =>
          !event.isPast && event.detailPath && typeof event.description === "object"
      ) ||
      sortedGroup.find(
        (event) => !event.isPast && typeof event.description === "object"
      ) ||
      sortedGroup.find((event) => typeof event.description === "object") ||
      sortedGroup[0];

    const eventDateMap = new Map<string, ListedEventDate>();
    for (const event of sortedGroup) {
      const key = createEventDateKey(event.date, event.time, event.location);
      if (!eventDateMap.has(key)) {
        eventDateMap.set(key, {
          date: event.date,
          time: event.time,
          location: event.location,
          isPast: event.isPast,
        });
      }
    }

    const eventDates = Array.from(eventDateMap.values());
    const upcomingDates = eventDates.filter((date) => !date.isPast);
    // The earliest upcoming date, or the latest past date if all are past.
    const representativeDate =
      upcomingDates[0] ?? eventDates[eventDates.length - 1];

    listing.push({
      ...detailedEvent,
      id: sortedGroup[0].id,
      date: representativeDate.date,
      time: representativeDate.time,
      location: representativeDate.location,
      isPast: upcomingDates.length === 0,
      isEventGroup: true,
      eventDates,
    });
  });

  for (const event of processedEvents) {
    if (event.standalone) listing.push(event);
  }

  return listing.sort((a, b) => {
    if (a.isPast !== b.isPast) {
      return a.isPast ? 1 : -1;
    }
    return parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime();
  });
};

