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
    <div className={`mx-auto max-w-5xl px-4 text-center ${className || ""}`}>
      <div className="mb-5 sm:mb-6">
        <div className="mx-auto inline-block rounded-2xl bg-white p-3 shadow-xl sm:p-4">
          <Image
            src="/lovable-uploads/pti-logo.webp"
            alt=""
            width={480}
            height={466}
            className="h-24 w-24 object-contain sm:h-28 sm:w-28 md:h-32 md:w-32"
            sizes="(min-width: 768px) 128px, (min-width: 640px) 112px, 96px"
            priority
          />
        </div>
      </div>

      <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-100 sm:text-base">
        Independent Guidance for Dentists
      </p>
      <h1 className="text-balance text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
        Dental Practice Transitions, Guided From Acquisition to Legacy
      </h1>

      <p className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-relaxed text-blue-50 sm:text-lg md:text-xl">
        Get a clear valuation, practical deal guidance, and personal support for
        selling, buying, associate buy-ins, partnerships, or evaluating a DSO
        offer.
      </p>

      <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Button
          asChild
          variant="secondary"
          size="lg"
          className="group min-h-12 bg-white px-7 text-base shadow-lg hover:-translate-y-0.5 hover:bg-white hover:shadow-xl motion-reduce:transform-none"
        >
          <Link href="/contact">
            Book a Confidential Consultation
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="min-h-12 border-white/70 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
        >
          <Link href="/services">Explore Transition Services</Link>
        </Button>
      </div>
    </div>
  );
};
