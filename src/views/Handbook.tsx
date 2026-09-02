import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { BookReviewCard } from "@/components/ui/book-review-card";
import { amazonBookReviews } from "@/data/amazonReviews";
import {
  DENTAL_TRANSITIONS_HANDBOOK_URL,
  SECOND_BOOK_PATH,
} from "@/lib/constants";

const Handbook = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-accent to-white px-4 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
            Published resource
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Dental Practice Transitions Handbook
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
            Dr. Michael Njo&apos;s practical guide to buying, selling, and
            transitioning a dental practice in a changing market.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <Image
              src="/lovable-uploads/drnjo-2026/handbook-cover-spread.webp"
              alt="Full cover spread of Dental Practice Transitions Handbook by Michael A. Njo, DDS"
              width={1600}
              height={1201}
              className="h-auto w-full object-contain"
              sizes="(min-width: 1024px) 480px, 100vw"
              priority
            />
          </div>

          <div>
            <SectionTitle className="mb-4 text-left">
              A published framework for high-stakes ownership decisions
            </SectionTitle>
            <SectionSubtitle className="mb-6 text-left">
              The handbook distills Dr. Njo&apos;s approach to buying, selling,
              and transitioning healthcare practices so dentists can plan with
              more clarity.
            </SectionSubtitle>
            <p className="mb-6 text-base leading-relaxed text-gray-600">
              It is the book Dr. Njo autographs at Panel of Experts dinners and
              the resource many seminar attendees start with before a
              consultation.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a
                  href={DENTAL_TRANSITIONS_HANDBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Amazon
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={SECOND_BOOK_PATH}>Second edition (coming soon)</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {amazonBookReviews.length > 0 ? (
        <Section background="light">
          <SectionTitle centered>What Amazon readers say</SectionTitle>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4">
            {amazonBookReviews.slice(0, 3).map((review) => (
              <BookReviewCard
                key={review.id}
                review={review}
                className="bg-white"
              />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
};

export default Handbook;
