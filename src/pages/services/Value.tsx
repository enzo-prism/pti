
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { CheckCircle, AlertTriangle, FileText } from "lucide-react";

const Value = () => {
  const valuationFeatures = [
    "Comprehensive financial analysis",
    "Physical asset valuation",
    "Goodwill assessment",
    "Cash flow evaluation",
    "Market comparison data",
    "Detailed valuation report",
    "Expert interpretation",
    "Transition recommendations"
  ];

  const legalNotes = [
    "Our Opinion of Value is provided for informational purposes only and does not constitute a formal appraisal.",
    "Valuations are based on information provided by the practice owner and industry standards.",
    "Market conditions and other factors may affect the actual sale price.",
    "We recommend consulting with legal and tax professionals before making financial decisions."
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Opinion of Value</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Accurate, market-driven valuations to understand your practice's true worth
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">
              Understanding Your Practice's True Value
            </h2>
            <p className="text-gray-600 mb-4">
              Whether you're planning to sell your practice, seeking financing, establishing a partnership, 
              or simply want to understand your practice's worth, an accurate valuation is essential. 
              Our Opinion of Value service provides a comprehensive assessment that considers all factors 
              affecting your practice's market value.
            </p>
            <p className="text-gray-600 mb-4">
              At Practice Transitions Institute, we apply proven methodologies and extensive market 
              knowledge to deliver valuations that accurately reflect current market conditions and 
              your practice's unique attributes.
            </p>
            <Button asChild className="mt-2">
              <Link to="/contact">Request a Valuation</Link>
            </Button>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3" 
              alt="Dental practice valuation" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </Section>

      {/* What's Included Section */}
      <Section background="light">
        <SectionTitle>What's Included in Our Valuation</SectionTitle>
        <SectionSubtitle>
          Our comprehensive Opinion of Value goes beyond simple financial metrics
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <FileText className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Comprehensive Evaluation</h3>
            <ul className="space-y-3">
              {valuationFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <div className="prose max-w-none">
              <h3 className="text-2xl font-semibold mb-4">Our Valuation Approach</h3>
              <p className="text-gray-700 mb-4">
                We utilize multiple methodologies to determine your practice's value, including:
              </p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li><strong>Income Approach:</strong> Assessing value based on historical and projected earnings</li>
                <li><strong>Market Approach:</strong> Comparing to similar practices recently sold</li>
                <li><strong>Asset Approach:</strong> Evaluating tangible and intangible assets</li>
              </ul>
              <p className="text-gray-700">
                This multi-faceted approach ensures a comprehensive and accurate valuation that 
                captures your practice's true market value.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Legal Clarifications Section */}
      <Section>
        <SectionTitle>Legal Clarifications</SectionTitle>
        <div className="bg-accent p-6 rounded-lg border border-primary/20 mt-4 animate-fade-in">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-3">Important Information About Our Opinion of Value</h3>
              <ul className="space-y-2">
                {legalNotes.map((note, index) => (
                  <li key={index} className="text-gray-700">{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <Section background="light">
        <SectionTitle centered>The Valuation Process</SectionTitle>
        <SectionSubtitle centered>
          Our streamlined approach delivers accurate valuations with minimal disruption to your practice
        </SectionSubtitle>
        
        <div className="max-w-4xl mx-auto mt-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
            
            {/* Step 1 */}
            <div className="md:flex items-center mb-12 relative animate-fade-in">
              <div className="md:w-1/2 md:pr-8 text-right hidden md:block">
                <h3 className="text-xl font-semibold mb-2">Initial Consultation</h3>
                <p className="text-gray-600">
                  We begin with an in-depth discussion to understand your goals and timeline.
                </p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex h-10 w-10 rounded-full bg-primary text-white justify-center items-center">
                1
              </div>
              <div className="md:w-1/2 md:pl-8 md:text-left">
                <div className="md:hidden mb-2">
                  <div className="inline-flex h-8 w-8 rounded-full bg-primary text-white justify-center items-center mr-3">
                    1
                  </div>
                  <h3 className="text-xl font-semibold inline">Initial Consultation</h3>
                </div>
                <p className="text-gray-600 md:hidden">
                  We begin with an in-depth discussion to understand your goals and timeline.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="md:flex items-center mb-12 relative animate-fade-in animate-delay-100">
              <div className="md:w-1/2 md:pr-8 text-right md:block hidden">
                <p className="text-gray-600">
                  You'll provide key financial and operational information about your practice.
                </p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex h-10 w-10 rounded-full bg-primary text-white justify-center items-center">
                2
              </div>
              <div className="md:w-1/2 md:pl-8 md:text-left">
                <div className="md:hidden mb-2">
                  <div className="inline-flex h-8 w-8 rounded-full bg-primary text-white justify-center items-center mr-3">
                    2
                  </div>
                  <h3 className="text-xl font-semibold inline">Data Collection</h3>
                </div>
                <h3 className="text-xl font-semibold mb-2 hidden md:block">Data Collection</h3>
                <p className="text-gray-600 md:hidden">
                  You'll provide key financial and operational information about your practice.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="md:flex items-center mb-12 relative animate-fade-in animate-delay-200">
              <div className="md:w-1/2 md:pr-8 text-right hidden md:block">
                <h3 className="text-xl font-semibold mb-2">Comprehensive Analysis</h3>
                <p className="text-gray-600">
                  Our experts analyze your data using industry-standard methodologies.
                </p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex h-10 w-10 rounded-full bg-primary text-white justify-center items-center">
                3
              </div>
              <div className="md:w-1/2 md:pl-8 md:text-left">
                <div className="md:hidden mb-2">
                  <div className="inline-flex h-8 w-8 rounded-full bg-primary text-white justify-center items-center mr-3">
                    3
                  </div>
                  <h3 className="text-xl font-semibold inline">Comprehensive Analysis</h3>
                </div>
                <p className="text-gray-600 md:hidden">
                  Our experts analyze your data using industry-standard methodologies.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="md:flex items-center relative animate-fade-in animate-delay-300">
              <div className="md:w-1/2 md:pr-8 text-right md:block hidden">
                <p className="text-gray-600">
                  We deliver a detailed report and consultation to explain our findings and recommendations.
                </p>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex h-10 w-10 rounded-full bg-primary text-white justify-center items-center">
                4
              </div>
              <div className="md:w-1/2 md:pl-8 md:text-left">
                <div className="md:hidden mb-2">
                  <div className="inline-flex h-8 w-8 rounded-full bg-primary text-white justify-center items-center mr-3">
                    4
                  </div>
                  <h3 className="text-xl font-semibold inline">Valuation Delivery</h3>
                </div>
                <h3 className="text-xl font-semibold mb-2 hidden md:block">Valuation Delivery</h3>
                <p className="text-gray-600 md:hidden">
                  We deliver a detailed report and consultation to explain our findings and recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mb-8">
        <Cta 
          title="Ready to Understand Your Practice's True Value?"
          description="Schedule a complimentary consultation to discuss our Opinion of Value service."
          buttonText="Request a Valuation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Value;
