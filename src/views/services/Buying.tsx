import Link from "next/link";
import {
  BadgeDollarSign,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  SearchCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Cta } from "@/components/ui/cta";
import { Section, SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { ServiceEngagementDetails } from "@/components/services/ServiceEngagementDetails";

export const buyingFaqs = [
  {
    question: "Do I need lender prequalification before I start looking?",
    answer:
      "Not necessarily before the first conversation, but early lender input helps define a realistic price range and makes an offer more credible. PTI can help you prepare for those conversations and coordinate with a dental lender.",
  },
  {
    question: "Can PTI help me evaluate a practice I already found?",
    answer:
      "Yes. We can review the practice information, test the assumptions behind the asking price, identify questions for due diligence, and help you plan the negotiation and transition.",
  },
  {
    question: "Does PTI represent the buyer or the seller?",
    answer:
      "That depends on the engagement. Before work begins, PTI explains in writing who it represents, the scope of its role, and any potential conflicts. Buyers should also retain their own attorney and CPA.",
  },
  {
    question: "Does PTI provide legal, tax, or lending advice?",
    answer:
      "No. PTI provides transition and transaction guidance and can coordinate with your attorney, CPA, and lender. Those licensed professionals remain responsible for legal, tax, and lending advice.",
  },
];

const buyingSteps = [
  {
    icon: SearchCheck,
    title: "Define the right opportunity",
    description:
      "Clarify your clinical goals, preferred market, financial range, timeline, and the kind of practice you are prepared to lead.",
  },
  {
    icon: BadgeDollarSign,
    title: "Test value and affordability",
    description:
      "Review cash flow, normalized expenses, debt capacity, and the assumptions behind the asking price before you commit.",
  },
  {
    icon: ClipboardCheck,
    title: "Prepare for diligence",
    description:
      "Organize the financial, operational, team, lease, and patient questions your advisors need to investigate.",
  },
  {
    icon: Building2,
    title: "Plan ownership and handoff",
    description:
      "Coordinate the offer, financing, closing workstreams, seller transition, team communication, and first months of ownership.",
  },
];

const Buying = () => (
  <>
    <section className="bg-gradient-to-b from-accent to-white pb-12 pt-20 md:pb-16 md:pt-28">
      <div className="container px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
            Buyer and acquisition advisory
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Buy the right dental practice with a clear plan
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-gray-700 md:text-xl">
            PTI helps first-time and experienced buyers evaluate opportunities,
            understand the numbers, prepare for due diligence, and coordinate a
            practical path to ownership.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">Discuss Your Acquisition Plan</Link>
          </Button>
        </div>
      </div>
    </section>

    <Section>
      <div className="mx-auto max-w-4xl text-center">
        <SectionTitle centered>Make the decision before the deal makes it for you</SectionTitle>
        <SectionSubtitle centered>
          A promising practice still has to fit your clinical goals, financial
          capacity, leadership readiness, and long-term plan.
        </SectionSubtitle>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
          PTI gives you an experienced transition advisor who can help separate a
          compelling listing from a sound acquisition. We focus on the questions,
          assumptions, and handoff decisions that affect life after closing.
        </p>
      </div>
    </Section>

    <Section background="light">
      <SectionTitle centered>How PTI supports dental practice buyers</SectionTitle>
      <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2">
        {buyingSteps.map((step) => (
          <article
            key={step.title}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <step.icon className="mb-4 h-7 w-7 text-primary" aria-hidden="true" />
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-gray-600">{step.description}</p>
          </article>
        ))}
      </div>
    </Section>

    <Section>
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionTitle>Questions we help you answer</SectionTitle>
          <ul className="mt-6 space-y-4 text-gray-700">
            {[
              "Does the practice support the income, debt service, and investment the purchase requires?",
              "What is included in the price, and which assumptions still need to be verified?",
              "Is the team, patient base, facility, and location a practical fit for your goals?",
              "What should the offer, seller transition, and first 100 days of ownership address?",
            ].map((question) => (
              <li key={question} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="rounded-2xl border border-blue-100 bg-blue-50/60 p-7">
          <h2 className="text-2xl font-semibold text-gray-900">Already found a practice?</h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Bring the offering materials, your lender status, and the questions
            you already have. We will identify the next decisions and the outside
            advisors you need before signing a letter of intent.
          </p>
          <Button asChild variant="outline" className="mt-6 bg-white">
            <Link href="/contact">Request an Opportunity Review</Link>
          </Button>
        </aside>
      </div>
    </Section>

    <ServiceEngagementDetails
      deliverables={[
        "Acquisition criteria and readiness plan",
        "Practice and financial review questions",
        "Offer, diligence, and transition decision support",
      ]}
      timeline="Timing depends on whether you are preparing to search, reviewing a specific opportunity, or already negotiating. PTI confirms the phases and estimated schedule in the written scope."
    />

    <Section>
      <SectionTitle centered>Frequently asked questions</SectionTitle>
      <div className="mx-auto mt-8 max-w-4xl">
        <Accordion type="single" collapsible className="space-y-4">
          {buyingFaqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`buying-${index}`}
              className="rounded-lg border border-gray-200 bg-white"
            >
              <AccordionTrigger className="px-4 py-4 text-left text-base font-semibold sm:px-6 md:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 leading-relaxed text-gray-600 sm:px-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>

    <Section className="mb-8">
      <Cta
        title="Considering a Practice Purchase?"
        description="Start with a confidential conversation about your goals, readiness, and the opportunity in front of you."
        buttonText="Discuss Your Acquisition Plan"
        buttonUrl="/contact"
      />
    </Section>
  </>
);

export default Buying;
