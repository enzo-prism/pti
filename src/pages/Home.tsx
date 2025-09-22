
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { useIsMobile } from "@/hooks/use-mobile";
import SEO from "@/components/layout/SEO";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { StaggeredGrid } from "@/components/ui/staggered-grid";
import { HeroContent } from "@/components/ui/hero-content";
import { LatestUpdateCard } from "@/components/ui/latest-update-card";
import { getLatestUpdate } from "@/data/updates";

const Home = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <SEO
        title="From Acquisition to Legacy - Dental Practice Transitions"
        description="We guide dentists through every stage of their practice transition, ensuring a smooth, profitable, and stress-free process."
        image="/lovable-uploads/26ea1640-396f-4e68-b342-d7cc429029fa.png"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden hero-gradient pt-24 md:pt-32 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 6rem)' }}>
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 hero-gradient-overlay" />
        
        {/* Hero Content */}
        <div className="relative z-10 w-full">
          <ScrollReveal direction="morphing" delay={200} intensity="strong">
            <HeroContent className="text-white" />
          </ScrollReveal>
        </div>
      </section>


      {/* The Problem Section */}
      <Section background="light" className="py-12 md:py-20 contain-layout">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <ScrollReveal direction="blur-in" delay={100} intensity="subtle">
            <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">You've built something great, now what?</SectionTitle>
          </ScrollReveal>
          <ScrollReveal direction="elastic" delay={200}>
            <div className="bg-white p-6 sm:p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 hover-lift gpu-accelerated">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                Selling or buying a practice can feel overwhelming. You're facing complex decisions with your life's work at stake. How do you ensure a smooth transition, get a fair value, and protect your legacy?
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* The Guide Section */}
      <Section background="white" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <ScrollReveal direction="parallax" delay={100} intensity="normal">
              <div className="order-2 md:order-1">
                <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">The right partner makes all the difference.</SectionTitle>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8">
                  With decades of dental and consulting experience, we go beyond brokerage to guide you with expertise, strategy and care – so you can move forward with confidence.
                </p>
                <Button asChild variant="outline" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto">
                  <Link to="/about" className="flex items-center justify-center">
                    Learn About Our Expertise <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="magnetic" delay={200} intensity="subtle">
              <div className="rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                <img 
                  src="/lovable-uploads/26ea1640-396f-4e68-b342-d7cc429029fa.png" 
                  alt="PTI team members with dental professionals" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* The Plan Section */}
      <Section background="light" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <ScrollReveal direction="bounce" delay={100} intensity="normal">
              <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4">Our Proven Process</SectionTitle>
            </ScrollReveal>
            <ScrollReveal direction="blur-in" delay={200} intensity="subtle">
              <SectionSubtitle className="text-base sm:text-lg md:text-xl" centered={true}>
                We simplify your transition
              </SectionSubtitle>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                number: 1,
                title: "Discovery and Plan",
                description: "We align your goals with a clear, customized roadmap"
              },
              {
                number: 2,
                title: "Know Your Value", 
                description: "Get a clear, data-backed valuation you can trust."
              },
              {
                number: 3,
                title: "Navigate the Deal",
                description: "We handle complex negotiations to maximize your return."
              },
              {
                number: 4,
                title: "Transition Support",
                description: "We ensure a smooth hand-off for your team and patients."
              },
              {
                number: 5,
                title: "Protect What Matters",
                description: "Safeguard your reputation, relationships, for peace of mind."
              },
              {
                number: 6,
                title: "Map Your Next Move",
                description: "We help you plan confidently for life after the sale."
              }
            ].map((step, index) => (
              <ScrollReveal key={step.number} direction="scale" delay={index * 100} intensity="subtle">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all hover-scale duration-300 h-full flex flex-col">
                  <div className="flex items-start mb-4 md:mb-6">
                    <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 text-lg font-bold flex-shrink-0 shadow-lg">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-lg md:text-xl text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed ml-16 flex-grow">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Stakes & Success Section */}
      <Section background="white" className="py-12 md:py-20 contain-layout">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="scale" delay={100} intensity="subtle">
              <div className="bg-gray-50 border border-gray-100 p-8 sm:p-10 md:p-12 rounded-xl text-center hover-lift gpu-accelerated">
                <div className="mb-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    The Risk of Going Alone
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Don't risk your future. Without expert guidance, you could face financial losses, post-sale litigation, unnecessary stress, and a compromised legacy.
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Your Success Story
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    With PTI, you can confidently move into your next chapter. Imagine a smooth, successful transition, a secure financial future, and the peace of mind knowing your legacy is in good hands.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* Latest Update Section */}
      <Section background="white" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="blur-in" delay={100} intensity="subtle">
              <LatestUpdateCard update={getLatestUpdate()!} />
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* Final Call to Action */}
      <Section background="primary" className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden contain-layout">
        <div className="absolute inset-0 gradient-mesh opacity-20 gpu-accelerated"></div>
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4 relative">
          <ScrollReveal direction="scale" delay={100} intensity="subtle">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-white">
              Ready to Start Your Transition?
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="blur-in" delay={200} intensity="normal">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white opacity-90 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              Take the first step toward a successful transition with expert guidance you can trust.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="magnetic" delay={300} intensity="strong">
            <Button asChild variant="secondary" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 hover-lift !bg-white hover:!bg-white border border-white">
              <Link to="/contact">Let's Talk</Link>
            </Button>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
};

export default Home;
