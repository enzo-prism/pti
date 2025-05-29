
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { ArrowRight, Handshake, Award, HeartHandshake, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/layout/SEO";
import { VideoDialog } from "@/components/ui/video-dialog";
import { RecommendationCard } from "@/components/ui/recommendation-card";

const About = () => {
  const leaders = [
    {
      name: "Dr. Michael Njo",
      role: "Founder & Lead Transition Consultant",
      bio: [
        "With over 30 years in clinical dentistry, Dr. Njo is one of the profession's most trusted guides for practice transitions. He's the author of the Dental Practice Transitions Handbook, he has taught at both UOP and UCSF, and is a regular keynote speaker at industry events.",
        "New: He is part of the Admission's team for UOP, is the advisor for the Dugoni Business Club and serves on the Board of Directors of the Dugoni Alumni Association. He now serves on the California Dental Association Leadership Council and is helping shape the future of dental education and policy."
      ],
      hasNewInfo: true,
      image: "/lovable-uploads/d30c74a1-48bb-404e-9e9d-bc93119a695d.png",
      videoUrl: "https://youtu.be/Jes6h2F3yhc?si=sVQZKyw1uB5Fi5_F",
      bookUrl: "https://www.amazon.com/Dental-Practice-Transitions-Handbook-Healthcare/dp/1627878718/ref=sr_1_2?dchild=1&keywords=Dental+Practice+Transitions+Handbook&qid=1632933680&s=books&sr=1-2",
      bookImage: "/lovable-uploads/61135e3f-f56e-4aff-949e-5eab772f5c5f.png",
      bookTitle: "Dental Practice Transitions Handbook",
      bookDescription: "A comprehensive guide for healthcare professionals navigating practice transitions"
    },
    {
      name: "Liz Armato",
      role: "COO & Client Services Lead",
      bio: ["Former executive at Pride Institute with over 20 years in dental operations, focused on streamlining client services and ensuring personalized guidance throughout every transition."],
      image: "/lovable-uploads/8af030a0-6d6f-46e6-960a-d2d64258b329.png"
    }
  ];

  const consultant = {
    name: "Fred Heppner",
    role: "Transition Consultant",
    bio: ["Brings decades of experience as a broker and consultant; recognized for his ability to facilitate seamless, well-vetted matches between sellers and buyers."],
    image: "/lovable-uploads/1a104794-17ea-4b67-b3f2-17a24be7dc49.png"
  };

  return (
    <>
      <SEO 
        title="About PTI"
        description="Learn about our expert team at Practice Transitions Institute, dedicated to helping dental professionals with practice transitions."
      />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              About Practice Transitions Institute
            </h1>
            <p className="text-lg md:text-xl text-gray-700 animate-fade-in animate-delay-100 leading-relaxed">
              Founded and led by experienced dental professionals dedicated to helping practitioners navigate practice transitions with care, integrity, and personalized guidance
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section - Mobile Optimized */}
      <Section className="py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fade-in order-2 lg:order-1">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center lg:text-left">
              Our Story
            </h2>
            <div className="space-y-4 text-sm md:text-base">
              <p className="text-gray-600 leading-relaxed">
                Practice Transitions Institute was founded by Dr. Michael Njo and experienced dental professionals after a successful tenure at Pride Institute. PTI was built to move beyond transactional brokers into trusted, relationship-driven consultants.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Under Dr. Njo's leadership and Liz Armato's operational expertise, our mission is to help dentists transition their practices with care, integrity, and personalized guidance. We emphasize preserving the legacy of each practice while ensuring win-win outcomes for all parties involved.
              </p>
              <p className="text-gray-600 leading-relaxed">
                What began as Dr. Njo's vision to provide better service has grown into a comprehensive transitions firm with a dedicated team of experts guiding dental professionals through major career milestones.
              </p>
            </div>
          </div>
          <div className="animate-fade-in animate-delay-100 order-1 lg:order-2">
            <img 
              src="/lovable-uploads/26ea1640-396f-4e68-b342-d7cc429029fa.png" 
              alt="PTI team members with dental professionals" 
              className="rounded-xl shadow-lg w-full max-w-md mx-auto lg:max-w-full"
            />
          </div>
        </div>
      </Section>

      {/* Leadership Team Section - Mobile Optimized */}
      <Section background="light" className="py-8 md:py-16">
        <div className="text-center mb-8">
          <SectionTitle className="text-2xl md:text-4xl mb-3 md:mb-6">Meet Our Leadership Team</SectionTitle>
          <SectionSubtitle className="text-base md:text-lg px-4">
            The experienced professionals who founded and lead Practice Transitions Institute
          </SectionSubtitle>
        </div>
        
        {/* Leadership Cards - Stacked on Mobile */}
        <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
          {leaders.map((leader, index) => (
            <div 
              key={index} 
              className="animate-fade-in bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RecommendationCard
                imageUrl={leader.image}
                name={leader.name}
                title={leader.role}
                bio={leader.bio}
                hasNewInfo={leader.hasNewInfo}
                videoUrl={leader.videoUrl}
                bookUrl={leader.bookUrl}
                bookImage={leader.bookImage}
                bookTitle={leader.bookTitle}
                bookDescription={leader.bookDescription}
              />
            </div>
          ))}
        </div>

        {/* Team Member - Reduced Emphasis */}
        <div className="mt-12 md:mt-16 max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold text-center mb-6 text-gray-700">Supporting Team</h3>
          <div className="animate-fade-in animate-delay-200 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden opacity-90">
            <RecommendationCard
              imageUrl={consultant.image}
              name={consultant.name}
              title={consultant.role}
              bio={consultant.bio}
            />
          </div>
        </div>
      </Section>

      {/* Core Values Section - Mobile Grid */}
      <Section className="py-8 md:py-16">
        <SectionTitle centered className="text-2xl md:text-4xl mb-6 md:mb-8">Our Core Values</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {[
            {
              title: "Integrity",
              description: "We prioritize ethical practices and transparency in all our dealings, ensuring our clients always receive honest advice even when it's not what they might want to hear."
            },
            {
              title: "Expertise", 
              description: "Our team maintains the highest level of knowledge in dental practice transitions through continuous education and staying current with industry trends."
            },
            {
              title: "Client Focus",
              description: "We tailor our approach to each client's unique circumstances and goals, recognizing that no two transitions are identical in their requirements."
            }
          ].map((value, index) => (
            <div 
              key={value.title}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">{value.title}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose PTI Section - Mobile Optimized */}
      <Section background="light" className="py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">Why Choose PTI</h2>
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  icon: Handshake,
                  title: "Founder-Led Excellence",
                  description: "Dr. Njo personally oversees every transition, bringing decades of expertise and his published insights to your journey."
                },
                {
                  icon: Award,
                  title: "Experienced Leadership", 
                  description: "Our leadership team includes former practicing dentists and industry executives who understand the unique challenges you face."
                },
                {
                  icon: HeartHandshake,
                  title: "Personalized Guidance",
                  description: "Liz Armato ensures hands-on support throughout your transition journey, with clear, responsive communication at every step."
                },
                {
                  icon: UserCheck,
                  title: "Trusted Matchmaking",
                  description: "We carefully screen and match buyers and sellers to ensure compatible values and practice philosophy."
                }
              ].map((item, index) => (
                <div key={item.title} className="flex items-start space-x-3 md:space-x-4">
                  <item.icon className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 animate-fade-in animate-delay-100">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3" 
              alt="Team in a strategy meeting" 
              className="rounded-xl shadow-lg w-full max-w-md mx-auto lg:max-w-full"
            />
          </div>
        </div>
      </Section>

      {/* Stats Section - Mobile Grid */}
      <Section className="py-8 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {[
            { number: "500+", label: "Successful Transitions" },
            { number: "15", label: "Years of Experience" },
            { number: "42", label: "States Served" },
            { number: "98%", label: "Client Satisfaction" }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="animate-fade-in p-4 rounded-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <p className="text-gray-700 text-xs md:text-base font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Client Experiences Section - Mobile Cards */}
      <Section background="light" className="py-8 md:py-16">
        <SectionTitle centered className="text-2xl md:text-4xl mb-6 md:mb-8">Client Experiences</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {[
            {
              title: "Seamless Process",
              description: "Clients consistently praise PTI for making a stressful process smooth and efficient, citing responsive, hands-on support from our team throughout their transition journey."
            },
            {
              title: "Trusted Matchmaking",
              description: "Dentists value our careful screening and personalized approach, which ensures only qualified and well-matched buyers are presented, preserving the legacy of their practice."
            },
            {
              title: "Educational Value",
              description: "Our seminars and workshops provide practical, actionable guidance, earning high marks from participants who frequently become long-term clients after attending."
            },
            {
              title: "Outcome Satisfaction",
              description: "Numerous testimonials reflect deep gratitude for our role in securing favorable deals and enhancing the quality of life for dentists facing major career transitions."
            }
          ].map((experience, index) => (
            <div 
              key={experience.title}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">{experience.title}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section - Mobile Optimized */}
      <Section background="light" className="py-6 md:py-8">
        <Cta 
          title="Ready to Start Your Transition Journey?"
          description="Schedule a complimentary consultation with our expert team to explore your options."
          buttonText="Book Your Consultation"
          buttonUrl="/contact"
          background="primary"
          className="mx-4 md:mx-0"
        />
      </Section>
    </>
  );
};

export default About;
