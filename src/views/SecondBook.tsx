import Link from "next/link";
import Image from "next/image";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { HANDBOOK_PATH } from "@/lib/constants";

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

const SecondBook = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-accent to-white px-4 pt-10 pb-12 md:pt-16 md:pb-16">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
            Coming soon
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Dental Practice Transitions Handbook, Second Edition
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
            A Blueprint for Buying and Selling Healthcare Practices in Different
            Economic Climates. Dr. Michael Njo&apos;s next book is an expanded
            second edition of the handbook, with a foreword by Dr. Glenn Vo.
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
              A release date has not been announced. Until then, the published
              first edition of{" "}
              <em>Dental Practice Transitions Handbook</em> remains the current
              resource. It is the same book Dr. Njo signs at Panel of Experts
              dinners and hands to General Practice Residency residents.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={HANDBOOK_PATH}>Read about the first edition</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Ask about the second edition</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default SecondBook;
