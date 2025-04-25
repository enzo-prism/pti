import { Link } from "react-router-dom";
import { ArrowRight, Award, ChevronRight, FileCheck, Handshake, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { ServiceCard } from "@/components/ui/service-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { RecommendationCard } from "@/components/ui/recommendation-card";
import { Cta } from "@/components/ui/cta";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import SEO from "@/components/layout/SEO";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const isMobile = useIsMobile();
  
  const testimonials = [
    {
      quote: "I recently sold my dental practice after 41 years. I was primarily concerned to find a dentist who matched my treatment planning philosophy and to take good care of my wonderful patients and staff. Because Michael is a dentist with general practice experience, he has a great understanding of the important aspects for a transfer of a practice, not only for the seller but also for the buyer. I am quite happy that I had Dr Njo to help me navigate my sale!",
      author: "Gregory Baird",
      role: "General Dentist",
      company: "Sold practice in 2023"
    },
    {
      quote: "Michael was able to match a buyer within 2 weeks and completed the transaction within 45 days. He was so amazingly efficient throughout the transition process. I highly recommend him to any dentist interested in selling or buying a dental practice. Thanks again, Mike, you are my Superman.",
      author: "Tony Choi",
      role: "Practice Seller",
      company: "Los Angeles, CA"
    },
    {
      quote: "Going through selling your practice is similar to getting ready to treat a complex dental patient. Working with a professional like Michael, who has developed a well thought out linear path when it comes to selling dental practices, ensured that I was set up with the right candidate and the sale process was executed flawlessly.",
      author: "Dr. Reza",
      role: "Practice Seller",
      company: "San Francisco, CA"
    },
    {
      quote: "\"Be careful what you ask for, because I will get it for you\". That is what Michael from PTI said to me at our first face-to-face meeting. We were referred to Michael after our practice was on the market for a year with few inquiries. We closed four months later with full cash offer to a wonderful couple.",
      author: "Keith Long",
      role: "Practice Seller",
      company: "Sold practice in 2023"
    },
    {
      quote: "I feel extremely fortunate to have found and chosen Fred Heppner to help me through the process of selling my practice. I enjoyed Fred's straightforward demeanor, and his ability to simplify for me what would have been an overly complex endeavor. The sale happened very quickly and efficiently!",
      author: "Jeff Lewis, DDS, FACP",
      role: "Orthodontist",
      company: "Practice Seller"
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
      <SEO
        title="Dental Practice Transitions"
        description="Expert guidance for dental practice transitions, helping you build and preserve your professional legacy."
        image="/lovable-uploads/26ea1640-396f-4e68-b342-d7cc429029fa.png"
      />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="pt-20 pb-10 md:pt-32 md:pb-20 lg:pt-44 lg:pb-28 bg-gradient-to-br from-white to-accent relative overflow-hidden">
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
              Your Practice, <span className="text-primary">Your Legacy</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 animate-fade-in animate-delay-100">
              Expert guidance for dental practice transitions, helping you build and preserve your professional legacy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in animate-delay-200">
              <Button asChild size={isMobile ? "default" : "lg"} className="w-full sm:w-auto">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto mt-3 sm:mt-0">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/4721b228-712a-4fd3-aff8-dd60cd39ab0d.png')] bg-no-repeat bg-cover opacity-20"></div>
      </section>

      {/* Value Proposition - Mobile Optimized */}
      <Section background="white" className="py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center p-4 md:p-6 animate-fade-in bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="mx-auto bg-accent rounded-full w-14 h-14 flex items-center justify-center mb-3 md:mb-4">
              <Award className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Trusted Experience</h3>
            <p className="text-sm md:text-base text-gray-600">
              Years of specialized experience in dental practice transitions across the United States.
            </p>
          </div>
          <div className="text-center p-4 md:p-6 animate-fade-in animate-delay-100 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="mx-auto bg-accent rounded-full w-14 h-14 flex items-center justify-center mb-3 md:mb-4">
              <Handshake className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Personalized Approach</h3>
            <p className="text-sm md:text-base text-gray-600">
              Tailored solutions for your unique practice, ensuring optimal outcomes for every transition.
            </p>
          </div>
          <div className="text-center p-4 md:p-6 animate-fade-in animate-delay-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="mx-auto bg-accent rounded-full w-14 h-14 flex items-center justify-center mb-3 md:mb-4">
              <FileCheck className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Comprehensive Services</h3>
            <p className="text-sm md:text-base text-gray-600">
              Complete transition support from valuation to finalization, with expert guidance at every step.
            </p>
          </div>
        </div>
      </Section>

      {/* Services Section - Mobile Optimized */}
      <Section background="light" className="py-10 md:py-16">
        <SectionTitle centered className="text-2xl md:text-3xl mb-2">Our Services</SectionTitle>
        <SectionSubtitle centered className="text-sm md:text-base mb-6 md:mb-8 px-4">
          Comprehensive transition solutions tailored to your dental practice needs
        </SectionSubtitle>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 sm:px-6">
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
        
        <div className="text-center mt-8 md:mt-10 animate-fade-in">
          <Button asChild variant="outline" size={isMobile ? "default" : "lg"}>
            <Link to="/services" className="flex items-center">
              View all services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Expert Recommendation Section - Mobile Optimized */}
      <Section background="light" className="py-10 md:py-16">
        <SectionTitle centered className="text-2xl md:text-3xl mb-2">Expert Recommendation</SectionTitle>
        <SectionSubtitle centered className="text-sm md:text-base mb-6 md:mb-8 px-4">
          Trusted by industry leaders and dental practice management experts
        </SectionSubtitle>
        
        <div className="max-w-4xl mx-auto animate-fade-in px-4 sm:px-6">
          <RecommendationCard 
            imageUrl="/lovable-uploads/59c88b25-0874-4941-8f27-b6899527c637.png"
            name="Hy Smith, MBA"
            title="Director of Transitions, Pride Institute"
            subtitle="Mentor, Colleague, and Friend"
            quote="If you are looking for integrity, experience, and expertise, I know no other company better qualified to assist you in your dental practice transition than Practice Transitions Institute."
          />
        </div>
      </Section>

      {/* Testimonials Section - Mobile Optimized */}
      <Section className="py-10 md:py-16">
        <SectionTitle centered className="text-2xl md:text-3xl mb-2">What Our Clients Say</SectionTitle>
        <SectionSubtitle centered className="text-sm md:text-base mb-6 md:mb-8 px-4">
          Trusted by dental professionals across the country
        </SectionSubtitle>
        
        <div className="mt-6 md:mt-8 max-w-3xl mx-auto px-4">
          <div className="relative h-[320px] md:h-64">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentTestimonial 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-8"
                }`}
                aria-hidden={index !== currentTestimonial}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full mx-1.5 transition-colors ${
                  index === currentTestimonial ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Button asChild variant="outline" size={isMobile ? "default" : "lg"}>
              <Link to="/testimonials" className="flex items-center">
                Read more testimonials <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* About Us Section - Mobile Optimized */}
      <Section background="light" className="py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center px-4 sm:px-6">
          <div className="order-2 md:order-1 animate-fade-in">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">About Practice Transitions Institute</h2>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              Founded with the mission to provide expert guidance to dental professionals throughout their career journey, 
              Practice Transitions Institute specializes in seamless practice transitions.
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
              Our team of experienced professionals understands the unique challenges and opportunities 
              in the dental industry, offering personalized solutions tailored to your specific goals.
            </p>
            <Button asChild size={isMobile ? "default" : "lg"}>
              <Link to="/about" className="flex items-center">
                Learn more about us <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="order-1 md:order-2 animate-fade-in animate-delay-100 mb-6 md:mb-0">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="/lovable-uploads/26ea1640-396f-4e68-b342-d7cc429029fa.png" 
                alt="PTI team members with dental professionals" 
                className="w-full h-auto object-cover aspect-4/3"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section - Mobile Optimized */}
      <Section className="py-10 md:py-16 mb-4 md:mb-8">
        <Cta 
          title="Ready to Discuss Your Practice Transition?"
          description="Schedule a consultation with our team of experts to explore your options and create a personalized transition plan."
          buttonText="Book Your Consultation"
          buttonUrl="/contact"
          className="px-4"
        />
      </Section>
    </>
  );
};

export default Home;
