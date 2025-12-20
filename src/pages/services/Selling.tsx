
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { DollarSign, FileText, TrendingUp, CheckCircle, Shield, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/layout/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { serviceOfferings } from "@/data/services";

const Selling = () => {
  const offering = serviceOfferings.find(
    (service) => service.url === "/services/selling"
  );

  return (
    <>
      <SEO
        title="Selling a Practice"
        description={
          offering?.description ??
          "Strategic guidance and support for selling your practice to achieve maximum value."
        }
        path="/services/selling"
      />
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              We Help You Maximize Your Sale, and Minimize the Stress
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              Ready to move forward with confidence? Our structured approach is built to deliver optimal results with the least amount of disruption to you.
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
              Selling your dental practice requires more than just listing it. It demands a strategic approach guided by experienced professionals who understand the intricacies of the dental market.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Practice Transitions Institute offers the expertise and dedication you need to navigate this complex process with confidence, ensuring you achieve the optimal outcome.
            </p>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section background="light">
        <SectionTitle centered>Our Proven Process for a Successful Sale</SectionTitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">In-Depth Valuation</h3>
            <p className="text-gray-600 leading-relaxed">
              We meticulously assess your practice's value, providing a clear and accurate foundation for a successful sale.
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
              We advocate fiercely on your behalf to secure the best possible terms and price.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-300">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Dedicated Support</h3>
            <p className="text-gray-600 leading-relaxed">
              We manage the details of the handover, ensuring a seamless experience for all involved.
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
              <h3 className="text-xl font-semibold mb-2">Expert Guidance, Maximum Value</h3>
              <p className="text-gray-600 leading-relaxed">
                Our deep understanding of the market ensures you receive the highest possible return on your investment.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-100">
            <Shield className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Confidentiality You Can Trust</h3>
              <p className="text-gray-600 leading-relaxed">
                We handle every aspect of the sale with the strictest discretion.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-200">
            <TrendingUp className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Optimized Financial Results</h3>
              <p className="text-gray-600 leading-relaxed">
                We work to structure the sale in a way that benefits both parties.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-300">
            <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">A Smooth and Worry-Free Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                We manage the complexities, allowing you to focus on your next chapter.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mb-8">
        <Cta 
          title="Ready to Explore Selling Your Practice?"
          description="Schedule a confidential consultation with our team of dental transition experts."
          buttonText="Book Your Free Consultation"
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

      {/* Seller Testimonials Section */}
      <Section>
        <SectionTitle centered>What Our Sellers Say</SectionTitle>
        <SectionSubtitle centered>
          Hear from dentists who have successfully sold their practices with our guidance
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <TestimonialCard
            quote="I feel extremely fortunate to have found and chosen Fred Heppner to help me through the process of selling my practice. I enjoyed Fred's straightforward demeanor, and his ability to simplify for me what would have been an overly complex endeavor. The sale happened very quickly and efficiently, and I couldn't be more pleased with the outcome!"
            author="Jeff Lewis, DDS, FACP"
            role="Orthodontist"
          />
          
          <TestimonialCard
            quote="Be careful what you ask for, because I will get it for you. That is what Michael from Dental Strategies said to me at our first face-to-face meeting. That was March 2023. We were referred to Michael after our practice was on the market for a year with few inquiries. We closed July 31, 2023 with full cash offer to a wonderful couple. That is testimony, thank you Michael."
            author="Keith Long"
            role="Practice Seller"
            company="1 year ago"
          />
          
          <TestimonialCard
            quote="I attended Mike's practice transition seminar and read his book. He was a very knowledgeable and seasoned expert in this area. I decided to use his consultation service to handle my practice sale. He was able to match a buyer within 2 weeks and completed the transaction within 45 days. He was so amazingly efficient throughout the transition process. I highly recommend him to any dentist interested in selling or buying a dental practice. Thanks again, Mike, you are my Superman."
            author="Tony Choi"
            role="Practice Seller"
            company="4 months ago"
          />
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/testimonials">View All Testimonials</Link>
          </Button>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section className="mb-8">
        <Cta 
          title="Ready to Explore Selling Your Practice?"
          description="Schedule a confidential consultation with our team of dental transition experts."
          buttonText="Book Your Free Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Selling;
