
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { useIsMobile } from "@/hooks/use-mobile";
import SEO from "@/components/layout/SEO";

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
      <section className="pt-12 pb-8 md:pt-20 md:pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-white to-accent relative overflow-hidden">
        <div className="container relative z-10 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 animate-fade-in leading-tight">
              From Acquisition to <span className="text-primary">Legacy</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6 animate-fade-in animate-delay-100 px-2">
              We Help You Navigate Your Dental Practice Transition with Certainty
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 md:mb-8 animate-fade-in animate-delay-200 max-w-3xl mx-auto px-2 leading-relaxed">
              We guide dentists through every stage of their practice transition, ensuring a smooth, profitable, and stress-free process.
            </p>
            <div className="animate-fade-in animate-delay-300 px-2">
              <Button asChild size={isMobile ? "default" : "lg"} className="w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4">
                <Link to="/contact">Get Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/4721b228-712a-4fd3-aff8-dd60cd39ab0d.png')] bg-no-repeat bg-cover opacity-20"></div>
      </section>

      {/* The Problem Section */}
      <Section background="light" className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">The Challenge You're Facing</SectionTitle>
          <div className="bg-white p-6 sm:p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Selling or buying a practice can feel overwhelming. You're facing complex decisions with your life's work at stake. How do you ensure a smooth transition, get a fair value, and protect your legacy?
            </p>
          </div>
        </div>
      </Section>

      {/* The Guide Section */}
      <Section background="white" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">Your Trusted Partner</SectionTitle>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 md:mb-8">
                Practice Transitions Institute (PTI) is your trusted partner. With decades of experience, we provide the expertise, personalized support, and proven strategies you need to achieve your goals.
              </p>
              <Button asChild variant="outline" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto">
                <Link to="/about" className="flex items-center justify-center">
                  Learn About Our Expertise <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
              <img 
                src="/lovable-uploads/26ea1640-396f-4e68-b342-d7cc429029fa.png" 
                alt="PTI team members with dental professionals" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* The Plan Section */}
      <Section background="light" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <SectionTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4">Our Proven Process</SectionTitle>
            <SectionSubtitle className="text-base sm:text-lg md:text-xl">
              Our proven process simplifies your transition
            </SectionSubtitle>
          </div>
          
          <div className="grid gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start mb-4 md:mb-6">
                <div className="bg-primary text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-3 sm:mr-4 text-sm sm:text-lg font-bold flex-shrink-0 mt-1">1</div>
                <h3 className="font-semibold text-base sm:text-lg md:text-xl">Personalized Discovery and Planning</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed ml-11 sm:ml-14">
                The first step is a collaborative session to pinpoint your goals and challenges. We then create a detailed plan, ensuring every step is aligned with your desired outcome.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start mb-4 md:mb-6">
                <div className="bg-primary text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-3 sm:mr-4 text-sm sm:text-lg font-bold flex-shrink-0 mt-1">2</div>
                <h3 className="font-semibold text-base sm:text-lg md:text-xl">Accurate Valuation</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed ml-11 sm:ml-14">
                We provide a thorough assessment of your practice to determine its true market value.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start mb-4 md:mb-6">
                <div className="bg-primary text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-3 sm:mr-4 text-sm sm:text-lg font-bold flex-shrink-0 mt-1">3</div>
                <h3 className="font-semibold text-base sm:text-lg md:text-xl">Strategic Negotiation</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed ml-11 sm:ml-14">
                We help you navigate complex negotiations to maximize your return.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start mb-4 md:mb-6">
                <div className="bg-primary text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-3 sm:mr-4 text-sm sm:text-lg font-bold flex-shrink-0 mt-1">4</div>
                <h3 className="font-semibold text-base sm:text-lg md:text-xl">Seamless Closing</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed ml-11 sm:ml-14">
                We manage the details to ensure a smooth and efficient transaction.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start mb-4 md:mb-6">
                <div className="bg-primary text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mr-3 sm:mr-4 text-sm sm:text-lg font-bold flex-shrink-0 mt-1">5</div>
                <h3 className="font-semibold text-base sm:text-lg md:text-xl">Ongoing Support</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed ml-11 sm:ml-14">
                We provide continuous guidance and support throughout the entire process.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Stakes & Success Section */}
      <Section background="white" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* The Stakes (Avoid Failure) */}
            <div className="bg-red-50 border border-red-100 p-6 sm:p-8 md:p-10 rounded-xl">
              <div className="flex items-start mb-4 md:mb-6">
                <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-red-800">The Risk of Going Alone</h3>
              </div>
              <p className="text-red-700 text-base sm:text-lg leading-relaxed">
                Don't risk your future. Without expert guidance, you could face financial losses, post-sale litigation, unnecessary stress, and a compromised legacy.
              </p>
            </div>
            
            {/* The Success */}
            <div className="bg-green-50 border border-green-100 p-6 sm:p-8 md:p-10 rounded-xl">
              <div className="flex items-start mb-4 md:mb-6">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-3 flex-shrink-0 mt-1" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800">Your Success Story</h3>
              </div>
              <p className="text-green-700 text-base sm:text-lg leading-relaxed">
                Imagine a smooth, successful transition, a secure financial future, and the peace of mind knowing your legacy is in good hands. With PTI, you can confidently move into your next chapter.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Final Call to Action */}
      <Section background="primary" className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-white">
            Ready to Start Your Transition?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white opacity-90 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
            Take the first step toward a successful practice transition with expert guidance you can trust.
          </p>
          <Button asChild variant="secondary" size={isMobile ? "default" : "lg"} className="w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4">
            <Link to="/contact">Get Free Consultation</Link>
          </Button>
        </div>
      </Section>
    </>
  );
};

export default Home;
