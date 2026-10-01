import { PHONE_NUMBER } from "@/lib/constants";
import {
  isEventPast,
  isEventUpcoming,
  parseEventDate,
  sortEventDates,
} from "@/lib/dateUtils";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";
import type { StructuredEventInput } from "@/lib/structuredData";

export const PRACTICE_TRANSITION_SEMINAR_PATH =
  "/events/practice-transition-seminar";
export const PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH =
  `${PRACTICE_TRANSITION_SEMINAR_PATH}#register`;
export const PRACTICE_TRANSITION_SEMINAR_FORM_ENDPOINT =
  "https://formspree.io/f/xlgzrjev";
export const PRACTICE_TRANSITION_SEMINAR_FORM_ID =
  "practice_transition_seminar";
export const PRACTICE_TRANSITION_SEMINAR_FORM_KEY = "seminar";
export const PRACTICE_TRANSITION_SEMINAR_FORM_SITE = "pti-website";
export const PRACTICE_TRANSITION_SEMINAR_FORM_QA_FIELD = "_codex_test";
export const PRACTICE_TRANSITION_SEMINAR_FORM_NAME =
  "PTI Seminar Registration";
export const PRACTICE_TRANSITION_SEMINAR_FORM_PROVIDER = "formspree";

export const PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE =
  "Dental Practice Transition Seminar | PTI";
export const PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION =
  "A one-day PTI seminar on buying, selling, and transitioning a dental practice. See current dates, locations, pricing, and how to register.";
export const PRACTICE_TRANSITION_SEMINAR_EYEBROW = "2027 SEMINAR SERIES";
export const PRACTICE_TRANSITION_SEMINAR_HEADLINE =
  "Mastering Your Dental Transition";
export const PRACTICE_TRANSITION_SEMINAR_INTRO =
  "Whether you're considering buying, expanding, bringing on a partner, or eventually selling, this one-day seminar gives you practical guidance to understand your options and make informed decisions.";
export const PRACTICE_TRANSITION_SEMINAR_SUBHEAD =
  "Three locations, one full day";
export const PRACTICE_TRANSITION_SEMINAR_SERIES_YEAR = 2027;
export const PRACTICE_TRANSITION_SEMINAR_FACTS = [
  "8:00 AM to 3:00 PM",
  "Breakfast and lunch included",
  "Educational materials",
] as const;
export const PRACTICE_TRANSITION_SEMINAR_BIOS = [
  {
    name: "Dr. Michael Njo, DDS",
    title: "Founder and Lead Transition Consultant",
    bio: "More than 30 years of dental experience as both a practicing dentist and transition consultant.",
  },
  {
    name: "Liz Armato",
    title: "COO, Practice Transitions Institute",
    bio: "Decades of experience in dental practice consulting and operations.",
  },
] as const;

/**
 * Liz Armato proposed seminar terms from the October 2026 one-screen mockup.
 * Not yet approved by Dr. Njo or Enzo. Toggle `enabled` to hide the pending
 * price and cancellation copy without hunting through the page.
 */
export const PENDING_LIZ_TERMS = {
  enabled: true,
  earlyBirdPrice: 247,
  standardPrice: 397,
  guestPrice: 197,
  earlyBirdDeadline: "December 31, 2026",
  earlyBirdSavings: 150,
  cancellationMinimumDays: 8,
  lateCancellationFee: 100,
} as const;

export interface PracticeTransitionSeminarEvent {
  id: string;
  value: string;
  label: string;
  city: string;
  date: string;
  time: string;
  venueName: string;
  addressLines: string[];
  earlyBirdDeadline: string;
  earlyBirdPrice: number;
  standardPrice: number;
  guestPrice: number;
}

export const practiceTransitionSeminarEvents: PracticeTransitionSeminarEvent[] = [
  {
    id: "pti-seminar-san-francisco-2026",
    value: "july-17-2026-san-francisco",
    label: "July 17, 2026 - San Francisco",
    city: "San Francisco",
    date: "July 17, 2026",
    time: "8:00 AM - 3:00 PM",
    venueName: "Kohan Group",
    addressLines: ["490 Post St., Ste 1135", "San Francisco, CA"],
    earlyBirdDeadline: "June 17, 2026",
    earlyBirdPrice: 297,
    standardPrice: 397,
    guestPrice: 197,
  },
  {
    id: "pti-seminar-sacramento-2026",
    value: "october-2-2026-sacramento",
    label: "October 2, 2026 - Sacramento",
    city: "Sacramento",
    date: "October 2, 2026",
    time: "8:00 AM - 3:00 PM",
    venueName: "TDIC Headquarters",
    addressLines: ["1201 K St, 14th Floor", "Sacramento, CA"],
    earlyBirdDeadline: "September 2, 2026",
    earlyBirdPrice: 297,
    standardPrice: 397,
    guestPrice: 197,
  },
  {
    id: "pti-seminar-anaheim-2027",
    value: "march-12-2027-anaheim",
    label: "March 12, 2027 - Anaheim",
    city: "Anaheim",
    date: "March 12, 2027",
    time: "8:00 AM - 3:00 PM",
    venueName: "The Phillips Group",
    addressLines: ["2300 E Katella Ave #405", "Anaheim, CA"],
    earlyBirdDeadline: "February 12, 2027",
    earlyBirdPrice: 297,
    standardPrice: 397,
    guestPrice: 197,
  },
  {
    id: "pti-seminar-san-francisco-2027",
    value: "july-30-2027-san-francisco",
    label: "July 30, 2027 - San Francisco",
    city: "San Francisco",
    date: "July 30, 2027",
    time: "8:00 AM - 3:00 PM",
    venueName: "Kohan Group",
    addressLines: ["490 Post St., Ste 1135", "San Francisco, CA"],
    earlyBirdDeadline: "June 30, 2027",
    earlyBirdPrice: 297,
    standardPrice: 397,
    guestPrice: 197,
  },
  {
    id: "pti-seminar-sacramento-2027",
    value: "october-15-2027-sacramento",
    label: "October 15, 2027 - Sacramento",
    city: "Sacramento",
    date: "October 15, 2027",
    time: "8:00 AM - 3:00 PM",
    venueName: "TDIC Headquarters",
    addressLines: ["1201 K St, 14th Floor", "Sacramento, CA"],
    earlyBirdDeadline: "September 15, 2027",
    earlyBirdPrice: 297,
    standardPrice: 397,
    guestPrice: 197,
  },
];

export const getUpcomingPracticeTransitionSeminarEvents = (
  referenceDate: Date = new Date()
): PracticeTransitionSeminarEvent[] =>
  sortEventDates(
    practiceTransitionSeminarEvents.filter((event) =>
      isEventUpcoming(event.date, referenceDate)
    )
  );

export const getPastPracticeTransitionSeminarEvents = (
  referenceDate: Date = new Date()
): PracticeTransitionSeminarEvent[] =>
  [...practiceTransitionSeminarEvents]
    .filter((event) => isEventPast(event.date, referenceDate))
    .sort(
      (a, b) =>
        parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime()
    );

export const getPracticeTransitionSeminarEvent = (
  value: string,
  events: PracticeTransitionSeminarEvent[] = practiceTransitionSeminarEvents
) => events.find((event) => event.value === value);

export const isSeminarEarlyBirdPriceAvailable = (
  event: PracticeTransitionSeminarEvent,
  referenceDate: Date = new Date()
) => isEventUpcoming(event.earlyBirdDeadline, referenceDate);

export const getSeminarRegistrationPrice = (
  event: PracticeTransitionSeminarEvent,
  referenceDate: Date = new Date()
) =>
  isSeminarEarlyBirdPriceAvailable(event, referenceDate)
    ? event.earlyBirdPrice
    : event.standardPrice;

/** Approved Event JSON-LD offer until PENDING_LIZ_TERMS is confirmed. */
export const getApprovedSeminarOfferPrice = (
  event: PracticeTransitionSeminarEvent
) => event.standardPrice;

export const isPendingLizEarlyBirdOpen = (referenceDate: Date = new Date()) =>
  PENDING_LIZ_TERMS.enabled &&
  isEventUpcoming(PENDING_LIZ_TERMS.earlyBirdDeadline, referenceDate);

export const getDisplayedSeminarPrice = (
  event: PracticeTransitionSeminarEvent,
  referenceDate: Date = new Date()
) => {
  if (PENDING_LIZ_TERMS.enabled) {
    return isPendingLizEarlyBirdOpen(referenceDate)
      ? PENDING_LIZ_TERMS.earlyBirdPrice
      : PENDING_LIZ_TERMS.standardPrice;
  }
  return getSeminarRegistrationPrice(event, referenceDate);
};

export const isDisplayedEarlyBird = (
  event: PracticeTransitionSeminarEvent,
  referenceDate: Date = new Date()
) =>
  PENDING_LIZ_TERMS.enabled
    ? isPendingLizEarlyBirdOpen(referenceDate)
    : isSeminarEarlyBirdPriceAvailable(event, referenceDate);

export const getSeminarSeriesCardEvents = (
  events: PracticeTransitionSeminarEvent[],
  seriesYear = PRACTICE_TRANSITION_SEMINAR_SERIES_YEAR
) => {
  const series = events.filter((event) =>
    event.date.endsWith(String(seriesYear))
  );
  return series.length > 0 ? series : events;
};

export const getSeminarCancellationPolicy = () => {
  const { cancellationMinimumDays, lateCancellationFee } = PENDING_LIZ_TERMS;
  return `Cancel at least ${cancellationMinimumDays} days before your seminar for a full 100% refund. Cancellations made within ${cancellationMinimumDays} days are subject to a $${lateCancellationFee} fee, which covers the cost of reserving your space. If we reschedule a seminar and you are unable to attend the new date, you will receive a 100% refund. To cancel, call ${PHONE_NUMBER} or email ${SITE_CONTACT_EMAIL}.`;
};

export const practiceTransitionSeminarLearningPoints = [
  "Increase your practice value before you sell",
  "Avoid tax pitfalls that can reduce your net gains",
  "Structure agreements that protect you and build trust",
  "Understand how today's market affects practice value and ownership",
  "Approach a win-win practice transition with more confidence",
];

export const practiceTransitionSeminarValuePoints = [
  "Understand your transition options",
  "Increase practice value before a sale",
  "Avoid common tax and deal-structure pitfalls",
  "Evaluate buyers, partners, and opportunities more confidently",
  "Protect your team, patients, and long-term reputation",
];

export const practiceTransitionSeminarFaqs = [
  {
    question: "Who should attend?",
    answer:
      "Dentists who are considering buying, selling, partnering, bringing on an associate, or simply trying to understand the value and future direction of their practice.",
  },
  {
    question: "Do I need to be ready to sell right now?",
    answer:
      "No. The seminar is useful whether your transition is immediate or still years away.",
  },
  {
    question: "How does payment work?",
    answer:
      "Submit the registration form and PTI will call to confirm your seat and take payment by phone.",
  },
  {
    question: "Can I bring additional attendees?",
    answer:
      "Yes. Additional guests can be included during registration.",
  },
  {
    question: "What if I'm not sure which date to attend?",
    answer:
      `Choose the date that is most convenient, or call PTI at ${PHONE_NUMBER} with questions.`,
  },
];

const seminarEventDescription = [
  "A one-day seminar for dentists preparing to buy, sell, partner, bring on an associate, or better understand practice value.",
  ...practiceTransitionSeminarLearningPoints,
].join(" ");

/**
 * The single Event description for a seminar date. Both /events and the
 * seminar page emit it under the same @id, so they must describe it the same
 * way.
 */
export const buildSeminarStructuredEvent = (
  event: PracticeTransitionSeminarEvent,
  _referenceDate: Date = new Date()
): StructuredEventInput => ({
  id: event.id,
  title: `Practice Transitions Seminar - ${event.city}`,
  date: event.date,
  time: event.time,
  location: `${event.venueName}, ${event.addressLines.join(", ")}`,
  description: seminarEventDescription,
  registrationLink: PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH,
  type: "seminar",
  detailPath: PRACTICE_TRANSITION_SEMINAR_PATH,
  // Keep the public Event offer at the approved standard price until
  // PENDING_LIZ_TERMS is confirmed. The page may preview a different quote.
  offerPrice: getApprovedSeminarOfferPrice(event),
  offerPriceCurrency: "USD",
  registrationOpen: true,
});
