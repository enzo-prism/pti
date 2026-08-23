import { describe, expect, it } from "vitest";
import { communityImpactPosts } from "./communityImpactPosts";

describe("community impact posts", () => {
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
