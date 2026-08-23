import type { BlogPost } from "./blogPosts";

// Keep the event CTA self-contained so the RSS validator can load this data
// with Node's type stripping as well as through Next.js.
const ROSEVILLE_AVAILABILITY_MAILTO =
  "mailto:info@practicetransitions.com?subject=Roseville%20Dinner%20Availability";

export const communityImpactPosts: BlogPost[] = [
  {
    id: 43,
    title: "Panel of Experts Dinner With Dentists and Referral Partners",
    excerpt:
      "A recap of the August 14 Panel of Experts dinner, plus details for The Practice Blueprint dinner in Roseville on August 27.",
    category: "Community Impact",
    date: "2026-08-14",
    dateModified: "2026-08-21",
    readTime: "2 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "panel-of-experts-dinner-roseville",
    author: "Practice Transitions Institute",
    metaTitle: "Panel of Experts Dinner | Practice Transitions Institute",
    metaDescription:
      "See highlights from the August 14 Panel of Experts dinner and details for The Practice Blueprint dinner in Roseville on August 27, 2026.",
    featuredImage: "/lovable-uploads/drnjo-2026/IMG_4918.webp",
    featuredImageAlt: "Dr. Michael Njo with dentists and referral partners at the Panel of Experts dinner",
    featuredImageCaption: "Panel of Experts dinner with dentists and referral partners.",
    featuredImageFit: "contain",
    cta: {
      eyebrow: "Upcoming Roseville event",
      eventName: "the_practice_blueprint_dinner",
      title: "The Practice Blueprint dinner",
      description:
        "August 27, 2026, from 6:00–9:00 PM at Fats Asia Bistro in Roseville. Contact PTI to confirm current seat availability.",
      bookingUrl: ROSEVILLE_AVAILABILITY_MAILTO,
      bookingLabel: "Confirm availability",
    },
    content: `On August 14, we enjoyed a great night with dentists and referral partners at the Panel of Experts dinner. Thank you to Provide, Patterson, Sarv Designs, and Carr for including us in this vibrant event. It is always energizing to spend an evening with dentists who have big dreams and a team ready to help realize them.

Dr. Michael Njo was honored to autograph his book, *Dental Practice Transitions Handbook*, during the evening.

## Next event: The Practice Blueprint dinner

Our next Roseville gathering is **August 27, 2026, from 6:00–9:00 PM** at [Fats Asia Bistro](https://maps.app.goo.gl/2vnAFss1pAhpiiZu8). [Contact PTI to confirm current seat availability](${ROSEVILLE_AVAILABILITY_MAILTO}).

<div class="dinner-photos" style="display:grid;gap:1rem;margin:1.5rem 0;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));align-items:start;"><img src="/lovable-uploads/drnjo-2026/IMG_4918.webp" alt="Dr. Michael Njo with dentists and referral partners at the Panel of Experts dinner" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /><img src="/lovable-uploads/drnjo-2026/IMG_4923.webp" alt="Dr. Michael Njo autographing Dental Practice Transitions Handbook at the Panel of Experts dinner" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /><img src="/lovable-uploads/drnjo-2026/IMG_3346.webp" alt="Panel of Experts dinner table with dentists and referral partners" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>`,
  },
  {
    id: 42,
    title: "An Amazing 4 days with Industry leaders!!!",
    excerpt:
      "An Amazing 4 days with Industry leaders!!! Watch the reel from Backstage Dentistry.",
    category: "Community Impact",
    date: "2026-08-13",
    readTime: "1 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "amazing-4-days-with-industry-leaders",
    author: "Practice Transitions Institute",
    metaTitle: "An Amazing 4 days with Industry leaders | Practice Transitions Institute",
    featuredImage: "/lovable-uploads/drnjo-2026/industry-leaders-reel-poster.webp",
    featuredImageAlt: "Still from the Backstage Dentistry reel covering four days with industry leaders",
    featuredImageCaption: "Video still from @backstagedentistry on Instagram.",
    featuredImageFit: "cover",
    content: `An Amazing 4 days with Industry leaders!!!

<div class=\"instagram-embed\" style=\"max-width:540px;margin:1.5rem auto;min-height:720px;\"><iframe src=\"https://www.instagram.com/reel/Db9NKdHJAk2/embed\" width=\"100%\" height=\"720\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\" allow=\"encrypted-media; clipboard-write\" title=\"Instagram reel: An Amazing 4 days with Industry leaders\" loading=\"lazy\"></iframe></div>

Video credit: [@backstagedentistry](https://www.instagram.com/reel/Db9NKdHJAk2/) on Instagram.`,
  },
];
