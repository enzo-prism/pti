import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/layout/SEO";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";

const LeadershipRetreat = () => (
  <>
    <SEO
      title="Leadership Retreat 2026"
      description="Join PTI at the Leadership Retreat in Savannah, June 4-6, 2026, hosted by MaryLynn Wheaton and Liz Armato with featured speaker Brian Parsley."
      path="/events/leadership-retreat"
    />

    <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-primary/10 to-white">
      <div className="container">
        <div className="max-w-3xl">
          <Button variant="ghost" asChild className="mb-4 px-0 text-primary">
            <Link to="/events">Back to Events</Link>
          </Button>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
            Leadership Retreat
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Lead with clarity and confidence in Savannah.
          </h1>
          <p className="mt-5 text-lg text-gray-700">
            We are excited to be part of the Leadership Retreat in Savannah, June 4-6, 2026, an immersive,
            high-impact experience for practice owners ready to lead with clarity and confidence.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <Calendar className="h-4 w-4 text-primary" />
              <span>June 4-6, 2026</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Savannah, GA</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Section>
      <div className="max-w-3xl">
        <SectionTitle>About the retreat</SectionTitle>
        <SectionSubtitle>
          Now in its third year, this retreat is hosted by former Pride Institute colleagues MaryLynn
          Wheaton and Liz Armato and is designed to challenge, inspire, and recharge practice leaders.
        </SectionSubtitle>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-primary">Hosts</p>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">MaryLynn Wheaton and Liz Armato</h3>
          <p className="mt-3 text-sm text-gray-600">
            Former Pride Institute colleagues bringing a focused, high-trust learning experience for practice owners.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-primary">Featured Speaker</p>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">Brian Parsley</h3>
          <p className="mt-3 text-sm text-gray-600">
            A behavioral scientist known for turning complex human behavior into practical, engaging insights leaders
            can apply immediately.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-primary">PTI Panel</p>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">Saturday morning panel</h3>
          <p className="mt-3 text-sm text-gray-600">
            Practice Transitions Institute will share perspectives on leadership, transition readiness, and long-term
            practice success.
          </p>
        </div>
      </div>
    </Section>

    <Section background="light">
      <div className="max-w-3xl mx-auto text-center">
        <SectionTitle centered>Interested in learning more?</SectionTitle>
        <SectionSubtitle centered>
          Visit the retreat website for full details or contact Liz directly with questions.
        </SectionSubtitle>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <a href="https://www.dentistretreat.com/" target="_blank" rel="noreferrer">
              Visit Retreat Website
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="mailto:info@dentistretreat.com">Email Liz</a>
          </Button>
        </div>
      </div>
    </Section>
  </>
);

export default LeadershipRetreat;
