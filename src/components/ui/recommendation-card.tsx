
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  className?: string;
  imageUrl: string;
  name: string;
  title: string;
  subtitle: string;
  quote: string;
}

export function RecommendationCard({
  className,
  imageUrl,
  name,
  title,
  subtitle,
  quote,
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
          <p className="text-primary font-medium mb-4">{subtitle}</p>
          <blockquote className="text-gray-600 italic text-lg leading-relaxed">
            "{quote}"
          </blockquote>
        </div>
      </div>
    </div>
  );
}
