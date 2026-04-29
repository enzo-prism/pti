export const PRACTICE_TRANSITION_SEMINAR_PATH =
  "/events/practice-transition-seminar";
export const PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH =
  `${PRACTICE_TRANSITION_SEMINAR_PATH}#register`;
export const PRACTICE_TRANSITION_SEMINAR_FORM_ENDPOINT =
  "https://formspree.io/f/xlgzrjev";
export const PRACTICE_TRANSITION_SEMINAR_FORM_ID =
  "practice_transition_seminar";
export const PRACTICE_TRANSITION_SEMINAR_FORM_NAME =
  "PTI Seminar Registration";
export const PRACTICE_TRANSITION_SEMINAR_FORM_PROVIDER = "formspree";

export const PRACTICE_TRANSITION_SEMINAR_PAGE_TITLE =
  "Dental Practice Transition Seminar | PTI";
export const PRACTICE_TRANSITION_SEMINAR_META_DESCRIPTION =
  "Join Practice Transitions Institute for a one-day seminar on buying, selling, and transitioning a dental practice with clarity and confidence. Upcoming dates in San Francisco and Sacramento.";
export const PRACTICE_TRANSITION_SEMINAR_EYEBROW =
  "Practice Transitions Seminar";
export const PRACTICE_TRANSITION_SEMINAR_HEADLINE =
  "Build a High-Value Practice Transition With Confidence";

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
];

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
      "Choose the date that is most convenient, or call PTI at (833) 784-1121 with questions.",
  },
];
