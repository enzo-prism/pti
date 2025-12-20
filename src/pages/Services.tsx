
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { ServiceCard } from "@/components/ui/service-card";
import {
  FileText,
  DollarSign,
  Users,
  Handshake,
  Award,
  Clock,
  Smile,
  ArrowUpRight,
} from "lucide-react";
import SEO from "@/components/layout/SEO";
import { serviceOfferings } from "@/data/services";

const serviceIconMap: Record<string, JSX.Element> = {
  "Opinion of Value": <FileText className="h-8 w-8 text-blue-600" />,
  "Selling a Practice": <DollarSign className="h-8 w-8 text-emerald-600" />,
  "Associateships/Buy In": <Users className="h-8 w-8 text-orange-600" />,
  Partnerships: <Handshake className="h-8 w-8 text-purple-600" />,
};

const Services = () => {
  const services = serviceOfferings.map((offering) => ({
    ...offering,
    icon: serviceIconMap[offering.title] ?? (
      <ArrowUpRight className="h-8 w-8 text-primary" />
    ),
  }));
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
      <SEO
        title="Dental Transition Services"
        description="Comprehensive dental practice transition services including valuations, sales support, partnership planning, and associate buy-ins."
        path="/services"
      />
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Services at a Glance</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Dental Transition Services That Puts You First
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your goals. Your practice. Our Expertise.
            </h2>
            <p className="text-gray-600 mb-4">
              Your practice is more than a business — it's the result of years of dedication and 
              care. At Practice Transitions Institute, we help you protect that legacy, unlock value, 
              and make confident decisions at every career stage.
            </p>
            <p className="text-gray-600 mb-4">
              Whether you're preparing to sell, bring on a partner, buy into a practice, or simply want 
              to understand your practice's worth, our expert team provides step-by-step support 
              tailored to your goals.
            </p>
            <p className="text-gray-600">
              We specialize exclusively in dental transitions, and we bring 
              unmatched expertise, integrity, and strategy to every client relationship.
            </p>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <img 
              src="https://www.theforage.com/blog/wp-content/uploads/2022/09/management-consultant.jpg" 
              alt="Dental practice consultants in a meeting" 
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
              src="https://www.huntersure.com/wp-content/uploads/2020/06/Consultants.jpg" 
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
