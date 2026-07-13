import Link from "next/link";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import {
  Building2,
  CheckCircle,
  FileSearch,
  Handshake,
  Scale,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFeaturedReviews } from "@/data/reviews";

export const dsoFaqs = [
  {
    question: "Is a DSO offer usually higher than a private buyer's offer?",
    answer:
      "Often the headline number is higher, but the structure matters more than the number. DSO offers frequently include earnouts, equity rollovers, holdbacks, and multi-year work-back requirements, so the guaranteed cash at closing can be very different from the price on the letter of intent. A private buyer usually offers a simpler structure with more certainty at closing.",
  },
  {
    question: "What should I look at before signing a DSO letter of intent?",
    answer:
      "Before signing anything, understand how much of the price is cash at closing versus contingent, what your post-sale employment terms and production targets are, how the equity component is valued, and what happens if the DSO is later sold or recapitalized. A letter of intent often locks you into exclusivity, so the time to negotiate is before you sign it.",
  },
  {
    question: "Do I still need a valuation if a DSO has already made me an offer?",
    answer:
      "Yes. An independent valuation gives you a baseline for what your practice is worth on the open market, which is the only reliable way to judge whether a DSO's offer and structure are actually competitive. Without it, you are negotiating against a professional acquisition team with no reference point of your own.",
  },
  {
    question: "Will selling to a DSO change how my practice runs afterward?",
    answer:
      "Usually, yes. Most DSO deals include a work-back period where you continue practicing under new ownership, with new systems, metrics, and management. How much autonomy you keep depends on the DSO and on what you negotiate. Understanding those expectations before you commit is a core part of evaluating the offer.",
  },
];

const SellingToADso = () => {
  const sellerTestimonials = getFeaturedReviews("selling").slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              Selling Your Dental Practice to a DSO? Know What the Offer Is Really Worth
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              DSO offers are built by professional acquisition teams. We help you evaluate the structure behind the headline number, compare it against private-buyer alternatives, and negotiate terms that protect your income, your team, and your legacy.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Schedule a Confidential Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Dental Support Organizations are acquiring practices at a record pace, and unsolicited offers can look compelling on paper. But a DSO purchase price is rarely a single cash number — it is a structure of cash at closing, earnouts, equity rollovers, holdbacks, and work-back commitments that can shift the real value dramatically.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Practice Transitions Institute helps you understand what you are actually being offered, whether a private buyer would serve you better, and how to negotiate from a position of knowledge instead of guesswork.
            </p>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section background="light">
        <SectionTitle centered>How We Help You Evaluate a DSO Deal</SectionTitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FileSearch className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Offer & LOI Review</h3>
            <p className="text-gray-600 leading-relaxed">
              We break down the letter of intent line by line — cash at closing, earnouts, equity, holdbacks, and exclusivity terms — so you know exactly what you are agreeing to.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Scale className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Independent Valuation</h3>
            <p className="text-gray-600 leading-relaxed">
              An objective opinion of your practice&apos;s market value gives you a baseline, so the DSO&apos;s number is measured against reality rather than accepted on faith.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Building2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">DSO vs Private Buyer</h3>
            <p className="text-gray-600 leading-relaxed">
              We compare the DSO path against a private sale on the dimensions that matter: certainty of proceeds, timeline, work-back expectations, team continuity, and legacy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-300">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Handshake className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Negotiation & Closing</h3>
            <p className="text-gray-600 leading-relaxed">
              We advocate on your behalf through negotiation, due diligence, and closing, working alongside your attorney and CPA to protect the terms that matter to you.
            </p>
          </div>
        </div>
      </Section>

      {/* What's Behind the Number Section */}
      <Section>
        <SectionTitle centered>What&apos;s Behind a DSO&apos;s Headline Number</SectionTitle>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-8 max-w-5xl mx-auto">
          <div className="flex items-start space-x-4 animate-fade-in">
            <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Cash at Closing vs Contingent Value</h3>
              <p className="text-gray-600 leading-relaxed">
                Earnouts and holdbacks depend on future performance and future events. We help you see how much of the offer is guaranteed and how much is a promise.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 animate-fade-in animate-delay-100">
            <TrendingUp className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Equity Rollovers</h3>
              <p className="text-gray-600 leading-relaxed">
                Rolling part of your proceeds into DSO equity can pay off — or not. The value depends on the DSO&apos;s health, structure, and eventual liquidity event.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 animate-fade-in animate-delay-200">
            <Shield className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Work-Back Terms</h3>
              <p className="text-gray-600 leading-relaxed">
                Most DSO deals require you to keep practicing for years under new ownership. Compensation, production targets, and autonomy all belong in the negotiation.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 animate-fade-in animate-delay-300">
            <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Team & Legacy</h3>
              <p className="text-gray-600 leading-relaxed">
                What happens to your staff, your patients, and your practice&apos;s identity is negotiable — but only if it is addressed before you sign.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mb-8">
        <Cta
          title="Received a DSO Offer? Get a Second Opinion First"
          description="Before you sign a letter of intent, have our team review the offer and show you what your practice is worth on the open market."
          buttonText="Book Your Free Consultation"
          buttonUrl="/contact"
        />
      </Section>

      {/* FAQ Section */}
      <Section background="light">
        <SectionTitle centered>Frequently Asked Questions</SectionTitle>

        <div className="max-w-4xl mx-auto mt-8">
          <Accordion type="single" collapsible className="space-y-4">
            {dsoFaqs.map((faq, index) => (
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

      {/* Related Reading Section */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle centered>Keep Reading</SectionTitle>
          <p className="text-gray-600 leading-relaxed mb-6">
            Weighing your options? Our decision guide compares both paths in detail:{" "}
            <Link
              href="/blog/dso-vs-private-buyer-dental-practice"
              className="text-primary font-semibold hover:underline"
            >
              Should You Sell Your Dental Practice to a DSO or a Private Buyer?
            </Link>
          </p>
          <p className="text-gray-600 leading-relaxed">
            Not sure what your practice is worth yet? Start with an{" "}
            <Link href="/services/value" className="text-primary font-semibold hover:underline">
              Opinion of Value
            </Link>{" "}
            or our{" "}
            <Link
              href="/resources/practice-sale-readiness-checklist"
              className="text-primary font-semibold hover:underline"
            >
              practice sale readiness checklist
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* Seller Testimonials Section */}
      <Section background="light">
        <SectionTitle centered>What Our Sellers Say</SectionTitle>
        <SectionSubtitle centered>
          Hear from dentists who navigated their sale with our guidance
        </SectionSubtitle>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {sellerTestimonials.map((review) => (
            <TestimonialCard
              key={review.id}
              quote={review.quote}
              author={review.displayAuthorName}
              role={review.role}
              company={review.company}
              reviewHref={`/testimonials/${review.slug}`}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/testimonials">View All Testimonials</Link>
          </Button>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section className="mb-8">
        <Cta
          title="Make Your DSO Decision with Confidence"
          description="Schedule a confidential consultation with our team of dental transition experts."
          buttonText="Let's Talk"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default SellingToADso;
