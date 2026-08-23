import Link from "next/link";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Calculator,
  ClipboardCheck,
  Newspaper,
  BookOpen,
} from "lucide-react";
import { DENTAL_TRANSITIONS_HANDBOOK_URL } from "@/lib/constants";

const resources = [
  {
    icon: <BookOpen className="h-6 w-6 text-amber-700" />,
    title: "Dental Practice Transitions Handbook",
    description:
      "Dr. Michael Njo's practical guide to buying, selling, and transitioning a dental practice in a changing market.",
    href: DENTAL_TRANSITIONS_HANDBOOK_URL,
    cta: "View the handbook",
  },
  {
    icon: <Calculator className="h-6 w-6 text-blue-600" />,
    title: "How Much Is My Dental Practice Worth?",
    description:
      "A plain-English guide to what drives dental practice value — plus a free calculator that gives you an instant estimated range.",
    href: "/resources/how-much-is-my-dental-practice-worth",
    cta: "Estimate your value",
  },
  {
    icon: <ClipboardCheck className="h-6 w-6 text-emerald-600" />,
    title: "Practice Sale Readiness Checklist",
    description:
      "The records, operations, and timing questions to work through before you take your practice to market. Free, printable download.",
    href: "/resources/practice-sale-readiness-checklist",
    cta: "Get the checklist",
  },
  {
    icon: <Building2 className="h-6 w-6 text-purple-600" />,
    title: "Selling to a DSO vs. a Private Buyer",
    description:
      "How to read a DSO offer, what's really behind the headline number, and how to decide which path fits your goals.",
    href: "/services/selling-to-a-dso",
    cta: "Compare your options",
  },
  {
    icon: <Newspaper className="h-6 w-6 text-orange-600" />,
    title: "Transition Insights & Articles",
    description:
      "In-depth articles on valuations, financing, due diligence, letters of intent, partnerships, and every stage of a dental transition.",
    href: "/blog",
    cta: "Read the blog",
  },
];

const Resources = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              Dental Practice Transition Resources
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              Free tools, guides, and checklists to help you plan a valuation, a
              sale, a buy-in, or a DSO decision with clarity and confidence.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Talk to a Transition Advisor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Cards */}
      <Section>
        <SectionTitle centered>Tools &amp; Guides</SectionTitle>
        <SectionSubtitle centered>
          Everything below is free to use — start wherever you are in your journey
        </SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              target={resource.href.startsWith("http") ? "_blank" : undefined}
              rel={resource.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-primary/40 hover:shadow-md transition-all flex flex-col"
            >
              <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {resource.icon}
              </div>
              <h2 className="text-xl font-semibold mb-3">{resource.title}</h2>
              <p className="text-gray-600 leading-relaxed flex-1">
                {resource.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-primary font-semibold">
                {resource.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="light" className="mb-8">
        <Cta
          title="Not Sure Where to Start?"
          description="Tell us about your practice and your timeline. A confidential conversation is the fastest way to a clear plan — with no obligation."
          buttonText="Schedule a Free Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Resources;
