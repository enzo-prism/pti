import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { communityImpactPosts } from "./communityImpactPosts";
import { getBlogMetaDescription, getBlogMetaTitle } from "./blogPosts";

describe("community impact posts", () => {
  it("lists the Beyond the Chair Anaheim flyer post without overstating availability", () => {
    const post = communityImpactPosts[0];

    expect(post).toMatchObject({
      id: 44,
      slug: "dental-practice-beyond-the-chair-anaheim",
      date: "2026-08-24",
      featuredImage: "/lovable-uploads/drnjo-2026/promotional-flyer-dental-strategies.webp",
      featuredImageFit: "contain",
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

  it("separates the August 14 recap from the upcoming Roseville dinner", () => {
    const post = communityImpactPosts.find(
      (candidate) => candidate.slug === "panel-of-experts-dinner-roseville"
    );

    expect(post).toBeDefined();
    expect(post?.date).toBe("2026-08-14");
    expect(post?.dateModified).toBe("2026-08-21");
    expect(post?.content).toContain("August 27, 2026");
    expect(post?.content).toContain("6:00–9:00 PM");
    expect(post?.content).toContain("Fats Asia Bistro");
    expect(post?.content).toContain("confirm current seat availability");
    expect(post?.content).not.toMatch(/sold out/i);
    expect(post?.content).not.toMatch(/registration is open/i);
  });

  it("keeps the portrait dinner photos uncropped", () => {
    const post = communityImpactPosts.find(
      (candidate) => candidate.slug === "panel-of-experts-dinner-roseville"
    );

    expect(post?.featuredImageFit).toBe("contain");
    expect(post?.content).not.toContain("object-fit:cover");
    expect(post?.content.match(/object-fit:contain/g)).toHaveLength(3);
  });

  it("uses a direct availability inquiry without publishing a volatile seat count", () => {
    const post = communityImpactPosts.find(
      (candidate) => candidate.slug === "panel-of-experts-dinner-roseville"
    );

    expect(post?.cta).toMatchObject({
      eyebrow: "Upcoming Roseville event",
      eventName: "the_practice_blueprint_dinner",
      bookingLabel: "Confirm availability",
      bookingUrl:
        "mailto:info@practicetransitions.com?subject=Roseville%20Dinner%20Availability",
    });
    expect(JSON.stringify(post)).not.toMatch(/9 confirmed|nine confirmed/i);
    expect(JSON.stringify(post)).not.toContain("docs.google.com/forms");
  });
});
