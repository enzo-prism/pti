// Display labels live apart from reviews.ts so client components can use them
// without bundling every review quote.
import type { ReviewCategory, ReviewSource } from "./reviews";

export const REVIEW_SOURCE_LABELS: Record<ReviewSource, string> = {
  google: "Google",
  amazon: "Amazon",
  alignable: "Alignable",
  internal: "Provided directly",
};

export const REVIEW_CATEGORY_LABELS: Record<ReviewCategory, string> = {
  buyer: "Buyer",
  seller: "Seller",
  associateship: "Associateship",
  workshop: "Workshop",
  valuation: "Valuation",
  consulting: "Consulting",
  book: "Book Review",
};
