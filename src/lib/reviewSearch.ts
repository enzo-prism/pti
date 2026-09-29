import type { ReviewRecord } from "@/data/reviews";
import {
  REVIEW_CATEGORY_LABELS,
  REVIEW_SOURCE_LABELS,
} from "@/data/reviewLabels";

export const normalizeReviewSearch = (query: string): string =>
  query.trim().toLowerCase();

export const matchesReviewSearch = (
  review: ReviewRecord,
  normalizedQuery: string
): boolean => {
  if (!normalizedQuery) return true;

  const haystack = [
    review.quote,
    review.sourceAuthorName,
    review.displayAuthorName,
    review.role,
    review.company,
    REVIEW_SOURCE_LABELS[review.source],
    REVIEW_CATEGORY_LABELS[review.category],
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedQuery);
};
