import Link from "next/link";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Button } from "@/components/ui/button";
import { PracticeValueCalculator } from "@/components/resources/PracticeValueCalculator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart3,
  Building,
  CheckCircle,
  HeartHandshake,
  LineChart,
  MapPin,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react";

export const practiceWorthFaqs = [
  {
    question: "Can I estimate my practice's value from a percentage of collections?",
    answer:
      "Rules of thumb based on collections are common, but they are starting points, not answers. Two practices with identical collections can be worth very different amounts once profitability, overhead, patient retention, payer mix, and upcoming capital needs are taken into account. A valuation grounded in your practice's actual cash flow is far more reliable than any multiplier.",
  },
  {
    question: "What documents do I need for a dental practice valuation?",
    answer:
      "Typically two to three years of financial statements and tax returns, production and collections reports, an accounts receivable aging summary, payroll information, your lease or real-estate details, and a summary of equipment and technology. Organized records speed up the process and usually improve the credibility of the result.",
  },
  {
    question: "How often should I have my practice valued?",
    answer:
      "Any time you are considering a transition — a sale, a partner or associate buy-in, or a DSO offer — and periodically even if you are not, because your practice is likely your largest asset. Many dentists get an updated opinion of value every few years as part of retirement and estate planning.",
  },
  {
    question: "Does a valuation commit me to selling?",
    answer:
      "No. An opinion of value is an independent assessment of what your practice is worth. Many dentists use it purely for planning: to set a retirement timeline, to compare against an unsolicited offer, or to identify what they could improve before going to market.",
  },
];

const valueFactors = [
  {
    icon: <Wallet className="h-6 w-6 text-blue-600" />,
    title: "True cash flow",
    description:
      "Not just top-line collections — buyers and lenders look at what the practice actually earns after real overhead.",
  },
  {
    icon: <LineChart className="h-6 w-6 text-emerald-600" />,
    title: "Collections history and trend",
    description:
      "Stable or growing collections over multiple years support stronger valuations than a single good year.",
  },
  {
    icon: <Users className="h-6 w-6 text-orange-600" />,
    title: "Patient base and retention",
    description:
      "Active patient count, new-patient flow, recall effectiveness, and payer mix all shape what a buyer is purchasing.",
  },
  {
    icon: <MapPin className="h-6 w-6 text-purple-600" />,
    title: "Location and facility",
    description:
      "Demographics, competition, visibility, and the strength of your lease or real estate position.",
  },
  {
    icon: <Stethoscope className="h-6 w-6 text-sky-600" />,
    title: "Equipment and technology",
    description:
      "Modern, well-maintained operatories add value; deferred upgrades become negotiating points against you.",
  },
  {
    icon: <HeartHandshake className="h-6 w-6 text-rose-600" />,
    title: "Team and goodwill",
    description:
      "An experienced team that stays through the transition, and a brand patients trust, carry real transferable value.",
  },
];

const PracticeWorth = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-10 pb-12 md:pt-16 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              How Much Is My Dental Practice Worth?
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              A dental practice’s value depends on sustainable cash flow, transferable goodwill, buyer financing, and transaction terms. Collections alone cannot establish the price. Use the scenarios below to organize questions, then obtain an assessment grounded in your records and market.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/services/value">Get an Opinion of Value</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <Section className="pt-0 -mt-6 md:-mt-10">
        <PracticeValueCalculator />
      </Section>

      {/* Why no single number */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              You may have heard rules of thumb — a percentage of annual collections, or a multiple of earnings. These shortcuts exist because they are easy, not because they are accurate. Two practices with the same collections can be worth very different amounts once profitability, patient retention, payer mix, staffing, and facility condition enter the picture.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              A credible answer starts with your practice&apos;s true cash flow and weighs the factors below — the same ones a serious buyer, a lender, or a DSO acquisition team will scrutinize.
            </p>
          </div>
        </div>
      </Section>

      {/* Factors Section */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold md:text-3xl">The same collections can produce different answers</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">Consider two hypothetical general practices, each collecting $1 million per year. At a 40% owner-benefit margin, owner benefit is $400,000. At 20%, it is $200,000. Collections are identical; the earnings input is not. These are teaching examples, not transactions or typical margins.</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">Using the calculator&apos;s stated assumptions, the collections method gives $600,000–$850,000 in both cases. The owner-benefit method gives $1 million–$1.6 million in the first case and $500,000–$800,000 in the second. Averaging those methods is simply this tool&apos;s educational convention; a professional valuation weighs the evidence for the specific practice.</p>
          <h3 className="mt-7 text-xl font-semibold">Which earnings figure are you comparing?</h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">Collections are money received by the practice. Owner benefit includes earnings available to an owner before paying that owner for clinical work. Adjusted EBITDA for a buyer uses a different earnings definition, including appropriate clinician compensation. Ask your advisor to reconcile the financial statements and explain each adjustment before comparing offers or multiples.</p>
          <h3 className="mt-7 text-xl font-semibold">What to bring to a valuation conversation</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground"><li>Recent financial statements, tax returns, production and collections reports.</li><li>Owner and associate compensation, recurring expenses, and proposed adjustments.</li><li>Patient activity, payer mix, staffing, equipment and lease information.</li><li>Your intended transition, timeline and any buyer proposal already received.</li></ul>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">Start with PTI&apos;s <Link href="/services/value" className="font-semibold text-primary underline">Opinion of Value scope</Link>, meet <Link href="/drnjo" className="font-semibold text-primary underline">Dr. Michael Njo</Link>, or read the <a href="https://www.ada.org/resources/careers/career-planning/what-makes-a-successful-sale" className="font-semibold text-primary underline">American Dental Association&apos;s guide to a successful sale</a>. A formal appraisal may be needed when a lender, court or another relying party requires one.</p>
        </div>
      </Section>
      <Section background="light">
        <SectionTitle centered>What Drives Dental Practice Value</SectionTitle>
        <SectionSubtitle centered>
          The factors a professional valuation examines — and a buyer will too
        </SectionSubtitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          {valueFactors.map((factor) => (
            <div
              key={factor.title}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {factor.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{factor.title}</h3>
              <p className="text-gray-600 leading-relaxed">{factor.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How a valuation works */}
      <Section>
        <SectionTitle centered>How a Professional Valuation Works</SectionTitle>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-8 max-w-5xl mx-auto">
          <div className="flex items-start space-x-4">
            <BarChart3 className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Income approach</h3>
              <p className="text-gray-600 leading-relaxed">
                Values the practice on the earnings it reliably produces — the lens most buyers and lenders lead with.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Building className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Market approach</h3>
              <p className="text-gray-600 leading-relaxed">
                Compares your practice against actual sales of similar practices, adjusted for your market and mix.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Asset approach</h3>
              <p className="text-gray-600 leading-relaxed">
                Accounts for equipment, technology, and tangible assets — a floor, not the whole story, for a going practice.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-10">
          <p className="text-gray-600 leading-relaxed">
            PTI&apos;s{" "}
            <Link href="/services/value" className="text-primary font-semibold hover:underline">
              Opinion of Value
            </Link>{" "}
            blends these approaches into a clear, defensible assessment you can use for planning, a sale, a partner buy-in, or to pressure-test a{" "}
            <Link
              href="/services/selling-to-a-dso"
              className="text-primary font-semibold hover:underline"
            >
              DSO offer
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mb-8">
        <Cta
          title="Get a Number You Can Actually Rely On"
          description="Start with a confidential conversation about your practice and your timeline — no obligation to sell."
          buttonText="Request an Opinion of Value"
          buttonUrl="/contact"
        />
      </Section>

      {/* FAQ Section */}
      <Section background="light">
        <SectionTitle centered>Frequently Asked Questions</SectionTitle>

        <div className="max-w-4xl mx-auto mt-8">
          <Accordion type="single" collapsible className="space-y-4">
            {practiceWorthFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index + 1}`}
                className="bg-white rounded-lg border border-gray-200"
              >
                <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Next steps */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle centered>Preparing for a Sale?</SectionTitle>
          <p className="text-gray-600 leading-relaxed mb-6">
            If a transition is on your horizon, our free{" "}
            <Link
              href="/resources/practice-sale-readiness-checklist"
              className="text-primary font-semibold hover:underline"
            >
              Practice Sale Readiness Checklist
            </Link>{" "}
            walks through the records, operations, and timing questions to address before going to market.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/resources/practice-sale-readiness-checklist">
              Get the Checklist
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
};

export default PracticeWorth;
