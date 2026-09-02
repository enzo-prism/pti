
import Link from "next/link";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { CheckCircle, TrendingUp, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ServiceEngagementDetails } from "@/components/services/ServiceEngagementDetails";

const Value = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-10 pb-12 md:pt-16 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              Understand Your Dental Practice&apos;s Value
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              Get a documented analysis of financial performance, operations, and market context before a sale, buy-in, partnership, or long-term planning decision.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Request a Valuation Consultation</Link>
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
              Your dental practice is more than just a business; it&apos;s a reflection of your dedication and expertise. 
              When considering a transition, undervaluing or overvaluing your practice can have significant financial 
              consequences, jeopardizing your future and the legacy you&apos;ve built.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Practice Transitions Institute reviews the information available,
              documents the assumptions used, and explains the valuation range and
              its limitations. A valuation supports decision-making, but the final
              price still depends on the market, buyer, financing, and deal terms.
            </p>
          </div>
        </div>
      </Section>

      {/* Our Clear Path Section */}
      <Section background="light">
        <SectionTitle centered>Our Clear Path to Understanding Your Practice Value</SectionTitle>
        <SectionSubtitle centered>
          We believe in a transparent and thorough valuation process that provides you with a complete understanding 
          of your practice&apos;s market value. Our experienced team considers all critical aspects, including:
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Financial Performance</h3>
            <p className="text-gray-600 leading-relaxed">
              Analyzing your revenue trends, profitability, and fee structure to establish a solid financial foundation.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Market Dynamics</h3>
            <p className="text-gray-600 leading-relaxed">
              Comparing your practice to recent sales in your area to understand current market conditions.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Practice Strengths</h3>
            <p className="text-gray-600 leading-relaxed">
              Evaluating your patient base, facility, equipment, and the strength of your team.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            The result is a documented opinion of value based on the information
            reviewed and the purpose of the engagement.
          </p>
        </div>
      </Section>

      {/* What to Expect Section */}
      <Section>
        <SectionTitle centered>What to Expect from Our Valuation Process</SectionTitle>
        <SectionSubtitle centered>
          When you partner with Practice Transitions Institute for your valuation, you can expect:
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-8 max-w-5xl mx-auto">
          <div className="flex items-start space-x-4 animate-fade-in">
            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Expert Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                A thorough review conducted by professionals specializing in dental practice transitions.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-100">
            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                A valuation grounded in financial data, market analysis, and a deep understanding of the dental industry.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-200">
            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Clear Communication</h3>
              <p className="text-gray-600 leading-relaxed">
                We walk through the findings, assumptions, and limits so you can use the analysis appropriately.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-300">
            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Actionable Intelligence</h3>
              <p className="text-gray-600 leading-relaxed">
                A valuation that empowers you to make informed decisions about your transition.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <ServiceEngagementDetails
        deliverables={[
          "Requested financial and operational information checklist",
          "Written opinion of value with assumptions and methodology",
          "Findings review and planning discussion",
        ]}
        timeline="Timing depends on the valuation purpose, the scope agreed in writing, and when complete records are available. PTI confirms the required information and estimated delivery date before work begins."
      />

      {/* FAQ Section */}
      <Section background="light">
        <SectionTitle centered>Frequently Asked Questions</SectionTitle>
        
        <div className="max-w-4xl mx-auto mt-8">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                Why do I need a professional dental practice valuation?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                A professional valuation provides a documented estimate of market value based on the available financial, operational, and market information. It supports negotiations and planning, but it does not guarantee a final sale price.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                What factors significantly impact my dental practice&apos;s value?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                Key factors include your financial performance (revenue, profitability), patient demographics and retention, 
                your location, and the expertise of your team.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                How is a dental practice valuation different from valuing a general business?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                Dental practices have unique elements like patient goodwill, the importance of the doctor-patient relationship, 
                insurance complexities, and specialized equipment, which require specific expertise to assess accurately.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                What are the different types of valuations, and which one is right for me?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                The right scope depends on the decision you need to make and who will rely on the work. PTI explains the available scope, deliverables, limits, fee, and whether a separate credentialed appraisal or legal expert is appropriate before the engagement begins.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section className="mb-8">
        <Cta 
          title="Need a Clearer View of Your Practice&apos;s Value?"
          description="Schedule a consultation to discuss which valuation approach is right for your needs."
          buttonText="Request a Valuation Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Value;
