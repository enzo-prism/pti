
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Search, Filter, Map, MapPin, DollarSign, Grid } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PracticeCard } from "@/components/ui/practice-card";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data - in a real app, this would come from an API or CMS
const availablePractices = [
  {
    id: "p1",
    status: "available" as const,
    title: "Modern General Practice",
    location: "San Francisco, CA",
    description: "Well-established practice with 6 operatories, digital radiography, and a strong patient base. Perfect for a dentist looking to step into ownership with minimal changes needed.",
    imageSrc: "/lovable-uploads/26a68276-dfbb-4568-882b-c27909efff03.png",
    url: "/transitions/p1",
    revenue: "$1.2M+",
    operatories: 6
  },
  {
    id: "p2",
    status: "available" as const,
    title: "Family Dental Practice",
    location: "Seattle, WA",
    description: "Thriving family practice with 30+ years of goodwill. 4 fully equipped operatories in a convenient location with ample parking. Owner willing to stay on for transition period.",
    imageSrc: "https://cdn.pixabay.com/photo/2017/07/23/10/44/dentist-2530990_1280.jpg",
    url: "/transitions/p2",
    revenue: "$950K+",
    operatories: 4
  },
  {
    id: "p3",
    status: "available" as const,
    title: "Pediatric Specialty Practice",
    location: "Portland, OR",
    description: "Established pediatric practice in growing suburban area. State-of-the-art equipment and dedicated staff. Owner retiring after 25 years of service to the community.",
    imageSrc: "https://cdn.pixabay.com/photo/2021/11/14/15/09/dentist-6794032_1280.jpg",
    url: "/transitions/p3",
    revenue: "$1.5M+",
    operatories: 5
  }
];

const soldPractices = [
  {
    id: "s1",
    status: "sold" as const,
    title: "Downtown Dental Group",
    location: "Los Angeles, CA",
    description: "Multi-doctor practice with 8 operatories successfully transitioned to new ownership. Full-price offer with favorable terms for both parties.",
    imageSrc: "https://cdn.pixabay.com/photo/2016/11/23/14/57/dental-1853492_1280.jpg",
    date: "Sold Q1 2023",
    url: "/transitions/s1",
    revenue: "$2.1M",
    operatories: 8
  },
  {
    id: "s2",
    status: "sold" as const,
    title: "Beachside Dental",
    location: "San Diego, CA",
    description: "Profitable practice in prime location sold to associate after 5-year transition plan. Smooth handover with 98% patient retention.",
    imageSrc: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    date: "Sold Q4 2022",
    url: "/transitions/s2",
    revenue: "$1.1M",
    operatories: 5
  },
  {
    id: "s3",
    status: "sold" as const,
    title: "Smiles Orthodontics",
    location: "Denver, CO",
    description: "Specialized orthodontic practice successfully merged with larger group. Owner achieved retirement goals while ensuring continuity of care.",
    imageSrc: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800",
    date: "Sold Q2 2022",
    url: "/transitions/s3",
    revenue: "$1.8M",
    operatories: 6
  }
];

// Export the practice data for use in the full transitions page
export const practiceData = {
  available: availablePractices,
  sold: soldPractices
};

interface PracticeTransitionsProps {
  limit?: number;
  showFilters?: boolean;
  showSearch?: boolean;
  showTitle?: boolean;
}

export function PracticeTransitions({ 
  limit, 
  showFilters = false, 
  showSearch = false,
  showTitle = true
}: PracticeTransitionsProps) {
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAvailable, setFilteredAvailable] = useState(availablePractices);
  const [filteredSold, setFilteredSold] = useState(soldPractices);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Filter practices based on search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredAvailable(
        availablePractices.filter(
          practice => 
            practice.title.toLowerCase().includes(query) || 
            practice.location.toLowerCase().includes(query) ||
            practice.description.toLowerCase().includes(query)
        )
      );
      setFilteredSold(
        soldPractices.filter(
          practice => 
            practice.title.toLowerCase().includes(query) || 
            practice.location.toLowerCase().includes(query) ||
            practice.description.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredAvailable(availablePractices);
      setFilteredSold(soldPractices);
    }
  }, [searchQuery]);

  // Limit the number of practices shown if limit is specified
  const availablePracticesToShow = limit ? filteredAvailable.slice(0, limit) : filteredAvailable;
  const soldPracticesToShow = limit ? filteredSold.slice(0, limit) : filteredSold;

  return (
    <Section background="light" className="px-4">
      {showTitle && (
        <div className="text-center max-w-md mx-auto mb-6">
          <SectionTitle centered className="text-2xl sm:text-3xl mb-2">Practice Transitions</SectionTitle>
          <SectionSubtitle centered className="text-sm sm:text-base">
            Explore our available practices and view our successful transitions
          </SectionSubtitle>
        </div>
      )}
      
      <Tabs 
        defaultValue="available" 
        className="max-w-md mx-auto"
        onValueChange={value => setActiveTab(value)}
      >
        <div className="mb-4">
          <TabsList className="grid w-full grid-cols-2 h-10 p-1 rounded-full bg-gray-100">
            <TabsTrigger 
              value="available" 
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white text-sm"
            >
              Available
              <Badge variant="outline" className="ml-2 bg-white text-primary border-primary text-xs">
                {filteredAvailable.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="sold" 
              className="rounded-full data-[state=active]:bg-gray-500 data-[state=active]:text-white text-sm"
            >
              Completed
              <Badge variant="outline" className="ml-2 bg-white text-gray-500 border-gray-400 text-xs">
                {filteredSold.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>
        
        {showSearch && (
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search practices..."
                className="pl-10 pr-4 py-2 rounded-full bg-white border-gray-200 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-1 no-scrollbar">
            <Badge className="bg-white text-gray-600 border hover:bg-gray-100 cursor-pointer text-xs py-1.5 px-3 rounded-full whitespace-nowrap">
              <MapPin className="mr-1.5 h-3 w-3" /> All Locations
            </Badge>
            <Badge className="bg-white text-gray-600 border hover:bg-gray-100 cursor-pointer text-xs py-1.5 px-3 rounded-full whitespace-nowrap">
              <DollarSign className="mr-1.5 h-3 w-3" /> Any Revenue
            </Badge>
            <Badge className="bg-white text-gray-600 border hover:bg-gray-100 cursor-pointer text-xs py-1.5 px-3 rounded-full whitespace-nowrap">
              <Grid className="mr-1.5 h-3 w-3" /> Any Operatories
            </Badge>
          </div>
        )}
        
        <TabsContent value="available">
          {filteredAvailable.length > 0 ? (
            <div className="space-y-4">
              {availablePracticesToShow.map((practice) => (
                <PracticeCard
                  key={practice.id}
                  status={practice.status}
                  title={practice.title}
                  location={practice.location}
                  description={practice.description}
                  imageSrc={practice.imageSrc}
                  url={practice.url}
                  className="animate-fade-in"
                  metadata={[
                    { label: "Revenue", value: practice.revenue },
                    { label: "Operatories", value: practice.operatories.toString() }
                  ]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm">No practices found matching your search.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sold">
          {filteredSold.length > 0 ? (
            <div className="space-y-4">
              {soldPracticesToShow.map((practice) => (
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
                  metadata={[
                    { label: "Revenue", value: practice.revenue },
                    { label: "Operatories", value: practice.operatories.toString() }
                  ]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm">No completed transitions found matching your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {limit && (
        <div className="mt-6 text-center">
          <div className="space-y-3">
            <Button asChild size="sm" className="w-full sm:w-auto rounded-full text-sm">
              <Link to="/transitions" className="flex items-center justify-center">
                View All {activeTab === "available" ? "Available Practices" : "Completed Transitions"}
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
            
            {activeTab === "available" && (
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto rounded-full text-sm">
                <Link to="/contact" className="flex items-center justify-center">
                  <Search className="mr-2 h-3.5 w-3.5" />
                  Inquire About a Practice
                </Link>
              </Button>
            )}
            
            {activeTab === "sold" && (
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto rounded-full text-sm">
                <Link to="/contact" className="flex items-center justify-center">
                  <Check className="mr-2 h-3.5 w-3.5" />
                  Schedule Your Transition
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
