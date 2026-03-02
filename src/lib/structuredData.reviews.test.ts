import { describe, expect, it } from "vitest";
import { reviews } from "@/data/reviews";
import {
  buildAggregateRatingSchema,
  buildReviewItemListSchema,
  buildReviewSchema,
} from "./structuredData";

describe("review structured data builders", () => {
  it("builds a Review schema with required fields", () => {
    const review = reviews.find((record) => record.source === "google");
    expect(review).toBeTruthy();
    if (!review) return;

    const schema = buildReviewSchema(review, `/testimonials/${review.slug}`);
    expect(schema["@type"]).toBe("Review");
    expect(schema.reviewBody).toBe(review.quote);
    expect(schema.author).toMatchObject({
      "@type": "Person",
      name: review.sourceAuthorName,
    });
    expect(schema.reviewRating).toMatchObject({
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    });
  });

  it("includes datePublished only for records with exact source dates", () => {
    const datedReview = reviews.find((record) => record.sourceDateISO);
    expect(datedReview).toBeTruthy();
    if (!datedReview) return;

    const schema = buildReviewSchema(
      datedReview,
      `/testimonials/${datedReview.slug}`
    );
    expect(schema.datePublished).toBe(datedReview.sourceDateISO);
  });

  it("builds an ItemList schema for review directories", () => {
    const schema = buildReviewItemListSchema(reviews, "/testimonials");
    expect(schema).toBeTruthy();
    if (!schema) return;

    expect(schema["@type"]).toBe("ItemList");
    expect(schema.numberOfItems).toBe(reviews.length);
    expect(Array.isArray(schema.itemListElement)).toBe(true);

    const firstItem = (schema.itemListElement as Array<Record<string, unknown>>)[0];
    expect(firstItem.position).toBe(1);
    expect(typeof firstItem.url).toBe("string");
  });

  it("builds an AggregateRating schema from all reviews", () => {
    const schema = buildAggregateRatingSchema(reviews);
    expect(schema).toBeTruthy();
    if (!schema) return;

    expect(schema["@type"]).toBe("AggregateRating");
    expect(schema.reviewCount).toBe(35);
    expect(schema.ratingValue).toBe(4.97);
  });
});
