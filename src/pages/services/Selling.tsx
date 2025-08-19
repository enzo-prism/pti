
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { DollarSign, FileText, TrendingUp, CheckCircle, Shield, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const Selling = () => {
  return (
    <>
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
              <Target className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Targeted Marketing</h3>
            <p className="text-gray-600 leading-relaxed">
              We leverage our network to connect your practice with qualified buyers who are the right fit.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-orange-600" />
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
            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance, Maximum Value</h3>
              <p className="text-gray-600 leading-relaxed">
                Our deep understanding of the market ensures you receive the highest possible return on your investment.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-100">
            <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Confidentiality You Can Trust</h3>
              <p className="text-gray-600 leading-relaxed">
                We handle every aspect of the sale with the strictest discretion.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-200">
            <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Optimized Financial Results</h3>
              <p className="text-gray-600 leading-relaxed">
                We work to structure the sale in a way that benefits both parties.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 animate-fade-in animate-delay-300">
            <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
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
    </>
  );
};

export default Selling;
