import Link from "next/link";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Button } from "@/components/ui/button";
import type { LocationContent, LocationIconKey } from "@/data/locations";
import {
  Building2,
  HandCoins,
  Landmark,
  MapPin,
  Receipt,
  ScrollText,
  Sun,
  TrendingUp,
  Users,
} from "lucide-react";

const ICONS: Record<LocationIconKey, typeof MapPin> = {
  rules: ScrollText,
  overhead: Receipt,
  board: Landmark,
  buyers: Users,
  tax: HandCoins,
  growth: TrendingUp,
  retirees: Sun,
  consolidation: Building2,
};

const LocationView = ({ location }: { location: LocationContent }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-10 pb-12 md:pt-16 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="inline-flex items-center gap-1.5 text-primary font-semibold mb-3">
              <MapPin className="h-4 w-4" /> {location.state}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              {location.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              {location.heroIntro}
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Discuss a {location.state} Transition</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <Section>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {location.introParagraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-lg md:text-xl text-gray-700 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section background="light">
        <div className="mx-auto max-w-4xl rounded-2xl border border-blue-100 bg-white p-7 shadow-sm md:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
            A practical first step
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
            {location.firstStep.title}
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            {location.firstStep.description}
          </p>
        </div>
      </Section>

      {/* Local considerations */}
      <Section background="light">
        <SectionTitle centered>
          What Makes a {location.state} Transition Different
        </SectionTitle>
        <SectionSubtitle centered>
          The local factors that shape value, timing, and deal structure
        </SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
          {location.considerations.map((item) => {
            const Icon = ICONS[item.iconKey];
            return (
              <div
                key={item.title}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-4"
              >
                <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="max-w-3xl mx-auto text-center text-sm text-gray-500 mt-6">
          This overview is general information, not legal or tax advice. We work
          alongside your attorney and CPA on the specifics of your transaction.
        </p>
      </Section>

      {/* How we help */}
      <Section>
        <SectionTitle centered>
          How We Help {location.state} Dentists
        </SectionTitle>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-8 max-w-5xl mx-auto">
          <div className="flex items-start gap-4">
            <Building2 className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Know what it&apos;s worth</h3>
              <p className="text-gray-600 leading-relaxed">
                Start with an{" "}
                <Link
                  href="/services/value"
                  className="text-primary font-semibold hover:underline"
                >
                  Opinion of Value
                </Link>{" "}
                grounded in your practice&apos;s real cash flow and your local market,
                or get a quick estimate with our{" "}
                <Link
                  href="/resources/how-much-is-my-dental-practice-worth"
                  className="text-primary font-semibold hover:underline"
                >
                  practice value calculator
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Users className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Sell to the right buyer</h3>
              <p className="text-gray-600 leading-relaxed">
                We guide your{" "}
                <Link
                  href="/services/selling"
                  className="text-primary font-semibold hover:underline"
                >
                  practice sale
                </Link>{" "}
                end to end, and if a{" "}
                <Link
                  href="/services/selling-to-a-dso"
                  className="text-primary font-semibold hover:underline"
                >
                  DSO
                </Link>{" "}
                comes calling, we help you weigh the offer against a private sale.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ScrollText className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Buy or structure a buy-in</h3>
              <p className="text-gray-600 leading-relaxed">
                Evaluating a full acquisition? Start with PTI&apos;s{" "}
                <Link
                  href="/services/buying"
                  className="text-primary font-semibold hover:underline"
                >
                  buyer and acquisition advisory
                </Link>
                . Bringing an associate toward ownership? We help plan{" "}
                <Link
                  href="/services/associateships"
                  className="text-primary font-semibold hover:underline"
                >
                  associateships and buy-ins
                </Link>{" "}
                and{" "}
                <Link
                  href="/services/partnerships"
                  className="text-primary font-semibold hover:underline"
                >
                  partnerships
                </Link>{" "}
                with the business terms coordinated for outside advisors.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Plan around your goals</h3>
              <p className="text-gray-600 leading-relaxed">
                Retirement timeline, tax planning, team continuity, and legacy all
                help you sequence the decisions so the transition happens on your
                terms.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Official {location.state} references
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            Use these agency sources with advice from your attorney and CPA. PTI
            provides transition guidance, not legal or tax advice.
          </p>
          <ul className="mt-4 space-y-2">
            {location.officialReferences.map((reference) => (
              <li key={reference.url}>
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {reference.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Regions served */}
      <Section background="light">
        <SectionTitle centered>
          {location.state} Communities We Serve
        </SectionTitle>
        <div className="max-w-3xl mx-auto mt-8 grid sm:grid-cols-2 gap-3">
          {location.regions.map((region) => (
            <div
              key={region}
              className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-4 py-3"
            >
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-gray-700">{region}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="mb-8">
        <Cta
          title={`Thinking About a Transition in ${location.state}?`}
          description="Start with a confidential conversation about your practice, your market, and the transition decision in front of you."
          buttonText={`Discuss a ${location.state} Transition`}
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default LocationView;
