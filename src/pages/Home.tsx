
import { Link } from "react-router-dom";
import { ArrowRight, FileCheck, Handshake, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { ServiceCard } from "@/components/ui/service-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Cta } from "@/components/ui/cta";
import { useState, useEffect } from "react";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "PTI made the sale of my practice seamless. Their professionalism and expertise are unmatched in the industry.",
      author: "Dr. Sarah Johnson",
      role: "General Dentist",
      company: "Sold practice in 2022"
    },
    {
      quote: "The valuation provided by PTI was critical in my negotiations and ended up being incredibly accurate when I finally sold.",
      author: "Dr. Michael Chen",
      role: "Orthodontist",
      company: "Los Angeles, CA"
    },
    {
      quote: "As a first-time buyer, I was nervous about the process. PTI guided me through every step, making a complex transaction feel manageable.",
      author: "Dr. David Rodriguez",
      role: "Pediatric Dentist",
      company: "San Francisco, CA"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-44 lg:pb-28 bg-gradient-to-br from-white to-accent relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Your Practice, <span className="text-primary">Your Legacy</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100">
              Expert guidance for dental practice transitions, helping you build and preserve your professional legacy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-200">
              <Button asChild size="lg">
                <Link to="/contact">Book a Complimentary Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3')] bg-no-repeat bg-cover opacity-5"></div>
      </section>

      {/* Value Proposition */}
      <Section background="white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 animate-fade-in">
            <div className="mx-auto bg-accent rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trusted Experience</h3>
            <p className="text-gray-600">
              Years of specialized experience in dental practice transitions across the United States.
            </p>
          </div>
          <div className="text-center p-6 animate-fade-in animate-delay-100">
            <div className="mx-auto bg-accent rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Handshake className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Approach</h3>
            <p className="text-gray-600">
              Tailored solutions for your unique practice, ensuring optimal outcomes for every transition.
            </p>
          </div>
          <div className="text-center p-6 animate-fade-in animate-delay-200">
            <div className="mx-auto bg-accent rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <FileCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Services</h3>
            <p className="text-gray-600">
              Complete transition support from valuation to finalization, with expert guidance at every step.
            </p>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section background="light">
        <SectionTitle centered>Our Services</SectionTitle>
        <SectionSubtitle centered>
          Comprehensive transition solutions tailored to your dental practice needs
        </SectionSubtitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            title="Opinion of Value"
            description="Accurate, market-driven valuations to understand your practice's true worth."
            url="/services/value"
            className="animate-fade-in"
          />
          <ServiceCard
            title="Selling a Practice"
            description="Strategic guidance to maximize value and ensure a smooth ownership transition."
            url="/services/selling"
            className="animate-fade-in animate-delay-100"
          />
          <ServiceCard
            title="Associateships & Buying In"
            description="Structured pathways for associates to transition into ownership roles."
            url="/services/associateships"
            className="animate-fade-in animate-delay-200"
          />
          <ServiceCard
            title="Partnerships"
            description="Creating equitable partnership arrangements that benefit all parties."
            url="/services/partnerships"
            className="animate-fade-in animate-delay-300"
          />
        </div>
        
        <div className="text-center mt-10 animate-fade-in">
          <Button asChild variant="outline">
            <Link to="/services" className="flex items-center">
              View all services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section>
        <SectionTitle centered>What Our Clients Say</SectionTitle>
        <SectionSubtitle centered>
          Trusted by dental professionals across the country
        </SectionSubtitle>
        
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative h-64">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentTestimonial 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-8"
                }`}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full mx-1 ${
                  index === currentTestimonial ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/testimonials" className="flex items-center">
                Read more testimonials <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* About Us Section */}
      <Section background="light">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Practice Transitions Institute</h2>
            <p className="text-gray-600 mb-4">
              Founded with the mission to provide expert guidance to dental professionals throughout their career journey, 
              Practice Transitions Institute specializes in seamless practice transitions.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of experienced professionals understands the unique challenges and opportunities 
              in the dental industry, offering personalized solutions tailored to your specific goals.
            </p>
            <Button asChild>
              <Link to="/about" className="flex items-center">
                Learn more about us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="order-1 md:order-2 animate-fade-in animate-delay-100">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="/lovable-uploads/26ea1640-396f-4e68-b342-d7cc429029fa.png" 
                alt="PTI team members with dental professionals" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mb-8">
        <Cta 
          title="Ready to Discuss Your Practice Transition?"
          description="Schedule a complimentary consultation with our team of experts to explore your options and create a personalized transition plan."
          buttonText="Book Your Consultation Today"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Home;
