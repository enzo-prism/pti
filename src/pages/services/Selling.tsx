import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { DollarSign, FileText, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Selling = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Selling Your Dental Practice</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Expert guidance to maximize value and ensure a smooth transition when selling your practice
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Maximize Your Practice's Value
            </h2>
            <p className="text-gray-600 mb-4">
              Selling your dental practice is one of the most significant financial decisions you'll make in your career.
              Our comprehensive approach ensures you receive the full value of your years of hard work and investment.
            </p>
            <p className="text-gray-600 mb-6">
              At Practice Transitions Institute, we handle every aspect of the selling process, from initial valuation 
              to final closing, providing expert guidance every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link to="/contact">Schedule a Consultation</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <img 
              src="https://tab32.com/wp-content/uploads/2024/10/tab32-dental-practice-management-companies.jpeg" 
              alt="Dental office handover" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section background="light">
        <SectionTitle centered>Our Selling Process</SectionTitle>
        <SectionSubtitle centered>
          A structured approach to maximize value and ensure a smooth transition
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Valuation</h3>
            <p className="text-gray-600">
              We conduct a thorough assessment of your practice to determine its true market value.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Strategic Marketing</h3>
            <p className="text-gray-600">
              We confidentially market your practice to qualified buyers to generate maximum interest.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Negotiation & Structure</h3>
            <p className="text-gray-600">
              We negotiate the optimal deal structure to maximize your after-tax proceeds.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-300">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Seamless Transition</h3>
            <p className="text-gray-600">
              We ensure a smooth handover process that maintains practice value and patient retention.
            </p>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Why Sell With PTI</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Maximize Sale Price</h3>
                  <p className="text-gray-600">Our expert valuation and negotiation processes ensure you receive the highest possible value for your practice.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Confidential Process</h3>
                  <p className="text-gray-600">We maintain strict confidentiality throughout the process to protect your practice reputation and patient base.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Tax-Efficient Structure</h3>
                  <p className="text-gray-600">We structure the transaction to minimize tax implications and maximize your after-tax proceeds.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Seamless Transition</h3>
                  <p className="text-gray-600">We ensure a smooth handover that maintains staff morale, patient retention, and practice value.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 animate-fade-in animate-delay-100">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Successful dental practice handshake" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="light">
        <SectionTitle centered>Frequently Asked Questions</SectionTitle>
        <div className="max-w-3xl mx-auto mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">When is the best time to sell my practice?</h3>
            <p className="text-gray-600">
              The ideal time varies based on market conditions, practice performance, and your personal goals. We recommend starting the planning process 2-3 years before your desired exit to maximize value.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">How is a dental practice valued?</h3>
            <p className="text-gray-600">
              Practices are typically valued using multiple methodologies, including income-based approaches, market comparables, and asset valuations. We consider factors such as revenue, profitability, growth trends, patient base, location, and equipment.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">How long does the selling process take?</h3>
            <p className="text-gray-600">
              From initial consultation to closing, the typical timeframe is 6-12 months. However, this can vary based on practice size, market conditions, and specific transition requirements.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Will my staff and patients know my practice is for sale?</h3>
            <p className="text-gray-600">
              We maintain strict confidentiality throughout the process. Information is only disclosed to vetted potential buyers who sign confidentiality agreements. Staff and patients are typically informed at an appropriate time closer to the transition.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Button asChild>
            <Link to="/faq" className="flex items-center">
              View all FAQs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
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
