
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

// Define practice type with optional date field for sold practices
interface BasePractice {
  id: string;
  status: "available" | "sold";
  title: string;
  location: string;
  description: string;
  imageSrc?: string;
  url: string;
  revenue: string;
  operatories: number;
}

interface AvailablePractice extends BasePractice {
  status: "available";
}

interface SoldPractice extends BasePractice {
  status: "sold";
  date: string;
}

type Practice = AvailablePractice | SoldPractice;

const Transitions = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  
  // If we have an ID parameter, we should show the detail view
  if (id) {
    // Find the practice in our data
    const practice = [...practiceData.available, ...practiceData.sold].find(
      p => p.id === id
    ) as Practice | undefined;
    
    if (!practice) {
      return (
        <Section>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Practice Not Found</h2>
            <p className="text-sm">The practice you're looking for doesn't exist or has been removed.</p>
          </div>
        </Section>
      );
    }
    
    return (
      <>
        <Section background="light" className="px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <Badge 
                className={
                  practice.status === "available" 
                    ? "bg-primary text-white hover:bg-primary/80 mb-2 text-xs px-3 py-1 rounded-full" 
                    : "bg-gray-400 text-white hover:bg-gray-500 mb-2 text-xs px-3 py-1 rounded-full"
                }
              >
                {practice.status === "available" ? "Available" : "Sold"}
              </Badge>
              <h1 className="text-2xl font-bold mb-2">{practice.title}</h1>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">{practice.location}</span>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden mb-4 shadow-md border border-gray-200">
              {/* Replace the image with a gradient div */}
              <div 
                className="w-full h-auto aspect-video"
                style={{
                  background: getTitleBasedGradient(practice.title)
                }}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-3">Practice Overview</h2>
              <p className="text-sm text-gray-700 mb-4">{practice.description}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center text-gray-500 text-xs mb-1">
                    <DollarSign className="h-3.5 w-3.5 mr-1 text-primary" />
                    <span>Revenue</span>
                  </div>
                  <div className="font-semibold text-sm">{practice.revenue}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center text-gray-500 text-xs mb-1">
                    <Grid className="h-3.5 w-3.5 mr-1 text-primary" />
                    <span>Operatories</span>
                  </div>
                  <div className="font-semibold text-sm">{practice.operatories}</div>
                </div>
                {practice.status === "sold" && "date" in practice && (
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="text-gray-500 text-xs mb-1">Date</div>
                    <div className="font-semibold text-sm">{practice.date}</div>
                  </div>
                )}
              </div>
              
              {practice.status === "available" && (
                <Button asChild className="w-full text-sm rounded-full" size="sm">
                  <Link to="/contact" className="flex items-center justify-center">
                    Contact Us About This Practice
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </Section>
        
        <Section className="px-4">
          <SectionTitle className="text-xl mb-4">Similar Practices</SectionTitle>
          <div className="space-y-4">
            {practiceData[practice.status === "available" ? "available" : "sold"]
              .filter(p => p.id !== practice.id)
              .slice(0, 2)
              .map((practice) => (
                <PracticeCard
                  key={practice.id}
                  status={practice.status}
                  title={practice.title}
                  location={practice.location}
                  description={practice.description}
                  date={practice.status === "sold" ? (practice as SoldPractice).date : undefined}
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
            description="Schedule a complimentary consultation with our team of experts."
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
      <Section background="light" className="pt-16 pb-6 px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 animate-fade-in">Practice Transitions</h1>
          <p className="text-sm sm:text-base text-gray-700 animate-fade-in animate-delay-100">
            Explore our available dental practices and review our successful transitions to find the perfect match for your career goals.
          </p>
        </div>
      </Section>
      
      <PracticeTransitions 
        showFilters={true} 
        showSearch={true}
        showTitle={false}
      />
      
      <Section className="px-4">
        <div className="max-w-md mx-auto">
          <SectionTitle centered className="text-xl sm:text-2xl mb-3">Our Transition Process</SectionTitle>
          <SectionSubtitle centered className="text-sm mb-6">
            We guide you through every step of the practice transition journey
          </SectionSubtitle>
          
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center font-semibold text-sm">1</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Initial Consultation</h3>
                <p className="text-sm text-gray-600">We start with a comprehensive discussion to understand your goals and requirements.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center font-semibold text-sm">2</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Practice Valuation</h3>
                <p className="text-sm text-gray-600">Our experts conduct a thorough analysis to determine the fair market value of the practice.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center font-semibold text-sm">3</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Matching & Negotiations</h3>
                <p className="text-sm text-gray-600">We connect buyers and sellers based on compatibility and facilitate negotiations.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center font-semibold text-sm">4</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Transition Support</h3>
                <p className="text-sm text-gray-600">Our team provides comprehensive support throughout the transition process.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      <Section>
        <Cta 
          title="Ready to Begin Your Practice Transition?"
          description="Whether you're looking to buy, sell, or explore partnership options, our expert team is ready to guide you."
          buttonText="Schedule a Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

// Function to get a gradient based on the title
function getTitleBasedGradient(title: string): string {
  const gradientStyles = [
    "linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)",
    "linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)",
    "linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)",
    "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)",
    "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)",
    "linear-gradient(90deg, hsla(59, 86%, 68%, 1) 0%, hsla(134, 36%, 53%, 1) 100%)",
    "linear-gradient(to right, #ee9ca7, #ffdde1)"
  ];
  
  const titleSum = title.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const index = titleSum % gradientStyles.length;
  return gradientStyles[index];
}

export default Transitions;
