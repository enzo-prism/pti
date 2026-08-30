import type { BlogPost } from "./blogPosts";

// Keep the event CTA self-contained so the RSS validator can load this data
// with Node's type stripping as well as through Next.js.
const BEYOND_THE_CHAIR_MAILTO =
  "mailto:info@practicetransitions.com?subject=Beyond%20the%20Chair%20Anaheim%20September%2025";

export const communityImpactPosts: Array<
  BlogPost & { featuredImageWidth?: number; featuredImageHeight?: number }
> = [
  {
    id: 47,
    title: "Congratulations, Dr. Diana Fat",
    excerpt:
      "I am so proud to congratulate my longtime client of more than 20 years, Dr. Diana Fat, a distinguished Sacramento prosthodontist, on her appointment to the University of the Pacific Board of Regents.",
    category: "Community Impact",
    date: "2026-08-28",
    readTime: "1 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "diana-fat-board-of-regents",
    author: "Practice Transitions Institute",
    metaTitle: "Congratulations, Dr. Diana Fat | PTI",
    metaDescription:
      "I am so proud to congratulate my longtime client of more than 20 years, Dr. Diana Fat, a distinguished Sacramento prosthodontist, on her appointment to the University of the Pacific Board of Regents.",
    featuredImage: "/lovable-uploads/drnjo-2026/diana-fat-board-of-regents.webp",
    featuredImageAlt:
      "Dr. Michael Njo and Dr. Diana Fat standing together in her Sacramento dental office, beside a navy overlay announcing her appointment to the University of the Pacific Board of Regents",
    featuredImageCaption:
      "Congratulations graphic for Dr. Diana Fat’s appointment to the University of the Pacific Board of Regents.",
    featuredImageFit: "contain",
    featuredImageAspect: "portrait",
    featuredImageWidth: 1003,
    featuredImageHeight: 1568,
    content: `I am so proud to congratulate my longtime client of more than 20 years, Dr. Diana Fat, a distinguished Sacramento prosthodontist, on her appointment to the University of the Pacific Board of Regents.

Diana continues to make a meaningful difference in dentistry, in her community, and now for our alma mater. Congratulations, Diana—this honor is so well deserved!

#UniversityOfThePacific #BoardOfRegents #PacificProud #DentalLeadership`,
  },
  {
    id: 46,
    title: "The Practice Blueprint in Roseville",
    excerpt:
      "Great night with great Dentists and referral partners! Thank you Provide, Patterson, Kohan, and Carr for including me at this vibrant event.",
    category: "Community Impact",
    date: "2026-08-28",
    readTime: "1 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "practice-blueprint-roseville-aug-2026",
    author: "Practice Transitions Institute",
    metaTitle: "The Practice Blueprint in Roseville | PTI",
    metaDescription:
      "Great night with great Dentists and referral partners! Thank you Provide, Patterson, Kohan, and Carr for including me at this vibrant event.",
    featuredImage: "/lovable-uploads/drnjo-2026/poe-roseville-aug-2026.webp",
    featuredImageAlt:
      "Vertical recap collage titled The Practice Blueprint, with a dinner-table group photo, a five-person portrait, and black-and-white welcome-sign, table-setting, stationery, and gift-bag details from the Roseville evening",
    featuredImageCaption:
      "The Practice Blueprint recap collage from the Roseville dinner.",
    featuredImageFit: "contain",
    featuredImageAspect: "portrait",
    featuredImageWidth: 864,
    featuredImageHeight: 1821,
    content: `Great night with great Dentists and referral partners! Thank you Provide, Patterson, Kohan, and Carr for including me at this vibrant event. It is so fun to enjoy an evening with Dentists who have dreams and a team that can realize those dreams! Thank you to my dear friend, colleague, and long time client Dr. Diana Fat for welcoming us to her family restaurant.

<div style="margin:1.5rem 0;"><img src="/lovable-uploads/drnjo-2026/poe-roseville-aug-2026.webp" alt="Vertical recap collage titled The Practice Blueprint, with a dinner-table group photo, a five-person portrait, and black-and-white welcome-sign, table-setting, stationery, and gift-bag details from the Roseville evening" style="width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>`,
  },
];
