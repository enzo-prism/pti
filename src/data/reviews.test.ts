import { describe, expect, it } from "vitest";
import {
  getAllReviewSlugs,
  getFeaturedReviews,
  getReviewAggregate,
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

  it("computes aggregate rating and count from unified records", () => {
    const aggregate = getReviewAggregate(reviews);
    expect(aggregate).toEqual({
      ratingValue: 4.97,
      reviewCount: 35,
    });
  });

  it("returns featured slots in deterministic order", () => {
    const homeReviews = getFeaturedReviews("home");
    expect(homeReviews.map((review) => review.id)).toEqual([
      "google-ah-g-allen-herrera",
      "google-blaine-leeds",
      "google-tony-choi",
    ]);
  });
});
