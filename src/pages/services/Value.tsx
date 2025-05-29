
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
              Don't Leave Your Legacy to Chance. Know Your Practice's Real Value.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              Our comprehensive and expert valuation provides the clarity you need, before making any transition decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Schedule a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">View All Services</Link>
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

      {/* FAQ Section */}
      <Section background="light">
        <SectionTitle centered>Frequently Asked Questions</SectionTitle>
        
        <div className="max-w-4xl mx-auto mt-8">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                Why do I need a professional dental practice valuation?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                A professional valuation provides an unbiased and accurate assessment of your practice's market value, 
                crucial for fair negotiations whether you're buying or selling. It also helps with financial planning 
                and understanding your most significant asset.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                What factors significantly impact my dental practice's value?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                Key factors include your financial performance (revenue, profitability), patient demographics and retention, 
                the condition and age of your equipment, your location, and the expertise of your team.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                How is a dental practice valuation different from valuing a general business?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                Dental practices have unique elements like patient goodwill, the importance of the doctor-patient relationship, 
                insurance complexities, and specialized equipment, which require specific expertise to assess accurately.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                What are the different types of valuations, and which one is right for me?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                We offer various levels of valuation, from an initial Opinion of Value for preliminary planning to a 
                comprehensive Standard Valuation for most transactions and a Certified Valuation for complex situations 
                or legal purposes. We can help you determine the best fit for your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                How long does it typically take to sell a dental practice?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                The timeline can vary depending on market conditions, the specifics of your practice, and how well-prepared 
                you are. On average, it can take anywhere from 6 to 18 months. Our proactive approach aims to streamline this process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                What are my options besides a direct sale?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                Depending on your goals and timeline, other options include bringing on an associate with a potential buy-in, 
                forming a partnership, or even a staged retirement with an eventual sale. We can explore these alternatives with you.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                How can I ensure a smooth transition for my patients and staff?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                Communication and careful planning are key. We advise on strategies to introduce the new owner or partner 
                effectively and support your staff through the change to minimize disruption and maintain patient trust.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                What role does a transition consultant play in the process?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                A transition consultant acts as your expert guide and advocate. We handle the complexities of valuation, 
                marketing, negotiations, and legal considerations, allowing you to focus on your practice and your future. 
                We ensure you achieve your personal and professional goals and walk you through each step.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                When is the right time to start thinking about selling my dental practice?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                Ideally, you should begin planning at least 1-5 years before you intend to transition. This allows ample 
                time for preparation, valuation, and finding the right buyer or opportunity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                What should I look for in a potential buyer or partner?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                Beyond the financial aspects, it's crucial to find someone whose philosophy, patient care standards, 
                and personality align with yours to ensure a successful long-term fit for your patients and staff. 
                We have access to a broad range of potential buyers to introduce the perfect match.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                How can I maximize the value of my dental practice before selling?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                Strategies include optimizing your financial performance, ensuring your records are well-organized, 
                maintaining a strong patient base, and potentially updating equipment or your facility. We can provide 
                specific recommendations based on your practice.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      {/* CTA Section */}
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
