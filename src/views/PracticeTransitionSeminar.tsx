import Link from "next/link";
import { CheckCircle2, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Section,
  SectionSubtitle,
  SectionTitle,
} from "@/components/ui/section";
import {
  SeminarPhoneButton,
  SeminarRegisterButton,
} from "@/components/events/SeminarCtaButtons";
import { SeminarRegistration } from "@/components/events/SeminarRegistration";
import { SeminarEventPreview } from "@/components/events/SeminarEventPreview";
import {
  PRACTICE_TRANSITION_SEMINAR_EYEBROW,
  PRACTICE_TRANSITION_SEMINAR_HEADLINE,
  practiceTransitionSeminarFaqs,
  practiceTransitionSeminarLearningPoints,
  practiceTransitionSeminarValuePoints,
  type PracticeTransitionSeminarEvent,
} from "@/data/practiceTransitionSeminar";
import type { ReviewRecord } from "@/data/reviews";
import { PHONE_NUMBER } from "@/lib/constants";

interface PracticeTransitionSeminarProps {
  testimonial?: ReviewRecord;
  /** Seminar dates open for registration, decided on the server. */
  events: PracticeTransitionSeminarEvent[];
  archivedEvents?: PracticeTransitionSeminarEvent[];
  referenceDateIso: string;
}

const PracticeTransitionSeminar = ({
  testimonial,
  events,
  archivedEvents = [],
  referenceDateIso,
}: PracticeTransitionSeminarProps) => (
  <div className="min-h-screen bg-background">
    <section className="relative overflow-hidden bg-primary pt-10 text-primary-foreground md:pt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/85" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(/lovable-uploads/events-hero-office.webp)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="container relative z-10 pb-12 md:pb-16">
        <Button variant="secondary" asChild className="mb-8">
          <Link href="/events">Back to Events</Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.48fr)] lg:gap-x-10">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">
              {PRACTICE_TRANSITION_SEMINAR_EYEBROW}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {PRACTICE_TRANSITION_SEMINAR_HEADLINE}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-blue-50 md:text-xl">
              A one-day seminar for dentists buying, selling, partnering, or
              planning their next move.
            </p>
          </div>
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <SeminarEventPreview events={events} referenceDateIso={referenceDateIso} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-start-1 lg:self-end">
            {events.length > 0 && (
              <SeminarRegisterButton size="lg" variant="secondary">
                Register for the Seminar
              </SeminarRegisterButton>
            )}
            <SeminarPhoneButton
              location="seminar_hero"
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              Call {PHONE_NUMBER}
            </SeminarPhoneButton>
          </div>
        </div>
      </div>
    </section>

    <Section className="py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(320px,0.44fr)] lg:items-start">
        <div>
          <SectionTitle>Make Your Next Move With a Clearer Plan</SectionTitle>
          <SectionSubtitle className="mb-0">
            Whether you are preparing to sell, evaluating a partnership,
            considering an acquisition, or simply trying to understand what
            your practice is worth, the decisions you make now can shape your
            financial future and your legacy.
          </SectionSubtitle>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {practiceTransitionSeminarValuePoints.map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-sm font-medium text-foreground">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>

    <Section id="register" background="light" className="scroll-mt-24">
      <SeminarRegistration
        events={events}
        referenceDateIso={referenceDateIso}
      />
      {events.length > 1 && (
        <div className="mx-auto mt-8 max-w-3xl border-t border-border pt-6">
          <h2 className="text-lg font-semibold">Upcoming seminar dates</h2>
          <p className="mt-2 text-sm text-muted-foreground">Choose a date to view its details and register.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {events.map((event) => (
              <a key={event.id} href={`?event=${event.value}#register`} className="flex min-h-11 items-center rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5">
                {event.label}
              </a>
            ))}
          </div>
        </div>
      )}
      {archivedEvents.length > 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {archivedEvents.length} completed seminar
          {archivedEvents.length === 1 ? " is" : "s are"} archived and no
          longer available for registration. See the complete history on the{" "}
          <Link href="/events" className="font-medium text-primary underline underline-offset-4">
            events page
          </Link>
          .
        </p>
      )}
    </Section>

    <Section>
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
          Trusted by Dental Professionals
        </p>
        <blockquote className="mt-4 text-2xl font-semibold leading-relaxed text-foreground md:text-3xl">
          &quot;His detailed lessons on dental benefit contracts, practice
          acquisition, and decision-making gave me clarity and confidence for
          the years ahead.&quot;
        </blockquote>
        <div className="mt-5 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">
            {testimonial?.displayAuthorName ?? "Ankit Sidana"}
          </p>
          <p>{testimonial?.role ?? "Seminar Attendee"}</p>
        </div>
      </div>
    </Section>

    <Section background="light">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start">
        <div>
          <SectionTitle>What You&apos;ll Learn</SectionTitle>
          <SectionSubtitle>
            At this seminar, you&apos;ll learn how to approach a transition with a
            more practical plan, a better grasp of value, and a clearer sense
            of what needs to happen next.
          </SectionSubtitle>
        </div>
        <div className="grid gap-4">
          {practiceTransitionSeminarLearningPoints.map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-5 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <p className="font-medium text-foreground">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>

    <Section>
      <div className="mx-auto max-w-4xl">
        <SectionTitle centered>Questions Before You Register?</SectionTitle>
        <div className="grid gap-4">
          {practiceTransitionSeminarFaqs.map((item) => (
            <Card key={item.question}>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{item.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>

    <Section background="primary" className="py-12 md:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <Users className="mx-auto mb-4 h-10 w-10 text-blue-100" />
        <SectionTitle centered className="text-white">
          Ready to register?
        </SectionTitle>
        <SectionSubtitle centered className="text-blue-50">
          Choose your date and complete the short form. PTI will contact you
          to finalize payment by phone and confirm your seat.
        </SectionSubtitle>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          {events.length > 0 && (
            <SeminarRegisterButton size="lg" variant="secondary">
              Register Now
            </SeminarRegisterButton>
          )}
          <SeminarPhoneButton
            location="seminar_footer"
            size="lg"
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
          >
            Call {PHONE_NUMBER}
          </SeminarPhoneButton>
        </div>
      </div>
    </Section>
  </div>
);

export default PracticeTransitionSeminar;
