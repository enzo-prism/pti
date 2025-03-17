
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

  // Better dental office images with more reliable hosting
  const dentalImages = [
    "/lovable-uploads/26a68276-dfbb-4568-882b-c27909efff03.png", // Using the uploaded image
    "https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    "https://cdn.pixabay.com/photo/2021/11/14/15/09/dentist-6794032_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/07/23/10/44/dentist-2530990_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/23/14/57/dental-1853492_1280.jpg",
  ];
  
  // Generate a consistent image based on the title (same title always gets same image)
  const getConsistentImage = (title: string): string => {
    const titleSum = title.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const index = titleSum % dentalImages.length;
    return dentalImages[index];
  };

  // Use provided image, or fallback to a consistent image based on title
  const practiceImage = imageSrc || getConsistentImage(title);

  // Implement error handling for images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = dentalImages[0]; // Default to first image on error
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md group h-full flex flex-col border border-gray-200 rounded-xl", 
        className
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img 
          src={practiceImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />
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
          <Link to={url} className="w-full flex items-center justify-center">
            {status === "available" ? "Inquire Now" : "View Details"}
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
