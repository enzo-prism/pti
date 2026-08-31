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

const transitionPaths = [
  {
    title: "Sell Your Practice",
    description:
      "Prepare for market, understand value, compare options, and navigate the deal without losing sight of your team, patients, or legacy.",
    href: "/services/selling",
    cta: "Explore Seller Guidance",
    icon: BadgeDollarSign,
  },
  {
    title: "Buy or Buy In",
    description:
      "Evaluate ownership opportunities, structure an associate buy-in, and enter negotiations with a clear view of the numbers and terms.",
    href: "/services/buying",
    cta: "Explore Buyer Guidance",
    icon: Building2,
  },
  {
    title: "Evaluate a DSO Offer",
    description:
      "Compare the headline offer with the complete economics, obligations, risks, and fit before signing a letter of intent.",
    href: "/services/selling-to-a-dso",
    cta: "Review DSO Support",
    icon: Scale,
  },
  {
    title: "Build a Partnership",
    description:
      "Create an equitable ownership structure with clear expectations, decision rights, compensation, and an intentional path forward.",
    href: "/services/partnerships",
    cta: "Explore Partnership Support",
    icon: Handshake,
  },
];

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

      <Section
        id="transition-goals"
        background="white"
        className="border-b border-slate-100 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Start With Your Goal
            </p>
            <SectionTitle
              centered
              className="mb-4 text-balance text-2xl sm:text-3xl md:text-4xl"
            >
              Guidance built around the transition you are actually making
            </SectionTitle>
            <SectionSubtitle centered className="mb-9 text-pretty">
              Choose the path closest to your situation. PTI will help you
              understand the decisions, tradeoffs, and next steps.
            </SectionSubtitle>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {transitionPaths.map((path, index) => (
              <ScrollReveal
                key={path.title}
                delay={index * 75}
                intensity="subtle"
              >
                <Link
                  href={path.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transform-none sm:p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <path.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">
                    {path.title}
                  </h3>
                  <p className="mt-2 flex-1 text-pretty text-base leading-relaxed text-slate-700">
                    {path.description}
                  </p>
                  <span className="mt-5 inline-flex items-center font-semibold text-primary">
                    {path.cta}
                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        background="white"
        className="py-10 md:py-14 border-b border-gray-100"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <ScrollReveal direction="blur-in" delay={100} intensity="subtle">
              <div className="max-w-xl">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm">
                  Inside PTI
                </p>
                <SectionTitle className="mb-0 text-2xl sm:text-3xl md:text-4xl">
                  The people and partnerships behind every transition.
                </SectionTitle>
              </div>
            </ScrollReveal>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="shrink-0 self-start sm:self-auto"
            >
              <Link
                href="/gallery"
                className="flex items-center justify-center"
              >
                View the gallery
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
          </div>

          <ScrollReveal direction="scale" delay={150} intensity="subtle">
            <div className="grid grid-cols-2 items-start gap-2.5 sm:gap-3 md:grid-cols-4 md:gap-4">
              {homeGalleryPreview.map(({ photo }, index) => {
                const isFeature = index === 0;
                const isLast = index === homeGalleryPreview.length - 1;
                return (
                  <Link
                    key={photo.id}
                    href="/gallery"
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-gray-200 bg-slate-100 shadow-sm transition-shadow duration-300 hover:shadow-lg",
                      isFeature && "col-span-2",
                    )}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes={
                        isFeature
                          ? "(min-width: 768px) 580px, 100vw"
                          : "(min-width: 768px) 290px, 50vw"
                      }
                      className="h-auto w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {isLast && remainingGalleryCount > 0 ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/70 text-white transition-colors duration-300 group-hover:bg-primary/80">
                        <span className="text-xl font-bold leading-none sm:text-2xl">
                          +{remainingGalleryCount}
                        </span>
                        <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] sm:text-xs">
                          Photos
                        </span>
                      </div>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </ScrollReveal>
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
                Selling or buying a practice can feel overwhelming. You&apos;re
                facing complex decisions with your life&apos;s work at stake.
                How do you ensure a smooth transition, get a fair value, and
                protect your legacy?
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section background="white" className="py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          <ScrollReveal direction="parallax" delay={100} intensity="normal">
            <div className="order-2 md:order-1">
              <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">
                The right partner makes all the difference.
              </SectionTitle>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8">
                With decades of dental and consulting experience, we go beyond
                brokerage to guide you with expertise, strategy, and care, so
                you can move forward with confidence.
              </p>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link
                  href="/about"
                  className="flex items-center justify-center"
                >
                  Learn About Our Expertise{" "}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="magnetic" delay={200} intensity="subtle">
            <div className="rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
              <Image
                src="/lovable-uploads/pti-team-with-dental-professionals.webp"
                alt="PTI team members with dental professionals"
                width={1920}
                height={1279}
                className="h-auto w-full object-contain"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section background="light" className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <ScrollReveal direction="bounce" delay={100} intensity="normal">
            <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4">
              Our Proven Process
            </SectionTitle>
          </ScrollReveal>
          <ScrollReveal direction="blur-in" delay={200} intensity="subtle">
            <SectionSubtitle
              className="text-base sm:text-lg md:text-xl"
              centered
            >
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
                "We align your goals with a clear, customized roadmap.",
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
                "Safeguard your reputation and relationships for greater peace of mind.",
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
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-[box-shadow,transform] hover-scale duration-300 h-full flex flex-col">
                <div className="flex items-start mb-4 md:mb-6">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 text-lg font-bold flex-shrink-0 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-gray-900">
                    {step.title}
                  </h3>
                </div>
                <p className="ml-16 flex-grow text-base leading-relaxed text-gray-700">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section background="white" className="py-12 md:py-20 contain-layout">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="scale" delay={100} intensity="subtle">
            <div className="bg-gray-50 border border-gray-100 p-8 sm:p-10 md:p-12 rounded-xl text-center hover-lift gpu-accelerated">
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Protect the Value You Built
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  A transition affects more than the purchase price. PTI helps
                  you examine the complete terms, anticipate obligations, and
                  make informed decisions about your financial future.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Protect the People Behind the Practice
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Plan for continuity across your patients, team, reputation,
                  and professional relationships while creating a practical path
                  into your next chapter.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section background="white" className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="blur-in" delay={100} intensity="subtle">
            {latestPost && <LatestUpdateCard post={latestPost} />}
          </ScrollReveal>
        </div>
      </Section>

      <Section background="light" className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <ScrollReveal direction="up" delay={100} intensity="subtle">
              <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
                Trusted by Dental Professionals
              </SectionTitle>
            </ScrollReveal>
            <ScrollReveal direction="blur-in" delay={200} intensity="subtle">
              <SectionSubtitle centered>
                Explore {reviews.length} published client experiences and the
                transition challenges behind them.
              </SectionSubtitle>
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
            <Button asChild variant="outline" size="lg">
              <Link href="/testimonials">Read More Stories</Link>
            </Button>
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
              Bring your goals, questions, and current options. We&apos;ll help
              you identify the most useful next step.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="magnetic" delay={300} intensity="strong">
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 hover-lift !bg-white hover:!bg-white border border-white"
            >
              <Link href="/contact">Book a Confidential Consultation</Link>
            </Button>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
};

export default Home;
