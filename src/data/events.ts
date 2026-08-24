import {
  PRACTICE_TRANSITION_SEMINAR_PATH,
  PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH,
  getSeminarRegistrationPrice,
  practiceTransitionSeminarEvents,
  practiceTransitionSeminarLearningPoints,
} from "@/data/practiceTransitionSeminar";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";

const ROSEVILLE_AVAILABILITY_MAILTO = `mailto:${SITE_CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Roseville Dinner Availability"
)}`;
const BEYOND_THE_CHAIR_MAILTO = `mailto:${SITE_CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Beyond the Chair Anaheim September 25"
)}`;
import { isEventPast, parseEventDate, sortEventDates } from "@/lib/dateUtils";

// Event data with type definitions
export interface RawEvent {
  id: string | number;
  title: string;
  date: string;
  dateDisplay?: string;
  time: string;
  location: string;
  description: string | {
    intro: string;
    learningPoints: string[];
  };
  type: "webinar" | "seminar" | "workshop" | "conference" | "dinner";
  registrationLink: string;
  detailPath?: string;
  offerPrice?: number;
  offerPriceCurrency?: string;
  flyerImage?: string;
  flyerImageAlt?: string;
  speakers?: Array<{
    name: string;
    title: string;
    imageUrl: string;
  }>;
}

const practiceTransitionSeminarDescription = {
  intro:
    "Whether you are preparing to sell, buy, bring on a partner, or simply understand your practice's value, this one-day seminar gives you practical guidance for making your next move with clarity and confidence.",
  learningPoints: practiceTransitionSeminarLearningPoints,
};

const practiceTransitionEvents: RawEvent[] = practiceTransitionSeminarEvents.map(
  (event) => ({
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
  })
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
    registrationLink: "tel:+18337841121"
  },
  {
    id: 2,
    title: "Mastering Your Dental Transition Into and Out of Practice",
    date: "July 11, 2025",
    time: "8am - 3pm",
    location: "Arthur A. Dugoni School of Dentistry (UOP Dental School), San Francisco, CA",
    description: "A comprehensive full-day seminar perfect for doctors pursuing a start-up or purchase, seeking partners/associates, planning ownership, or preparing to exit dentistry. Join us at the prestigious University of the Pacific dental school.",
    type: "seminar",
    registrationLink: "tel:+18337841121"
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
    registrationLink: "tel:+18337841121"
  },
  {
    id: 7,
    title: "Leadership Retreat",
    date: "June 4, 2026",
    dateDisplay: "June 4-6, 2026",
    time: "Multi-day",
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
      (candidate) => candidate.date === event.date
    );
    return seminar
      ? { ...event, offerPrice: getSeminarRegistrationPrice(seminar, referenceDate) }
      : event;
  });

export const getPastRawEvents = (
  referenceDate: Date = new Date()
): RawEvent[] =>
  [...rawEvents]
    .filter((event) => isEventPast(event.date, referenceDate))
    .sort(
      (a, b) =>
        parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime()
    );
