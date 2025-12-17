
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Handshake, FileText, Scale, CheckCircle, Users, Target, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/layout/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { serviceOfferings } from "@/data/services";
import { buildServiceOfferingsSchema } from "@/lib/structuredData";

const Partnerships = () => {
  const offering = serviceOfferings.find(
    (service) => service.url === "/services/partnerships"
  );
  const structuredData = offering ? buildServiceOfferingsSchema([offering]) : [];

  return (
    <>
      <SEO
        title="Partnerships"
        description={
          offering?.description ??
          "Creating equitable partnership arrangements that benefit all parties involved."
        }
        path="/services/partnerships"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              Multiply Your Success: Creating Thriving Dental Practice Partnerships
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              Our expert guidance ensures the creation of equitable agreements built for long-term stability and mutual prosperity.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Building Successful Dental Partnerships
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              A well-structured partnership can multiply the success of a dental practice while providing both personal and professional benefits to all partners involved.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Practice Transitions Institute, we specialize in creating partnership arrangements that are balanced, equitable, and designed for long-term success.
            </p>
            <div className="flex justify-center sm:justify-start">
              <Button asChild size="lg">
                <Link to="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3" 
              alt="Dental partners collaborating" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section background="light">
        <SectionTitle centered>Our Partnership Process</SectionTitle>
        <SectionSubtitle centered>
          Creating sustainable partnerships built on transparency and equity
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Initial Assessment</h3>
            <p className="text-gray-600 leading-relaxed">
              We evaluate practice metrics, partner dynamics, and shared goals to ensure partnership viability.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Scale className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Valuation & Structure</h3>
            <p className="text-gray-600 leading-relaxed">
              We determine fair market value and design an equitable ownership structure that works for all parties.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Handshake className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Legal Framework</h3>
            <p className="text-gray-600 leading-relaxed">
              We develop comprehensive partnership agreements that address governance, profit sharing, and exit strategies.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-300">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Implementation</h3>
            <p className="text-gray-600 leading-relaxed">
              We guide the execution and integration of the partnership to ensure a smooth transition and ongoing success.
            </p>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <SectionTitle centered>Partnership Benefits</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-center">Financial Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Shared Overhead Costs</h4>
                  <p className="text-gray-600 leading-relaxed">Reduce individual burden by sharing facility, equipment, and administrative costs.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Increased Production Capacity</h4>
                  <p className="text-gray-600 leading-relaxed">Multiple practitioners can maximize facility utilization and revenue potential.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Economies of Scale</h4>
                  <p className="text-gray-600 leading-relaxed">Greater purchasing power and efficiency in operations and marketing.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Risk Distribution</h4>
                  <p className="text-gray-600 leading-relaxed">Shared financial responsibility during economic fluctuations or practice challenges.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <h3 className="text-2xl font-bold mb-6 text-center">Lifestyle Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Better Work-Life Balance</h4>
                  <p className="text-gray-600 leading-relaxed">Shared clinical responsibilities and coverage allow for more personal time.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Complementary Skill Sets</h4>
                  <p className="text-gray-600 leading-relaxed">Partners can specialize in different clinical areas or aspects of business management.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Professional Support</h4>
                  <p className="text-gray-600 leading-relaxed">Built-in mentorship, collaboration, and shared clinical decision-making.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Succession Planning</h4>
                  <p className="text-gray-600 leading-relaxed">Creates a natural pathway for gradual retirement and practice continuity.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-8 md:py-12">
        <Cta 
          title="Ready to Explore Partnership Options?"
          description="Schedule a consultation with our team to discuss how a partnership structure could benefit your practice."
          buttonText="Book Your Consultation"
          buttonUrl="/contact"
        />
      </Section>

      {/* FAQ Section */}
      <Section background="light">
        <SectionTitle centered>Frequently Asked Questions</SectionTitle>
        
        <div className="max-w-4xl mx-auto mt-8">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                What are the key elements of a successful dental partnership agreement?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                A strong agreement clearly outlines ownership percentages, responsibilities, decision-making processes (governance), compensation models, buy-sell provisions, and dispute resolution mechanisms.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                What are common pitfalls to avoid when forming a dental partnership?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                Lack of clear communication, unequal workload or compensation without a fair system, poorly defined decision-making processes, and inadequate buy-sell agreements are common issues.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                How do partners handle disagreements or disputes in a dental practice?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                The partnership agreement should outline a process for dispute resolution, which may include mediation or arbitration. Open and honest communication is crucial.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                What are the tax implications of forming a dental partnership?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                Partnerships typically file informational tax returns, and profits and losses are passed through to the individual partners. It's essential to consult with a tax advisor specializing in dental practices.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-4 sm:px-6 py-4 text-sm sm:text-base md:text-lg font-semibold">
                How does a partnership impact practice valuation for future sale or transition?
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                A well-functioning partnership can increase the overall value of the practice. However, the partnership agreement should also address how a future sale or transition of the partnership itself would be handled.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mb-8">
        <Cta 
          title="Ready to Explore Partnership Options?"
          description="Schedule a consultation with our team to discuss how a partnership structure could benefit your practice."
          buttonText="Book Your Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Partnerships;
