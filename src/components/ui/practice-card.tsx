
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "./button";
import Link from "next/link";
import { ArrowRight, MapPin, DollarSign, Grid } from "lucide-react";

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

  // Modern abstract gradient backgrounds (CSS gradient backgrounds)
  const gradientStyles = [
    { background: "linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)" },
    { background: "linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)" },
    { background: "linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)" },
    { background: "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)" },
    { background: "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)" },
    { background: "linear-gradient(90deg, hsla(59, 86%, 68%, 1) 0%, hsla(134, 36%, 53%, 1) 100%)" },
    { background: "linear-gradient(to right, #ee9ca7, #ffdde1)" },
  ];
  
  // Generate a consistent gradient based on the title (same title always gets same gradient)
  const getConsistentGradient = (title: string): React.CSSProperties => {
    const titleSum = title.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const index = titleSum % gradientStyles.length;
    return gradientStyles[index];
  };

  // Use provided image, or fallback to a consistent gradient based on title
  const backgroundStyle = imageSrc ? {} : getConsistentGradient(title);

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md group h-full flex flex-col border border-gray-200 rounded-xl", 
        className
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div 
            className="w-full h-full transition-transform duration-300 group-hover:scale-105"
            style={backgroundStyle}
          />
        )}
        <Badge 
          className={cn(
            "absolute top-3 right-3 font-medium px-3 py-1 text-xs rounded-full", 
            statusConfig[status].color
          )}
        >
          {statusConfig[status].label}
        </Badge>
      </div>

      <CardContent className="flex-grow p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          {date && <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 font-medium ml-2 flex-shrink-0">{date}</span>}
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1 text-primary flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {description}
        </p>

        {metadata && metadata.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {metadata.map((item, index) => {
              // Use appropriate icons based on label
              let icon = item.icon;
              if (!icon) {
                if (item.label.toLowerCase().includes('revenue')) {
                  icon = <DollarSign className="h-3 w-3" />;
                } else if (item.label.toLowerCase().includes('operatories')) {
                  icon = <Grid className="h-3 w-3" />;
                }
              }
              
              return (
                <div key={index} className="flex items-center text-xs bg-gray-50 rounded-full px-2.5 py-1.5 border border-gray-100">
                  {icon && <span className="mr-1 text-primary">{icon}</span>}
                  <span className="font-medium mr-1">{item.label}:</span>
                  <span>{item.value}</span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 pb-4 px-4">
        <Button asChild variant="outline" size="sm" className="w-full hover:bg-primary hover:text-white transition-colors border-primary text-primary text-sm py-2 rounded-full">
          <Link href={url} className="w-full flex items-center justify-center">
            {status === "available" ? "Inquire Now" : "View Details"}
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
