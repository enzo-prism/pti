import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  Handshake,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HeroContent } from "@/components/ui/hero-content";
import { LatestUpdateCard } from "@/components/ui/latest-update-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { blogPosts } from "@/data/blogPosts";
import { communityImpactPosts } from "@/data/communityImpactPosts";
import { galleryPhotos, homeGalleryPreview } from "@/data/galleryImages";
import { getFeaturedReviews, reviews } from "@/data/reviews";
import { cn } from "@/lib/utils";

const Home = () => {
  const latestPost =
    communityImpactPosts.length + blogPosts.length > 0
      ? [...communityImpactPosts, ...blogPosts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0]
      : null;
  const featuredTestimonials = getFeaturedReviews("home");
  const remainingGalleryCount = Math.max(
    galleryPhotos.length - homeGalleryPreview.length,
    0,
  );

  return (
    <>
      <section className="hero-gradient relative flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 w-full">
          <HeroContent className="text-white" />
        </div>
      </section>
    </>
  );
};

export default Home;
