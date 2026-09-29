import { describe, expect, it } from "vitest";
import { reviews } from "@/data/reviews";
import { matchesReviewSearch, normalizeReviewSearch } from "./reviewSearch";

describe("review search", () => {
  it("finds an author despite pasted spaces and mixed case", () => {
    const query = normalizeReviewSearch("  tAnYa HaRrIs  ");
    expect(reviews.filter((review) => matchesReviewSearch(review, query)).map(
      (review) => review.id
    )).toEqual(["google-tanya-harris"]);
  });

  it("treats whitespace-only searches as no filter", () => {
    const query = normalizeReviewSearch(" \t\n ");
    expect(query).toBe("");
    expect(reviews.every((review) => matchesReviewSearch(review, query))).toBe(true);
  });

  it("searches the associateship category and source labels", () => {
    const tanya = reviews.find((review) => review.id === "google-tanya-harris")!;
    expect(matchesReviewSearch(tanya, normalizeReviewSearch("Associateship"))).toBe(true);
    expect(matchesReviewSearch(tanya, normalizeReviewSearch("Google"))).toBe(true);
  });
});
