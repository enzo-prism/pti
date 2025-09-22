export interface Update {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author?: string;
}

export const updates: Update[] = [
  {
    id: "1",
    slug: "dugoni-business-club-donation",
    title: "Dugoni Business Club Donates $1,000 to Support Students in Need",
    date: "September 3, 2025",
    excerpt: "The Dugoni Business Club (DBC) proudly donated $1,000 to the Arthur A. Dugoni Annual Fund, supporting students facing financial need.",
    featuredImage: "/lovable-uploads/18b2244b-dbb5-4dd6-a1ca-c6a28fed53c6.png",
    author: "PTI News Team",
    content: `
**September 3, 2025 — San Francisco, CA**

The Dugoni Business Club (DBC) proudly donated $1,000 to the Arthur A. Dugoni Annual Fund, a fund that supports students at the Dugoni School of Dentistry — particularly those facing financial need.

## What is the Dugoni Business Club?

The Dugoni Business Club is dedicated to empowering business-minded dental students by equipping them with the skills, knowledge, and mindset necessary for success beyond the clinical setting. The club's mission is to elevate the dental school experience by fostering leadership, innovation, and business acumen.

While the Dugoni School is known for producing outstanding clinicians, DBC aims to add another layer of excellence — preparing students to become exceptional business owners and practice leaders. Through activities such as individualized future planning, real-world case studies, and hands-on business training, DBC members gain a competitive edge as future entrepreneurs in dentistry.

DBC members are open-minded, driven, and enthusiastic students — many of whom aspire to be among the next generation of "Dental 500" elite practice owners.

## Why did DBC choose to give?

Dr. Michael Njo, faculty advisor to the DBC, shared:

*"In our mission to cultivate leadership and values, it's important to give — through time, talent, and treasure, as Dean Nadershahi often reminded us. Our students have already given their time and talents, and now, we're proud to contribute financially as well. This gift reflects our commitment to giving back and our desire to support fellow students. We hope to make this an annual tradition."*

Delara Fotovatja, President of the DBC, added:

*"Serving as President of the DBC has challenged me to think strategically about how the club can best support students in navigating both the clinical and business sides of dentistry. I'm proud that we're not only helping educate future leaders but also finding ways to give back to our dental school community. It's truly an honor to represent the DBC."*

## A Moment of Gratitude

Dean Chavez personally received the donation from the club and shared a heartfelt memory with the members:

*"When I was a dental student, I was once called into the Financial Aid Office and unexpectedly awarded $1,000. I know first-hand how much the support that you are providing will mean to someone. My sincere thanks to each of you and DBC for looking out for your colleagues in this way."*

This generous donation demonstrates the values that Dr. Njo instills in his students — the importance of giving back to their community and supporting future generations of dental professionals.
    `
  }
];

export function getUpdateBySlug(slug: string): Update | undefined {
  return updates.find(update => update.slug === slug);
}

export function getLatestUpdate(): Update | null {
  return updates.length > 0 ? updates[0] : null;
}