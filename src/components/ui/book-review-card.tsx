import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { AmazonReview } from "@/data/amazonReviews";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface BookReviewCardProps {
  review: AmazonReview;
  className?: string;
  style?: CSSProperties;
}

export function BookReviewCard({ review, className, style }: BookReviewCardProps) {
  return (
    <div className={cn(
      "bg-white p-6 rounded-lg border border-gray-200 shadow-sm",
      className
    )}
    style={style}>
      {/* Header with rating and verification */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <StarRating rating={review.rating} showRatingNumber={false} />
          <h3 className="font-semibold text-gray-900 mt-2 mb-1">
            {review.reviewTitle}
          </h3>
        </div>
        {review.isVerifiedPurchase && (
          <Badge variant="secondary" className="text-xs">
            Verified Purchase
          </Badge>
        )}
      </div>

      {/* Review text */}
      <blockquote className="text-gray-700 mb-4 text-sm leading-relaxed">
        "{review.reviewText}"
      </blockquote>

      {/* Reviewer info and date */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium">{review.reviewerName}</span>
        <span>Reviewed on {review.reviewDate}</span>
      </div>

      {/* Amazon branding */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Amazon Review</span>
          <div className="flex-1 border-t border-gray-100"></div>
        </div>
      </div>
    </div>
  );
}