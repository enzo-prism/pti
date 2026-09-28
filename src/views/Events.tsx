import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { DrNjoPhotoCard } from "@/components/DrNjoPhotoCard";
import { EventsListing } from "@/components/events/EventsListing";
import { eventsSpeakingHighlightImages } from "@/data/drNjoGallery";
import type { ListedEvent } from "@/data/events";
import type { ReviewRecord } from "@/data/reviews";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";
import Image from "next/image";

interface EventsProps {
  events: ListedEvent[];
  workshopReview?: ReviewRecord;
}

const Events = ({ events, workshopReview }: EventsProps) => {
  const [laDinnerPhoto, rosevilleDinnerPhoto, bookSigningPhoto] =
    eventsSpeakingHighlightImages;

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <Section
          background="primary"
          className="pt-10 md:pt-16 pb-12 md:pb-20 relative overflow-hidden"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90"></div>
          <Image
            src="/lovable-uploads/events-hero-office.webp"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover opacity-20"
          />

          <div className="relative z-10 text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Learn. Connect. Transition With Confidence.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto px-4 mb-6">
              Educational events designed to empower your next move.
            </p>
            <div className="max-w-5xl mx-auto px-4">
              <p className="text-base md:text-lg text-blue-50/95 leading-relaxed">
                Thinking about buying or selling a practice? Our sessions walk
                you through every step — from understanding practice value and
                tax implications to exploring deal structures, increasing value,
                and planning your next move. You&apos;ll get straightforward
                guidance and expert insights to help you make informed
                decisions.
              </p>
            </div>
          </div>
        </Section>

        <EventsListing events={events} />

        <Section background="light" className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-8">
              <SectionTitle>Recent Speaking Highlights</SectionTitle>
              <SectionSubtitle className="mb-0">
                Recent Panel of Experts dinners in Los Angeles and Roseville
                (August 2026), plus the July 2026 San Francisco Practice
                Transitions seminar.
              </SectionSubtitle>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
              <DrNjoPhotoCard
                image={laDinnerPhoto}
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 100vw"
                priority
              />
              <DrNjoPhotoCard
                image={rosevilleDinnerPhoto}
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 100vw"
              />
              <DrNjoPhotoCard
                image={bookSigningPhoto}
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 100vw"
              />
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                Educational Presence
              </p>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Practical transition guidance delivered in public.
              </h3>
              <p className="text-base leading-relaxed text-gray-600 mb-4">
                The Los Angeles Panel of Experts dinner and the August 2026
                Roseville Practice Blueprint dinner brought dentists and
                referral partners together around ownership, growth, and
                transition decisions.
              </p>
              <p className="text-base leading-relaxed text-gray-600">
                PTI also hosted the July 17, 2026 San Francisco seminar at Kohan
                Group. That same public teaching is what PTI brings to private
                workshops and one-on-one consulting.
              </p>
            </div>
          </div>
        </Section>

        {/* Testimonial Section */}
        <Section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <SectionTitle centered>What Our Attendees Say</SectionTitle>
            <div className="flex justify-center">
              {workshopReview && (
                <TestimonialCard
                  quote={workshopReview.quote}
                  author={workshopReview.displayAuthorName}
                  role={workshopReview.role}
                  company={workshopReview.company}
                  reviewHref={`/testimonials/${workshopReview.slug}`}
                  className="max-w-2xl"
                />
              )}
            </div>
          </div>
        </Section>

        {/* Private Events Section */}
        <Section background="light" className="py-12 md:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <SectionTitle>Host a Private Event</SectionTitle>
              <SectionSubtitle>
                Looking for customized education for your dental society, study
                club, or office?
              </SectionSubtitle>
            </div>

            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-6 text-center md:text-left">
                Available Topics Include:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  "Practice Valuation Fundamentals",
                  "Buying Your First Practice",
                  "Preparing for Practice Sale",
                  "Partnership Formation & Dissolution",
                  "Associate Contracts & Buy-ins",
                  "DSO vs. Private Practice Transitions",
                ].map((topic, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our team of experts can deliver engaging, educational
                  presentations tailored to your group&apos;s specific needs and
                  interests. All presentations can be modified for length and
                  format.
                </p>
              </div>

              <div className="text-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a
                    href={`mailto:${SITE_CONTACT_EMAIL}?subject=Speaking%20Engagement%20Request`}
                  >
                    Request a Speaking Engagement
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default Events;
