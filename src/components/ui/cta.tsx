
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CtaProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonUrl: string;
  className?: string;
  children?: ReactNode;
  background?: "white" | "light" | "primary";
}

export function Cta({
  title,
  description,
  buttonText,
  buttonUrl,
  className,
  children,
  background = "primary",
}: CtaProps) {
  let bgClass = "";
  let textClass = "";
  let buttonVariant: "default" | "outline" = "default";
  
  switch (background) {
    case "white":
      bgClass = "bg-white";
      textClass = "text-gray-900";
      buttonVariant = "default";
      break;
    case "light":
      bgClass = "bg-gray-50";
      textClass = "text-gray-900";
      buttonVariant = "default";
      break;
    case "primary":
      bgClass = "bg-primary";
      textClass = "text-white";
      buttonVariant = "outline";
      break;
    default:
      bgClass = "bg-primary";
      textClass = "text-white";
      buttonVariant = "outline";
  }
  
  return (
    <div className={cn(
      "py-12 md:py-16 px-4 sm:px-6 rounded-lg", 
      bgClass, 
      className
    )}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className={cn("text-2xl md:text-3xl font-bold mb-4", textClass)}>
          {title}
        </h2>
        {description && (
          <p className={cn("text-lg mb-8 opacity-90", textClass)}>
            {description}
          </p>
        )}
        {children}
        <Button 
          asChild 
          variant={buttonVariant} 
          size="lg" 
          className={background === "primary" ? "border-white text-white hover:bg-white hover:text-primary" : ""}
        >
          <Link to={buttonUrl}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}
