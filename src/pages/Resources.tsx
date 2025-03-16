
import { useState } from "react";
import { Search, FileText, PieChart, Video, Calendar, ArrowRight, Download } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Button } from "@/components/ui/button";

interface Resource {
  id: number;
  title: string;
  description: string;
  date: string;
  category: "article" | "guide" | "video" | "podcast" | "worksheet";
  imageUrl?: string;
  url: string;
}

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const resources: Resource[] = [
    {
      id: 1,
      title: "5 Key Steps to Prepare Your Dental Practice for Sale",
      description: "Learn the essential preparations that can maximize your practice's value and appeal to potential buyers.",
      date: "May 10, 2024",
      category: "article",
      imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3",
      url: "#article-1"
    },
    {
      id: 2,
      title: "The Complete Guide to Dental Practice Valuation",
      description: "Download our comprehensive guide to understanding how dental practices are valued in today's market.",
      date: "April 2, 2024",
      category: "guide",
      url: "#guide-1"
    },
    {
      id: 3,
      title: "Interview: From Associate to Owner Success Story",
      description: "Watch Dr. Jennifer Lee's journey from associate to practice owner and the lessons she learned along the way.",
      date: "March 15, 2024",
      category: "video",
      imageUrl: "https://images.unsplash.com/photo-1559570278-eb8d71d06403?ixlib=rb-4.0.3",
      url: "#video-1"
    },
    {
      id: 4,
      title: "Podcast: The Tax Implications of Practice Transitions",
      description: "Our interview with CPA Susan White on minimizing tax burden during practice sales and transitions.",
      date: "February 28, 2024",
      category: "podcast",
      url: "#podcast-1"
    },
    {
      id: 5,
      title: "Associate Employment Agreement Checklist",
      description: "A downloadable worksheet to help you evaluate and negotiate associate contracts.",
      date: "January 20, 2024",
      category: "worksheet",
      url: "#worksheet-1"
    },
    {
      id: 6,
      title: "Current Trends in Dental Practice Valuations",
      description: "Analysis of recent market trends affecting practice values across different specialties and regions.",
      date: "December 12, 2023",
      category: "article",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
      url: "#article-2"
    },
    {
      id: 7,
      title: "Due Diligence Checklist for Practice Buyers",
      description: "Essential items to verify when considering a practice purchase, from patient records to equipment assessment.",
      date: "November 5, 2023",
      category: "guide",
      url: "#guide-2"
    },
    {
      id: 8,
      title: "Video Tutorial: Understanding Practice Financials",
      description: "A step-by-step walkthrough of dental practice financial statements and key metrics for buyers and sellers.",
      date: "October 18, 2023",
      category: "video",
      url: "#video-2"
    }
  ];
  
  const filteredResources = resources
    .filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(resource => 
      activeCategory === "all" || resource.category === activeCategory
    );
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "article":
        return <FileText size={18} />;
      case "guide":
        return <FileText size={18} />;
      case "video":
        return <Video size={18} />;
      case "podcast":
        return <PieChart size={18} />;
      case "worksheet":
        return <Download size={18} />;
      default:
        return <FileText size={18} />;
    }
  };
  
  return (
    <Layout>
      <div className="pt-28 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Resources & Education
            </h1>
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              Articles, guides, videos, and tools to help you navigate 
              dental practice transitions with confidence.
            </p>
          </div>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Resources
            </button>
            <button
              onClick={() => setActiveCategory("article")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "article" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveCategory("guide")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "guide" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Guides
            </button>
            <button
              onClick={() => setActiveCategory("video")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "video" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveCategory("podcast")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "podcast" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Podcasts
            </button>
            <button
              onClick={() => setActiveCategory("worksheet")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "worksheet" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Worksheets
            </button>
          </div>
        </div>
        
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No resources match your search criteria.</p>
            <p className="text-gray-500">Try adjusting your search or browse all resources.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {setSearchTerm(""); setActiveCategory("all");}}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <a 
                key={resource.id}
                href={resource.url}
                className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full animate-fade-in"
              >
                {resource.imageUrl ? (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className={`h-48 flex items-center justify-center ${
                    resource.category === "article" ? "bg-blue-50" :
                    resource.category === "guide" ? "bg-green-50" :
                    resource.category === "video" ? "bg-red-50" :
                    resource.category === "podcast" ? "bg-purple-50" :
                    "bg-yellow-50"
                  }`}>
                    {getCategoryIcon(resource.category)}
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-2">
                    <span className={`text-xs uppercase tracking-wider font-medium px-2 py-1 rounded-full ${
                      resource.category === "article" ? "bg-blue-100 text-blue-800" :
                      resource.category === "guide" ? "bg-green-100 text-green-800" :
                      resource.category === "video" ? "bg-red-100 text-red-800" :
                      resource.category === "podcast" ? "bg-purple-100 text-purple-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {resource.category}
                    </span>
                    <span className="ml-auto text-sm text-gray-500">{resource.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
                  
                  <div className="flex items-center text-primary font-medium mt-auto">
                    <span>Read more</span>
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </Section>

      <Section background="light" className="mb-8">
        <SectionTitle centered>Subscribe to Our Newsletter</SectionTitle>
        <SectionSubtitle centered>
          Stay updated with the latest insights, trends, and resources on dental practice transitions
        </SectionSubtitle>
        
        <div className="max-w-2xl mx-auto mt-8">
          <form className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="youremail@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 mr-2"
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to receive educational content and updates from Practice Transitions Institute.
                  We respect your privacy and will never share your information.
                </span>
              </label>
            </div>
            
            <Button type="submit" className="w-full">
              Subscribe to Newsletter
            </Button>
          </form>
        </div>
        
        <Cta 
          title="Need Personalized Guidance?"
          description="Our team of experts is ready to address your specific practice transition questions and challenges."
          buttonText="Schedule a Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </Layout>
  );
};

export default Resources;
