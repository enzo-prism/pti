import Link from "next/link";
import Image from "next/image";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { HANDBOOK_PATH } from "@/lib/constants";

const SecondBook = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-accent to-white px-4 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
            Forthcoming
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Second Book (Coming)
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
            Dr. Michael Njo is working on a second book. The title has not been
            announced yet. The published handbook remains the current resource.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4 shadow-sm sm:p-6">
            <Image
              src="/lovable-uploads/drnjo-2026/handbook-cover-spread.webp"
              alt="Dental Practice Transitions Handbook, the published first book"
              width={1600}
              height={1201}
              className="h-auto w-full object-contain"
              sizes="(min-width: 1024px) 480px, 100vw"
              priority
            />
            <p className="mt-4 text-center text-sm text-gray-500">
              The published first book, while the second book is forthcoming.
            </p>
          </div>

          <div>
            <SectionTitle className="mb-4 text-left">
              A dedicated page for the next book
            </SectionTitle>
            <SectionSubtitle className="mb-6 text-left">
              This page will be updated when a title and publication details are
              ready. We are not inventing a name, cover, or release date.
            </SectionSubtitle>
            <p className="mb-6 text-base leading-relaxed text-gray-600">
              Until then, start with{" "}
              <em>Dental Practice Transitions Handbook</em> — the same book Dr.
              Njo signs at Panel of Experts dinners.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={HANDBOOK_PATH}>Read the handbook page</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Ask about the next book</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default SecondBook;
