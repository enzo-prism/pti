import Link from "next/link";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Cta } from "@/components/ui/cta";
import { Button } from "@/components/ui/button";
import { getFeaturedReviews } from "@/data/reviews";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import {
  Building2,
  Landmark,
  MapPin,
  Receipt,
  ScrollText,
  Users,
} from "lucide-react";

const californiaConsiderations = [
  {
    icon: <ScrollText className="h-6 w-6 text-blue-600" />,
    title: "Dentist-owned practice rules",
    description:
      "California restricts practice ownership to licensed dentists, so DSOs operate through management-services arrangements. That shapes how offers are structured here — and why an independent read of the deal matters.",
  },
  {
    icon: <Receipt className="h-6 w-6 text-emerald-600" />,
    title: "High overhead markets",
    description:
      "Bay Area and coastal rents, wages, and buildout costs run well above the national average. Overhead directly affects profitability — and therefore value — so a credible valuation has to account for your specific market.",
  },
  {
    icon: <Landmark className="h-6 w-6 text-purple-600" />,
    title: "Dental Board of California compliance",
    description:
      "Licensing, corporate structure, and the change-of-ownership steps a transfer requires all have California-specific wrinkles that need to be handled correctly alongside your attorney and CPA.",
  },
  {
    icon: <Users className="h-6 w-6 text-orange-600" />,
    title: "Competitive buyer pool",
    description:
      "California's metros draw strong interest from associates, private buyers, and DSO groups alike. More demand can mean a better price — if your practice is positioned and marketed to the right buyers.",
  },
];

const regionsServed = [
  "San Francisco Bay Area & Peninsula",
  "San Jose & Silicon Valley",
  "Sacramento & the Central Valley",
  "Los Angeles & Orange County",
  "San Diego",
  "Inland Empire & beyond",
];

const California = () => {
  const testimonials = getFeaturedReviews("selling").slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="inline-flex items-center gap-1.5 text-primary font-semibold mb-3">
              <MapPin className="h-4 w-4" /> California
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              Selling or Transitioning a Dental Practice in California
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              Based in the Bay Area and serving dentists across California, Practice
              Transitions Institute guides you through valuations, sales, buy-ins,
              and DSO decisions — with the local market knowledge these deals
              require.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Schedule a Confidential Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            California is one of the most active — and most nuanced — dental
            transition markets in the country. Practice values, buyer demand, and
            deal structures here look different than they do elsewhere, and small
            mistakes can cost real money. Whether you are planning a sale years out,
            weighing an unsolicited DSO offer, or bringing on an associate who wants
            to buy in, the right guidance makes the difference between a good outcome
            and a great one.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Our office is in San Mateo, and our roots run deep in California
            dentistry — including years teaching the next generation of dentists at
            the University of the Pacific and UCSF. We know this market because we
            are part of it.
          </p>
        </div>
      </Section>

      {/* California considerations */}
      <Section background="light">
        <SectionTitle centered>
          What Makes a California Transition Different
        </SectionTitle>
        <SectionSubtitle centered>
          The local factors that shape value, timing, and deal structure
        </SectionSubtitle>

        <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-5xl mx-auto">
          {californiaConsiderations.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-4"
            >
              <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="max-w-3xl mx-auto text-center text-sm text-gray-500 mt-6">
          This overview is general information, not legal or tax advice. We work
          alongside your attorney and CPA on the specifics of your transaction.
        </p>
      </Section>

      {/* How we help */}
      <Section>
        <SectionTitle centered>How We Help California Dentists</SectionTitle>

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
                grounded in your practice&apos;s real cash flow and your local market —
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
              <h3 className="text-xl font-semibold mb-2">Structure a buy-in</h3>
              <p className="text-gray-600 leading-relaxed">
                Bringing an associate toward ownership? We structure{" "}
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
                that work for everyone.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Plan around your goals</h3>
              <p className="text-gray-600 leading-relaxed">
                Retirement timeline, tax planning, team continuity, and legacy — we
                help you sequence the decisions so the transition happens on your
                terms.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Regions served */}
      <Section background="light">
        <SectionTitle centered>California Communities We Serve</SectionTitle>
        <div className="max-w-3xl mx-auto mt-8 grid sm:grid-cols-2 gap-3">
          {regionsServed.map((region) => (
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
          title="Thinking About a Transition in California?"
          description="Start with a confidential conversation about your practice and your timeline — no obligation to sell."
          buttonText="Book Your Free Consultation"
          buttonUrl="/contact"
        />
      </Section>

      {/* Testimonials */}
      <Section background="light">
        <SectionTitle centered>What California Dentists Say</SectionTitle>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {testimonials.map((review) => (
            <TestimonialCard
              key={review.id}
              quote={review.quote}
              author={review.displayAuthorName}
              role={review.role}
              company={review.company}
              reviewHref={`/testimonials/${review.slug}`}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/testimonials">View All Testimonials</Link>
          </Button>
        </div>
      </Section>
    </>
  );
};

export default California;
