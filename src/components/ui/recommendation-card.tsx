
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { BookReviewCard } from "./book-review-card";
import { amazonBookReviews } from "@/data/amazonReviews";

interface RecommendationCardProps {
  className?: string;
  imageUrl: string;
  name: string;
  title: string;
  subtitle?: string;
  bio?: string[];
  hasNewInfo?: boolean;
  quote?: string;
  videoUrl?: string;
  bookUrl?: string;
  bookImage?: string;
  bookTitle?: string;
  bookDescription?: string;
  showAmazonReviews?: boolean;
}

export function RecommendationCard({
  className,
  imageUrl,
  name,
  title,
  subtitle,
  bio = [],
  hasNewInfo = false,
  quote,
  videoUrl,
  bookUrl,
  bookImage,
  bookTitle,
  bookDescription,
  showAmazonReviews = false,
}: RecommendationCardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6 md:p-8", className)}>
      <div className="flex flex-col gap-6">
        <img
          src={imageUrl}
          alt={name}
          className="w-40 h-48 object-cover object-top rounded-lg shadow-md mx-auto"
        />
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-semibold mb-1">{name}</h3>
          <p className="text-gray-700 font-medium mb-1">{title}</p>
          {subtitle && <p className="text-primary font-medium mb-4">{subtitle}</p>}
          
          {bio && bio.length > 0 && (
            <div className="space-y-4 mb-4">
              {bio.map((paragraph, index) => (
                <p 
                  key={index} 
                  className={cn(
                    "text-gray-600 text-base leading-relaxed",
                    index === 1 && hasNewInfo && "bg-accent/20 border-l-4 border-primary p-2 rounded"
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          
          {quote && (
            <blockquote className="text-gray-600 italic text-lg leading-relaxed mb-4">
              "{quote}"
            </blockquote>
          )}
          
          {videoUrl && (
            <Button variant="outline" className="flex items-center gap-2 mb-4 w-full sm:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                Watch the Interview
              </a>
            </Button>
          )}
          
          {bookImage && bookUrl && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <img 
                    src={bookImage} 
                    alt={bookTitle || "Book cover"} 
                    className="w-20 h-auto object-cover rounded shadow-sm"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">{bookTitle}</h4>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{bookDescription}</p>
                  <Button asChild variant="default" size="sm" className="w-full sm:w-auto">
                    <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                      View on Amazon
                    </a>
                  </Button>
                </div>
              </div>

              {/* Amazon Reviews Section */}
              {showAmazonReviews && amazonBookReviews.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h5 className="text-md font-semibold text-gray-900 mb-4">
                    What Amazon Readers Say
                  </h5>
                  <div className="grid gap-4">
                    {amazonBookReviews.slice(0, 2).map((review) => (
                      <BookReviewCard 
                        key={review.id} 
                        review={review}
                        className="bg-white"
                      />
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <a
                      href={bookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      Read all reviews on Amazon →
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
