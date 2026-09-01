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
  dugoniGroupPhoto: {
    id: "dugoniGroupPhoto",
    src: "/lovable-uploads/drnjo-2026/dugoni-group-photo.webp",
    alt: "Dr. Michael Njo with a large group of dental professionals gathered at a Dugoni-related community event",
    caption:
      "A broad community moment that reinforces Dr. Njo's ties to the dental school, alumni network, and the next generation of practice leaders.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["about", "drnjo"],
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
    alt: "Candid office photo with an AI startup founder and board of directors, including Nader Shahi, former Dean of the University of the Pacific School of Dentistry",
    caption:
      "With an AI startup founder and board of directors, notably our former Dean of University of the Pacific School of Dentistry, Nader Shahi.",
    category: "leadership-community",
    fit: "contain",
    aspect: "landscape",
    featuredOn: ["home", "drnjo"],
    names: ["Nader Shahi, former Dean, University of the Pacific School of Dentistry"],
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
  "backstageQuote",
  "bluePrintFlyer",
  "publicationSpread",
  "handbookCoverSpread",
  "dugoniGroupPhoto",
  "conferenceRoomMeeting",
  "mayflowerTrio",
  "officeSelfieGroup",
  "standingTrio",
  "blackTieMedalPortrait",
  "dinnerDuo",
  "dinnerTableFour",
  "birthdayCelebration",
  "panelDinnerGroup",
  "panelDinnerBookSigning",
  "panelDinnerTable",
  "poeRosevilleCollage"
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

export const drNjoSpeakingAuthorshipImages = pickImages(
  "handbookCoverSpread",
  "panelDinnerBookSigning",
  "poeRosevilleCollage",
  "backstageQuote"
);

export const drNjoLeadershipCommunityImages = pickImages(
  "dugoniGroupPhoto",
  "conferenceRoomMeeting",
  "mayflowerTrio",
  "officeSelfieGroup",
  "blackTieMedalPortrait"
);

export const drNjoRelationshipImages = pickImages(
  "panelDinnerGroup",
  "panelDinnerTable",
  "dinnerDuo",
  "dinnerTableFour",
  "birthdayCelebration"
);

export const eventsSpeakingHighlightImages = pickImages(
  "panelDinnerGroup",
  "poeRosevilleCollage",
  "panelDinnerBookSigning"
);

export const getGalleryImagesForPlacement = (
  placement: DrNjoGalleryPlacement
) => drNjoGalleryImages.filter((image) => image.featuredOn.includes(placement));
