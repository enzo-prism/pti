
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/service-card";
import { 
  ArrowRight, ArrowUpRight, PresentationChart, 
  Users, Handshake, FileText, DollarSign 
} from "lucide-react";

const Transitions = () => {
  // Timeline data
  const timelineSteps = [
    {
      title: "Initial Consultation",
      description: "We discuss your goals, timeline, and specific needs to establish clear objectives.",
      icon: <Users className="h-6 w-6 text-white" />,
    },
    {
      title: "Assessment & Analysis",
      description: "We evaluate your practice, conduct necessary valuations, and analyze market conditions.",
      icon: <PresentationChart className="h-6 w-6 text-white" />,
    },
    {
      title: "Strategy Development",
      description: "We create a customized transition plan tailored to your specific situation and goals.",
      icon: <FileText className="h-6 w-6 text-white" />,
    },
    {
      title: "Implementation",
      description: "We execute the transition plan, managing negotiations, documentation, and coordination.",
      icon: <Handshake className="h-6 w-6 text-white" />,
    },
    {
      title: "Completion & Follow-up",
      description: "We finalize the transition and provide ongoing support to ensure long-term success.",
      icon: <DollarSign className="h-6 w-6 text-white" />,
    }
  ];

  // Service cards
  const transitionServices = [
    {
      title: "Ownership Transitions",
      description: "Complete practice sales, associate buy-ins, and partnership formations with expert guidance.",
      url: "/services/selling",
    },
    {
      title: "Associateship Placement",
      description: "Finding the right associate fit for your practice with potential for future ownership.",
      url: "/services/associateships",
    },
    {
      title: "Merger & Acquisition",
      description: "Strategic practice mergers and acquisitions to maximize synergies and growth potential.",
      url: "/services",
    },
    {
      title: "DSO Transitions",
      description: "Navigating the complex process of selling to or partnering with dental service organizations.",
      url: "/services",
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Practice Transitions</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Expert guidance for every stage of your dental practice journey
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Seamless Dental Practice Transitions
            </h2>
            <p className="text-gray-600 mb-4">
              Practice transitions represent significant milestones in your dental career, whether you're buying your first practice, bringing in an associate, forming a partnership, or planning your exit strategy.
            </p>
            <p className="text-gray-600 mb-6">
              At Practice Transitions Institute, we understand the complexities involved and provide comprehensive guidance to ensure a smooth, successful transition that meets your personal and professional goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link to="/contact">Schedule a Consultation</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <img 
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3" 
              alt="Dental practice handshake" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </Section>

      {/* Transition Types Section */}
      <Section background="light">
        <SectionTitle centered>Our Transition Services</SectionTitle>
        <SectionSubtitle centered>
          Comprehensive solutions for every type of dental practice transition
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {transitionServices.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              url={service.url}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </Section>

      {/* Transition Process Timeline */}
      <Section>
        <SectionTitle centered>Our Transition Process</SectionTitle>
        <SectionSubtitle centered>
          A structured approach to ensure successful transitions
        </SectionSubtitle>
        
        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent"></div>
          
          {/* Timeline steps */}
          {timelineSteps.map((step, index) => (
            <div 
              key={index} 
              className={`mb-12 md:mb-24 relative animate-fade-in ${
                index % 2 === 0 ? 'md:text-right' : 'md:text-left'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="md:flex items-center">
                {/* Content for left-aligned items */}
                {index % 2 === 0 && (
                  <div className="hidden md:block md:w-1/2 pr-8">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                )}
                
                {/* Timeline node */}
                <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex justify-center mb-4 md:mb-0">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center z-10">
                    {step.icon}
                  </div>
                </div>
                
                {/* Content for mobile and right-aligned items */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:hidden' : 'md:pl-8'}`}>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section background="light">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Why Choose Professional Guidance</h2>
            <p className="text-gray-600 mb-6">
              Practice transitions are among the most significant financial and career decisions dental professionals make. 
              Professional guidance ensures you avoid common pitfalls while maximizing value and satisfaction.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg flex items-center">
                  <ArrowRight className="h-5 w-5 text-primary mr-2" />
                  Maximize Financial Outcomes
                </h3>
                <p className="text-gray-600 mt-1">
                  Proper valuation and negotiation strategies ensure you receive fair market value for your practice.
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg flex items-center">
                  <ArrowRight className="h-5 w-5 text-primary mr-2" />
                  Minimize Tax Implications
                </h3>
                <p className="text-gray-600 mt-1">
                  Strategic transaction structuring can significantly reduce tax liability during transitions.
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg flex items-center">
                  <ArrowRight className="h-5 w-5 text-primary mr-2" />
                  Protect Legal Interests
                </h3>
                <p className="text-gray-600 mt-1">
                  Comprehensive agreements and proper documentation safeguard your interests throughout the process.
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg flex items-center">
                  <ArrowRight className="h-5 w-5 text-primary mr-2" />
                  Ensure Practice Continuity
                </h3>
                <p className="text-gray-600 mt-1">
                  Well-planned transitions maintain practice value, patient retention, and staff morale.
                </p>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <h2 className="text-3xl font-bold mb-6">Our Unique Approach</h2>
            <p className="text-gray-600 mb-6">
              At Practice Transitions Institute, we take a holistic approach to practice transitions, 
              addressing not just the financial and legal aspects, but also the personal and professional goals of all parties involved.
            </p>
            
            <div className="aspect-video relative rounded-lg overflow-hidden shadow-md mb-6">
              <img 
                src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3" 
                alt="Team discussing transition strategy" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <ul className="space-y-2">
              <li className="flex items-center">
                <ArrowUpRight className="h-5 w-5 text-primary mr-2" />
                <span>Personalized transition strategies tailored to your unique situation</span>
              </li>
              <li className="flex items-center">
                <ArrowUpRight className="h-5 w-5 text-primary mr-2" />
                <span>Comprehensive team approach with experts in each aspect of transitions</span>
              </li>
              <li className="flex items-center">
                <ArrowUpRight className="h-5 w-5 text-primary mr-2" />
                <span>Clear, transparent communication throughout the entire process</span>
              </li>
              <li className="flex items-center">
                <ArrowUpRight className="h-5 w-5 text-primary mr-2" />
                <span>Focus on creating win-win outcomes for all parties involved</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Testimonial Section */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl text-primary font-serif mb-6">"</div>
          <blockquote className="text-xl text-gray-700 italic mb-6">
            Working with PTI for my practice transition was the best decision I made. Their expertise guided me through every step of the process, ensuring I received maximum value while finding the right buyer who would continue my legacy of patient care.
          </blockquote>
          <div className="flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3" 
              alt="Dr. Robert Anderson" 
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div className="text-left">
              <div className="font-semibold">Dr. Robert Anderson</div>
              <div className="text-gray-600 text-sm">Sold practice after 32 years</div>
            </div>
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/testimonials" className="flex items-center">
                Read more success stories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="light" className="mb-8">
        <Cta 
          title="Ready to Plan Your Practice Transition?"
          description="Schedule a confidential consultation with our team to discuss your transition goals and options."
          buttonText="Book Your Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Transitions;
