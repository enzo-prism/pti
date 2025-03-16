
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  className?: string;
  imageUrl?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  className,
  imageUrl,
}: TestimonialCardProps) {
  return (
    <div className={cn(
      "bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full animate-fade-in",
      className
    )}>
      <Quote className="text-primary mb-4 h-8 w-8 opacity-60" />
      <blockquote className="mb-6 flex-grow">
        <p className="text-gray-700 italic">{quote}</p>
      </blockquote>
      <div className="flex items-center">
        {imageUrl && (
          <div className="mr-4">
            <img 
              src={imageUrl} 
              alt={author} 
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-medium text-gray-900">{author}</p>
          {(role || company) && (
            <p className="text-sm text-gray-500">
              {role}{role && company && ", "}{company}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
