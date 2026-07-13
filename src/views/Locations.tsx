import Link from "next/link";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/data/locations";
import { ArrowRight, MapPin } from "lucide-react";

const Locations = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              Dental Practice Transitions Across the Country
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              Practice Transitions Institute is based in the San Francisco Bay Area
              and works with dentists nationwide. Explore the local markets we serve
              — or reach out from anywhere in the United States.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Talk to a Transition Advisor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Cards */}
      <Section>
        <SectionTitle centered>Markets We Serve</SectionTitle>
        <SectionSubtitle centered>
          Local market knowledge, wherever your practice is
        </SectionSubtitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          {LOCATIONS.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="group bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-primary/40 hover:shadow-md transition-all flex flex-col"
            >
              <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-3">{location.state}</h2>
              <p className="text-gray-600 leading-relaxed flex-1">
                {location.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-primary font-semibold">
                Explore {location.state}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <p className="max-w-2xl mx-auto text-center text-gray-600 mt-10">
          Don&apos;t see your state? We serve dentists nationwide.{" "}
          <Link
            href="/contact"
            className="text-primary font-semibold hover:underline"
          >
            Get in touch
          </Link>{" "}
          and we&apos;ll talk through your local market.
        </p>
      </Section>

      {/* CTA Section */}
      <Section background="light" className="mb-8">
        <Cta
          title="Thinking About a Transition?"
          description="Wherever your practice is, start with a confidential conversation about your goals and timeline — no obligation to sell."
          buttonText="Schedule a Free Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Locations;
