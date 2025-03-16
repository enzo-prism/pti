
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Award, Heart, Target, CheckCircle } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Jennifer Miller",
      role: "Founder & CEO",
      bio: "With over 20 years of experience in dental practice management and transitions, Dr. Miller founded PTI to help dental professionals navigate the complex process of practice transitions.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3"
    },
    {
      name: "Mark Thompson",
      role: "Director of Valuations",
      bio: "A certified business valuator with expertise in dental practices, Mark has performed over 500 practice valuations nationwide and is recognized for his accurate and comprehensive approach.",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3"
    },
    {
      name: "Dr. Robert Chen",
      role: "Transition Specialist",
      bio: "As a former practice owner who successfully navigated multiple transitions, Dr. Chen brings real-world experience and practical insights to help clients achieve their transition goals.",
      imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3"
    },
    {
      name: "Amanda Peterson",
      role: "Legal Counsel",
      bio: "Specialized in healthcare law, Amanda ensures all PTI transitions are legally sound, protecting our clients through complex regulatory and contractual matters.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Integrity",
      description: "We operate with complete transparency and honesty, always putting our clients' interests first."
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, delivering exceptional results for our clients."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Reliability",
      description: "Our clients can count on us to deliver on our promises and be there every step of the way."
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Expertise",
      description: "Our team brings specialized knowledge and experience to ensure optimal outcomes for every transition."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">About Us</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Practice Transitions Institute is dedicated to guiding dental professionals through
              successful practice transitions, fostering legacies that last.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Practice Transitions Institute was founded by Dr. Jennifer Miller in 2010 after experiencing firsthand the challenges 
              of dental practice transitions. Having sold her own practice and helped colleagues through similar journeys, 
              she recognized the need for specialized guidance in this complex process.
            </p>
            <p className="text-gray-600 mb-4">
              What began as a consultancy focused on valuation has evolved into a comprehensive transition service, 
              helping hundreds of dental professionals across the United States buy, sell, and partner in practices.
            </p>
            <p className="text-gray-600">
              Today, PTI brings together a team of experts in dental practice management, finance, and law to offer 
              unparalleled support throughout every stage of the transition process.
            </p>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3" 
                alt="Dental office" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Values Section */}
      <Section background="light">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission & Values</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At Practice Transitions Institute, our mission is to empower dental professionals to 
            achieve their practice transition goals through expert guidance, personalized solutions, 
            and unwavering integrity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section>
        <SectionTitle centered>Meet Our Team</SectionTitle>
        <SectionSubtitle centered>
          Our experienced professionals are dedicated to guiding you through every step of the practice transition process
        </SectionSubtitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={`animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Accolades Section */}
      <Section background="light">
        <SectionTitle centered>Press & Accolades</SectionTitle>
        <SectionSubtitle centered>
          Recognized for excellence in dental practice transitions
        </SectionSubtitle>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 items-center justify-center">
          <div className="p-4 flex justify-center animate-fade-in">
            <img 
              src="https://via.placeholder.com/150x60?text=Dental+Journal" 
              alt="Dental Journal" 
              className="h-12 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="p-4 flex justify-center animate-fade-in animate-delay-100">
            <img 
              src="https://via.placeholder.com/150x60?text=Practice+Weekly" 
              alt="Practice Weekly" 
              className="h-12 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="p-4 flex justify-center animate-fade-in animate-delay-200">
            <img 
              src="https://via.placeholder.com/150x60?text=Dental+Today" 
              alt="Dental Today" 
              className="h-12 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="p-4 flex justify-center animate-fade-in">
            <img 
              src="https://via.placeholder.com/150x60?text=Healthcare+Business" 
              alt="Healthcare Business" 
              className="h-12 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="p-4 flex justify-center animate-fade-in animate-delay-100">
            <img 
              src="https://via.placeholder.com/150x60?text=Industry+Excellence" 
              alt="Industry Excellence" 
              className="h-12 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="p-4 flex justify-center animate-fade-in animate-delay-200">
            <img 
              src="https://via.placeholder.com/150x60?text=Transition+Times" 
              alt="Transition Times" 
              className="h-12 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="mb-8">
        <Cta 
          title="Ready to Start Your Practice Transition Journey?"
          description="Our experienced team is ready to help you navigate the process with confidence."
          buttonText="Schedule a Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default About;
