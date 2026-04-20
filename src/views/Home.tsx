"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HeroContent } from "@/components/ui/hero-content";
import { LatestUpdateCard } from "@/components/ui/latest-update-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { DrNjoPhotoCard } from "@/components/DrNjoPhotoCard";
import { blogPosts } from "@/data/blogPosts";
import {
  authorityCalloutImages,
  homeGalleryImages,
} from "@/data/drNjoGallery";
import { getFeaturedReviews, getReviewAggregate, reviews } from "@/data/reviews";

const Home = () => {
  const isMobile = useIsMobile();
  const latestPost =
    blogPosts.length > 0
      ? [...blogPosts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0]
      : null;
  const featuredTestimonials = getFeaturedReviews("home");
  const aggregateRating = getReviewAggregate(reviews);
  const [leadershipQuoteGraphic, leadershipMedalPortrait] = authorityCalloutImages;
  const [featureImage, ...supportingMosaicImages] = homeGalleryImages;

  return (
    <>
      <section
        className={`relative min-h-screen overflow-hidden hero-gradient pt-24 md:pt-32 flex items-center justify-center ${
          isMobile ? "pb-20 md:pb-8" : "pb-8"
        }`}
        style={{
          minHeight: isMobile ? "calc(100vh - 4rem)" : "calc(100vh - 6rem)",
          paddingBottom: isMobile
            ? "max(5rem, env(safe-area-inset-bottom, 1.25rem))"
            : undefined,
        }}
      >
        <div className="absolute inset-0 hero-gradient-overlay" />
        <div className="relative z-10 w-full">
          <ScrollReveal direction="morphing" delay={200} intensity="strong">
            <HeroContent className="text-white" />
          </ScrollReveal>
        </div>
      </section>

      <Section background="white" className="py-10 md:py-14 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:items-center">
            <ScrollReveal direction="blur-in" delay={100} intensity="subtle">
              <div className="max-w-xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
                  Latest From PTI
                </p>
                <SectionTitle className="mb-4 text-2xl sm:text-3xl md:text-4xl">
                  Michael and the team are energized about what&apos;s next in dentistry.
                </SectionTitle>
                <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                  A curated look at the conversations, collaboration, and trusted
                  relationships shaping PTI&apos;s next chapter in dentistry.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
              <ScrollReveal direction="scale" delay={150} intensity="subtle">
                <DrNjoPhotoCard
                  image={featureImage}
                  priority
                  sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 44vw, 100vw"
                  frameClassName="shadow-sm"
                />
              </ScrollReveal>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {supportingMosaicImages.map((image, index) => (
                  <ScrollReveal
                    key={image.id}
                    direction="scale"
                    delay={225 + index * 100}
                    intensity="subtle"
                  >
                    <DrNjoPhotoCard
                      image={image}
                      priority={index === 0}
                      sizes="(min-width: 1280px) 22vw, (min-width: 640px) 44vw, 100vw"
                      frameClassName="shadow-sm"
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background="light" className="py-12 md:py-20 contain-layout">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <ScrollReveal direction="blur-in" delay={100} intensity="subtle">
            <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">
              You&apos;ve built something great, now what?
            </SectionTitle>
          </ScrollReveal>
          <ScrollReveal direction="elastic" delay={200}>
            <div className="bg-white p-6 sm:p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 hover-lift gpu-accelerated">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                Selling or buying a practice can feel overwhelming. You&apos;re facing
                complex decisions with your life&apos;s work at stake. How do you
                ensure a smooth transition, get a fair value, and protect your
                legacy?
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section background="white" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="parallax" delay={100} intensity="normal">
              <div className="order-2 md:order-1">
                <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">
                  The right partner makes all the difference.
                </SectionTitle>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8">
                  With decades of dental and consulting experience, we go beyond
                  brokerage to guide you with expertise, strategy and care – so
                  you can move forward with confidence.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="w-full sm:w-auto"
                >
                  <Link href="/about" className="flex items-center justify-center">
                    Learn About Our Expertise{" "}
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="magnetic" delay={200} intensity="subtle">
              <div className="rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                <Image
                  src="/lovable-uploads/26ea1640-396f-4e68-b342-d7cc429029fa.png"
                  alt="PTI team members with dental professionals"
                  width={1920}
                  height={1279}
                  className="w-full h-auto object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      <Section background="light" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <ScrollReveal direction="bounce" delay={100} intensity="normal">
              <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4">
                Our Proven Process
              </SectionTitle>
            </ScrollReveal>
            <ScrollReveal direction="blur-in" delay={200} intensity="subtle">
              <SectionSubtitle className="text-base sm:text-lg md:text-xl" centered>
                We simplify your transition
              </SectionSubtitle>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                number: 1,
                title: "Discovery and Plan",
                description:
                  "We align your goals with a clear, customized roadmap",
              },
              {
                number: 2,
                title: "Know Your Value",
                description: "Get a clear, data-backed valuation you can trust.",
              },
              {
                number: 3,
                title: "Navigate the Deal",
                description:
                  "We handle complex negotiations to maximize your return.",
              },
              {
                number: 4,
                title: "Transition Support",
                description:
                  "We ensure a smooth hand-off for your team and patients.",
              },
              {
                number: 5,
                title: "Protect What Matters",
                description:
                  "Safeguard your reputation, relationships, for peace of mind.",
              },
              {
                number: 6,
                title: "Map Your Next Move",
                description:
                  "We help you plan confidently for life after the sale.",
              },
            ].map((step, index) => (
              <ScrollReveal
                key={step.number}
                direction="scale"
                delay={index * 100}
                intensity="subtle"
              >
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all hover-scale duration-300 h-full flex flex-col">
                  <div className="flex items-start mb-4 md:mb-6">
                    <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 text-lg font-bold flex-shrink-0 shadow-lg">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-lg md:text-xl text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed ml-16 flex-grow">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      <Section background="white" className="py-12 md:py-20 contain-layout">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="scale" delay={100} intensity="subtle">
              <div className="bg-gray-50 border border-gray-100 p-8 sm:p-10 md:p-12 rounded-xl text-center hover-lift gpu-accelerated">
                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    The Risk of Going Alone
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Don&apos;t risk your future. Without expert guidance, you could
                    face financial losses, post-sale litigation, unnecessary
                    stress, and a compromised legacy.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Your Success Story
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    With PTI, you can confidently move into your next chapter.
                    Imagine a smooth, successful transition, a secure financial
                    future, and the peace of mind knowing your legacy is in good
                    hands.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      <Section background="white" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="blur-in" delay={100} intensity="subtle">
              {latestPost && <LatestUpdateCard post={latestPost} />}
            </ScrollReveal>
          </div>
        </div>
      </Section>

      <Section background="light" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <ScrollReveal direction="up" delay={100} intensity="subtle">
                <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
                  Trusted by Dental Professionals
                </SectionTitle>
              </ScrollReveal>
              <ScrollReveal direction="blur-in" delay={200} intensity="subtle">
                <SectionSubtitle centered>
                  Rated {aggregateRating.ratingValue}/5 from{" "}
                  {aggregateRating.reviewCount} reviews
                </SectionSubtitle>
              </ScrollReveal>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center mb-10 md:mb-12">
              <ScrollReveal direction="scale" delay={80} intensity="subtle">
                <DrNjoPhotoCard
                  image={leadershipQuoteGraphic}
                  sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 44vw, 100vw"
                  frameClassName="shadow-lg"
                />
              </ScrollReveal>

              <ScrollReveal direction="up" delay={140} intensity="subtle">
                <div className="rounded-[1.75rem] border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row gap-5 sm:items-center">
                    <div className="w-full sm:w-28 sm:flex-shrink-0">
                      <DrNjoPhotoCard
                        image={leadershipMedalPortrait}
                        showCaption={false}
                        sizes="112px"
                        frameClassName="shadow-none"
                      />
                    </div>
                    <div className="text-left">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                        Recognition Beyond the Transaction
                      </p>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        A public track record that matches the private guidance.
                      </h3>
                      <p className="text-base leading-relaxed text-gray-600 mb-5">
                        Dr. Njo&apos;s authority shows up in published resources,
                        speaking circles, community leadership, and the long-term
                        relationships he has built across dentistry. The work is
                        not theoretical, and the trust around it is visible.
                      </p>
                      <Button asChild variant="outline">
                        <Link href="/drnjo">
                          See Dr. Njo&apos;s Full Photo Story{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTestimonials.map((testimonial, index) => (
                <ScrollReveal
                  key={testimonial.id}
                  direction="up"
                  delay={100 + index * 100}
                  intensity="subtle"
                >
                  <TestimonialCard
                    quote={testimonial.quote}
                    author={testimonial.displayAuthorName}
                    role={testimonial.role}
                    company={testimonial.company}
                    reviewHref={`/testimonials/${testimonial.slug}`}
                    className="h-full"
                  />
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button
                asChild
                variant="outline"
                size={isMobile ? "default" : "lg"}
              >
                <Link href="/testimonials">Read More Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        background="primary"
        className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden contain-layout"
      >
        <div className="absolute inset-0 gradient-mesh opacity-20 gpu-accelerated" />
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4 relative">
          <ScrollReveal direction="scale" delay={100} intensity="subtle">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-white">
              Ready to Start Your Transition?
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="blur-in" delay={200} intensity="normal">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white opacity-90 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              Take the first step toward a successful transition with expert
              guidance you can trust!
            </p>
          </ScrollReveal>
          <ScrollReveal direction="magnetic" delay={300} intensity="strong">
            <Button
              asChild
              variant="secondary"
              size={isMobile ? "default" : "lg"}
              className="w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 hover-lift !bg-white hover:!bg-white border border-white"
            >
              <Link href="/contact">Let&apos;s Talk</Link>
            </Button>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
};

export default Home;
