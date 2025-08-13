
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { CheckCircle, TrendingUp, Users, Building, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Value = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              Don't Leave Your Legacy to Chance.<br />Know Your Practice's Real Value.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              Our comprehensive and expert valuation provides the clarity you need, before making any transition decisions.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Schedule a Consultation</Link>
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
              Your dental practice is more than just a business; it's a reflection of your dedication and expertise. 
              When considering a transition, undervaluing or overvaluing your practice can have significant financial 
              consequences, jeopardizing your future and the legacy you've built.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Practice Transitions Institute provides the expert guidance you need to navigate this critical stage. 
              We understand the nuances of dental practice valuation and offer a clear, comprehensive approach to 
              ensure you have an accurate picture of your practice's worth, protecting your investment and paving 
              the way for a successful transition.
            </p>
          </div>
        </div>
      </Section>

      {/* Our Clear Path Section */}
      <Section background="light">
        <SectionTitle centered>Our Clear Path to Understanding Your Practice Value</SectionTitle>
        <SectionSubtitle centered>
          We believe in a transparent and thorough valuation process that provides you with a complete understanding 
          of your practice's market value. Our experienced team considers all critical aspects, including:
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
            Our multi-faceted approach ensures a valuation that is both accurate and reflective of your practice's unique value.
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
                We'll walk you through our findings, ensuring you understand every aspect of your practice's value.
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

      {/* CTA Section After What to Expect */}
      <Section background="primary">
        <Cta 
          title="Start Your Valuation Today"
          description="Get the expert insights you need to make informed transition decisions."
          buttonText="Schedule a Consultation"
          buttonUrl="/contact"
          background="primary"
          className="text-center"
        >
          <div className="mt-4">
            <Link to="/services" className="text-white/80 hover:text-white underline">
              View Other Services
            </Link>
          </div>
        </Cta>
      </Section>

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
                A professional valuation provides an unbiased and accurate assessment of your practice's market value, 
                crucial for fair negotiations whether you're buying or selling. It also helps with financial planning 
                and understanding your most significant asset.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                What factors significantly impact my dental practice's value?
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
                We offer various levels of valuation, from an initial Opinion of Value for preliminary planning to a 
                comprehensive Standard Valuation for most transactions and a Certified Valuation for complex situations 
                or legal purposes. We can help you determine the best fit for your needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      {/* Second CTA Section After FAQ */}
      <Section>
        <Cta 
          title="Get Expert Guidance on Your Practice Valuation"
          description="Let our specialists help you understand your practice's true market value."
          buttonText="Get Started Today"
          buttonUrl="/contact"
          background="light"
        />
      </Section>

      {/* Valuation Testimonial Section */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <SectionTitle centered>What Our Clients Say</SectionTitle>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <div className="text-center">
              <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                "I had the pleasure of meeting Fred & Liz. Fred's insight is a goldmine for anyone looking to purchase or sell a dental practice. Fred's expertise in valuations and legalities is impressive. The resources provided seem comprehensive and well-crafted, a testament to their experience. If you're a dentist considering a practice transaction, I recommend tapping into their knowledge and experience."
              </blockquote>
              <div className="flex flex-col items-center">
                <p className="font-semibold text-gray-900 text-lg">Alexander Zaykov</p>
                <p className="text-gray-600">Dentist</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section className="mb-8">
        <Cta 
          title="Ready to Discover Your Practice's True Value?"
          description="Schedule a consultation to discuss which valuation approach is right for your needs."
          buttonText="Schedule a Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Value;
