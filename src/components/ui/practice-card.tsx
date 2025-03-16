
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, DollarSign, Grid } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MetadataItem {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface PracticeCardProps {
  status: "available" | "sold";
  title: string;
  location: string;
  description: string;
  imageSrc?: string;
  date?: string;
  url: string;
  className?: string;
  metadata?: MetadataItem[];
}

export function PracticeCard({
  status,
  title,
  location,
  description,
  imageSrc,
  date,
  url,
  className,
  metadata,
}: PracticeCardProps) {
  const isMobile = useIsMobile();
  
  // Status badge configuration
  const statusConfig: Record<string, { color: string; label: string }> = {
    available: {
      color: "bg-primary text-white hover:bg-primary/80",
      label: "Available",
    },
    sold: {
      color: "bg-gray-400 text-white hover:bg-gray-500",
      label: "Sold",
    },
  };

  // Default image if none provided
  const defaultImage = "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md group h-full flex flex-col border-gray-200", 
        className
      )}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img 
          src={imageSrc || defaultImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge 
          className={cn(
            "absolute top-2 right-2 sm:top-3 sm:right-3 font-medium px-2 py-1 text-xs", 
            statusConfig[status].color
          )}
        >
          {statusConfig[status].label}
        </Badge>
      </div>

      <CardContent className="flex-grow p-3 sm:p-5">
        <div className="mb-1 sm:mb-2 flex items-start justify-between">
          <h3 className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          {date && <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 font-medium ml-2 flex-shrink-0">{date}</span>}
        </div>
        
        <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primary flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-4">
          {description}
        </p>

        {metadata && metadata.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
            {metadata.map((item, index) => {
              // Use appropriate icons based on label
              let icon = item.icon;
              if (!icon) {
                if (item.label.toLowerCase().includes('revenue')) {
                  icon = <DollarSign className="h-2.5 w-2.5 sm:h-3 sm:w-3" />;
                } else if (item.label.toLowerCase().includes('operatories')) {
                  icon = <Grid className="h-2.5 w-2.5 sm:h-3 sm:w-3" />;
                }
              }
              
              return (
                <div key={index} className="flex items-center text-xs bg-gray-100 rounded-full px-2 sm:px-3 py-1 sm:py-1.5">
                  {icon && <span className="mr-1 text-primary">{icon}</span>}
                  <span className="font-medium mr-1">{item.label}:</span>
                  <span>{item.value}</span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 pb-3 sm:pb-5 px-3 sm:px-5">
        <Button asChild variant="outline" size={isMobile ? "sm" : "default"} className="w-full hover:bg-primary hover:text-white transition-colors border-primary text-primary text-xs sm:text-sm py-1.5 sm:py-2">
          <Link to={url} className="w-full flex items-center justify-center">
            {status === "available" ? "Inquire Now" : "View Details"}
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
