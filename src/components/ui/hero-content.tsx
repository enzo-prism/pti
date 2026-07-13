import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroContentProps {
  className?: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({ className }) => {
  return (
    <div className={`max-w-4xl mx-auto text-center px-4 ${className || ''}`}>
      {/* Logo */}
      <div className="mb-8">
        <div className="bg-white rounded-xl p-6 mx-auto inline-block shadow-lg drop-shadow-lg">
          <Image
            src="/lovable-uploads/pti-logo.webp"
            alt="Practice Transitions Institute logo"
            width={480}
            height={466}
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain"
            sizes="(min-width: 768px) 224px, (min-width: 640px) 192px, 160px"
            priority
          />
        </div>
      </div>
      
      {/* Tagline */}
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
        From Acquisition to{' '}
        <span className="text-blue-100 font-extrabold">
          Legacy
        </span>
      </p>

      {/* Main Headline */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-50 mb-6 drop-shadow-md">
        We Help You Navigate Your Dental Practice Transition with Certainty
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl text-blue-50/90 leading-relaxed mb-8 max-w-3xl mx-auto drop-shadow-sm">
        We guide dentists through every stage of their practice transition, ensuring a smooth, profitable, and stress-free process.
      </p>

      {/* CTA Button */}
      <div className="mb-8 sm:mb-4">
        <Button
          asChild
          variant="secondary"
          size="lg"
          className="group text-base px-8 py-4 bg-white hover:bg-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/25 active:translate-y-0"
        >
          <Link href="/contact">
            Let&apos;s Talk
            <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
