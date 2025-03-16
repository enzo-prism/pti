
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "light" | "primary";
}

export function Section({ 
  children, 
  className, 
  id, 
  background = "white" 
}: SectionProps) {
  let bgClass = "";
  
  switch (background) {
    case "light":
      bgClass = "bg-gray-50";
      break;
    case "primary":
      bgClass = "bg-primary text-white";
      break;
    default:
      bgClass = "bg-white";
  }
  
  return (
    <section 
      id={id} 
      className={cn("py-12 md:py-16 lg:py-20", bgClass, className)}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({ 
  children, 
  className, 
  centered = false 
}: { 
  children: ReactNode; 
  className?: string;
  centered?: boolean;
}) {
  return (
    <h2 
      className={cn(
        "text-3xl md:text-4xl font-bold mb-6 animate-fade-in",
        centered && "text-center",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionSubtitle({ 
  children, 
  className, 
  centered = false 
}: { 
  children: ReactNode; 
  className?: string;
  centered?: boolean;
}) {
  return (
    <p 
      className={cn(
        "text-lg text-gray-600 mb-8 max-w-3xl animate-fade-in animate-delay-100",
        centered && "text-center mx-auto",
        className
      )}
    >
      {children}
    </p>
  );
}
