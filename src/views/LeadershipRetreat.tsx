import { Calendar, CheckCircle2, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";

const LeadershipRetreat = () => (
  <>
    <section className="pt-10 pb-12 md:pt-16 md:pb-20 bg-gradient-to-b from-primary/10 to-white">
      <div className="container">
        <div className="max-w-3xl">
          <Button variant="ghost" asChild className="mb-4 px-0 text-primary">
            <Link href="/events">Back to Events</Link>
          </Button>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
            Past Event Archive
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            2026 Leadership Retreat in Savannah
          </h1>
          <p className="mt-5 text-lg text-gray-700">
            PTI participated in the Leadership Retreat in Savannah, June 4-6,
            2026, an immersive experience for practice owners focused on
            leading with clarity and confidence.
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
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 font-medium text-gray-700 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Event completed</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Section>
      <div className="max-w-3xl">
        <SectionTitle>About the retreat</SectionTitle>
        <SectionSubtitle>
          The retreat was hosted by former Pride Institute colleagues MaryLynn
          Wheaton and Liz Armato and was designed to challenge, inspire, and
          recharge practice leaders.
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
            Practice Transitions Institute shared perspectives on leadership,
            transition readiness, and long-term practice success.
          </p>
        </div>
      </div>
    </Section>

    <Section background="light">
      <div className="max-w-3xl mx-auto text-center">
        <SectionTitle centered>Find an upcoming PTI event</SectionTitle>
        <SectionSubtitle centered>
          Registration for this retreat has closed. Browse PTI&apos;s current
          seminars and workshops or visit the organizer&apos;s archive.
        </SectionSubtitle>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/events">View Upcoming Events</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://www.dentistretreat.com/" target="_blank" rel="noreferrer">
              View Organizer Website
            </a>
          </Button>
        </div>
      </div>
    </Section>
  </>
);

export default LeadershipRetreat;
