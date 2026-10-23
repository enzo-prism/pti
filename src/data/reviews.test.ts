import { describe, expect, it } from "vitest";
import {
  getAllReviewSlugs,
  getFeaturedReviews,
  getReviewBySlug,
  reviews,
} from "./reviews";

describe("reviews dataset", () => {
  it("has unique ids", () => {
    const ids = reviews.map((review) => review.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique slugs", () => {
    const slugs = getAllReviewSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves every slug to a review", () => {
    for (const slug of getAllReviewSlugs()) {
      expect(getReviewBySlug(slug)?.slug).toBe(slug);
    }
  });

  it("sorts the newest undated Google review first", () => {
    expect(reviews[0]?.id).toBe("google-valentina-holina");
    expect(reviews[1]?.id).toBe("google-tanya-harris");
  });

  it("keeps Valentina Holina's Google review quote-only with source paragraphs", () => {
    const review = reviews.find((item) => item.id === "google-valentina-holina");
    expect(review).toMatchObject({
      slug: "valentina-holina-practice-sale",
      source: "google",
      category: "seller",
      rating: 5,
      sourceAuthorName: "Valentina Holina",
      displayAuthorName: "Valentina Holina",
      role: "Practice Seller",
      sortOrder: -2,
    });
    expect(review?.sourceUrl).toBeUndefined();
    expect(review?.sourceDateISO).toBeUndefined();
    expect(review?.quote.split("\n\n")).toEqual([
      "Michael Njo is truly a miracle worker!",
      "His dedication, connections, and incredible tenacity are what set him apart. He knows how to get things done, overcome obstacles, and guide his clients across the finish line, no matter how challenging the journey becomes.",
      "Throughout the entire process of selling my dental practice, Michael demonstrated extraordinary patience, wisdom, professionalism, and knowledge. He was always there to offer guidance, reassurance, and support, practically holding my hand every step of the way.",
      "What makes Michael truly special is that he genuinely cares about his clients and never gives up on them. His experience, determination, and ability to make things happen are simply remarkable.",
      "If you are looking for someone who will go above and beyond to get you to the finish line, Michael Njo is the person you want by your side. I cannot recommend him highly enough!",
    ]);
  });

  it("returns featured slots in deterministic order", () => {
    const homeReviews = getFeaturedReviews("home");
    expect(homeReviews.map((review) => review.id)).toEqual([
      "google-ah-g-allen-herrera",
      "google-blaine-leeds",
      "google-tony-choi",
    ]);
  });

  it("uses distinct story titles for repeated first-name reviewers", () => {
    for (const author of ["Christina", "Lois", "Michelle"]) {
      const repeated = reviews.filter(
        (review) => review.displayAuthorName === author
      );
      expect(repeated.length).toBeGreaterThan(1);
      expect(repeated.every((review) => Boolean(review.storyTitle))).toBe(true);
      expect(new Set(repeated.map((review) => review.storyTitle)).size).toBe(
        repeated.length
      );
    }
  });
});
