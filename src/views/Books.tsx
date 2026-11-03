import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  DENTAL_TRANSITIONS_HANDBOOK_URL,
  HANDBOOK_PATH,
  SECOND_BOOK_PATH,
  SECOND_EDITION_KINDLE_PRICE,
  SECOND_EDITION_KINDLE_URL,
} from "@/lib/constants";

const Books = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-accent to-white px-4 pt-10 pb-12 md:pt-16 md:pb-16">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
            Books by Dr. Michael Njo
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Dental Practice Transitions Handbook
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
            Dr. Michael Njo&apos;s practical guide to buying, selling, and
            transitioning a dental practice in a changing market, now in an
            expanded second edition.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4 shadow-sm sm:p-6">
            <Image
              src="/lovable-uploads/drnjo-2026/handbook-second-edition-coming-soon.webp"
              alt="Coming soon announcement for the second edition of Dental Practice Transitions Handbook by Michael A. Njo, DDS, Founder of Practice Transitions Institute, with a foreword by Dr. Glenn Vo"
              width={1120}
              height={1400}
              className="h-auto w-full object-contain"
              sizes="(min-width: 1024px) 440px, 100vw"
              priority
            />
            <p className="mt-4 text-center text-sm text-gray-500">
              Strategic transitions. Stronger futures. Lasting legacies.
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
              Coming{" "}
              <time dateTime="2026-11-17">November 17, 2026</time>
            </p>
            <SectionTitle className="mb-4 text-left">
              The Second Edition
            </SectionTitle>
            <SectionSubtitle className="mb-6 text-left">
              A Blueprint for Buying and Selling Healthcare Practices in
              Different Economic Climates. The title and subtitle stay the
              same. The content grows.
            </SectionSubtitle>
            <p className="mb-6 text-base leading-relaxed text-gray-600">
              A substantially expanded and rewritten 6 x 9 edition of the
              handbook, with a new foreword by Dr. Glenn Vo, new advisor
              material, and new appendices of practical checklists and
              reference material for the current market. The Kindle edition
              will be available for {SECOND_EDITION_KINDLE_PRICE} at launch.
            </p>
            {SECOND_EDITION_KINDLE_URL ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a
                    href={SECOND_EDITION_KINDLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy the Kindle edition
                    <ExternalLink
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={SECOND_BOOK_PATH}>
                    About the Second Edition
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href={SECOND_BOOK_PATH}>
                      About the Second Edition
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contact">Ask about the second edition</Link>
                  </Button>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Purchase details will be shared when the new listing is
                  confirmed.
                </p>
              </>
            )}
          </div>
        </div>
      </Section>

      <Section background="light">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <Image
              src="/lovable-uploads/drnjo-2026/handbook-cover-spread.webp"
              alt="Full cover spread of Dental Practice Transitions Handbook by Michael A. Njo, DDS"
              width={1600}
              height={1201}
              className="h-auto w-full object-contain"
              sizes="(min-width: 1024px) 480px, 100vw"
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
              First Edition
            </p>
            <SectionTitle className="mb-4 text-left">
              A published framework for high-stakes ownership decisions
            </SectionTitle>
            <SectionSubtitle className="mb-6 text-left">
              The handbook distills Dr. Njo&apos;s approach to buying, selling,
              and transitioning healthcare practices so dentists can plan with
              more clarity.
            </SectionSubtitle>
            <p className="mb-6 text-base leading-relaxed text-gray-600">
              It is the book Dr. Njo autographs at Panel of Experts dinners
              and the resource many seminar attendees start with before a
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
                <Link href={HANDBOOK_PATH}>Read about the first edition</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle centered>About the author</SectionTitle>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Michael A. Njo, DDS is a dental practice transition expert,
            author, and educator with 30+ years in clinical dentistry. As
            founder of Practice Transitions Institute, he guides dentists
            through valuations, sales, ownership transitions, and
            early-career decision making.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" variant="outline">
              <Link href="/drnjo">Meet Dr. Njo</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Books;
