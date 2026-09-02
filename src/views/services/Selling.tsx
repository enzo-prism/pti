
import Link from "next/link";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { DollarSign, FileText, TrendingUp, CheckCircle, Shield, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFeaturedReviews } from "@/data/reviews";
import { ServiceEngagementDetails } from "@/components/services/ServiceEngagementDetails";

export const sellingFaqs = [
  {
    question: "When should I start planning a dental practice sale?",
    answer:
      "Start before you need to sell. More lead time gives you a chance to organize records, understand value, address operational issues, review the lease, and decide what you want for your team, patients, and post-sale role.",
  },
  {
    question: "How does PTI protect confidentiality during a sale?",
    answer:
      "The marketing and disclosure plan controls when identifying information and financial records are shared. Prospective buyers should be screened and use the appropriate confidentiality documents before receiving sensitive information.",
  },
  {
    question: "Who does PTI represent in a practice sale?",
    answer:
      "Representation depends on the engagement. PTI explains in writing who it represents, the scope of its role, compensation, and any potential conflicts before work begins. Each party should retain independent legal and tax advice.",
  },
  {
    question: "Which outside advisors are involved in a practice sale?",
    answer:
      "A typical team may include a dental attorney, CPA or tax advisor, buyer's lender, insurance professionals, and real-estate counsel. PTI coordinates transition workstreams, while those licensed professionals remain responsible for their advice.",
  },
];

const Selling = () => {
  const sellerTestimonials = getFeaturedReviews("selling").slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-10 pb-12 md:pt-16 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              Sell Your Dental Practice With a Clear, Confidential Plan
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              PTI helps you prepare the practice, understand value, screen buyers, negotiate business terms, and coordinate the path to closing.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Discuss Your Practice Sale</Link>
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
              Selling your dental practice requires more than just listing it. It demands a strategic approach guided by experienced professionals who understand the intricacies of the dental market.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Practice Transitions Institute coordinates the sale process while helping you compare price, terms, buyer fit, team continuity, and your post-sale role.
            </p>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section background="light">
        <SectionTitle centered>How PTI Guides a Practice Sale</SectionTitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">In-Depth Valuation</h3>
            <p className="text-gray-600 leading-relaxed">
              We analyze the practice&apos;s financials, operations, and market context to establish a defensible planning range.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Targeted Marketing</h3>
            <p className="text-gray-600 leading-relaxed">
              We leverage our network to connect your practice with qualified buyers who are the right fit.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Strategic Negotiation</h3>
            <p className="text-gray-600 leading-relaxed">
              We help compare and negotiate price, structure, timing, contingencies, and the obligations that continue after closing.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-300">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Dedicated Support</h3>
            <p className="text-gray-600 leading-relaxed">
              We coordinate the transaction workstreams and help plan communication with the buyer, team, and patients.
            </p>
          </div>
        </div>
      </Section>

      {/* PTI Advantage Section */}
      <Section>
        <SectionTitle centered>The PTI Advantage When Selling Your Practice</SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-8 max-w-5xl mx-auto">
          <div className="flex items-start space-x-4 animate-fade-in">
            <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Value in Context</h3>
              <p className="text-gray-600 leading-relaxed">
                Compare likely proceeds, deal terms, timing, and risk instead of relying on a headline price alone.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-100">
            <Shield className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Confidentiality You Can Trust</h3>
              <p className="text-gray-600 leading-relaxed">
                Sensitive information is shared through a controlled process with screened buyers and the appropriate confidentiality steps.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-200">
            <TrendingUp className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Coordinated Deal Structure</h3>
              <p className="text-gray-600 leading-relaxed">
                We work to structure the sale in a way that benefits both parties.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-300">
            <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">A Managed Handoff</h3>
              <p className="text-gray-600 leading-relaxed">
                We manage the complexities, allowing you to focus on your next chapter.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <ServiceEngagementDetails
        deliverables={[
          "Practice readiness and valuation analysis",
          "Confidential marketing and buyer-screening plan",
          "Offer comparison, negotiation, diligence, and handoff support",
        ]}
        timeline="A practice sale often moves through preparation, marketing, negotiation, diligence, and closing. PTI confirms an estimated schedule after reviewing your goals, readiness, and market."
      />

      {/* FAQ Section */}
      <Section background="light">
        <SectionTitle centered>Frequently Asked Questions</SectionTitle>
        
        <div className="max-w-4xl mx-auto mt-8">
          <Accordion type="single" collapsible className="space-y-4">
            {sellingFaqs.map((faq, index) => (
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

      {/* Seller Testimonials Section */}
      <Section>
        <SectionTitle centered>What Our Sellers Say</SectionTitle>
        <SectionSubtitle centered>
          Seller reviews presented as recorded in PTI&apos;s review library
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
          title="Considering a Practice Sale?"
          description="Start with a confidential 30-minute conversation about your goals, timeline, and readiness."
          buttonText="Discuss Your Practice Sale"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Selling;
