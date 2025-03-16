
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Users, FileText, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Associateships = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Associateships & Buying In</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Creating structured pathways for associates to transition into practice ownership
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Path to Practice Ownership
            </h2>
            <p className="text-gray-600 mb-4">
              Whether you're an associate dentist looking to buy into a practice or a practice owner wanting to bring on an associate with a path to ownership, our structured approach ensures a successful transition.
            </p>
            <p className="text-gray-600 mb-6">
              We create clear, equitable arrangements that protect both parties and establish a foundation for long-term success.
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
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3" 
              alt="Dentists collaborating" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section background="light">
        <SectionTitle centered>Our Associateship Process</SectionTitle>
        <SectionSubtitle centered>
          Creating structured buy-in opportunities with clear expectations
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Needs Assessment</h3>
            <p className="text-gray-600">
              We evaluate the practice and the associate's goals to ensure alignment and compatibility.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Structured Agreement</h3>
            <p className="text-gray-600">
              We develop clear terms for the associateship period, including responsibilities and compensation.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Buy-In Strategy</h3>
            <p className="text-gray-600">
              We create a clear path to ownership with defined timelines, valuation methods, and financing options.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-300">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Successful Transition</h3>
            <p className="text-gray-600">
              We guide the execution of the buy-in process, ensuring a smooth transition to co-ownership.
            </p>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">For Associates</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Reduced Risk</h4>
                  <p className="text-gray-600">Test compatibility with the practice before committing to ownership.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Clear Path to Ownership</h4>
                  <p className="text-gray-600">Structured timeline and terms for transition from associate to co-owner.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Mentorship & Growth</h4>
                  <p className="text-gray-600">Learn from established practitioners while building your clinical and business skills.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Established Patient Base</h4>
                  <p className="text-gray-600">Join an existing practice with an established reputation and patient flow.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <h3 className="text-2xl font-bold mb-6">For Practice Owners</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Succession Planning</h4>
                  <p className="text-gray-600">Create a gradual transition plan that preserves your legacy and practice value.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Increased Practice Value</h4>
                  <p className="text-gray-600">Adding an associate often increases production and overall practice valuation.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Work-Life Balance</h4>
                  <p className="text-gray-600">Reduce your clinical hours while maintaining practice oversight and income.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Phased Retirement</h4>
                  <p className="text-gray-600">Create a structured path to gradually reduce your involvement while ensuring practice continuity.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="light">
        <SectionTitle centered>Frequently Asked Questions</SectionTitle>
        <div className="max-w-3xl mx-auto mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">How long should an associateship last before a buy-in?</h3>
            <p className="text-gray-600">
              Typically, 1-3 years is recommended to ensure compatibility and allow the associate to build relationships with patients. The exact timeline should be based on practice needs and the associate's readiness.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">How is the buy-in price determined?</h3>
            <p className="text-gray-600">
              The buy-in price is typically based on a current practice valuation, often adjusted to account for the associate's contribution to practice growth. We establish the valuation methodology in advance so both parties have clear expectations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">What financing options are available for associates?</h3>
            <p className="text-gray-600">
              Associates can explore traditional bank loans, SBA loans, seller financing, or a combination of these. We help identify the most advantageous options based on the specific situation.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">What happens if the associateship doesn't work out?</h3>
            <p className="text-gray-600">
              We recommend establishing clear termination provisions in the initial agreement, including notice periods and non-compete considerations. This protects both parties if the arrangement isn't a good fit.
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
          title="Ready to Discuss Your Associateship or Buy-In?"
          description="Schedule a consultation with our team to explore your options and create a customized plan."
          buttonText="Book Your Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Associateships;
