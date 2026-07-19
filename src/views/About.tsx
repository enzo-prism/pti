import Link from "next/link";
import { Users, Shield, Target, Star, Heart } from "lucide-react";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { BookMeetingButton } from "@/components/BookMeetingButton";
import { RecommendationCard } from "@/components/ui/recommendation-card";
import {
  MICHAEL_NJO_WEBSITE_URL,
  DENTIST_RETREAT_URL,
  MICHAEL_NJO_CALENDLY_URL,
} from "@/lib/constants";

export const leaders = [
  {
    name: "Dr. Michael Njo",
    role: "Founder & Transition Consultant",
    bio: [
      "With over 30 years in dentistry, I've had the honor of guiding countless dentists through one of the most important decisions of their careers — transitioning their practice. I wrote the Dental Practice Transitions Handbook to help demystify the process, and I've taught at both UCSF and the University of the Pacific, where I continue to support future dentists as part of the admissions team and as an advisor to the Dugoni Business Club. I also speak with dental students and General Practice Residency (GPR) residents about contracts, ownership, and practice transitions so they can build a stronger foundation early in their careers.",
      "I also serve on the Board of Directors for the Dugoni Alumni Association and the California Dental Association Leadership Council, where I'm proud to contribute to the future of dental education and policy. My work today is rooted in the same values that guided my clinical career: integrity, clarity, and doing what's best for both doctors and patients.",
    ],
    hasNewInfo: true,
    image: "/lovable-uploads/d30c74a1-48bb-404e-9e9d-bc93119a695d.png",
    videoUrl: "https://youtu.be/Jes6h2F3yhc?si=sVQZKyw1uB5Fi5_F",
    websiteUrl: MICHAEL_NJO_WEBSITE_URL,
    bookingUrl: MICHAEL_NJO_CALENDLY_URL,
    bookUrl:
      "https://www.amazon.com/Dental-Practice-Transitions-Handbook-Healthcare/dp/1627878718/ref=sr_1_2?dchild=1&keywords=Dental+Practice+Transitions+Handbook&qid=1632933680&s=books&sr=1-2",
    bookImage: "/lovable-uploads/drnjo-2026/handbook-cover-spread.webp",
    bookTitle: "Dental Practice Transitions Handbook",
    bookDescription:
      "A published framework for buying, selling, and transitioning dental practices with clarity in changing markets.",
  },
  {
    name: "Liz Armato",
    role: "COO",
    bio: [
      "With over 25 years in the dental industry, I've had the privilege of working in client service, engagement, marketing, and strategic partnerships — including many impactful years at Pride Institute, one of the most respected dental consulting firms in the U.S.",
      "While at Pride, I had the pleasure of working alongside Michael and Fred as part of the transitions team — and I'm thrilled to be reunited with them now at PTI, where we bring that same collaborative spirit to every client we serve.",
      "My passion lies in making sure dentists feel informed, supported, and confident through every step of their transition. Helping guide that journey is what I love most.",
    ],
    image: "/lovable-uploads/3f9aad4c-9a99-4c2e-8cc6-1666dffe409e.png",
    websiteUrl: DENTIST_RETREAT_URL,
    websiteLabel: "Visit Dentist Retreat",
  },
];

const About = () => {
  return (
    <>
      <section className="pt-24 pb-12 md:pt-32 md:pb-24 bg-gradient-to-b from-accent to-white px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              About Practice Transitions Institute
            </h1>
            <p className="text-lg md:text-xl text-gray-700 animate-fade-in animate-delay-100 leading-relaxed">
              At Practice Transitions Institute, we take pride in our collective
              wealth of experience, ensuring a deep understanding of the dynamics
              involved in dental transitions. With a commitment to personalized
              solutions, we look forward to collaborating with you on a journey
              to a seamlessly successful transition.
            </p>
          </div>
        </div>
      </section>

      <Section className="py-12 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 animate-fade-in">
              Our Story
            </p>
            <SectionTitle centered className="text-2xl md:text-4xl mb-4">
              A Partnership Rooted in Your Success
            </SectionTitle>
            <SectionSubtitle centered className="text-base md:text-lg mb-0">
              Practice Transitions Institute was founded to transform the dental
              transition experience — moving beyond transactions toward trusted,
              relationship-driven partnerships.
            </SectionSubtitle>
          </div>

          <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-12">
            <div className="animate-fade-in space-y-5 text-sm leading-relaxed text-gray-600 md:text-base">
              <p className="border-l-2 border-primary/30 pl-5 text-base text-gray-700 md:text-lg">
                PTI was founded on a simple yet profound principle: to transform
                the dental practice transition experience.{" "}
                <strong>Dr. Michael Njo</strong> envisioned a new standard — one
                that moved beyond mere transactions to forge{" "}
                <strong>trusted, relationship-driven partnerships</strong>.
              </p>
              <p>
                Today, that vision thrives. Under{" "}
                <strong>Dr. Njo&apos;s leadership</strong>, the strategic insight
                of <strong>Fred Heppner</strong> in transitions and practice
                management, and <strong>Liz Armato&apos;s</strong> operational
                expertise, PTI offers truly personalized guidance — helping
                dentists navigate significant career milestones with{" "}
                <strong>unwavering care and integrity</strong>, so the legacy of
                each practice is preserved and every outcome is a win-win.
              </p>
              <p>
                What began as Dr. Njo&apos;s vision to provide better service has
                grown into a comprehensive transitions firm with a dedicated team
                of experts guiding dental professionals through major career
                milestones.
              </p>
            </div>

            <aside className="animate-fade-in animate-delay-100 lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/90 p-8 text-white shadow-xl md:p-10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[7rem] leading-none text-white/15"
                >
                  &ldquo;
                </span>
                <p className="relative text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                  Our Founding Principle
                </p>
                <p className="relative mt-4 text-xl font-semibold leading-snug md:text-2xl">
                  Move beyond transactions to build trusted, relationship-driven
                  partnerships — protecting the legacy behind every practice.
                </p>
                <p className="relative mt-6 border-t border-white/20 pt-5 text-sm leading-relaxed text-white/80">
                  The standard Dr. Michael Njo set out to create — and the one
                  PTI lives by today.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </Section>

      <Section background="light" className="py-8 md:py-16">
        <div className="text-center mb-8">
          <SectionTitle className="text-2xl md:text-4xl mb-3 md:mb-6">
            Meet Our Leadership Team
          </SectionTitle>
          <SectionSubtitle centered className="text-base md:text-lg px-4">
            The experienced professionals who founded and lead Practice
            Transitions Institute
          </SectionSubtitle>
        </div>

        <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
          {leaders.map((leader, index) => (
            <div
              key={leader.name}
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
                websiteUrl={leader.websiteUrl}
                websiteLabel={leader.websiteLabel}
                bookingUrl={leader.bookingUrl}
                bookUrl={leader.bookUrl}
                bookImage={leader.bookImage}
                bookTitle={leader.bookTitle}
                bookDescription={leader.bookDescription}
                showAmazonReviews={leader.name === "Dr. Michael Njo"}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-8 md:py-16">
        <SectionTitle centered className="text-2xl md:text-4xl mb-6 md:mb-8">
          Our Core Values
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {[
            {
              title: "Integrity",
              description:
                "We prioritize ethical practices and transparency in all our dealings, ensuring our clients always receive honest advice even when it's not what they might want to hear.",
            },
            {
              title: "Expertise",
              description:
                "Our team maintains the highest level of knowledge in dental practice transitions through continuous education and staying current with industry trends.",
            },
            {
              title: "Client Focus",
              description:
                "We tailor our approach to each client's unique circumstances and goals, recognizing that no two transitions are identical in their requirements.",
            },
          ].map((value, index) => (
            <div
              key={value.title}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section background="light" className="py-8 md:py-16">
        <div className="text-center mb-8">
          <SectionTitle className="text-2xl md:text-4xl mb-3 md:mb-6">
            Why Dentists Choose PTI
          </SectionTitle>
          <SectionSubtitle centered className="text-base md:text-lg px-4">
            A transition partner you can trust — from your first question to your
            final signature.
          </SectionSubtitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              icon: Users,
              title: "We've Been in Your Shoes",
              description:
                "We've walked the path — from clinical care to leadership to transitions. We understand what's at stake.",
              iconColor: "text-blue-600",
            },
            {
              icon: Shield,
              title: "More Than a Broker",
              description:
                "We guide, educate, and advocate — not just sell. You get a trusted advisor, not just a dealmaker.",
              iconColor: "text-emerald-600",
            },
            {
              icon: Target,
              title: "Custom-Fit Strategy",
              description:
                "No cookie-cutter plans here. We tailor every step to your practice, your timeline, and your vision.",
              iconColor: "text-orange-600",
            },
            {
              icon: Star,
              title: "Trusted Leadership",
              description:
                "Our expertise and values shape everything we do — from policy to personal care.",
              iconColor: "text-purple-600",
            },
            {
              icon: Heart,
              title: "Real Support, Real People",
              description:
                "We listen. We care. We support you through the personal, emotional, and financial aspects of your transition.",
              iconColor: "text-rose-600",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in hover:shadow-md transition-shadow text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <item.icon
                className={`h-8 w-8 md:h-10 md:w-10 ${item.iconColor} mx-auto mb-4`}
              />
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section background="light" className="py-8 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {[
            {
              number: "500+",
              label: "Successful Transitions",
              numberColor: "text-blue-600",
            },
            {
              number: "92",
              label: "Years of Experience",
              numberColor: "text-emerald-600",
            },
            {
              number: "42",
              label: "States Served",
              numberColor: "text-orange-600",
            },
            {
              number: "98%",
              label: "Client Satisfaction",
              numberColor: "text-purple-600",
            },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="animate-fade-in p-4 rounded-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`text-2xl md:text-4xl font-bold ${stat.numberColor} mb-2`}>
                {stat.number}
              </div>
              <p className="text-gray-700 text-xs md:text-base font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-8 md:py-16">
        <SectionTitle centered className="text-2xl md:text-4xl mb-6 md:mb-8">
          Client Experiences
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {[
            {
              title: "Seamless Process",
              description:
                "Clients consistently praise PTI for making a stressful process smooth and efficient, citing responsive, hands-on support from our team throughout their transition journey.",
            },
            {
              title: "Trusted match making",
              description:
                "Dentists value our careful screening and personalized approach, which ensures only qualified and well-matched buyers are presented, preserving the practice's legacy.",
            },
            {
              title: "Educational Value",
              description:
                "Our seminars and workshops provide practical, actionable guidance, earning high marks from participants who frequently become long-term clients after attending.",
            },
            {
              title: "Outcome Satisfaction",
              description:
                "Numerous testimonials reflect deep gratitude for our role in securing favorable transitions and enhancing the quality of life for dentists facing major career changes.",
            },
          ].map((experience, index) => (
            <div
              key={experience.title}
              className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">
                {experience.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section background="light" className="py-6 md:py-8">
        <div className="mx-4 rounded-lg bg-primary px-4 py-12 text-center text-white sm:px-6 md:mx-0 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Explore Your Options?
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Book a complimentary 30-minute meeting with Dr. Michael Njo — or
              send us a message and our team will be in touch.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookMeetingButton
                location="about_page_cta"
                variant="secondary"
                className="w-full sm:w-auto"
              />
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full border-white bg-transparent text-white hover:bg-white hover:text-primary sm:w-auto"
              >
                <Link href="/contact">Send Us a Message</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default About;
