
import { Link } from "react-router-dom";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { ArrowRight, Handshake, Award, HeartHandshake, UserCheck, Users, Shield, Target, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/layout/SEO";
import { VideoDialog } from "@/components/ui/video-dialog";
import { RecommendationCard } from "@/components/ui/recommendation-card";

const About = () => {
  const leaders = [
    {
      name: "Dr. Michael Njo",
      role: "Founder & Transition Consultant",
      bio: [
        "With over 30 years in dentistry, I've had the honor of guiding countless dentists through one of the most important decisions of their careers — transitioning their practice. I wrote the Dental Practice Transitions Handbook to help demystify the process, and I've taught at both UCSF and the University of the Pacific, where I continue to support future dentists as part of the admissions team and as an advisor to the Dugoni Business Club.",
        "I also serve on the Board of Directors for the Dugoni Alumni Association and the California Dental Association Leadership Council, where I'm proud to contribute to the future of dental education and policy. My work today is rooted in the same values that guided my clinical career: integrity, clarity, and doing what's best for both doctors and patients."
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
      role: "COO",
      bio: ["With over 25 years in the dental industry, I've had the privilege of working in client service, engagement, marketing, and strategic partnerships — including many impactful years at Pride Institute, one of the most respected dental consulting firms in the U.S.", "While at Pride, I had the pleasure of working alongside Michael and Fred as part of the transitions team — and I'm thrilled to be reunited with them now at PTI, where we bring that same collaborative spirit to every client we serve.", "My passion lies in making sure dentists feel informed, supported, and confident through every step of their transition. Helping guide that journey is what I love most."],
      image: "/lovable-uploads/3f9aad4c-9a99-4c2e-8cc6-1666dffe409e.png"
    },
    {
      name: "Fred Heppner",
      role: "",
      bio: ["I'm honored to be a seasoned transition expert with a successful track record guiding hundreds of dental practices through seamless transitions. Representing dentists in selling, purchasing, or securing partnerships, I ensure goals are met with precision and success.", "Sharing my expertise nationally, I lecture for organizations like PTI, ACP and the Western Regional Dental Experience. Previously, as the transitions specialist at Pride Institute, I honed my skills for navigating the unique challenges of practice transitions.", "Passionate about facilitating successful transitions, I bring a wealth of knowledge and insight gained from years of practical experience. It's a privilege to contribute to the long-term legacy of practices, and I look forward to leveraging my expertise to support you in achieving your transition goals."],
      image: "/lovable-uploads/1a104794-17ea-4b67-b3f2-17a24be7dc49.png"
    }
  ];

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
              At Practice Transitions Institute, we take pride in our collective wealth of experience, ensuring a deep understanding of the dynamics involved in dental transitions. With a commitment to personalized solutions, we look forward to collaborating with you on a journey to a seamlessly successful transition.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section - Mobile Optimized */}
      <Section className="py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fade-in order-2 lg:order-1">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center lg:text-left">
              Our Story: A Partnership Rooted in Your Success
            </h2>
            <div className="space-y-4 text-sm md:text-base">
              <p className="text-gray-600 leading-relaxed">
                Practice Transitions Institute (PTI) was founded on a simple, yet profound principle: to transform the dental practice transition experience. <strong>Dr. Michael Njo</strong> envisioned a new standard—one that moved beyond mere transactions to forge <strong>trusted, relationship-driven partnerships</strong>.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, that vision thrives. Under <strong>Dr. Njo's leadership</strong>, the strategic insights of <strong>Fred Heppner in transitions and practice management</strong>, and <strong>Liz Armato's operational expertise</strong>, PTI offers truly personalized guidance. Our mission is clear: to help dentists navigate significant career milestones with <strong>unwavering care and integrity</strong>, ensuring the legacy of each practice is preserved, and every outcome is a win-win.
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
          <SectionSubtitle centered className="text-base md:text-lg px-4">
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
        <div className="text-center mb-8">
          <SectionTitle className="text-2xl md:text-4xl mb-3 md:mb-6">Why Dentists Choose PTI</SectionTitle>
          <SectionSubtitle centered className="text-base md:text-lg px-4">
            A transition partner you can trust — from your first question to your final signature.
          </SectionSubtitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: Users,
              title: "We've Been in Your Shoes",
              description: "We've walked the path — from clinical care to leadership to transitions. We understand what's at stake."
            },
            {
              icon: Shield,
              title: "More Than a Broker",
              description: "We guide, educate, and advocate — not just sell. You get a trusted advisor, not just a dealmaker."
            },
            {
              icon: Target,
              title: "Custom-Fit Strategy",
              description: "No cookie-cutter plans here. We tailor every step to your practice, your timeline, and your vision."
            },
            {
              icon: Star,
              title: "Trusted Leadership",
              description: "Our expertise and values shape everything we do — from policy to personal care."
            },
            {
              icon: Heart,
              title: "Real Support, Real People",
              description: "We listen. We care. We support you through the personal, emotional, and financial aspects of your transition."
            }
          ].map((item, index) => (
            <div 
              key={item.title}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in hover:shadow-md transition-shadow text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <item.icon className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">{item.title}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats Section - Mobile Grid */}
      <Section background="light" className="py-8 md:py-16">
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
      <Section className="py-8 md:py-16">
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
          title="Ready to Explore Your Options?"
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
