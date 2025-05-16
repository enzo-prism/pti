
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Link } from "react-router-dom";

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
}: RecommendationCardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6 md:p-8", className)}>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        <img
          src={imageUrl}
          alt={name}
          className="w-40 h-40 object-cover rounded-lg shadow-md mx-auto md:mx-0"
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
            <Button variant="outline" className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <Link to={videoUrl}>Watch the Interview</Link>
            </Button>
          )}
          
          {bookImage && bookUrl && (
            <div className="border border-gray-200 rounded-lg p-4 mt-5">
              <div className="flex items-start gap-4">
                <img 
                  src={bookImage} 
                  alt={bookTitle || "Book cover"} 
                  className="w-24 h-auto object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg mb-1">{bookTitle}</h4>
                  <p className="text-sm text-gray-600 mb-2">{bookDescription}</p>
                  <Button asChild variant="outline" className="w-full mt-2">
                    <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                      View Book on Amazon
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
