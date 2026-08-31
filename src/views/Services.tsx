
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { ServiceCard } from "@/components/ui/service-card";
import {
  FileText,
  DollarSign,
  Users,
  Handshake,
  Award,
  Building2,
  Clock,
  Smile,
  ArrowUpRight,
  SearchCheck,
} from "lucide-react";
import { serviceOfferings } from "@/data/services";
import Image from "next/image";

const serviceIconMap: Record<string, JSX.Element> = {
  "Opinion of Value": <FileText className="h-8 w-8 text-blue-600" />,
  "Selling a Practice": <DollarSign className="h-8 w-8 text-emerald-600" />,
  "Selling to a DSO": <Building2 className="h-8 w-8 text-sky-600" />,
  "Buying a Practice": <SearchCheck className="h-8 w-8 text-teal-600" />,
  "Associateships and Buy-Ins": <Users className="h-8 w-8 text-orange-600" />,
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
      title: "Transition-Focused Guidance",
      description: "Work with a team focused on dental practice sales, acquisitions, valuations, and ownership changes."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "A Coordinated Process",
      description: "Keep decisions, documents, advisors, and deadlines organized while you continue caring for patients."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      title: "Better Decision Support",
      description: "Use valuation, market context, and deal analysis to compare options on more than a headline price."
    },
    {
      icon: <Smile className="h-6 w-6 text-primary" />,
      title: "Clear Roles and Next Steps",
      description: "Know who is responsible, which decision comes next, and when to involve your attorney, CPA, or lender."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Dental Practice Transition Services</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Clear guidance for selling, buying, valuing, and structuring ownership
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Choose the Path That Fits Your Goals
            </h2>
            <p className="text-gray-600 mb-4">
              Your practice is more than a business. It is the result of years of dedication and
              care. At Practice Transitions Institute, we help you protect that legacy, unlock value,
              and make confident decisions at every career stage.
            </p>
            <p className="text-gray-600 mb-4">
              Whether you&apos;re preparing to sell, evaluating a practice to buy, bringing on a partner, or simply want
              to understand your practice&apos;s worth, our expert team provides step-by-step support
              tailored to your goals.
            </p>
            <p className="text-gray-600">
              PTI provides transition strategy and transaction support, then
              coordinates with your attorney, CPA, and lender when their licensed
              expertise is required.
            </p>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-md">
              <Image
                src="/lovable-uploads/drnjo-2026/san-mateo-symposium-workshop.jpg"
                alt="Dr. Michael Njo advising dentists during a practice ownership workshop"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section background="light">
        <SectionTitle centered>Our Core Services</SectionTitle>
        <SectionSubtitle centered>
          Select the service that matches the decision in front of you
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
        <SectionTitle centered>What PTI Adds to the Process</SectionTitle>
        <SectionSubtitle centered>
          Practical support for the financial, operational, and human sides of a transition
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
                  <h3 className="text-xl font-semibold mb-2">Closing and Handoff</h3>
                  <p className="text-gray-600">
                    We coordinate the final workstreams and help you prepare the team, patients, and new owner for the handoff.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 animate-fade-in animate-delay-100">
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-md">
              <Image
                src="/lovable-uploads/drnjo-2026/standing-trio.webp"
                alt="Practice Transitions Institute team members"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mb-8">
        <Cta 
          title="Which Transition Path Fits Your Situation?"
          description="Start with a confidential 30-minute call about your goals, timeline, and the decision in front of you."
          buttonText="Schedule a Free 30-Minute Call"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Services;
