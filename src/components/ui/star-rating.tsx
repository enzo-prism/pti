import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
  showRatingNumber?: boolean;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  className,
  showRatingNumber = true 
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, index) => (
          <Star
            key={index}
            className={cn(
              "h-4 w-4",
              index < rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            )}
          />
        ))}
      </div>
      {showRatingNumber && (
        <span className="text-sm text-gray-600 ml-1">
          {rating}.0 out of {maxRating} stars
        </span>
      )}
    </div>
  );
}