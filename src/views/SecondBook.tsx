import { TransitionReadingPaths } from "@/components/resources/TransitionReadingPaths";
import Link from "next/link";
import Image from "next/image";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BOOKS_PATH,
  HANDBOOK_PATH,
  SECOND_EDITION_KINDLE_URL,
  SECOND_EDITION_PUBLISHED_ISO,
  SECOND_EDITION_PUBLISHED_LABEL,
} from "@/lib/constants";

const whatsNew = [
  {
    title: "Expanded and rewritten",
    body: "A substantially expanded 6 x 9 edition of the handbook dentists already use to plan, buy, sell, and structure transitions.",
  },
  {
    title: "New foreword by Dr. Glenn Vo",
    body: "Founder of Nifty Thrifty Dentists and Editor-in-Chief of Dental Lifestyles Magazine.",
  },
  {
    title: "New advisor material",
    body: "Contributions from featured advisors who work alongside dentists on the financial, legal, and operational side of a transition.",
  },
  {
    title: "New appendices",
    body: "Practical checklists and reference material added for the current market.",
  },
];

/** Visible FAQ; the route passes the same items to `buildFAQSchema`. */
export const secondBookFaqs = [
  {
    question: "When was the second edition published?",
    answer:
      "The Second Edition of Dental Practice Transitions Handbook was published as a Kindle edition on November 17, 2026. Shortly after launch, it reached #1 Best Seller in Dentistry on Amazon.",
  },
  {
    question: "Where can I buy the second edition?",
    answer:
      "The Second Edition is available as a Kindle edition on Amazon (ASIN B0HRL1C1LZ). The first-edition Amazon listing is a separate, earlier edition.",
  },
  {
    question: "What is new in the second edition?",
    answer:
      "It is substantially expanded and rewritten, with a new foreword by Dr. Glenn Vo, new material from featured advisors who work alongside dentists on the financial, legal, and operational side of a transition, and new appendices of practical checklists and reference material for the current market. The Kindle edition runs 273 pages and was edited by Catrise Austin.",
  },
  {
    question: "How is it different from the first edition?",
    answer:
      "The title and subtitle stay the same: Dental Practice Transitions Handbook: A Blueprint for Buying and Selling Healthcare Practices in Different Economic Climates. The second edition keeps Dr. Michael Njo's framework for buying, selling, and transitioning a practice, and adds the new foreword, advisor material, and appendices.",
  },
  {
    question: "Who should read it?",
    answer:
      "Dentists planning to buy, sell, or bring a partner into a practice, and the advisors who support them. Dr. Njo recommends starting with the decision in front of you, then bringing your questions to your transition advisor and independent legal and tax advisors.",
  },
];

const SecondBook = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-accent to-white px-4 pt-10 pb-12 md:pt-16 md:pb-16">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
            Published{" "}
            <time dateTime={SECOND_EDITION_PUBLISHED_ISO}>
              {SECOND_EDITION_PUBLISHED_LABEL}
            </time>{" "}
            · Now on Kindle
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Dental Practice Transitions Handbook, Second Edition
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
            A Blueprint for Buying and Selling Healthcare Practices in Different
            Economic Climates. Dr. Michael Njo&apos;s expanded second edition,
            with a foreword by Dr. Glenn Vo, reached #1 Best Seller in Dentistry
            on Amazon shortly after launch.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4 shadow-sm sm:p-6">
            <Image
              src="/lovable-uploads/drnjo-2026/handbook-second-edition-coming-soon.webp"
              alt="Second edition announcement graphic for Dental Practice Transitions Handbook by Michael A. Njo, DDS, Founder of Practice Transitions Institute, with a foreword by Dr. Glenn Vo"
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
            <SectionTitle className="mb-4 text-left">
              What the second edition adds
            </SectionTitle>
            <SectionSubtitle className="mb-6 text-left">
              The title and subtitle stay the same. The content grows.
            </SectionSubtitle>
            <ul className="mb-8 grid gap-4 sm:grid-cols-2">
              {whatsNew.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mb-6 text-base leading-relaxed text-gray-600">
              The Second Edition was published on Kindle on{" "}
              <time dateTime={SECOND_EDITION_PUBLISHED_ISO}>
                {SECOND_EDITION_PUBLISHED_LABEL}
              </time>
              . The Kindle edition runs 273 pages and was edited by Catrise
              Austin.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {SECOND_EDITION_KINDLE_URL ? (
                <Button asChild size="lg">
                  <a
                    href={SECOND_EDITION_KINDLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy on Kindle
                    <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <Link href="/contact">Ask about the second edition</Link>
                </Button>
              )}
              <Button asChild size="lg" variant="outline">
                <Link href={HANDBOOK_PATH}>Read about the first edition</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={BOOKS_PATH}>Compare both editions</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section background="light">
        <div className="mx-auto max-w-3xl">
          <SectionTitle className="mb-6 text-left">
            Second edition questions
          </SectionTitle>
          <dl className="space-y-6">
            {secondBookFaqs.map((item) => (
              <div key={item.question}>
                <dt className="text-lg font-semibold text-gray-900">
                  {item.question}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-gray-600">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    <TransitionReadingPaths audience="buyer" />
</>
  );
};

export default SecondBook;
