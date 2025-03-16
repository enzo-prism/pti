
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PracticeTransitions, practiceData } from "@/components/sections/PracticeTransitions";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PracticeCard } from "@/components/ui/practice-card";
import { MapPin, ArrowRight, DollarSign, Grid } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Transitions = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  
  // If we have an ID parameter, we should show the detail view
  if (id) {
    // Find the practice in our data
    const practice = [...practiceData.available, ...practiceData.sold].find(
      p => p.id === id
    );
    
    if (!practice) {
      return (
        <Section>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Practice Not Found</h2>
            <p className="text-sm sm:text-base">The practice you're looking for doesn't exist or has been removed.</p>
          </div>
        </Section>
      );
    }
    
    // Default image if none provided
    const defaultImage = "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
    
    return (
      <>
        <Section background="light" className="px-3 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 sm:mb-8">
              <Badge 
                className={
                  practice.status === "available" 
                    ? "bg-primary text-white hover:bg-primary/80 mb-2 sm:mb-4 text-xs sm:text-sm" 
                    : "bg-gray-400 text-white hover:bg-gray-500 mb-2 sm:mb-4 text-xs sm:text-sm"
                }
              >
                {practice.status === "available" ? "Available" : "Sold"}
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">{practice.title}</h1>
              <div className="flex items-center text-gray-600 mb-3 sm:mb-6">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
                <span className="text-sm sm:text-lg">{practice.location}</span>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden mb-4 sm:mb-8 shadow-md">
              <img 
                src={practice.imageSrc || defaultImage} 
                alt={practice.title} 
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-8 border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Practice Overview</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">{practice.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-1">
                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primary" />
                    <span>Revenue</span>
                  </div>
                  <div className="font-semibold text-sm sm:text-base">{practice.revenue}</div>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-1">
                    <Grid className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-primary" />
                    <span>Operatories</span>
                  </div>
                  <div className="font-semibold text-sm sm:text-base">{practice.operatories}</div>
                </div>
                {practice.status === "sold" && "date" in practice && (
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100">
                    <div className="text-gray-500 text-xs sm:text-sm mb-1">Date</div>
                    <div className="font-semibold text-sm sm:text-base">{practice.date}</div>
                  </div>
                )}
              </div>
              
              {practice.status === "available" && (
                <Button asChild className="mt-2 sm:mt-4 w-full sm:w-auto text-xs sm:text-sm" size={isMobile ? "sm" : "default"}>
                  <Link to="/contact" className="flex items-center justify-center">
                    Contact Us About This Practice
                    <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </Section>
        
        <Section className="px-3 sm:px-6">
          <SectionTitle className="text-xl sm:text-3xl">Similar Practices</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mt-4 sm:mt-8">
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
                  date={practice.status === "sold" ? (practice as any).date : undefined}
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
      <Section background="light" className="pt-20 sm:pt-32 pb-10 sm:pb-16 px-3 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 animate-fade-in">Practice Transitions</h1>
          <p className="text-base sm:text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in animate-delay-100 px-2 sm:px-0">
            Explore our available dental practices and review our successful transitions to find the perfect match for your career goals.
          </p>
        </div>
      </Section>
      
      <PracticeTransitions 
        showFilters={true} 
        showSearch={true}
        showTitle={false}
      />
      
      <Section className="px-3 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <SectionTitle centered className="text-xl sm:text-3xl">Our Transition Process</SectionTitle>
          <SectionSubtitle centered className="text-sm sm:text-base px-2 sm:px-0">
            We guide you through every step of the practice transition journey
          </SectionSubtitle>
          
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-8">
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base">1</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Initial Consultation</h3>
                <p className="text-sm sm:text-base text-gray-600">We start with a comprehensive discussion to understand your goals, timeline, and requirements for buying or selling a dental practice.</p>
              </div>
            </div>
            
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base">2</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Practice Valuation</h3>
                <p className="text-sm sm:text-base text-gray-600">Our experts conduct a thorough analysis to determine the fair market value of the practice, ensuring both parties have the information needed to make informed decisions.</p>
              </div>
            </div>
            
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base">3</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Matching & Negotiations</h3>
                <p className="text-sm sm:text-base text-gray-600">We connect buyers and sellers based on compatibility and facilitate negotiations to reach mutually beneficial agreements.</p>
              </div>
            </div>
            
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base">4</div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Transition Support</h3>
                <p className="text-sm sm:text-base text-gray-600">Our team provides comprehensive support throughout the transition, from paperwork and legal considerations to staff and patient management strategies.</p>
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
