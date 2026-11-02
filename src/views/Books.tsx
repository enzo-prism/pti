import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Cta } from "@/components/ui/cta";
import { BookReviewCard } from "@/components/ui/book-review-card";
import { amazonBookReviews } from "@/data/amazonReviews";
import {
  DENTAL_EXIT_BLUEPRINT_URL,
  DENTAL_TRANSITIONS_HANDBOOK_URL,
  HANDBOOK_PATH,
  SECOND_BOOK_PATH,
} from "@/lib/constants";

const authorFacts = [
  { title: "Author", body: "Dental Practice Transitions Handbook" },
  { title: "Contributing author", body: "The Dental Exit Blueprint" },
  {
    title: "Founder",
    body: "Practice Transitions Institute and Dental Strategies",
  },
];

const Books = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-accent to-white px-4 pt-10 pb-12 md:pt-16 md:pb-16">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
            Books by Dr. Michael Njo
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Author of the Dental Practice Transitions Handbook
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
            Dr. Michael Njo brings more than 30 years in dentistry to the page,
            writing for dentists who are buying, selling, growing,
            or planning what comes next.
          </p>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
            {authorFacts.map((fact) => (
              <li
                key={fact.title}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <p className="text-sm font-semibold text-gray-900">
                  {fact.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {fact.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section>
        <SectionTitle centered>Written by Dr. Njo</SectionTitle>
        <SectionSubtitle centered>
          Dental Practice Transitions Handbook: A Blueprint for Buying and
          Selling Healthcare Practices in Different Economic Climates.
        </SectionSubtitle>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8">
          <article
            aria-labelledby="second-edition-title"
            className="grid items-start gap-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          >
            <div className="rounded-xl bg-slate-50 p-3">
              <Image
                src="/lovable-uploads/drnjo-2026/handbook-second-edition-coming-soon.webp"
                alt="Coming soon announcement for the second edition of Dental Practice Transitions Handbook by Michael A. Njo, DDS, Founder of Practice Transitions Institute, with a foreword by Dr. Glenn Vo"
                width={1120}
                height={1400}
                className="h-auto w-full object-contain"
                sizes="(min-width: 1024px) 400px, 100vw"
                priority
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                Second Edition · Launching{" "}
                <time dateTime="2026-11-17">November 17, 2026</time>
              </p>
              <h2
                id="second-edition-title"
                className="text-2xl font-bold leading-snug text-gray-900"
              >
                Dental Practice Transitions Handbook, Second Edition
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                A substantially expanded and rewritten 6 x 9 edition of the
                handbook. The title and subtitle stay the same, with a new
                foreword by Dr. Glenn Vo, new advisor material, and new
                appendices.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Purchase details will be shared here when the new listing is
                confirmed.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={SECOND_BOOK_PATH}>
                    Preview the second edition
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Ask about the second edition</Link>
                </Button>
              </div>
            </div>
          </article>

          <article
            aria-labelledby="first-edition-title"
            className="grid items-start gap-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          >
            <div className="rounded-xl bg-slate-50 p-3">
              <Image
                src="/lovable-uploads/drnjo-2026/handbook-cover-spread.webp"
                alt="Full cover spread of Dental Practice Transitions Handbook by Michael A. Njo, DDS"
                width={1600}
                height={1201}
                className="h-auto w-full object-contain"
                sizes="(min-width: 1024px) 400px, 100vw"
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                First Edition · Available on Amazon
              </p>
              <h2
                id="first-edition-title"
                className="text-2xl font-bold leading-snug text-gray-900"
              >
                Dental Practice Transitions Handbook
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                The handbook distills Dr. Njo&apos;s approach to buying, selling,
                and transitioning healthcare practices so dentists can plan with
                more clarity. It is the book he autographs at Panel of Experts
                dinners and the resource many seminar attendees start with
                before a consultation.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="outline">
                  <a
                    href={DENTAL_TRANSITIONS_HANDBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View the first edition on Amazon
                    <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link href={HANDBOOK_PATH}>About the handbook</Link>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <Section background="light">
        <SectionTitle centered>Contributing author</SectionTitle>
        <SectionSubtitle centered>
          Books Dr. Njo has written chapters for.
        </SectionSubtitle>
        <article
          aria-labelledby="dental-exit-blueprint-title"
          className="mx-auto mt-10 grid max-w-5xl items-center gap-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
        >
          <Image
            src="/lovable-uploads/drnjo-2026/dental-exit-blueprint-cover.jpg"
            alt="Cover of The Dental Exit Blueprint: The 13 EBITDA Levers That Drive Maximum Value"
            width={1289}
            height={881}
            className="h-auto w-full rounded-xl object-contain"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Released <time dateTime="2026-07-15">July 15, 2026</time>
            </p>
            <h2
              id="dental-exit-blueprint-title"
              className="text-2xl font-bold leading-snug text-gray-900"
            >
              The Dental Exit Blueprint
            </h2>
            <p className="mt-1 text-lg text-gray-700">
              The 13 EBITDA Levers That Drive Maximum Value
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              A 29-author guide led by Elijah Desmond for dental owners who want
              to understand the decisions that shape practice value before an
              exit. Dr. Njo wrote two chapters: &ldquo;Know Your Exit
              Options&rdquo; and &ldquo;Plan What Comes Next.&rdquo;
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a
                  href={DENTAL_EXIT_BLUEPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Find it on Amazon
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/blog/backstage-retreat-2026-orlando">
                  See the book signing
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </Section>

      {amazonBookReviews.length > 0 ? (
        <Section>
          <SectionTitle centered>What readers say about the handbook</SectionTitle>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4">
            {amazonBookReviews.slice(0, 3).map((review) => (
              <BookReviewCard key={review.id} review={review} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section background="light">
        <Cta
          title="Talk With the Author"
          description="Planning a purchase, sale, partnership, or next chapter? Dr. Njo works with dentists one on one through Practice Transitions Institute."
          buttonText="Schedule a Free Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Books;
