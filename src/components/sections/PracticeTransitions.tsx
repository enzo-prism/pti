
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Search, Filter, Map, MapPin } from "lucide-react";
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
    imageSrc: "https://images.unsplash.com/photo-1629909615184-74f495363b67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    imageSrc: "https://images.unsplash.com/photo-1606811856475-5e94ce3c99e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    imageSrc: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    imageSrc: "https://images.unsplash.com/photo-1606811856891-07eee7e3b8c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    imageSrc: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    imageSrc: "https://images.unsplash.com/photo-1606811856987-e9501ccbe812?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    <Section background="light" className="px-2 sm:px-4">
      {showTitle && (
        <>
          <SectionTitle centered>Practice Transitions</SectionTitle>
          <SectionSubtitle centered className="px-2 sm:px-0">
            Explore our available practices and view our successful transitions
          </SectionSubtitle>
        </>
      )}
      
      <Tabs 
        defaultValue="available" 
        className="mt-6 sm:mt-8"
        onValueChange={value => setActiveTab(value)}
      >
        <div className="flex justify-center mb-4 sm:mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="available" className="px-2 sm:px-4 text-xs sm:text-sm">
              Available Practices
              <Badge variant="outline" className="ml-1 sm:ml-2 bg-primary text-white text-[10px] sm:text-xs">
                {filteredAvailable.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="sold" className="px-2 sm:px-4 text-xs sm:text-sm">
              Completed Transitions
              <Badge variant="outline" className="ml-1 sm:ml-2 bg-gray-400 text-white text-[10px] sm:text-xs">
                {filteredSold.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>
        
        {showSearch && (
          <div className="flex justify-center mb-4 sm:mb-6 px-2 sm:px-0">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <Input
                placeholder={isMobile ? "Search practices..." : "Search by location or practice type..."}
                className="pl-8 sm:pl-10 py-1 sm:py-2 text-xs sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 px-2 sm:px-0">
            <Badge className="bg-white text-gray-600 border hover:bg-gray-100 cursor-pointer text-xs sm:text-sm py-1">
              <MapPin className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" /> All Locations
            </Badge>
            <Badge className="bg-white text-gray-600 border hover:bg-gray-100 cursor-pointer text-xs sm:text-sm py-1">
              Revenue: Any
            </Badge>
            <Badge className="bg-white text-gray-600 border hover:bg-gray-100 cursor-pointer text-xs sm:text-sm py-1">
              Operatories: Any
            </Badge>
          </div>
        )}
        
        <TabsContent value="available">
          {filteredAvailable.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
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
            <div className="text-center py-6 sm:py-10">
              <p className="text-gray-500 text-sm sm:text-base">No practices found matching your search.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sold">
          {filteredSold.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
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
            <div className="text-center py-6 sm:py-10">
              <p className="text-gray-500 text-sm sm:text-base">No completed transitions found matching your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {limit && (
        <div className="mt-6 sm:mt-10 text-center px-2 sm:px-0">
          <div className="inline-flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
            <Button asChild size={isMobile ? "sm" : "default"} className="w-full sm:w-auto text-xs sm:text-sm">
              <Link to="/transitions" className="flex items-center">
                View All {activeTab === "available" ? "Available Practices" : "Completed Transitions"}
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
            
            {activeTab === "available" && (
              <Button asChild variant="outline" size={isMobile ? "sm" : "default"} className="w-full sm:w-auto text-xs sm:text-sm">
                <Link to="/contact" className="flex items-center">
                  <Search className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Inquire About a Practice
                </Link>
              </Button>
            )}
            
            {activeTab === "sold" && (
              <Button asChild variant="outline" size={isMobile ? "sm" : "default"} className="w-full sm:w-auto text-xs sm:text-sm">
                <Link to="/contact" className="flex items-center">
                  <Check className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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
