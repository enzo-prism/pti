import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Calculator, Scale, LineChart, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Value = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Dental Practice Valuation</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Comprehensive valuation services to determine the true market value of your dental practice
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Know Your Practice's True Value
            </h2>
            <p className="text-gray-600 mb-4">
              Whether you're planning to sell, seeking a partnership, or simply want to understand your practice's worth 
              for financial planning, an accurate valuation is essential.
            </p>
            <p className="text-gray-600 mb-6">
              At Practice Transitions Institute, we provide comprehensive, data-driven valuation services 
              that give you a clear understanding of your practice's market value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link to="/contact">Request a Valuation</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3" 
              alt="Dental practice valuation" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </Section>

      {/* Our Approach Section */}
      <Section background="light">
        <SectionTitle centered>Our Valuation Approach</SectionTitle>
        <SectionSubtitle centered>
          A multi-faceted methodology that captures your practice's true value
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Income-Based Analysis</h3>
            <p className="text-gray-600">
              We evaluate your practice's financial performance, adjusting for owner compensation and discretionary expenses to determine true profitability.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Market Comparison</h3>
            <p className="text-gray-600">
              We analyze comparable practice sales in your region to benchmark your practice against recent market activity.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Asset Evaluation</h3>
            <p className="text-gray-600">
              We assess tangible assets (equipment, technology, leasehold improvements) and intangible assets (goodwill, patient base, reputation).
            </p>
          </div>
        </div>
      </Section>

      {/* What We Evaluate Section */}
      <Section>
        <SectionTitle centered>What We Evaluate</SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Financial Metrics</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Revenue Trends</h4>
                  <p className="text-gray-600">Historical revenue performance and growth patterns over 3-5 years.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Profitability</h4>
                  <p className="text-gray-600">EBITDA analysis and overhead ratio comparison to industry benchmarks.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Fee Structure</h4>
                  <p className="text-gray-600">Analysis of fee schedule compared to regional norms and insurance participation.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Procedure Mix</h4>
                  <p className="text-gray-600">Distribution of revenue across different service categories and specialties.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <h3 className="text-2xl font-bold mb-6">Practice Characteristics</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Patient Base</h4>
                  <p className="text-gray-600">Active patient count, demographics, retention rates, and new patient acquisition.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Facility & Equipment</h4>
                  <p className="text-gray-600">Location, lease terms, operatory count, and equipment age and condition.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Staff & Culture</h4>
                  <p className="text-gray-600">Team longevity, compensation structure, and practice culture assessment.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Growth Potential</h4>
                  <p className="text-gray-600">Assessment of untapped opportunities and capacity for increased production.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Valuation Types Section */}
      <Section background="light">
        <SectionTitle centered>Valuation Types</SectionTitle>
        <SectionSubtitle centered>
          Customized valuation services for different practice transition needs
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="text-xl font-semibold mb-3">Opinion of Value</h3>
            <p className="text-gray-600 mb-4">
              A high-level assessment that provides a reasonable estimated range of your practice's value. Ideal for preliminary planning.
            </p>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mr-2 mt-0.5" />
                <span>Lower cost option</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mr-2 mt-0.5" />
                <span>Quicker turnaround time</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mr-2 mt-0.5" />
                <span>Useful for initial planning</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <h3 className="text-xl font-semibold mb-3">Standard Valuation</h3>
            <p className="text-gray-600 mb-4">
              A comprehensive analysis using multiple valuation methodologies. Suitable for most practice sales and transitions.
            </p>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mr-2 mt-0.5" />
                <span>Detailed financial analysis</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mr-2 mt-0.5" />
                <span>Market comparison data</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mr-2 mt-0.5" />
                <span>Comprehensive written report</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <h3 className="text-xl font-semibold mb-3">Certified Valuation</h3>
            <p className="text-gray-600 mb-4">
              The highest level of valuation, conducted by certified valuation analysts. Ideal for complex situations or potential disputes.
            </p>
            <ul className="text-gray-600 text-sm space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mr-2 mt-0.5" />
                <span>Defensible in legal settings</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mr-2 mt-0.5" />
                <span>Most thorough methodology</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mr-2 mt-0.5" />
                <span>Expert witness testimony available</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <SectionTitle centered>Frequently Asked Questions</SectionTitle>
        <div className="max-w-3xl mx-auto mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">How often should I have my practice valued?</h3>
            <p className="text-gray-600">
              We recommend getting a valuation every 3-5 years for general planning purposes. However, if you're 
              actively planning a transition, considering a partnership, or experiencing significant practice changes, 
              a current valuation is essential.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">How long does the valuation process take?</h3>
            <p className="text-gray-600">
              An Opinion of Value can be completed in 1-2 weeks. A Standard Valuation typically takes 3-4 weeks, 
              while a Certified Valuation may take 4-6 weeks, depending on the complexity of the practice.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">What information will I need to provide?</h3>
            <p className="text-gray-600">
              We'll need 3-5 years of financial statements, tax returns, production reports, practice management metrics, 
              and information about your facility, equipment, and staff. We provide a detailed checklist to make the 
              process straightforward.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">How is dental practice valuation different from other businesses?</h3>
            <p className="text-gray-600">
              Dental practices have unique valuation considerations, including the significant role of practitioner goodwill, 
              specialized equipment, insurance dynamics, and patient retention factors. Our dental-specific expertise ensures 
              these factors are properly accounted for.
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
          title="Ready to Discover Your Practice's Value?"
          description="Schedule a consultation to discuss which valuation approach is right for your needs."
          buttonText="Request a Valuation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Value;

