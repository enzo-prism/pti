import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Update } from "@/data/updates";

interface LatestUpdateCardProps {
  update: Update;
  className?: string;
  href?: string;
}

export function LatestUpdateCard({ update, className, href }: LatestUpdateCardProps) {
  const targetHref = href ?? `/updates/${update.slug}`;

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale",
      className
    )}>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Image Section */}
        <div className="relative">
          <img
            src={update.featuredImage}
            alt={update.title}
            className="w-full h-64 md:h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              Latest Update
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{update.date}</span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
            {update.title}
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
            {update.excerpt}
          </p>

          <Button asChild variant="outline" className="w-fit">
            <Link to={targetHref} className="flex items-center">
              Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
