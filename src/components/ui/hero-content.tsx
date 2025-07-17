import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroContentProps {
  className?: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({ className }) => {
  return (
    <div className={`max-w-4xl mx-auto text-center px-4 ${className || ''}`}>
      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
        From Acquisition to{' '}
        <span className="text-blue-100 font-extrabold">
          Legacy
        </span>
      </h1>

      {/* Subtitle */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-50 mb-6 drop-shadow-md">
        We Help You Navigate Your Dental Practice Transition with Certainty
      </h2>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl text-blue-50/90 leading-relaxed mb-8 max-w-3xl mx-auto drop-shadow-sm">
        We guide dentists through every stage of their practice transition, ensuring a smooth, profitable, and stress-free process.
      </p>

      {/* CTA Button */}
      <Button asChild size="lg" className="text-base px-8 py-4">
        <Link to="/contact">Get Free Consultation</Link>
      </Button>
    </div>
  );
};