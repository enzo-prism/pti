
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Cta } from "@/components/ui/cta";

const Testimonials = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const testimonials = [
    {
      quote: "PTI made the sale of my practice seamless. Their professionalism and expertise are unmatched in the industry.",
      author: "Dr. Sarah Johnson",
      role: "General Dentist",
      company: "Sold practice in 2022",
      category: "seller",
      imageUrl: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
    },
    {
      quote: "The valuation provided by PTI was critical in my negotiations and ended up being incredibly accurate when I finally sold.",
      author: "Dr. Michael Chen",
      role: "Orthodontist",
      company: "Los Angeles, CA",
      category: "valuation",
      imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
    },
    {
      quote: "As a first-time buyer, I was nervous about the process. PTI guided me through every step, making a complex transaction feel manageable.",
      author: "Dr. David Rodriguez",
      role: "Pediatric Dentist",
      company: "San Francisco, CA",
      category: "buyer",
      imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
    },
    {
      quote: "The partnership agreement PTI helped us create has stood the test of time. Five years in, and we're still thriving together thanks to their excellent guidance.",
      author: "Dr. Emily Thompson",
      role: "General Dentist",
      company: "Partnership since 2018",
      category: "partnership",
      imageUrl: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
    },
    {
      quote: "PTI's understanding of the dental market in our area was invaluable. They found us the perfect buyer who shared our treatment philosophy.",
      author: "Dr. Robert Miller",
      role: "Periodontist",
      company: "Sold practice in 2023",
      category: "seller",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
    },
    {
      quote: "The associate-to-owner pathway PTI designed for our practice has helped us retain talented dentists and create a clear succession plan.",
      author: "Dr. Jennifer Adams",
      role: "Practice Owner",
      company: "Multiple Locations",
      category: "associateship",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
    }
  ];
  
  const filteredTestimonials = activeFilter === "all" 
    ? testimonials 
    : testimonials.filter(t => t.category === activeFilter);
  
  return (
    <Layout>
      <div className="pt-28 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Testimonials & Success Stories
            </h1>
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              Hear directly from dental professionals who have successfully 
              navigated practice transitions with our guidance.
            </p>
          </div>
        </div>
      </div>

      <Section>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "all" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Stories
          </button>
          <button
            onClick={() => setActiveFilter("seller")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "seller" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Sellers
          </button>
          <button
            onClick={() => setActiveFilter("buyer")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "buyer" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Buyers
          </button>
          <button
            onClick={() => setActiveFilter("partnership")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "partnership" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Partnerships
          </button>
          <button
            onClick={() => setActiveFilter("associateship")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "associateship" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Associateships
          </button>
          <button
            onClick={() => setActiveFilter("valuation")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === "valuation" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Valuations
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </Section>

      <Section background="light" className="mb-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle centered>Featured Success Story</SectionTitle>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 mb-8 animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">Seamless Transition After 30 Years of Practice</h3>
            
            <div className="flex flex-col md:flex-row gap-8 mb-6">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3" 
                  alt="Dr. Williams in his dental office" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-600 mb-4">
                  After 32 years building a thriving dental practice in Seattle, Dr. Williams was ready to retire 
                  but concerned about finding the right successor who would care for his loyal patients 
                  and dedicated staff.
                </p>
                <p className="text-gray-600 mb-4">
                  Working with PTI, Dr. Williams received a comprehensive practice valuation and was matched 
                  with a young dentist whose clinical philosophy and patient care approach aligned perfectly with his own.
                </p>
                <p className="text-gray-600">
                  The transition included a 6-month mentorship period where Dr. Williams gradually introduced 
                  the new dentist to patients, ensuring continuity of care and a smooth handoff of relationships.
                </p>
              </div>
            </div>
            
            <div className="bg-accent p-6 rounded-lg">
              <p className="italic text-gray-700 mb-2">
                "PTI didn't just help me sell my practice; they helped me secure my legacy. 
                Three years later, my staff is still there, my patients are happy, and I've been able to 
                enjoy retirement knowing my life's work is in good hands."
              </p>
              <p className="font-medium">— Dr. James Williams, General Dentist (Retired)</p>
            </div>
          </div>
        </div>
        
        <Cta 
          title="Ready to Write Your Own Success Story?"
          description="Join the hundreds of dental professionals who have successfully transitioned their practices with PTI's expert guidance."
          buttonText="Start Your Journey Today"
          buttonUrl="/contact"
        />
      </Section>
    </Layout>
  );
};

export default Testimonials;
