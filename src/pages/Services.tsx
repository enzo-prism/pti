
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { ServiceCard } from "@/components/ui/service-card";
import { 
  FileText, DollarSign, Users, Handshake, Award, Clock, Smile, ArrowUpRight 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Opinion of Value",
      description: "Comprehensive valuation services to determine the true market value of your dental practice.",
      icon: <FileText className="h-8 w-8" />,
      url: "/services/value"
    },
    {
      title: "Selling a Practice",
      description: "Strategic guidance and support for selling your practice to achieve maximum value.",
      icon: <DollarSign className="h-8 w-8" />,
      url: "/services/selling"
    },
    {
      title: "Associateships/Buying In",
      description: "Structured pathways for associates to transition into ownership roles.",
      icon: <Users className="h-8 w-8" />,
      url: "/services/associateships"
    },
    {
      title: "Partnerships",
      description: "Creating equitable partnership arrangements that benefit all parties involved.",
      icon: <Handshake className="h-8 w-8" />,
      url: "/services/partnerships"
    }
  ];

  const benefits = [
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Expert Guidance",
      description: "Our team specializes exclusively in dental practice transitions, offering unparalleled expertise."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Time Savings",
      description: "We handle the complex details so you can focus on your practice and patients."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      title: "Maximized Value",
      description: "Strategic approaches to ensure the best financial outcome for your transition."
    },
    {
      icon: <Smile className="h-6 w-6 text-primary" />,
      title: "Reduced Stress",
      description: "A smooth, well-managed process that minimizes disruption and anxiety."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Our Services</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Comprehensive solutions for dental practice transitions at every stage of your career
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Dental Practice Transition Specialists
            </h2>
            <p className="text-gray-600 mb-4">
              At Practice Transitions Institute, we understand that your dental practice represents 
              years of dedication and is likely one of your most valuable assets. Our specialized 
              team is dedicated to ensuring your transition process is smooth, profitable, and aligned 
              with your personal and professional goals.
            </p>
            <p className="text-gray-600">
              Whether you're looking to sell your practice, buy into a partnership, establish 
              an associateship, or simply understand your practice's value, our comprehensive 
              services are tailored to meet your specific needs with expertise and integrity.
            </p>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <img 
              src="https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?ixlib=rb-4.0.3" 
              alt="Dental professionals in a meeting" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section background="light">
        <SectionTitle centered>Our Core Services</SectionTitle>
        <SectionSubtitle centered>
          Comprehensive solutions tailored to your dental practice transition needs
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              url={service.url}
              className={`animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <SectionTitle centered>Why Choose PTI</SectionTitle>
        <SectionSubtitle centered>
          The PTI advantage for your practice transition journey
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section background="light">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Our Process</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Initial Consultation</h3>
                  <p className="text-gray-600">
                    We begin with a comprehensive discussion of your goals, timeline, and specific needs.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Assessment & Strategy</h3>
                  <p className="text-gray-600">
                    Our team conducts a thorough evaluation and develops a customized transition plan.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Implementation</h3>
                  <p className="text-gray-600">
                    We guide you through each step of the process, handling negotiations and paperwork.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Successful Transition</h3>
                  <p className="text-gray-600">
                    We finalize all details and ensure a smooth handover, setting everyone up for success.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 animate-fade-in animate-delay-100">
            <img 
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3" 
              alt="Dental practice consultation" 
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mb-8">
        <Cta 
          title="Ready to Discuss Your Practice Transition?"
          description="Schedule a complimentary consultation with our team of experts."
          buttonText="Book Your Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Services;
