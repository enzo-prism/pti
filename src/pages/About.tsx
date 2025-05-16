import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { ArrowRight, Handshake, Award, HeartHandshake, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/layout/SEO";
import { VideoDialog } from "@/components/ui/video-dialog";
import { RecommendationCard } from "@/components/ui/recommendation-card";

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Michael Njo, DDS",
      role: "Founder & Lead Transition Consultant",
      bio: [
        "With over 30 years in clinical dentistry, Dr. Njo is one of the profession's most trusted guides for practice transitions. He's the author of the Dental Practice Transitions Handbook, serves on faculty at both UOP and UCSF, and is a regular keynote speaker at industry events.",
        "New: He now serves on the California Dental Association Leadership Council and sits on the Board of the Dugoni Alumni Association—helping shape the future of dental education and policy."
      ],
      hasNewInfo: true,
      image: "/lovable-uploads/b1f60d1b-1ab4-4038-b99a-7c6d3da854a6.png",
      videoUrl: "https://youtu.be/Jes6h2F3yhc?si=sVQZKyw1uB5Fi5_F",
      bookUrl: "https://www.amazon.com/Dental-Practice-Transitions-Handbook-Healthcare/dp/1627878718/ref=sr_1_2?dchild=1&keywords=Dental+Practice+Transitions+Handbook&qid=1632933680&s=books&sr=1-2",
      bookImage: "/lovable-uploads/61135e3f-f56e-4aff-949e-5eab772f5c5f.png",
      bookTitle: "Dental Practice Transitions Handbook",
      bookDescription: "A comprehensive guide for healthcare professionals navigating practice transitions"
    },
    {
      name: "Liz Armato",
      role: "COO & Client Services Lead",
      bio: ["Former executive at Pride Institute with over 20 years in dental operations, focused on streamlining client services and ensuring personalized guidance."],
      image: "/lovable-uploads/8af030a0-6d6f-46e6-960a-d2d64258b329.png"
    },
    {
      name: "Fred Heppner",
      role: "Transition Consultant",
      bio: ["Brings decades of experience as a broker and consultant; recognized for his ability to facilitate seamless, well-vetted matches between sellers and buyers."],
      image: "/lovable-uploads/1a104794-17ea-4b67-b3f2-17a24be7dc49.png"
    }
  ];

  return (
    <>
      <SEO 
        title="About PTI"
        description="Learn about our expert team at Practice Transitions Institute, dedicated to helping dental professionals with practice transitions."
      />
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">About Practice Transitions Institute</h1>
            <p className="text-xl text-gray-700 animate-fade-in animate-delay-100">
              Dedicated to helping dental professionals navigate practice transitions with care, integrity, and personalized guidance
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4">
              Practice Transitions Institute was founded by experienced dental professionals after a tenure at Pride Institute. PTI was built to move beyond transactional brokers into trusted, relationship-driven consultants.
            </p>
            <p className="text-gray-600 mb-4">
              Our mission is to help dentists transition their practices with care, integrity, and personalized guidance. We emphasize preserving the legacy of each practice while ensuring win-win outcomes for all parties involved.
            </p>
            <p className="text-gray-600">
              What began as a vision to provide better service has grown into a comprehensive transitions firm with a team of experts dedicated to guiding dental professionals through major career milestones.
            </p>
          </div>
          <div className="animate-fade-in animate-delay-100">
            <img 
              src="/lovable-uploads/26ea1640-396f-4e68-b342-d7cc429029fa.png" 
              alt="PTI team members with dental professionals" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </Section>

      <Section background="light">
        <SectionTitle centered>Our Core Values</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="text-xl font-semibold mb-3 text-primary">Integrity</h3>
            <p className="text-gray-600">
              We prioritize ethical practices and transparency in all our dealings, ensuring our clients always receive honest advice even when it's not what they might want to hear.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <h3 className="text-xl font-semibold mb-3 text-primary">Expertise</h3>
            <p className="text-gray-600">
              Our team maintains the highest level of knowledge in dental practice transitions through continuous education and staying current with industry trends.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <h3 className="text-xl font-semibold mb-3 text-primary">Client Focus</h3>
            <p className="text-gray-600">
              We tailor our approach to each client's unique circumstances and goals, recognizing that no two transitions are identical in their requirements.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Why Choose PTI</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Handshake className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Relationship-Driven Consulting</h3>
                  <p className="text-gray-600">We focus on building trusted relationships, not just transactions, giving us unparalleled insight into your needs.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <Award className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Experienced Team</h3>
                  <p className="text-gray-600">Our team includes former practicing dentists and industry executives who understand the unique challenges you face.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <HeartHandshake className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Personalized Guidance</h3>
                  <p className="text-gray-600">We provide hands-on support throughout your transition journey, with clear, responsive communication at every step.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <UserCheck className="h-6 w-6 text-primary flex-shrink-0 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Trusted Matchmaking</h3>
                  <p className="text-gray-600">We carefully screen and match buyers and sellers to ensure compatible values and practice philosophy.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 animate-fade-in animate-delay-100">
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3" 
              alt="Team in a strategy meeting" 
              className="rounded-lg shadow-md w-full"
            />
          </div>
        </div>
      </Section>

      <Section background="light">
        <SectionTitle centered>Our Expert Team</SectionTitle>
        <SectionSubtitle centered>
          Meet the experienced professionals dedicated to your practice transition success
        </SectionSubtitle>
        
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RecommendationCard
                imageUrl={member.image}
                name={member.name}
                title={member.role}
                bio={member.bio}
                hasNewInfo={member.hasNewInfo}
                videoUrl={member.videoUrl}
                bookUrl={member.bookUrl}
                bookImage={member.bookImage}
                bookTitle={member.bookTitle}
                bookDescription={member.bookDescription}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-gray-700">Successful Transitions</p>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <div className="text-4xl font-bold text-primary mb-2">15</div>
            <p className="text-gray-700">Years of Experience</p>
          </div>
          
          <div className="animate-fade-in animate-delay-200">
            <div className="text-4xl font-bold text-primary mb-2">42</div>
            <p className="text-gray-700">States Served</p>
          </div>
          
          <div className="animate-fade-in animate-delay-300">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <p className="text-gray-700">Client Satisfaction</p>
          </div>
        </div>
      </Section>

      <Section background="light">
        <SectionTitle centered>Client Experiences</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="text-xl font-semibold mb-3 text-primary">Seamless Process</h3>
            <p className="text-gray-600">
              Clients consistently praise PTI for making a stressful process smooth and efficient, citing responsive, hands-on support from our team throughout their transition journey.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-100">
            <h3 className="text-xl font-semibold mb-3 text-primary">Trusted Matchmaking</h3>
            <p className="text-gray-600">
              Dentists value our careful screening and personalized approach, which ensures only qualified and well-matched buyers are presented, preserving the legacy of their practice.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-200">
            <h3 className="text-xl font-semibold mb-3 text-primary">Educational Value</h3>
            <p className="text-gray-600">
              Our seminars and workshops provide practical, actionable guidance, earning high marks from participants who frequently become long-term clients after attending.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in animate-delay-300">
            <h3 className="text-xl font-semibold mb-3 text-primary">Outcome Satisfaction</h3>
            <p className="text-gray-600">
              Numerous testimonials reflect deep gratitude for our role in securing favorable deals and enhancing the quality of life for dentists facing major career transitions.
            </p>
          </div>
        </div>
      </Section>

      <Section background="light" className="mb-8">
        <Cta 
          title="Ready to Start Your Transition Journey?"
          description="Schedule a complimentary consultation with our expert team to explore your options."
          buttonText="Book Your Consultation"
          buttonUrl="/contact"
          background="primary"
        />
      </Section>
    </>
  );
};

export default About;
