
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import { CSSProperties } from "react";
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  className?: string;
  imageUrl?: string;
  style?: CSSProperties;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  className,
  imageUrl,
  style,
}: TestimonialCardProps) {
  return (
    <div className={cn(
      "bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full animate-fade-in",
      className
    )}
    style={style}>
      <Quote className="text-primary mb-3 h-6 w-6 opacity-60" />
      <blockquote className="mb-4 flex-grow">
        <p className="text-gray-700 italic text-sm md:text-base line-clamp-6 md:line-clamp-none">{quote}</p>
      </blockquote>
      <div className="flex items-center">
        {imageUrl && (
          <div className="mr-3">
            <Image
              src={imageUrl}
              alt={author}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-medium text-gray-900 text-sm md:text-base">{author}</p>
          {(role || company) && (
            <p className="text-xs md:text-sm text-gray-500">
              {role}{role && company && ", "}{company}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
