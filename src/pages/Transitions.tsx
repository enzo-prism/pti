import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PracticeTransitions, practiceData } from "@/components/sections/PracticeTransitions";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PracticeCard } from "@/components/ui/practice-card";
import { MapPin, ArrowRight } from "lucide-react";

const Transitions = () => {
  const { id } = useParams();
  
  // If we have an ID parameter, we should show the detail view
  // For now we'll just show a placeholder since we don't have the full detail implementation
  if (id) {
    // Find the practice in our data
    const practice = [...practiceData.available, ...practiceData.sold].find(
      p => p.id === id
    );
    
    if (!practice) {
      return (
        <Section>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Practice Not Found</h2>
            <p>The practice you're looking for doesn't exist or has been removed.</p>
          </div>
        </Section>
      );
    }
    
    return (
      <>
        <Section background="light">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Badge 
                className={
                  practice.status === "available" 
                    ? "bg-primary text-white hover:bg-primary/80 mb-4" 
                    : "bg-gray-400 text-white hover:bg-gray-500 mb-4"
                }
              >
                {practice.status === "available" ? "Available" : "Sold"}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{practice.title}</h1>
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{practice.location}</span>
              </div>
            </div>
            
            {practice.imageSrc && (
              <div className="rounded-lg overflow-hidden mb-8 shadow-md">
                <img 
                  src={practice.imageSrc} 
                  alt={practice.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Practice Overview</h2>
              <p className="text-gray-700 mb-6">{practice.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm mb-1">Revenue</div>
                  <div className="font-semibold">{practice.revenue}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm mb-1">Operatories</div>
                  <div className="font-semibold">{practice.operatories}</div>
                </div>
                {practice.date && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-500 text-sm mb-1">Date</div>
                    <div className="font-semibold">{practice.date}</div>
                  </div>
                )}
              </div>
              
              {practice.status === "available" && (
                <Button asChild className="mt-4 w-full sm:w-auto">
                  <Link to="/contact" className="flex items-center justify-center">
                    Contact Us About This Practice
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </Section>
        
        <Section>
          <SectionTitle>Similar Practices</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {practiceData[practice.status === "available" ? "available" : "sold"]
              .filter(p => p.id !== practice.id)
              .slice(0, 3)
              .map((practice) => (
                <PracticeCard
                  key={practice.id}
                  status={practice.status}
                  title={practice.title}
                  location={practice.location}
                  description={practice.description}
                  imageSrc={practice.imageSrc}
                  date={practice.date}
                  url={`/transitions/${practice.id}`}
                  metadata={[
                    { label: "Revenue", value: practice.revenue },
                    { label: "Operatories", value: practice.operatories.toString() }
                  ]}
                />
              ))}
          </div>
        </Section>
        
        <Section>
          <Cta 
            title="Ready to Discuss Your Practice Transition?"
            description="Schedule a complimentary consultation with our team of experts to explore your options and create a personalized transition plan."
            buttonText="Book Your Consultation Today"
            buttonUrl="/contact"
          />
        </Section>
      </>
    );
  }
  
  // If no ID parameter, show the list view
  return (
    <>
      <Section background="accent" className="pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Practice Transitions</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in animate-delay-100">
            Explore our available dental practices and review our successful transitions to find the perfect match for your career goals.
          </p>
        </div>
      </Section>
      
      <PracticeTransitions 
        showFilters={true} 
        showSearch={true}
        showTitle={false}
      />
      
      <Section>
        <div className="max-w-3xl mx-auto">
          <SectionTitle centered>Our Transition Process</SectionTitle>
          <SectionSubtitle centered>
            We guide you through every step of the practice transition journey
          </SectionSubtitle>
          
          <div className="mt-8 space-y-8">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Initial Consultation</h3>
                <p className="text-gray-600">We start with a comprehensive discussion to understand your goals, timeline, and requirements for buying or selling a dental practice.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Practice Valuation</h3>
                <p className="text-gray-600">Our experts conduct a thorough analysis to determine the fair market value of the practice, ensuring both parties have the information needed to make informed decisions.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Matching & Negotiations</h3>
                <p className="text-gray-600">We connect buyers and sellers based on compatibility and facilitate negotiations to reach mutually beneficial agreements.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">4</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Transition Support</h3>
                <p className="text-gray-600">Our team provides comprehensive support throughout the transition, from paperwork and legal considerations to staff and patient management strategies.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      <Section>
        <Cta 
          title="Ready to Begin Your Practice Transition?"
          description="Whether you're looking to buy, sell, or explore partnership options, our expert team is ready to guide you through the process."
          buttonText="Schedule a Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Transitions;
