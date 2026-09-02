export type DrNjoGalleryPlacement = "home" | "about" | "drnjo" | "events";
export type DrNjoGalleryCategory =
  | "speaking-authorship"
  | "leadership-community"
  | "relationships";
export type DrNjoGalleryFit = "cover" | "contain";
export type DrNjoGalleryAspect =
  | "square"
  | "landscape"
  | "portrait"
  | "wide"
  | "tall"
  | "story"
  | "poster";

export interface DrNjoGalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: DrNjoGalleryCategory;
  fit: DrNjoGalleryFit;
  aspect: DrNjoGalleryAspect;
  featuredOn: DrNjoGalleryPlacement[];
  /** Known names only. Leave unidentified faces unlabeled. */
  names?: string[];
}

const drNjoGalleryIndex: Record<string, DrNjoGalleryImage> = {
  backstageQuote: {
    id: "backstageQuote",
    src: "/lovable-uploads/drnjo-2026/backstage-mastermind-quote.webp",
    alt: "Backstage Mastermind quote graphic featuring Dr. Michael Njo and a testimonial about handling the business details of a dental practice",
    caption:
      "External recognition that positions Dr. Njo as a trusted partner for dentists who want to stay focused on patients while the operational details are handled well.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "portrait",
    featuredOn: ["home", "drnjo"],
  },
  bluePrintFlyer: {
    id: "bluePrintFlyer",
    src: "/lovable-uploads/drnjo-2026/blue-print-for-success-flyer.jpg",
    alt: "Blue Print for Success seminar flyer from the Santa Clara County Dental Society showing Michael Njo as one of the program providers",
    caption:
      "A speaking-world proof point that reflects the kinds of practical transition and success conversations Dr. Njo is part of across organized dentistry.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "square",
    featuredOn: ["about", "drnjo", "events"],
  },
  publicationSpread: {
    id: "publicationSpread",
    src: "/lovable-uploads/drnjo-2026/publication-spread.webp",
    alt: "Publication spread showing Dr. Michael Njo speaking with younger dental professionals at a networking event",
    caption:
      "A published moment that captures Dr. Njo mentoring early-career dentists in person, not just advising from a distance.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["about", "drnjo", "events"],
  },
  handbookCoverSpread: {
    id: "handbookCoverSpread",
    src: "/lovable-uploads/drnjo-2026/handbook-cover-spread.webp",
    alt: "Full cover spread of Dental Practice Transitions Handbook by Michael A. Njo, DDS",
    caption:
      "The published handbook that distills Dr. Njo's framework for buying, selling, and transitioning healthcare practices in changing markets.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["about", "drnjo"],
  },
  handbookSecondEditionComingSoon: {
    id: "handbookSecondEditionComingSoon",
    src: "/lovable-uploads/drnjo-2026/handbook-second-edition-coming-soon.webp",
    alt: "Coming soon announcement for the expanded second edition of Dental Practice Transitions Handbook by Michael A. Njo, DDS, with a foreword by Dr. Glenn Vo",
    caption:
      "Coming soon: the expanded second edition of the Dental Practice Transitions Handbook, with a foreword by Dr. Glenn Vo.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "portrait",
    featuredOn: ["about", "drnjo"],
    names: ["Dr. Michael Njo"],
  },
  dentalLifestylesCover: {
    id: "dentalLifestylesCover",
    src: "/lovable-uploads/drnjo-2026/dental-lifestyles-summer-2026-cover.webp",
    alt: "Cover of Dental Lifestyles Magazine, Summer 2026 (15th issue), listing the feature on Dr. Michael Njo's whole-person approach to dental practice transitions",
    caption:
      "Dental Lifestyles Magazine, Summer 2026 (15th issue): cover billing for the feature on Dr. Njo's whole-person approach to practice transitions.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "portrait",
    featuredOn: ["drnjo"],
  },
  dentalLifestylesFeature: {
    id: "dentalLifestylesFeature",
    src: "/lovable-uploads/drnjo-2026/dental-lifestyles-summer-2026-feature-p25.webp",
    alt: "Dental Lifestyles Magazine feature 'Beyond Brokerage: Dr. Michael Njo's Whole-Person Approach to Dental Practice Transitions' by Dr. Glenn Vo",
    caption:
      "\"Beyond Brokerage: Dr. Michael Njo's Whole-Person Approach to Dental Practice Transitions,\" by Dr. Glenn Vo, Editor-in-Chief, Dental Lifestyles Magazine (Summer 2026).",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "portrait",
    featuredOn: ["about", "drnjo"],
    names: ["Dr. Michael Njo"],
  },
  dugoniCollaboration: {
    id: "dugoniCollaboration",
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767551710/university-of-the-pacific-dr-njo_pkcbs4.webp",
    alt: "Dr. Michael Njo with Dean Nadershahi and Interim Dean Chavez beneath the University of the Pacific Arthur A. Dugoni School of Dentistry banner",
    caption:
      "Working closely with the University of the Pacific Arthur A. Dugoni School of Dentistry, with Dean Nadershahi and Interim Dean Chavez.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "square",
    featuredOn: ["about", "drnjo", "events"],
    names: ["Dr. Michael Njo", "Dean Nadershahi", "Interim Dean Chavez"],
  },
  gprResidencyPresentation: {
    id: "gprResidencyPresentation",
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1773587933/d85667bc-c2ea-4be4-9bfd-790829b947d3_wgoug0.webp",
    alt: "Dr. Michael Njo, DDS presenting to General Practice Residency residents holding copies of Dental Practice Transitions Handbook",
    caption:
      "Dr. Michael Njo presenting to General Practice Residency residents holding copies of the Dental Practice Transitions Handbook.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["about", "drnjo", "events"],
  },
  dugoniSymposiumKeynote: {
    id: "dugoniSymposiumKeynote",
    src: "/lovable-uploads/drnjo-2026/dugoni-symposium-2023-keynote.webp",
    alt: "Dr. Michael Njo speaking at the podium during the Dugoni Business Club Symposium, with the 2023 symposium schedule projected behind him",
    caption:
      "Speaking at the Dugoni Business Club Symposium, University of the Pacific Arthur A. Dugoni School of Dentistry.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["drnjo", "events"],
    names: ["Dr. Michael Njo"],
  },
  sfSeminarPresenting: {
    id: "sfSeminarPresenting",
    src: "/lovable-uploads/drnjo-2026/sf-seminar-jul-2026-presenting.webp",
    alt: "Dr. Michael Njo presenting Mastering Your Dental Transition to dentists seated around a boardroom table at the July 2026 San Francisco seminar",
    caption:
      "Presenting Mastering Your Dental Transition at the July 2026 San Francisco Practice Transitions seminar.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["drnjo", "events"],
    names: ["Dr. Michael Njo"],
  },
  sfSeminarAttendees: {
    id: "sfSeminarAttendees",
    src: "/lovable-uploads/drnjo-2026/sf-seminar-jul-2026-attendees.webp",
    alt: "Group photo of dentists attending the July 2026 San Francisco Practice Transitions seminar, shown on the conference room display",
    caption:
      "Dentists who care about their legacy: attendees at the July 2026 San Francisco seminar.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["events"],
  },
  backstageRetreatBookSigning: {
    id: "backstageRetreatBookSigning",
    src: "/lovable-uploads/drnjo-2026/backstage-retreat-2026-book-signing.webp",
    alt: "Backstage Retreat 2026 book signing in Orlando on July 30, 2026, with contributing authors holding copies of The Dental Exit Blueprint",
    caption:
      "Backstage Retreat 2026, Orlando: all 29 contributing authors and Key Opinion Leaders under one roof for The Dental Exit Blueprint book signing.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "wide",
    featuredOn: ["drnjo", "events"],
  },
  dugoniGroupPhoto: {
    id: "dugoniGroupPhoto",
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767707725/Leadership-retreat_peohe1.webp",
    alt: "Dr. Michael Njo with a large group of dental professionals gathered at a leadership retreat",
    caption:
      "Leadership retreat with peers from across the profession.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["about", "drnjo"],
    names: ["Dr. Michael Njo"],
  },
  dugoniAlumniGalaTable: {
    id: "dugoniAlumniGalaTable",
    src: "/lovable-uploads/drnjo-2026/dugoni-alumni-gala-table.webp",
    alt: "Dr. Michael Njo with Pacific Dugoni alumni colleagues and classmates in formal attire gathered around a table at an Alumni Association evening",
    caption:
      "Alumni Association evening: great seeing, and now working with, Pacific Dugoni colleagues and classmates on their transitions and their businesses.",
    category: "leadership-community",
    fit: "contain",
    aspect: "wide",
    featuredOn: ["drnjo"],
    names: ["Dr. Michael Njo"],
  },
  dugoniBusinessClubMembers: {
    id: "dugoniBusinessClubMembers",
    src: "/lovable-uploads/drnjo-2026/dugoni-business-club-members.webp",
    alt: "Dr. Michael Njo standing with three Dugoni Business Club student members inside the Arthur A. Dugoni School of Dentistry",
    caption:
      "With Dugoni Business Club members at the Arthur A. Dugoni School of Dentistry.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["drnjo"],
    names: ["Dr. Michael Njo"],
  },
  dugoniBusinessClubDinner: {
    id: "dugoniBusinessClubDinner",
    src: "/lovable-uploads/drnjo-2026/dugoni-business-club-dinner.webp",
    alt: "Dr. Michael Njo at a long restaurant table with Dugoni Business Club members during an alumni evening",
    caption:
      "Great evening at the Dugoni Alumni meeting with Business Club members.",
    category: "leadership-community",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["drnjo"],
    names: ["Dr. Michael Njo"],
  },
  dugoniBusinessClubLunch: {
    id: "dugoniBusinessClubLunch",
    src: "/lovable-uploads/drnjo-2026/dugoni-business-club-celebration-lunch.webp",
    alt: "Dr. Michael Njo with a large group of Dugoni Business Club members at a celebration lunch",
    caption:
      "Celebration lunch for another great year with the Dugoni Business Club. Proud to be their advisor and consultant.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["drnjo"],
    names: ["Dr. Michael Njo"],
  },
  dugoniBusinessClubGolf: {
    id: "dugoniBusinessClubGolf",
    src: "/lovable-uploads/drnjo-2026/dugoni-business-club-golf.webp",
    alt: "Dr. Michael Njo seated at a clubhouse table with four Dugoni Business Club leaders after a round of golf",
    caption:
      "Supporting Dugoni Business Club leadership with a round of golf and down time before finals.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["drnjo"],
    names: ["Dr. Michael Njo"],
  },
  dugoniSymposiumSponsors: {
    id: "dugoniSymposiumSponsors",
    src: "/lovable-uploads/drnjo-2026/dugoni-symposium-2023-sponsors.webp",
    alt: "Dr. Michael Njo with two industry sponsor representatives at the Dugoni Business Club Symposium vendor fair",
    caption:
      "Dugoni Business Club Symposium: thank you to our industry sponsors.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["drnjo"],
    names: ["Dr. Michael Njo"],
  },
  dugoniSymposiumSponsorTeam: {
    id: "dugoniSymposiumSponsorTeam",
    src: "/lovable-uploads/drnjo-2026/dugoni-symposium-2023-sponsor-team.webp",
    alt: "Industry sponsor representatives gathered at the Dugoni Business Club Symposium vendor fair",
    caption:
      "Industry sponsors supporting the Dugoni Business Club Symposium.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["drnjo"],
  },
  backstageLaunchPodDallas: {
    id: "backstageLaunchPodDallas",
    src: "/lovable-uploads/drnjo-2026/backstage-launch-pod-dallas-2026.webp",
    alt: "Dr. Michael Njo with fellow Backstage Mastermind members in matching Launch Pod shirts at the Dallas retreat",
    caption:
      "Backstage Mastermind Launch Pod session in Dallas: surrounded by entrepreneurs committed to helping one another succeed.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["drnjo"],
    names: ["Dr. Michael Njo"],
  },
  conferenceRoomMeeting: {
    id: "conferenceRoomMeeting",
    src: "/lovable-uploads/drnjo-2026/conference-room-meeting.webp",
    alt: "Dr. Michael Njo participating in a boardroom-style meeting with dental leaders seated around a conference table",
    caption:
      "Leadership conversations focused on strategy, ownership, and where dentistry is heading next.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["home", "drnjo"],
  },
  mayflowerTrio: {
    id: "mayflowerTrio",
    src: "/lovable-uploads/drnjo-2026/mayflower-trio.webp",
    alt: "Dr. Michael Njo standing with two colleagues in front of a Mayflower sign",
    caption:
      "Professional relationships built over years of trust, perspective, and shared work in the dental industry.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["home", "drnjo"],
  },
  officeSelfieGroup: {
    id: "officeSelfieGroup",
    src: "/lovable-uploads/drnjo-2026/office-selfie-group.webp",
    alt: "Candid office photo of Dr. Michael Njo with an AI startup founder and board of directors, including Nader Nadershahi, former Dean of the University of the Pacific School of Dentistry",
    caption:
      "On the board of an AI startup (in stealth mode): with the founder and board of directors, notably our former Dean of University of the Pacific School of Dentistry, Nader Nadershahi.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["home", "drnjo"],
    names: [
      "Dr. Michael Njo",
      "Nader Nadershahi, former Dean, University of the Pacific School of Dentistry",
    ],
  },
  standingTrio: {
    id: "standingTrio",
    src: "/lovable-uploads/drnjo-2026/standing-trio.webp",
    alt: "Dr. Michael Njo standing with two dental industry colleagues at a professional event",
    caption:
      "Industry camaraderie and professional relationships that strengthen PTI's network and perspective.",
    category: "leadership-community",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["home", "drnjo"],
  },
  blackTieMedalPortrait: {
    id: "blackTieMedalPortrait",
    src: "/lovable-uploads/drnjo-2026/black-tie-medal-portrait.png",
    alt: "Dr. Michael Njo standing with Dr. Allen Budenz, who is wearing a tuxedo and medallion, at a formal event",
    caption:
      "Dr. Michael Njo with Dr. Allen Budenz.",
    category: "leadership-community",
    fit: "contain",
    aspect: "story",
    featuredOn: ["home", "drnjo"],
    names: ["Dr. Michael Njo", "Dr. Allen Budenz"],
  },
  dinnerDuo: {
    id: "dinnerDuo",
    src: "/lovable-uploads/drnjo-2026/dinner-duo.webp",
    alt: "Dr. Michael Njo sharing dinner with a colleague at a restaurant",
    caption:
      "Long-term professional relationships built far beyond the transaction itself.",
    category: "relationships",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["drnjo"],
  },
  dinnerTableFour: {
    id: "dinnerTableFour",
    src: "/lovable-uploads/drnjo-2026/dinner-table-four.webp",
    alt: "Dr. Michael Njo dining with three colleagues at a restaurant table",
    caption:
      "A quieter look at the trust and friendship inside Dr. Njo's professional circle.",
    category: "relationships",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["drnjo"],
  },
  birthdayCelebration: {
    id: "birthdayCelebration",
    src: "/lovable-uploads/drnjo-2026/birthday-celebration.webp",
    alt: "Birthday dinner celebration photo of a woman seated beside dessert in a warmly lit restaurant",
    caption:
      "A humanizing celebration moment included as a quiet relationship detail rather than a front-and-center proof point.",
    category: "relationships",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["drnjo"],
  },
  panelDinnerGroup: {
    id: "panelDinnerGroup",
    src: "/lovable-uploads/drnjo-2026/IMG_4918.webp",
    alt: "Dr. Michael Njo with dentists and referral partners at the Los Angeles Panel of Experts dinner",
    caption:
      "Los Angeles Panel of Experts dinner with dentists and referral partners.",
    category: "relationships",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["home", "drnjo", "events"],
    names: ["Dr. Michael Njo"],
  },
  panelDinnerBookSigning: {
    id: "panelDinnerBookSigning",
    src: "/lovable-uploads/drnjo-2026/IMG_4923.webp",
    alt: "Dr. Michael Njo autographing Dental Practice Transitions Handbook at the Los Angeles Panel of Experts dinner",
    caption:
      "Dr. Michael Njo autographing the Dental Practice Transitions Handbook at the Los Angeles Panel of Experts dinner.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["drnjo", "events"],
    names: ["Dr. Michael Njo"],
  },
  panelDinnerTable: {
    id: "panelDinnerTable",
    src: "/lovable-uploads/drnjo-2026/IMG_3346.webp",
    alt: "Los Angeles Panel of Experts dinner table with dentists and referral partners",
    caption:
      "The Los Angeles Panel of Experts dinner table.",
    category: "relationships",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["drnjo", "events"],
  },
  uopBoardDinner: {
    id: "uopBoardDinner",
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767707725/UOP-board-dinner_vvxbkq.webp",
    alt: "Dr. Michael Njo with University of the Pacific alumni board members around a long dinner table",
    caption:
      "University of the Pacific alumni board dinner: the relationship capital that surrounds the consulting work.",
    category: "relationships",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["drnjo"],
    names: ["Dr. Michael Njo"],
  },
  sfSeminarDuo: {
    id: "sfSeminarDuo",
    src: "/lovable-uploads/drnjo-2026/sf-seminar-jul-2026-duo.webp",
    alt: "Dr. Michael Njo standing with a colleague holding seminar materials at the July 2026 San Francisco seminar venue",
    caption:
      "With a colleague at the July 2026 San Francisco Practice Transitions seminar.",
    category: "relationships",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["drnjo"],
    names: ["Dr. Michael Njo"],
  },
  backstageDisneyWorld: {
    id: "backstageDisneyWorld",
    src: "/lovable-uploads/drnjo-2026/backstage-disney-world-2026.webp",
    alt: "Dr. Michael Njo with three fellow Backstage Mastermind members holding tickets outside at Disney World",
    caption:
      "Living one of the Backstage Mastermind's core values, fun, at Disney World with fellow members (abundance, kindness, and fun).",
    category: "relationships",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["drnjo"],
    names: ["Dr. Michael Njo"],
  },
  foundBookLaunch: {
    id: "foundBookLaunch",
    src: "/lovable-uploads/drnjo-2026/found-book-launch-anissa-broussard.webp",
    alt: "Dr. Michael Njo and Dr. Anissa Broussard holding a copy of her book FOUND on a staircase",
    caption:
      "Celebrating the launch of FOUND with author Dr. Anissa Broussard: how AI is quietly choosing which practices get recommended to patients.",
    category: "relationships",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["drnjo"],
    names: ["Dr. Michael Njo", "Dr. Anissa Broussard"],
  },
  poeRosevilleCollage: {
    id: "poeRosevilleCollage",
    src: "/lovable-uploads/drnjo-2026/poe-roseville-aug-2026.webp",
    alt: "The Practice Blueprint recap collage from the August 2026 Roseville dinner, including a dinner-table group photo and a five-person portrait",
    caption:
      "The Practice Blueprint dinner in Roseville, August 2026.",
    category: "speaking-authorship",
    fit: "contain",
    aspect: "poster",
    featuredOn: ["drnjo", "events"],
  },
};

const pickImages = (...ids: Array<keyof typeof drNjoGalleryIndex>) =>
  ids.map((id) => drNjoGalleryIndex[id]);

export const drNjoGalleryImages = pickImages(
  "handbookCoverSpread",
  "handbookSecondEditionComingSoon",
  "dentalLifestylesFeature",
  "dentalLifestylesCover",
  "backstageQuote",
  "bluePrintFlyer",
  "publicationSpread",
  "dugoniCollaboration",
  "gprResidencyPresentation",
  "dugoniSymposiumKeynote",
  "sfSeminarPresenting",
  "sfSeminarAttendees",
  "panelDinnerBookSigning",
  "poeRosevilleCollage",
  "backstageRetreatBookSigning",
  "officeSelfieGroup",
  "blackTieMedalPortrait",
  "dugoniGroupPhoto",
  "dugoniAlumniGalaTable",
  "dugoniBusinessClubMembers",
  "dugoniBusinessClubDinner",
  "dugoniBusinessClubLunch",
  "dugoniBusinessClubGolf",
  "dugoniSymposiumSponsors",
  "dugoniSymposiumSponsorTeam",
  "backstageLaunchPodDallas",
  "conferenceRoomMeeting",
  "mayflowerTrio",
  "standingTrio",
  "panelDinnerGroup",
  "panelDinnerTable",
  "uopBoardDinner",
  "sfSeminarDuo",
  "backstageDisneyWorld",
  "foundBookLaunch",
  "dinnerDuo",
  "dinnerTableFour",
  "birthdayCelebration"
);

export const homeGalleryImages = pickImages(
  "officeSelfieGroup",
  "conferenceRoomMeeting",
  "mayflowerTrio",
  "standingTrio"
);

export const authorityCalloutImages = pickImages(
  "backstageQuote",
  "blackTieMedalPortrait"
);

export const aboutGalleryImages = pickImages(
  "handbookCoverSpread",
  "publicationSpread",
  "bluePrintFlyer",
  "dugoniGroupPhoto"
);

/** Order matters: `DrNjo.tsx` destructures this list positionally. */
export const drNjoSpeakingAuthorshipImages = pickImages(
  "handbookCoverSpread",
  "handbookSecondEditionComingSoon",
  "dentalLifestylesFeature",
  "panelDinnerBookSigning",
  "poeRosevilleCollage",
  "dugoniCollaboration",
  "gprResidencyPresentation",
  "dugoniSymposiumKeynote",
  "sfSeminarPresenting",
  "backstageRetreatBookSigning",
  "backstageQuote"
);

/** Order matters: `DrNjo.tsx` destructures this list positionally. */
export const drNjoLeadershipCommunityImages = pickImages(
  "dugoniGroupPhoto",
  "conferenceRoomMeeting",
  "mayflowerTrio",
  "officeSelfieGroup",
  "blackTieMedalPortrait",
  "dugoniAlumniGalaTable",
  "dugoniBusinessClubMembers",
  "dugoniBusinessClubDinner",
  "dugoniBusinessClubLunch",
  "dugoniBusinessClubGolf",
  "dugoniSymposiumSponsors",
  "backstageLaunchPodDallas"
);

export const drNjoRelationshipImages = pickImages(
  "panelDinnerGroup",
  "panelDinnerTable",
  "uopBoardDinner",
  "foundBookLaunch",
  "backstageDisneyWorld",
  "sfSeminarDuo",
  "dinnerDuo",
  "dinnerTableFour",
  "birthdayCelebration"
);

export const eventsSpeakingHighlightImages = pickImages(
  "panelDinnerGroup",
  "poeRosevilleCollage",
  "sfSeminarPresenting"
);

export const getGalleryImagesForPlacement = (
  placement: DrNjoGalleryPlacement
) => drNjoGalleryImages.filter((image) => image.featuredOn.includes(placement));
