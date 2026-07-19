import {
  drNjoGalleryImages,
  type DrNjoGalleryImage,
} from "@/data/drNjoGallery";

export type GalleryCategory =
  | "team"
  | "speaking-education"
  | "leadership-community"
  | "relationships";

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  /** Intrinsic pixel dimensions, used to reserve layout space and avoid CLS. */
  width: number;
  height: number;
  fit: "cover" | "contain";
}

const CATEGORY_FROM_DRNJO: Record<
  DrNjoGalleryImage["category"],
  GalleryCategory
> = {
  "speaking-authorship": "speaking-education",
  "leadership-community": "leadership-community",
  relationships: "relationships",
};

// Intrinsic dimensions for the curated Dr. Njo gallery sources, keyed by id.
const DRNJO_DIMENSIONS: Record<string, { width: number; height: number }> = {
  backstageQuote: { width: 724, height: 888 },
  bluePrintFlyer: { width: 240, height: 240 },
  publicationSpread: { width: 240, height: 320 },
  handbookCoverSpread: { width: 1600, height: 1201 },
  dugoniGroupPhoto: { width: 320, height: 240 },
  conferenceRoomMeeting: { width: 320, height: 240 },
  mayflowerTrio: { width: 320, height: 240 },
  officeSelfieGroup: { width: 1600, height: 1200 },
  standingTrio: { width: 1350, height: 1800 },
  blackTieMedalPortrait: { width: 148, height: 320 },
  dinnerDuo: { width: 320, height: 240 },
  dinnerTableFour: { width: 1800, height: 1350 },
  birthdayCelebration: { width: 1800, height: 1350 },
};

const fromDrNjo = (image: DrNjoGalleryImage): GalleryPhoto => {
  const dims = DRNJO_DIMENSIONS[image.id] ?? { width: 1200, height: 900 };
  return {
    id: image.id,
    src: image.src,
    alt: image.alt,
    caption: image.caption,
    category: CATEGORY_FROM_DRNJO[image.category],
    width: dims.width,
    height: dims.height,
    fit: image.fit,
  };
};

// Curated PTI photos that live outside the Dr. Njo storytelling set: team
// portraits, education sessions, and community moments referenced elsewhere on
// the site. Keeping them here makes this module the single source of truth for
// gallery imagery.
const additionalPhotos: GalleryPhoto[] = [
  {
    id: "team-michael-njo",
    src: "/lovable-uploads/d30c74a1-48bb-404e-9e9d-bc93119a695d.png",
    alt: "Portrait of Dr. Michael Njo, founder of Practice Transitions Institute",
    caption:
      "Dr. Michael Njo — Founder & Transition Consultant, and author of the Dental Practice Transitions Handbook.",
    category: "team",
    width: 383,
    height: 460,
    fit: "cover",
  },
  {
    id: "team-liz-armato",
    src: "/lovable-uploads/3f9aad4c-9a99-4c2e-8cc6-1666dffe409e.png",
    alt: "Portrait of Liz Armato, Chief Operating Officer of Practice Transitions Institute",
    caption:
      "Liz Armato — COO, bringing 25+ years of client service and transition experience to every engagement.",
    category: "team",
    width: 497,
    height: 750,
    fit: "cover",
  },
  {
    id: "dugoni-lunch-learn-presentation",
    src: "/lovable-uploads/presentation-photo.webp",
    alt: "Dr. Michael Njo presenting to Dugoni students during a Lunch & Learn session",
    caption:
      "Presenting to students at the Arthur A. Dugoni School of Dentistry during a Lunch & Learn session.",
    category: "speaking-education",
    width: 1600,
    height: 2134,
    fit: "cover",
  },
  {
    id: "dugoni-lunch-learn-flyer",
    src: "/lovable-uploads/flyer-photo.webp",
    alt: "Lunch & Learn flyer for Dr. Michael Njo's presentation at the Dugoni School of Dentistry",
    caption:
      "The Lunch & Learn flyer announcing Dr. Njo's talk at the Dugoni School of Dentistry.",
    category: "speaking-education",
    width: 1700,
    height: 2188,
    fit: "contain",
  },
  {
    id: "smcds-symposium-workshop",
    src: "/lovable-uploads/drnjo-2026/san-mateo-symposium-workshop.jpg",
    alt: "Dr. Michael Njo leading a workshop with associate dentists at the SMCDS Peninsula Dental Compliance Symposium",
    caption:
      "Leading an associate workshop at the SMCDS Peninsula Dental Compliance Symposium.",
    category: "speaking-education",
    width: 1800,
    height: 1200,
    fit: "cover",
  },
  {
    id: "smcds-associate-workshop",
    src: "/lovable-uploads/drnjo-2026/smcds-associate-workshop-2.jpg",
    alt: "Dr. Michael Njo with future dental professionals at the SMCDS Peninsula Dental Compliance Symposium",
    caption:
      "Working with future dental buyers and associates on career and ownership decisions.",
    category: "speaking-education",
    width: 1800,
    height: 1012,
    fit: "cover",
  },
  {
    id: "dugoni-donation-ceremony",
    src: "/lovable-uploads/dugoni-business-club-donation-ceremony.webp",
    alt: "Dugoni Business Club members presenting a donation check to the Arthur A. Dugoni School of Dentistry",
    caption:
      "A Dugoni Business Club donation ceremony supporting the Arthur A. Dugoni School of Dentistry.",
    category: "leadership-community",
    width: 1600,
    height: 1066,
    fit: "cover",
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  ...drNjoGalleryImages.map(fromDrNjo),
  ...additionalPhotos,
];

const photoById = (id: string): GalleryPhoto | undefined =>
  galleryPhotos.find((photo) => photo.id === id);

export interface HomeGalleryTile {
  photo: GalleryPhoto;
  /** CSS object-position so the cover-crop keeps the subjects framed. */
  focus: string;
}

// Compact, image-led selection for the homepage gallery teaser. Every tile is
// a landscape cover-crop, so each entry carries a focal point tuned to keep the
// faces in frame. The first entry renders as the large feature tile.
const HOME_PREVIEW: Array<{ id: string; focus: string }> = [
  { id: "officeSelfieGroup", focus: "center 38%" },
  { id: "smcds-symposium-workshop", focus: "55% center" },
  { id: "mayflowerTrio", focus: "center 30%" },
  { id: "dinnerTableFour", focus: "center 35%" },
  { id: "conferenceRoomMeeting", focus: "center 45%" },
];

export const homeGalleryPreview: HomeGalleryTile[] = HOME_PREVIEW.map(
  ({ id, focus }) => {
    const photo = photoById(id);
    return photo ? { photo, focus } : null;
  }
).filter((tile): tile is HomeGalleryTile => Boolean(tile));

interface GalleryCategoryMeta {
  id: GalleryCategory;
  label: string;
  description: string;
}

export const GALLERY_CATEGORY_ORDER: GalleryCategoryMeta[] = [
  {
    id: "team",
    label: "The PTI Team",
    description:
      "The advisors who guide dentists through every step of a transition.",
  },
  {
    id: "speaking-education",
    label: "Speaking & Education",
    description:
      "Lectures, workshops, and published work that share Dr. Njo's transition framework.",
  },
  {
    id: "leadership-community",
    label: "Leadership & Community",
    description:
      "Board rooms, dental societies, and community moments across organized dentistry.",
  },
  {
    id: "relationships",
    label: "Relationships",
    description:
      "The long-term, trust-based relationships built well beyond the transaction.",
  },
];

export interface GalleryCategoryGroup extends GalleryCategoryMeta {
  photos: GalleryPhoto[];
}

export const galleryCategoryGroups: GalleryCategoryGroup[] =
  GALLERY_CATEGORY_ORDER.map((meta) => ({
    ...meta,
    photos: galleryPhotos.filter((photo) => photo.category === meta.id),
  })).filter((group) => group.photos.length > 0);
