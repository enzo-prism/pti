import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from '@/lib/utils';

interface HeroContentProps {
  className?: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({ className }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn("max-w-4xl mx-auto text-center", className)}>
      {/* Main Headline with elegant reveal */}
      <div className="mb-6 hero-headline">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
          <span className="hero-text-line">From Acquisition to </span>
          <span className="hero-text-accent bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Legacy
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <div className="mb-6 hero-subtitle">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-muted-foreground">
          We Help You Navigate Your Dental Practice Transition with Certainty
        </h2>
      </div>

      {/* Description */}
      <div className="mb-8 max-w-3xl mx-auto hero-description">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
          We guide dentists through every stage of their practice transition, ensuring a smooth, profitable, and stress-free process.
        </p>
      </div>

      {/* CTA Button */}
      <div className="hero-cta">
        <Button 
          asChild 
          size={isMobile ? "default" : "lg"} 
          className="w-full sm:w-auto text-sm sm:text-base px-6 py-3 md:px-8 md:py-4 hero-button"
        >
          <Link to="/contact">Get Free Consultation</Link>
        </Button>
      </div>
    </div>
  );
};