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
  {
    id: 45,
    title: "Another perfect match",
    excerpt:
      "Dr. Njo matched both of his clients — a former Dugoni Business Club student with an accomplished practitioner.",
    category: "Community Impact",
    date: "2026-08-25",
    readTime: "1 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "another-perfect-match",
    author: "Practice Transitions Institute",
    metaTitle: "Another perfect match | PTI",
    metaDescription:
      "Dr. Njo matched both of his clients — a former Dugoni Business Club student with an accomplished practitioner.",
    featuredImage: "/lovable-uploads/drnjo-2026/bill-mikki-porch.webp",
    featuredImageAlt:
      "A younger woman in a navy sleeveless top and trousers standing with an older man in a tropical-print shirt on a brick walkway in front of a brick house numbered 257",
    featuredImageCaption:
      "A porch portrait from the practice-match celebration.",
    featuredImageFit: "contain",
    featuredImageAspect: "portrait",
    featuredImageWidth: 1199,
    featuredImageHeight: 1600,
    content: `Another perfect match! So excited to have both of my clients matched- with my former Dugoni Business Club Student with an accomplished practitioner!

Bill and Mikki, thank you for your incredibly thoughtful words and for trusting me to help guide such an important transition. It was truly an honor to support you in finding the right successor for the practice, patients, team, and legacy you worked so hard to build.

<div style="margin:1.5rem 0;"><img src="/lovable-uploads/drnjo-2026/bill-mikki-porch.webp" alt="A younger woman in a navy sleeveless top and trousers standing with an older man in a tropical-print shirt on a brick walkway in front of a brick house numbered 257" style="width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>

<div style="margin:1.5rem 0;"><img src="/lovable-uploads/drnjo-2026/bill-mikki-trio.webp" alt="Three people standing outdoors: a man in light blue scrubs holding a yellow folder, a woman in navy scrubs, and a man in a white shirt and blue tie, in front of a burgundy wall" style="width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>`,
  },
  {
    id: 44,
    title: "The Dental Practice Beyond the Chair",
    excerpt:
      "A 5-hour working session on September 25, 2026 in Anaheim for dentists and practice owners building enterprise value, intellectual property, wealth, and legacy.",
    category: "Community Impact",
    date: "2026-08-24",
    readTime: "2 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "dental-practice-beyond-the-chair-anaheim",
    author: "Practice Transitions Institute",
    metaTitle: "The Dental Practice Beyond the Chair | PTI",
    metaDescription:
      "A 5-hour working session on September 25, 2026 in Anaheim for dentists building enterprise value, IP, wealth, and legacy.",
    featuredImage: "/lovable-uploads/drnjo-2026/promotional-flyer-dental-strategies.webp",
    featuredImageAlt:
      "Promotional flyer for The Dental Practice Beyond the Chair, a September 25, 2026 five-hour working session in Anaheim led by Michael A. Njo, DDS",
    featuredImageCaption:
      "Promotional flyer for The Dental Practice Beyond the Chair in Anaheim.",
    featuredImageFit: "contain",
    featuredImageAspect: "portrait",
    featuredImageWidth: 1414,
    featuredImageHeight: 2000,
    cta: {
      eyebrow: "Upcoming Anaheim workshop",
      eventName: "beyond_the_chair_anaheim",
      title: "The Dental Practice Beyond the Chair",
      description:
        "September 25, 2026, from 8:30 AM–1:30 PM at The Phillips Group in Anaheim. Contact PTI to confirm a seat.",
      bookingUrl: BEYOND_THE_CHAIR_MAILTO,
      bookingLabel: "Confirm a seat",
    },
    content: `The Dental Practice Beyond the Chair is a 5-hour working session for dentists and practice owners who want more than a job—build a practice that gives you options, freedom, and lasting impact.

**September 25, 2026, 8:30 AM – 1:30 PM** at The Phillips Group, 2300 E. Katella Ave, Suite 405, Anaheim, CA. Led by Michael A. Njo, DDS, Director, Dental Strategies.

[Contact PTI to confirm a seat](${BEYOND_THE_CHAIR_MAILTO}).

<div style="margin:1.5rem 0;"><img src="/lovable-uploads/drnjo-2026/promotional-flyer-dental-strategies.webp" alt="Promotional flyer for The Dental Practice Beyond the Chair, a September 25, 2026 five-hour working session in Anaheim led by Michael A. Njo, DDS" style="width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>

## Session blocks

- 8:30 AM – 9:20 AM: Industry & Lifecycle
- 9:20 AM – 10:00 AM: Building the Sale-Ready Foundation
- 10:00 AM – 10:10 AM: Morning Break
- 10:10 AM – 11:40 AM: Valuation & Operations
- 11:40 AM – 12:40 PM: Lunch Case & Growth
- 12:40 PM – 1:30 PM: Exit, Tax, & Action Plan`,
  },
  {
    id: 43,
    title: "Panel of Experts Dinner With Dentists and Referral Partners",
    excerpt:
      "A recap of the August 14 Panel of Experts dinner with dentists and referral partners, including photos from the evening.",
    category: "Community Impact",
    date: "2026-08-14",
    dateModified: "2026-08-30",
    readTime: "2 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "panel-of-experts-dinner-roseville",
    author: "Practice Transitions Institute",
    metaTitle: "Panel of Experts Dinner | Practice Transitions Institute",
    metaDescription:
      "See highlights from the August 14 Panel of Experts dinner with dentists and referral partners.",
    featuredImage: "/lovable-uploads/drnjo-2026/IMG_4918.webp",
    featuredImageAlt: "Dr. Michael Njo with dentists and referral partners at the Panel of Experts dinner",
    featuredImageCaption: "Panel of Experts dinner with dentists and referral partners.",
    featuredImageFit: "contain",
    featuredImageAspect: "portrait",
    featuredImageWidth: 1600,
    featuredImageHeight: 2133,
    content: `On August 14, we enjoyed a great night with dentists and referral partners at the Panel of Experts dinner. Thank you to Provide, Patterson, Sarv Designs, and Carr for including us in this vibrant event. It is always energizing to spend an evening with dentists who have big dreams and a team ready to help realize them.

Dr. Michael Njo was honored to autograph his book, *Dental Practice Transitions Handbook*, during the evening.

The Practice Blueprint dinner followed on August 27 at Fats Asia Bistro in Roseville. [Read the Roseville recap](/blog/practice-blueprint-roseville-aug-2026).

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
  {
    id: 49,
    title: "FOUND: Dr. Anissa Broussard's New Book",
    excerpt:
      "My friend Dr. Anissa Broussard just launched her book FOUND, and if you're in dental or healthcare, you need this.",
    category: "Community Impact",
    date: "2026-08-06",
    readTime: "1 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "found-anissa-broussard-book-launch",
    author: "Practice Transitions Institute",
    metaTitle: "FOUND by Dr. Anissa Broussard | PTI",
    metaDescription:
      "Dr. Michael Njo celebrates the launch of FOUND by Dr. Anissa Broussard, on how AI is quietly choosing which practices get recommended to patients.",
    featuredImage: "/lovable-uploads/drnjo-2026/found-book-launch-anissa-broussard.webp",
    featuredImageAlt:
      "Dr. Michael Njo and Dr. Anissa Broussard holding a copy of her book FOUND on a staircase",
    featuredImageCaption:
      "Dr. Michael Njo with Dr. Anissa Broussard and her new book, FOUND.",
    featuredImageFit: "contain",
    featuredImageAspect: "portrait",
    featuredImageWidth: 1068,
    featuredImageHeight: 1600,
    content: `My friend Dr. Anissa Broussard just launched her book FOUND this week, and if you're in dental or healthcare, you need this.

It's about how AI is quietly choosing which practices get recommended to patients, and which ones get skipped entirely. The window to get ahead of this is open right now.

Go grab it today: [digitalfloss.com/found](http://www.digitalfloss.com/found)

<div style="margin:1.5rem 0;"><img src="/lovable-uploads/drnjo-2026/found-book-launch-anissa-broussard.webp" alt="Dr. Michael Njo and Dr. Anissa Broussard holding a copy of her book FOUND on a staircase" style="width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>`,
  },
  {
    id: 48,
    title: "Backstage Retreat 2026 in Orlando",
    excerpt:
      "An amazing time in Florida with fellow Key Opinion Leaders working on making our industry great, including a book signing with all 29 authors under one roof.",
    category: "Community Impact",
    date: "2026-08-03",
    dateModified: "2026-08-18",
    readTime: "1 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "backstage-retreat-2026-orlando",
    author: "Practice Transitions Institute",
    metaTitle: "Backstage Retreat 2026 in Orlando | PTI",
    metaDescription:
      "Dr. Michael Njo at the Backstage Retreat 2026 in Orlando: a book signing with 29 authors and Key Opinion Leaders, plus a day of fun at Disney World.",
    featuredImage: "/lovable-uploads/drnjo-2026/backstage-retreat-2026-book-signing.webp",
    featuredImageAlt:
      "Backstage Retreat 2026 book signing in Orlando on July 30, 2026, with contributing authors holding copies of The Dental Exit Blueprint",
    featuredImageCaption:
      "Backstage Retreat 2026 book signing, Orlando, July 30, 2026.",
    featuredImageFit: "contain",
    featuredImageWidth: 1600,
    featuredImageHeight: 854,
    content: `Orlando Retreat: an amazing time in Florida with fellow Key Opinion Leaders working on making our industry great!

How exciting to have all 29 authors and Key Opinion Leaders under one roof for a book signing. What great energy and great talent in one room. Dr. Njo is a contributing author to *The Dental Exit Blueprint*, with two chapters in the book: "Know Your Exit Options" and "Plan What Comes Next."

<div style="margin:1.5rem 0;"><img src="/lovable-uploads/drnjo-2026/backstage-retreat-2026-book-signing.webp" alt="Backstage Retreat 2026 book signing in Orlando on July 30, 2026, with contributing authors holding copies of The Dental Exit Blueprint" style="width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>

Experiencing one of the three core values of the Backstage Mastermind: abundance, kindness, and fun. Fun at Disney World with fellow members.

<div style="margin:1.5rem 0;"><img src="/lovable-uploads/drnjo-2026/backstage-disney-world-2026.webp" alt="Dr. Michael Njo with three fellow Backstage Mastermind members holding tickets outside at Disney World" style="width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>`,
  },
  {
    id: 50,
    title: "Featured in Dental Lifestyles Magazine",
    excerpt:
      "Beyond Brokerage: Dr. Michael Njo's Whole-Person Approach to Dental Practice Transitions, by Dr. Glenn Vo in the Summer 2026 issue of Dental Lifestyles Magazine.",
    category: "Community Impact",
    date: "2026-07-20",
    readTime: "2 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "dental-lifestyles-magazine-beyond-brokerage",
    author: "Practice Transitions Institute",
    metaTitle: "Dr. Njo in Dental Lifestyles Magazine | PTI",
    metaDescription:
      "Dr. Glenn Vo profiles Dr. Michael Njo's whole-person approach to dental practice transitions in the Summer 2026 issue of Dental Lifestyles Magazine.",
    featuredImage: "/lovable-uploads/drnjo-2026/dental-lifestyles-summer-2026-feature-p25.webp",
    featuredImageAlt:
      "Dental Lifestyles Magazine feature 'Beyond Brokerage: Dr. Michael Njo's Whole-Person Approach to Dental Practice Transitions' by Dr. Glenn Vo",
    featuredImageCaption:
      "Dental Lifestyles Magazine, Summer 2026 (15th issue), page 25.",
    featuredImageFit: "contain",
    featuredImageAspect: "portrait",
    featuredImageWidth: 1082,
    featuredImageHeight: 1400,
    content: `Dr. Michael Njo is featured in the Summer 2026 issue of *Dental Lifestyles Magazine* (15th issue). In "Beyond Brokerage: Dr. Michael Njo's Whole-Person Approach to Dental Practice Transitions," Editor-in-Chief Dr. Glenn Vo tells the story of how a cervical spine injury ended Dr. Njo's clinical career, and how that transition became the foundation for Dental Strategies, Healthcare Strategies, and the Practice Transitions Institute.

The article covers why Dr. Njo's work goes "beyond brokerage": the difference between a sale and a transition, the advisors and great teams he learned about from his father, and why he keeps showing up for the next generation of dentists.

<div class="magazine-pages" style="display:grid;gap:1rem;margin:1.5rem 0;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));align-items:start;"><img src="/lovable-uploads/drnjo-2026/dental-lifestyles-summer-2026-cover.webp" alt="Cover of Dental Lifestyles Magazine, Summer 2026, listing the feature on Dr. Michael Njo's whole-person approach to dental practice transitions" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /><img src="/lovable-uploads/drnjo-2026/dental-lifestyles-summer-2026-feature-p25.webp" alt="Page 25 of Dental Lifestyles Magazine: Beyond Brokerage, by Dr. Glenn Vo" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /><img src="/lovable-uploads/drnjo-2026/dental-lifestyles-summer-2026-feature-p26.webp" alt="Page 26 of Dental Lifestyles Magazine: the continuation of Beyond Brokerage" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>

Thank you to Dr. Glenn Vo and Dental Lifestyles Magazine for the feature.`,
  },
  {
    id: 51,
    title: "Another Great Seminar in San Francisco",
    excerpt:
      "Another great seminar with dentists who care about their legacy: Mastering Your Dental Transition, July 2026 in San Francisco.",
    category: "Community Impact",
    date: "2026-07-19",
    readTime: "1 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "san-francisco-seminar-july-2026",
    author: "Practice Transitions Institute",
    metaTitle: "San Francisco Seminar, July 2026 | PTI",
    metaDescription:
      "Recap of the July 2026 Mastering Your Dental Transition seminar in San Francisco, with attendee feedback and photos from the room.",
    featuredImage: "/lovable-uploads/drnjo-2026/sf-seminar-jul-2026-presenting.webp",
    featuredImageAlt:
      "Dr. Michael Njo presenting Mastering Your Dental Transition to dentists seated around a boardroom table at the July 2026 San Francisco seminar",
    featuredImageCaption:
      "Dr. Njo presenting Mastering Your Dental Transition in San Francisco.",
    featuredImageFit: "contain",
    featuredImageAspect: "portrait",
    featuredImageWidth: 1200,
    featuredImageHeight: 1600,
    content: `Another great seminar with dentists who care about their legacy! Some of what attendees shared:

> "This was a comprehensive, informative meeting... so much information... delivered in an entertaining manner. Thanks to Dr. Njo for not making me fall asleep."

> "5 stars. Every dentist who cares about their practice legacy should attend."

> "As a buyer there was so much information I had no clue about. Six hours went by fast. I will schedule a call to discuss my future and options with you."

<div class="seminar-photos" style="display:grid;gap:1rem;margin:1.5rem 0;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));align-items:start;"><img src="/lovable-uploads/drnjo-2026/sf-seminar-jul-2026-presenting.webp" alt="Dr. Michael Njo presenting Mastering Your Dental Transition at the July 2026 San Francisco seminar" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /><img src="/lovable-uploads/drnjo-2026/sf-seminar-jul-2026-attendees.webp" alt="Group photo of dentists attending the July 2026 San Francisco seminar, shown on the conference room display" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /><img src="/lovable-uploads/drnjo-2026/sf-seminar-jul-2026-duo.webp" alt="Dr. Michael Njo standing with a colleague holding seminar materials at the San Francisco seminar venue" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>

See upcoming seminar dates on the [events page](/events).`,
  },
  {
    id: 52,
    title: "My First Backstage Mastermind Retreat in Dallas",
    excerpt:
      "I just attended my first Backstage Mastermind Retreat in Dallas, and I am still processing what an incredible experience it was.",
    category: "Community Impact",
    date: "2026-06-01",
    readTime: "2 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "backstage-mastermind-dallas-retreat",
    author: "Practice Transitions Institute",
    metaTitle: "Backstage Mastermind Retreat in Dallas | PTI",
    metaDescription:
      "Dr. Michael Njo reflects on his first Backstage Mastermind Retreat in Dallas: generosity, wisdom, and a community of entrepreneurs helping one another succeed.",
    featuredImage: "/lovable-uploads/drnjo-2026/backstage-launch-pod-dallas-2026.webp",
    featuredImageAlt:
      "Dr. Michael Njo with fellow Backstage Mastermind members in matching Launch Pod shirts at the Dallas retreat",
    featuredImageCaption:
      "The Launch Pod group at the Backstage Mastermind Retreat in Dallas.",
    featuredImageFit: "contain",
    featuredImageWidth: 1600,
    featuredImageHeight: 1136,
    content: `I just attended my first Backstage Mastermind Retreat in Dallas, and I am still processing what an incredible experience it was.

To be honest, I didn't know exactly what to expect. What unfolded over the weekend exceeded every expectation I had. The generosity, wisdom, and willingness of successful entrepreneurs to openly share their ideas, experiences, and support was truly remarkable. Being surrounded by some of the brightest minds, all committed to helping one another succeed, was both inspiring and humbling.

What struck me most was the intentionality behind this community. The way this group has been carefully cultivated is both artful and powerful. From the moment I arrived, it was clear that everyone shared a common set of values, values that were not merely spoken, but genuinely lived. Over the course of several days, we learned together, collaborated together, and supported one another in ways that were deeply meaningful.

<div style="margin:1.5rem 0;"><img src="/lovable-uploads/drnjo-2026/backstage-launch-pod-dallas-2026.webp" alt="Dr. Michael Njo with fellow Backstage Mastermind members in matching Launch Pod shirts at the Dallas retreat" style="width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>

Thank you to the Backstage community for an unforgettable pod session.`,
  },
  {
    id: 53,
    title: "Dugoni Business Club: Symposium, Alumni Evening, and Celebration Lunch",
    excerpt:
      "Highlights from the Dugoni Business Club: the symposium and its industry sponsors, an alumni evening, a celebration lunch, and a round of golf before finals.",
    category: "Community Impact",
    date: "2026-04-12",
    readTime: "2 min read",
    gradient: "bg-gradient-to-br from-primary via-sky-600 to-emerald-500",
    slug: "dugoni-business-club-highlights",
    author: "Practice Transitions Institute",
    metaTitle: "Dugoni Business Club Highlights | PTI",
    metaDescription:
      "Dr. Michael Njo with the Dugoni Business Club: symposium, industry sponsors, alumni evening, celebration lunch, and golf with club leadership.",
    featuredImage: "/lovable-uploads/drnjo-2026/dugoni-symposium-2023-keynote.webp",
    featuredImageAlt:
      "Dr. Michael Njo speaking at the podium during the Dugoni Business Club Symposium",
    featuredImageCaption:
      "Speaking at the Dugoni Business Club Symposium.",
    featuredImageFit: "contain",
    featuredImageAspect: "portrait",
    featuredImageWidth: 1200,
    featuredImageHeight: 1600,
    content: `Dugoni Business Club Symposium. Thank you to our industry sponsors!

<div class="dugoni-photos" style="display:grid;gap:1rem;margin:1.5rem 0;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));align-items:start;"><img src="/lovable-uploads/drnjo-2026/dugoni-symposium-2023-keynote.webp" alt="Dr. Michael Njo speaking at the podium during the Dugoni Business Club Symposium" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /><img src="/lovable-uploads/drnjo-2026/dugoni-symposium-2023-sponsors.webp" alt="Dr. Michael Njo with two industry sponsor representatives at the Dugoni Business Club Symposium vendor fair" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /><img src="/lovable-uploads/drnjo-2026/dugoni-symposium-2023-sponsor-team.webp" alt="Industry sponsor representatives gathered at the Dugoni Business Club Symposium vendor fair" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>

Great evening at the Dugoni Alumni meeting with Business Club members.

<div class="dugoni-photos" style="display:grid;gap:1rem;margin:1.5rem 0;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));align-items:start;"><img src="/lovable-uploads/drnjo-2026/dugoni-business-club-dinner.webp" alt="Dr. Michael Njo at a long restaurant table with Dugoni Business Club members during an alumni evening" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /><img src="/lovable-uploads/drnjo-2026/dugoni-business-club-members.webp" alt="Dr. Michael Njo standing with three Dugoni Business Club student members inside the Arthur A. Dugoni School of Dentistry" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>

Alumni Reunion! Great seeing, and now working with, my colleagues and classmates. What a privilege to help them with their transitions and their businesses!

<div style="margin:1.5rem 0;"><img src="/lovable-uploads/drnjo-2026/dugoni-alumni-gala-table.webp" alt="Dr. Michael Njo with Pacific Dugoni alumni colleagues and classmates in formal attire gathered around a table at an Alumni Association evening" style="width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>

Celebration lunch for another great year. Proud to be your advisor and consultant! And supporting the leadership at the Dugoni Business Club with a nice round of golf and down time before finals.

<div class="dugoni-photos" style="display:grid;gap:1rem;margin:1.5rem 0;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));align-items:start;"><img src="/lovable-uploads/drnjo-2026/dugoni-business-club-celebration-lunch.webp" alt="Dr. Michael Njo with a large group of Dugoni Business Club members at a celebration lunch" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /><img src="/lovable-uploads/drnjo-2026/dugoni-business-club-golf.webp" alt="Dr. Michael Njo seated at a clubhouse table with four Dugoni Business Club leaders after a round of golf" style="display:block;width:100%;height:auto;object-fit:contain;border-radius:1rem;" /></div>`,
  },
];
