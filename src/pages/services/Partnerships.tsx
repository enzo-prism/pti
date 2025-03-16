
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Handshake, FileText, Scale, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Partnerships = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Dental Practice Partnerships</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Creating equitable partnership arrangements that benefit all parties involved
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
            <p className="text-gray-600 mb-4">
              A well-structured partnership can multiply the success of a dental practice while providing both personal and professional benefits to all partners involved.
            </p>
            <p className="text-gray-600 mb-6">
              At Practice Transitions Institute, we specialize in creating partnership arrangements that are balanced, equitable, and designed for long-term success.
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
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3" 
              alt="Dental partners shaking hands" 
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
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Initial Assessment</h3>
            <p className="text-gray-600">
              We evaluate practice metrics, partner dynamics, and shared goals to ensure partnership viability.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Valuation & Structure</h3>
            <p className="text-gray-600">
              We determine fair market value and design an equitable ownership structure that works for all parties.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Handshake className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Legal Framework</h3>
            <p className="text-gray-600">
              We develop comprehensive partnership agreements that address governance, profit sharing, and exit strategies.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-300">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Implementation</h3>
            <p className="text-gray-600">
              We guide the execution and integration of the partnership to ensure a smooth transition and ongoing success.
            </p>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <SectionTitle centered>Partnership Benefits</SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-center">Financial Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Shared Overhead Costs</h4>
                  <p className="text-gray-600">Reduce individual burden by sharing facility, equipment, and administrative costs.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Increased Production Capacity</h4>
                  <p className="text-gray-600">Multiple practitioners can maximize facility utilization and revenue potential.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Economies of Scale</h4>
                  <p className="text-gray-600">Greater purchasing power and efficiency in operations and marketing.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Risk Distribution</h4>
                  <p className="text-gray-600">Shared financial responsibility during economic fluctuations or practice challenges.</p>
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
                  <p className="text-gray-600">Shared clinical responsibilities and coverage allow for more personal time.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Complementary Skill Sets</h4>
                  <p className="text-gray-600">Partners can specialize in different clinical areas or aspects of business management.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Professional Support</h4>
                  <p className="text-gray-600">Built-in mentorship, collaboration, and shared clinical decision-making.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Succession Planning</h4>
                  <p className="text-gray-600">Creates a natural pathway for gradual retirement and practice continuity.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Key Considerations Section */}
      <Section background="light">
        <SectionTitle centered>Key Partnership Considerations</SectionTitle>
        <div className="max-w-3xl mx-auto mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Governance Structure</h3>
            <p className="text-gray-600">
              How will decisions be made? Equal voting rights or weighted based on ownership percentage? Consider decision-making processes for daily operations versus major changes.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Compensation Framework</h3>
            <p className="text-gray-600">
              Will profits be distributed based on ownership percentage, production, or a hybrid model? Consider how to handle differing production levels, time commitments, and specialties.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Buy-Sell Provisions</h3>
            <p className="text-gray-600">
              What happens if a partner wants to exit, becomes disabled, or passes away? Clear provisions for these scenarios protect all partners and ensure practice continuity.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Future Growth Strategies</h3>
            <p className="text-gray-600">
              How will the partnership approach expansion, additional locations, or bringing in new partners? Aligning on growth vision early helps prevent conflicts later.
            </p>
          </div>
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
