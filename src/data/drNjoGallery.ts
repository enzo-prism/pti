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
  | "tall";

export interface DrNjoGalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: DrNjoGalleryCategory;
  fit: DrNjoGalleryFit;
  aspect: DrNjoGalleryAspect;
  featuredOn: DrNjoGalleryPlacement[];
}

const drNjoGalleryIndex: Record<string, DrNjoGalleryImage> = {
  backstageQuote: {
    id: "backstageQuote",
    src: "/lovable-uploads/drnjo-2026/backstage-mastermind-quote.png",
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
    aspect: "wide",
    featuredOn: ["about", "drnjo"],
  },
  dugoniGroupPhoto: {
    id: "dugoniGroupPhoto",
    src: "/lovable-uploads/drnjo-2026/dugoni-group-photo.webp",
    alt: "Dr. Michael Njo with a large group of dental professionals gathered at a Dugoni-related community event",
    caption:
      "A broad community moment that reinforces Dr. Njo's ties to the dental school, alumni network, and the next generation of practice leaders.",
    category: "leadership-community",
    fit: "cover",
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
    fit: "cover",
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
    fit: "cover",
    aspect: "landscape",
    featuredOn: ["home", "drnjo"],
  },
  officeSelfieGroup: {
    id: "officeSelfieGroup",
    src: "/lovable-uploads/drnjo-2026/office-selfie-group.webp",
    alt: "Office group selfie featuring Dr. Michael Njo with dental industry colleagues around a conference table",
    caption:
      "A candid leadership-team moment that shows the people and partnerships behind PTI's work.",
    category: "leadership-community",
    fit: "cover",
    aspect: "landscape",
    featuredOn: ["home", "drnjo"],
  },
  standingTrio: {
    id: "standingTrio",
    src: "/lovable-uploads/drnjo-2026/standing-trio.webp",
    alt: "Dr. Michael Njo standing with two dental industry colleagues at a professional event",
    caption:
      "Industry camaraderie and professional relationships that strengthen PTI's network and perspective.",
    category: "leadership-community",
    fit: "cover",
    aspect: "portrait",
    featuredOn: ["home", "drnjo"],
  },
  blackTieMedalPortrait: {
    id: "blackTieMedalPortrait",
    src: "/lovable-uploads/drnjo-2026/black-tie-medal-portrait.png",
    alt: "Dr. Michael Njo posing at a formal event beside a medal recipient",
    caption:
      "A formal leadership moment that reinforces Dr. Njo's standing within the broader professional community.",
    category: "leadership-community",
    fit: "contain",
    aspect: "tall",
    featuredOn: ["home", "drnjo"],
  },
  dinnerDuo: {
    id: "dinnerDuo",
    src: "/lovable-uploads/drnjo-2026/dinner-duo.webp",
    alt: "Dr. Michael Njo sharing dinner with a colleague at a restaurant",
    caption:
      "Long-term professional relationships built far beyond the transaction itself.",
    category: "relationships",
    fit: "cover",
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
    fit: "cover",
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
    fit: "cover",
    aspect: "landscape",
    featuredOn: ["drnjo"],
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

export const drNjoSpeakingAuthorshipImages = pickImages(
  "bluePrintFlyer",
  "publicationSpread",
  "handbookCoverSpread",
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
  "dinnerDuo",
  "dinnerTableFour",
  "birthdayCelebration"
);

export const eventsSpeakingHighlightImages = pickImages(
  "bluePrintFlyer",
  "publicationSpread"
);

export const getGalleryImagesForPlacement = (
  placement: DrNjoGalleryPlacement
) => drNjoGalleryImages.filter((image) => image.featuredOn.includes(placement));
