import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { communityImpactPosts } from "./communityImpactPosts";
import { getBlogMetaDescription, getBlogMetaTitle } from "./blogPosts";

describe("community impact posts", () => {
  it("lists the Diana Fat Board of Regents congratulations without an event CTA", () => {
    const post = communityImpactPosts[0];

    expect(post).toMatchObject({
      id: 47,
      slug: "diana-fat-board-of-regents",
      date: "2026-08-28",
      category: "Community Impact",
      featuredImage: "/lovable-uploads/drnjo-2026/diana-fat-board-of-regents.webp",
      featuredImageFit: "contain",
      featuredImageAspect: "portrait",
      featuredImageWidth: 1003,
      featuredImageHeight: 1568,
    });
    expect(post.slug).not.toBe("practice-blueprint-roseville-aug-2026");
    expect(post.featuredImageAlt).toMatch(/diana fat/i);
    expect(post.featuredImageAlt).toMatch(/board of regents/i);
    expect(post.content).toContain(
      "I am so proud to congratulate my longtime client of more than 20 years, Dr. Diana Fat, a distinguished Sacramento prosthodontist, on her appointment to the University of the Pacific Board of Regents."
    );
    expect(post.content).toContain(
      "Diana continues to make a meaningful difference in dentistry, in her community, and now for our alma mater. Congratulations, Diana—this honor is so well deserved!"
    );
    expect(post.content).toContain(
      "#UniversityOfThePacific #BoardOfRegents #PacificProud #DentalLeadership"
    );
    expect(post.content).not.toContain("/lovable-uploads/drnjo-2026/diana-fat-board-of-regents.webp");
    expect(post.content).not.toContain("<img");
    expect(post.content).not.toContain("object-fit:contain");
    expect(post.content).not.toContain("object-fit:cover");
    expect(post.content).not.toMatch(/sold out/i);
    expect(post.content).not.toMatch(/registration is open/i);
    expect(post.content).not.toMatch(/510D6834-AEC4-4FC4-B40C-4238A9859E99/i);
    expect(post.cta).toBeUndefined();
    expect(JSON.stringify(post)).not.toMatch(/eventbrite|stripe|sold out|registration is open/i);
    expect(JSON.stringify(post)).not.toMatch(/upcoming Roseville event/i);
    expect(
      existsSync(
        resolve(process.cwd(), "public/lovable-uploads/drnjo-2026/diana-fat-board-of-regents.webp")
      )
    ).toBe(true);
    expect(
      existsSync(
        resolve(process.cwd(), "public/lovable-uploads/drnjo-2026/diana-fat-board-of-regents.png")
      )
    ).toBe(false);
    expect(getBlogMetaTitle(post).length).toBeLessThanOrEqual(60);
    expect(getBlogMetaDescription(post).length).toBeLessThanOrEqual(160);
  });

  it("lists the Practice Blueprint Roseville recap without an upcoming-event CTA", () => {
    const post = communityImpactPosts.find(
      (candidate) => candidate.slug === "practice-blueprint-roseville-aug-2026"
    );

    expect(post).toBeDefined();
    expect(post).toMatchObject({
      id: 46,
      slug: "practice-blueprint-roseville-aug-2026",
      date: "2026-08-28",
      category: "Community Impact",
      featuredImage: "/lovable-uploads/drnjo-2026/poe-roseville-aug-2026.webp",
      featuredImageFit: "contain",
      featuredImageAspect: "portrait",
      featuredImageWidth: 864,
      featuredImageHeight: 1821,
    });
    expect(post.slug).not.toBe("panel-of-experts-dinner-roseville");
    expect(post.featuredImageAlt).toMatch(/practice blueprint/i);
    expect(post.content).toContain(
      "Great night with great Dentists and referral partners! Thank you Provide, Patterson, Kohan, and Carr for including me at this vibrant event."
    );
    expect(post.content).toContain(
      "It is so fun to enjoy an evening with Dentists who have dreams and a team that can realize those dreams!"
    );
    expect(post.content).toContain(
      "Thank you to my dear friend, colleague, and long time client Dr. Diana Fat for welcoming us to her family restaurant."
    );
    expect(post.content).toContain("/lovable-uploads/drnjo-2026/poe-roseville-aug-2026.webp");
    expect(post.content).toContain("object-fit:contain");
    expect(post.content).not.toContain("object-fit:cover");
    expect(post.content).not.toMatch(/sold out/i);
    expect(post.content).not.toMatch(/registration is open/i);
    expect(post.content).not.toMatch(/510D6834-AEC4-4FC4-B40C-4238A9859E99/i);
    expect(post.cta).toBeUndefined();
    expect(JSON.stringify(post)).not.toMatch(/eventbrite|stripe|sold out|registration is open/i);
    expect(JSON.stringify(post)).not.toMatch(/upcoming Roseville event/i);
    expect(
      existsSync(
        resolve(process.cwd(), "public/lovable-uploads/drnjo-2026/poe-roseville-aug-2026.webp")
      )
    ).toBe(true);
    expect(
      existsSync(
        resolve(process.cwd(), "public/lovable-uploads/drnjo-2026/poe-roseville-aug-2026.png")
      )
    ).toBe(false);
    expect(getBlogMetaTitle(post).length).toBeLessThanOrEqual(60);
    expect(getBlogMetaDescription(post).length).toBeLessThanOrEqual(160);
  });

  it("lists the Bill and Mikki practice-match post without registration language", () => {
    const post = communityImpactPosts.find(
      (candidate) => candidate.slug === "another-perfect-match"
    );

    expect(post).toBeDefined();
    expect(post).toMatchObject({
      id: 45,
      slug: "another-perfect-match",
      date: "2026-08-25",
      featuredImage: "/lovable-uploads/drnjo-2026/bill-mikki-porch.webp",
      featuredImageFit: "contain",
      featuredImageAspect: "portrait",
      featuredImageWidth: 1199,
      featuredImageHeight: 1600,
    });
    expect(post.featuredImageAlt).toMatch(/brick house numbered 257/i);
    expect(post.content).toContain("Bill and Mikki");
    expect(post.content).toContain("Dugoni Business Club");
    expect(post.content).toContain("/lovable-uploads/drnjo-2026/bill-mikki-porch.webp");
    expect(post.content).toContain("/lovable-uploads/drnjo-2026/bill-mikki-trio.webp");
    expect(post.content).toContain("object-fit:contain");
    expect(post.content).not.toContain("object-fit:cover");
    expect(post.content).not.toMatch(/sold out/i);
    expect(post.content).not.toMatch(/registration is open/i);
    expect(post.cta).toBeUndefined();
    expect(JSON.stringify(post)).not.toMatch(/eventbrite|stripe|sold out|registration is open/i);
    expect(
      existsSync(resolve(process.cwd(), "public/lovable-uploads/drnjo-2026/bill-mikki-porch.webp"))
    ).toBe(true);
    expect(
      existsSync(resolve(process.cwd(), "public/lovable-uploads/drnjo-2026/bill-mikki-trio.webp"))
    ).toBe(true);
    expect(getBlogMetaTitle(post).length).toBeLessThanOrEqual(60);
    expect(getBlogMetaDescription(post).length).toBeLessThanOrEqual(160);
  });

  it("lists the Beyond the Chair Anaheim flyer post without overstating availability", () => {
    const post = communityImpactPosts.find(
      (candidate) => candidate.slug === "dental-practice-beyond-the-chair-anaheim"
    );

    expect(post).toBeDefined();
    expect(post).toMatchObject({
      id: 44,
      slug: "dental-practice-beyond-the-chair-anaheim",
      date: "2026-08-24",
      featuredImage: "/lovable-uploads/drnjo-2026/promotional-flyer-dental-strategies.webp",
      featuredImageFit: "contain",
      featuredImageAspect: "portrait",
      featuredImageWidth: 1414,
      featuredImageHeight: 2000,
    });
    expect(post.featuredImageAlt).toMatch(/flyer/i);
    expect(post.content).toContain("September 25, 2026");
    expect(post.content).toContain("8:30 AM – 1:30 PM");
    expect(post.content).toContain("The Phillips Group");
    expect(post.content).toContain("2300 E. Katella Ave, Suite 405");
    expect(post.content).toContain("object-fit:contain");
    expect(post.content).not.toContain("object-fit:cover");
    expect(post.content).toContain("confirm a seat");
    expect(post.content).not.toMatch(/sold out/i);
    expect(post.content).not.toMatch(/registration is open/i);
    expect(post.cta).toMatchObject({
      bookingLabel: "Confirm a seat",
      bookingUrl:
        "mailto:info@practicetransitions.com?subject=Beyond%20the%20Chair%20Anaheim%20September%2025",
    });
    expect(JSON.stringify(post)).not.toMatch(/eventbrite|stripe|sold out|registration is open/i);
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "public/lovable-uploads/drnjo-2026/promotional-flyer-dental-strategies.webp"
        )
      )
    ).toBe(true);
    expect(getBlogMetaTitle(post).length).toBeLessThanOrEqual(60);
    expect(getBlogMetaDescription(post).length).toBeLessThanOrEqual(160);
  });

  it("archives the August 14 recap without promoting the completed Roseville dinner as upcoming", () => {
    const post = communityImpactPosts.find(
      (candidate) => candidate.slug === "panel-of-experts-dinner-roseville"
    );

    expect(post).toBeDefined();
    expect(post?.date).toBe("2026-08-14");
    expect(post?.dateModified).toBe("2026-08-30");
    expect(post?.cta).toBeUndefined();
    expect(post?.content).toContain("August 27");
    expect(post?.content).toContain("Fats Asia Bistro");
    expect(post?.content).toContain("/blog/practice-blueprint-roseville-aug-2026");
    expect(post?.content).not.toContain("confirm current seat availability");
    expect(post?.content).not.toContain("Next event:");
    expect(post?.excerpt).not.toMatch(/on August 27/i);
    expect(post?.content).not.toMatch(/sold out/i);
    expect(post?.content).not.toMatch(/registration is open/i);
  });

  it("keeps the portrait dinner photos uncropped", () => {
    const post = communityImpactPosts.find(
      (candidate) => candidate.slug === "panel-of-experts-dinner-roseville"
    );

    expect(post?.featuredImageFit).toBe("contain");
    expect(post?.featuredImageAspect).toBe("portrait");
    expect(post?.featuredImageWidth).toBe(1600);
    expect(post?.featuredImageHeight).toBe(2133);
    expect(post?.content).not.toContain("object-fit:cover");
    expect(post?.content.match(/object-fit:contain/g)).toHaveLength(3);
  });

  it("does not keep an availability CTA after the Roseville dinner has passed", () => {
    const post = communityImpactPosts.find(
      (candidate) => candidate.slug === "panel-of-experts-dinner-roseville"
    );

    expect(post?.cta).toBeUndefined();
    expect(JSON.stringify(post)).not.toMatch(/Upcoming Roseville event/i);
    expect(JSON.stringify(post)).not.toMatch(/9 confirmed|nine confirmed/i);
    expect(JSON.stringify(post)).not.toContain("docs.google.com/forms");
  });
});
