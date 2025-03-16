
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PracticeCard } from "@/components/ui/practice-card";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";

// Sample data - in a real app, this would come from an API or CMS
const availablePractices = [
  {
    id: "p1",
    status: "available" as const,
    title: "Modern General Practice",
    location: "San Francisco, CA",
    description: "Well-established practice with 6 operatories, digital radiography, and a strong patient base. Perfect for a dentist looking to step into ownership with minimal changes needed.",
    imageSrc: "https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3",
    url: "/transitions/p1"
  },
  {
    id: "p2",
    status: "available" as const,
    title: "Family Dental Practice",
    location: "Seattle, WA",
    description: "Thriving family practice with 30+ years of goodwill. 4 fully equipped operatories in a convenient location with ample parking. Owner willing to stay on for transition period.",
    imageSrc: "https://images.unsplash.com/photo-1606811856475-5e94ce3c99e8?ixlib=rb-4.0.3",
    url: "/transitions/p2"
  },
  {
    id: "p3",
    status: "available" as const,
    title: "Pediatric Specialty Practice",
    location: "Portland, OR",
    description: "Established pediatric practice in growing suburban area. State-of-the-art equipment and dedicated staff. Owner retiring after 25 years of service to the community.",
    imageSrc: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3",
    url: "/transitions/p3"
  }
];

const soldPractices = [
  {
    id: "s1",
    status: "sold" as const,
    title: "Downtown Dental Group",
    location: "Los Angeles, CA",
    description: "Multi-doctor practice with 8 operatories successfully transitioned to new ownership. Full-price offer with favorable terms for both parties.",
    imageSrc: "https://images.unsplash.com/photo-1606811856891-07eee7e3b8c6?ixlib=rb-4.0.3",
    date: "Sold Q1 2023",
    url: "/transitions/s1"
  },
  {
    id: "s2",
    status: "sold" as const,
    title: "Beachside Dental",
    location: "San Diego, CA",
    description: "Profitable practice in prime location sold to associate after 5-year transition plan. Smooth handover with 98% patient retention.",
    imageSrc: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3",
    date: "Sold Q4 2022",
    url: "/transitions/s2"
  },
  {
    id: "s3",
    status: "sold" as const,
    title: "Smiles Orthodontics",
    location: "Denver, CO",
    description: "Specialized orthodontic practice successfully merged with larger group. Owner achieved retirement goals while ensuring continuity of care.",
    imageSrc: "https://images.unsplash.com/photo-1606811856987-e9501ccbe812?ixlib=rb-4.0.3",
    date: "Sold Q2 2022",
    url: "/transitions/s3"
  }
];

export function PracticeTransitions() {
  const [activeTab, setActiveTab] = useState("available");

  return (
    <Section background="light">
      <SectionTitle centered>Practice Transitions</SectionTitle>
      <SectionSubtitle centered>
        Explore our available practices and view our successful transitions
      </SectionSubtitle>
      
      <Tabs 
        defaultValue="available" 
        className="mt-8"
        onValueChange={value => setActiveTab(value)}
      >
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="available">Available Practices</TabsTrigger>
            <TabsTrigger value="sold">Completed Transitions</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePractices.map((practice) => (
              <PracticeCard
                key={practice.id}
                status={practice.status}
                title={practice.title}
                location={practice.location}
                description={practice.description}
                imageSrc={practice.imageSrc}
                url={practice.url}
                className="animate-fade-in"
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sold">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soldPractices.map((practice) => (
              <PracticeCard
                key={practice.id}
                status={practice.status}
                title={practice.title}
                location={practice.location}
                description={practice.description}
                imageSrc={practice.imageSrc}
                date={practice.date}
                url={practice.url}
                className="animate-fade-in"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-10 text-center">
        <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button asChild>
            <Link to="/transitions" className="flex items-center">
              View All {activeTab === "available" ? "Available Practices" : "Completed Transitions"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          {activeTab === "available" && (
            <Button asChild variant="outline">
              <Link to="/contact" className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Inquire About a Practice
              </Link>
            </Button>
          )}
          
          {activeTab === "sold" && (
            <Button asChild variant="outline">
              <Link to="/contact" className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                Schedule Your Transition
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
