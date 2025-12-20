
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Users, FileText, TrendingUp, CheckCircle, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import SEO from "@/components/layout/SEO";
import { serviceOfferings } from "@/data/services";

const Associateships = () => {
  const isMobile = useIsMobile();
  const offering = serviceOfferings.find(
    (service) => service.url === "/services/associateships"
  );

  return (
    <>
      <SEO
        title="Associateships & Buy-Ins"
        description={
          offering?.description ??
          "Structured pathways for associates to buy in and transition into ownership roles."
        }
        path="/services/associateships"
      />
      {/* Hero Section */}
      <section className="pt-12 pb-8 md:pt-20 md:pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-white to-accent relative overflow-hidden">
        <div className="container relative z-10 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 animate-fade-in leading-tight">
              Grow Your Practice, Secure Your Future: Expert Guidance on Associateships & Buy-Ins
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 md:mb-8 animate-fade-in animate-delay-200 max-w-3xl mx-auto px-2 leading-relaxed">
              From early planning to the final buy-in, we provide comprehensive support to create mutually beneficial arrangements that pave the way for lasting success.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 animate-fade-in">
              Your Path to Practice Ownership
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 animate-fade-in animate-delay-100 px-3 leading-relaxed">
              Whether you're an associate dentist looking to buy into a practice or a practice owner wanting to bring on an associate with a path to ownership, our structured approach ensures a successful transition.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 animate-fade-in animate-delay-200 px-3 leading-relaxed">
              We create clear, equitable arrangements that protect both parties and establish a foundation for long-term success.
            </p>
            <div className="flex justify-center px-3">
              <Button asChild size={isMobile ? "default" : "lg"} className="w-full sm:w-auto text-sm sm:text-base">
                <Link to="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section background="light" className="py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <SectionTitle centered className="text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">Our Associateship Process</SectionTitle>
          <SectionSubtitle centered className="text-sm sm:text-base md:text-lg px-3">
            Creating structured buy-in opportunities with clear expectations
          </SectionSubtitle>
        </div>
        
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 px-3">
          <Card className="bg-white shadow-sm border border-gray-100 animate-fade-in">
            <CardContent className="p-4 sm:p-6">
              <div className="bg-accent rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Needs Assessment</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We evaluate the practice and the associate's goals to ensure alignment and compatibility.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <CardContent className="p-4 sm:p-6">
              <div className="bg-accent rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Structured Agreement</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We develop clear terms for the associateship period, including responsibilities and compensation.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <CardContent className="p-4 sm:p-6">
              <div className="bg-accent rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Buy-In Strategy</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We create a clear path to ownership with defined timelines, valuation methods, and financing options.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm border border-gray-100 animate-fade-in animate-delay-300">
            <CardContent className="p-4 sm:p-6">
              <div className="bg-accent rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">Successful Transition</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We guide the execution of the buy-in process, ensuring a smooth transition to co-ownership.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section className="py-8 sm:py-12 md:py-16">
        <SectionTitle centered>Associateship Benefits</SectionTitle>
        <SectionSubtitle centered>
          Whether you're an associate exploring ownership or a practice owner planning for the future, a well-structured associate-to-buy-in path benefits both sides of the equation.
        </SectionSubtitle>
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 px-3">
          <div className="animate-fade-in">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center lg:text-left">For Associates</h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-1">Reduced Risk</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">Test compatibility with the practice before committing to ownership.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-1">Clear Path to Ownership</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">Structured timeline and terms for transition from associate to co-owner.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-1">Mentorship & Growth</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">Learn from established practitioners while building your clinical and business skills.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-1">Established Patient Base</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">Join an existing practice with an established reputation and patient flow.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center lg:text-left">For Practice Owners</h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-1">Succession Planning</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">Create a gradual transition plan that preserves your legacy and practice value.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-1">Increased Practice Value</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">Adding an associate often increases production and overall practice valuation.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-1">Work-Life Balance</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">Reduce your clinical hours while maintaining practice oversight and income.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-1">Phased Retirement</h4>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">Create a structured path to gradually reduce your involvement while ensuring practice continuity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonial Section */}
      <Section background="light" className="py-8 sm:py-12 md:py-16">
        <SectionTitle centered>What Our Clients Say</SectionTitle>
        <SectionSubtitle centered>
          Hear from dentists who have successfully navigated practice transitions with our guidance
        </SectionSubtitle>
        
        <div className="max-w-2xl mx-auto mt-8 px-3">
          <TestimonialCard
            quote="Michael, I just want to say THANK YOU for being so instrumental in the purchase of my practice. I have been so fortunate of meeting you and working with you for the past (almost) two years. I still can't believe that we did it! Now, it is going to take lots of work to get to where I want to be, but purchasing the practice (this practice) is a great beginning and I owe you soo much. Please let me know when you are around this area to take you to a good lunch or dinner, which is the least I can do to show you my appreciation."
            author="Eugenio"
            role="Practice Buyer"
          />
        </div>
      </Section>

      {/* CTA Section - Moved Up */}
      <Section className="py-8 sm:py-12 md:py-16">
        <div className="px-3">
          <Cta 
            title="Ready to Discuss Your Associateship or Buy-In?"
            buttonText="Book Your Consultation"
            buttonUrl="/contact"
            className="rounded-lg"
          />
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="light" className="py-8 sm:py-12 md:py-16">
        <div className="text-center mb-6 sm:mb-8">
          <SectionTitle centered className="text-xl sm:text-2xl md:text-3xl">Frequently Asked Questions</SectionTitle>
        </div>
        <div className="max-w-3xl mx-auto px-3">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm border border-gray-100 px-4 sm:px-6">
              <AccordionTrigger className="text-sm sm:text-base md:text-lg font-semibold text-left py-4 hover:no-underline">
                How long should an associateship last before a buy-in?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm md:text-base text-gray-600 pb-4 leading-relaxed">
                Typically, 1-3 years is recommended to ensure compatibility and allow the associate to build relationships with patients. The exact timeline should be based on practice needs and the associate's readiness.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm border border-gray-100 px-4 sm:px-6">
              <AccordionTrigger className="text-sm sm:text-base md:text-lg font-semibold text-left py-4 hover:no-underline">
                How is the buy-in price determined?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm md:text-base text-gray-600 pb-4 leading-relaxed">
                The buy-in price is typically based on a current practice valuation, often adjusted to account for the associate's contribution to practice growth. We establish the valuation methodology in advance so both parties have clear expectations.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm border border-gray-100 px-4 sm:px-6">
              <AccordionTrigger className="text-sm sm:text-base md:text-lg font-semibold text-left py-4 hover:no-underline">
                What financing options are available for associates?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm md:text-base text-gray-600 pb-4 leading-relaxed">
                Associates can explore traditional bank loans, SBA loans, seller financing, or a combination of these. We help identify the most advantageous options based on the specific situation.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm border border-gray-100 px-4 sm:px-6">
              <AccordionTrigger className="text-sm sm:text-base md:text-lg font-semibold text-left py-4 hover:no-underline">
                What happens if the associateship doesn't work out?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm md:text-base text-gray-600 pb-4 leading-relaxed">
                We recommend establishing clear termination provisions in the initial agreement, including notice periods and non-compete considerations. This protects both parties if the arrangement isn't a good fit.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

    </>
  );
};

export default Associateships;
