
import { useState } from "react";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Cta } from "@/components/ui/cta";
import { Search, Filter, MapPin, DollarSign, Users, Building, Calendar } from "lucide-react";

const Transitions = () => {
  const [filter, setFilter] = useState("all");
  
  // Sample data for available and sold practices
  const practices = [
    {
      id: 1,
      status: "available",
      title: "Modern General Practice in Downtown Area",
      location: "San Francisco, CA",
      price: "$950,000",
      collection: "$1.2M",
      operatories: 5,
      sqft: "2,200",
      yearEstablished: 2008,
      imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3"
    },
    {
      id: 2,
      status: "available",
      title: "Well-Established Family Practice",
      location: "Los Angeles, CA",
      price: "$780,000",
      collection: "$900K",
      operatories: 4,
      sqft: "1,800",
      yearEstablished: 2003,
      imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3"
    },
    {
      id: 3,
      status: "sold",
      title: "High-End Cosmetic Dental Practice",
      location: "Orange County, CA",
      price: "$1.2M",
      collection: "$1.5M",
      operatories: 6,
      sqft: "2,500",
      yearEstablished: 2010,
      imageUrl: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3"
    },
    {
      id: 4,
      status: "sold",
      title: "Profitable Pediatric Dental Office",
      location: "San Diego, CA",
      price: "$825,000",
      collection: "$950K",
      operatories: 5,
      sqft: "2,000",
      yearEstablished: 2012,
      imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3"
    },
    {
      id: 5,
      status: "available",
      title: "Turnkey Orthodontic Practice",
      location: "Sacramento, CA",
      price: "$1.4M",
      collection: "$1.8M",
      operatories: 7,
      sqft: "3,200",
      yearEstablished: 2005,
      imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3"
    },
    {
      id: 6,
      status: "sold",
      title: "Established General Practice with Real Estate",
      location: "Santa Barbara, CA",
      price: "$1.1M",
      collection: "$1.3M",
      operatories: 4,
      sqft: "2,100",
      yearEstablished: 2000,
      imageUrl: "https://images.unsplash.com/photo-1629909615310-f29487b5a8b3?ixlib=rb-4.0.3"
    }
  ];
  
  const filteredPractices = filter === "all" 
    ? practices 
    : practices.filter(practice => practice.status === filter);
  
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Transitions in Action</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Explore available practices and view our recently completed transitions
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <Section>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by location, price, etc."
                className="px-4 py-2 pl-10 border border-gray-300 rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-500 h-5 w-5 mr-1" />
            <span className="text-gray-700 mr-2">Filter:</span>
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "available" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("available")}
            >
              Available
            </Button>
            <Button 
              variant={filter === "sold" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("sold")}
            >
              Sold
            </Button>
          </div>
        </div>

        {/* Practices Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPractices.map((practice) => (
            <div 
              key={practice.id} 
              className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            >
              <div className="relative">
                <img 
                  src={practice.imageUrl} 
                  alt={practice.title} 
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-medium ${
                  practice.status === "available" ? "bg-green-500" : "bg-gray-500"
                }`}>
                  {practice.status === "available" ? "Available" : "Sold"}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 leading-tight">{practice.title}</h3>
                <div className="flex items-start mb-3">
                  <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{practice.location}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-700 text-sm">{practice.price}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-700 text-sm">Est. {practice.yearEstablished}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-700 text-sm">{practice.operatories} Operatories</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-700 text-sm">{practice.sqft} sq ft</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">View Details</Button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPractices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No practices found matching your criteria.</p>
          </div>
        )}
      </Section>

      {/* Success Stories Section */}
      <Section background="light">
        <SectionTitle centered>Success Stories</SectionTitle>
        <SectionSubtitle centered>
          Real-world examples of our successful practice transitions
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3" 
              alt="Success story - Dr. Johnson" 
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Dr. Johnson to Dr. Martinez</h3>
              <p className="text-gray-600 mb-4">
                After 30 years of building a thriving practice, Dr. Johnson wanted to ensure his patients 
                and staff would be in good hands. We helped him find the perfect buyer in Dr. Martinez, 
                who shared his philosophy of care.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">Los Angeles, CA</p>
                </div>
                <div>
                  <p className="text-gray-500">Transition Type</p>
                  <p className="font-medium">Complete Sale</p>
                </div>
                <div>
                  <p className="text-gray-500">Practice Type</p>
                  <p className="font-medium">General Dentistry</p>
                </div>
                <div>
                  <p className="text-gray-500">Completed</p>
                  <p className="font-medium">October 2022</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">Read Full Case Study</Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <img 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3" 
              alt="Success story - Dr. Wong" 
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Dr. Wong & Dr. Patel Partnership</h3>
              <p className="text-gray-600 mb-4">
                Dr. Wong sought to reduce his hours while maintaining his practice legacy. 
                We structured a gradual buy-in for Dr. Patel, creating a partnership that optimized 
                tax benefits and ensured continuity of care.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">San Francisco, CA</p>
                </div>
                <div>
                  <p className="text-gray-500">Transition Type</p>
                  <p className="font-medium">Partnership</p>
                </div>
                <div>
                  <p className="text-gray-500">Practice Type</p>
                  <p className="font-medium">Oral Surgery</p>
                </div>
                <div>
                  <p className="text-gray-500">Completed</p>
                  <p className="font-medium">May 2023</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">Read Full Case Study</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mb-8">
        <Cta 
          title="Interested in Buying or Selling a Practice?"
          description="Let our team help you navigate the transition process with confidence."
          buttonText="Schedule a Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Transitions;
