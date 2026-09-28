import Link from "next/link";
import { CheckCircle2, Clock, MapPin, Phone, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.48fr)] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">
              {PRACTICE_TRANSITION_SEMINAR_EYEBROW}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {PRACTICE_TRANSITION_SEMINAR_HEADLINE}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-blue-50 md:text-xl">
              Your practice transition is not just a transaction. It is the
              culmination of your life&apos;s work. Join Practice Transitions
              Institute for a focused one-day seminar designed to help
              dentists understand their options, protect practice value, and
              approach their next move with confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {events.length > 0 && (
                <SeminarRegisterButton size="lg" variant="secondary">
                  Request a Seminar Seat
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

          <div className="grid gap-3">
            {events.map((event) => (
              <Card
                key={event.id}
                className="border-white/20 bg-white/95 text-foreground shadow-lg"
              >
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                      Registration Open
                    </Badge>
                    <span className="text-sm font-semibold text-primary">
                      {event.city}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{event.date}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {event.venueName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 p-5 pt-0 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{event.addressLines.join(", ")}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
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
          Ready to reserve your seat?
        </SectionTitle>
        <SectionSubtitle centered className="text-blue-50">
          Choose the seminar date that fits your schedule, submit the form,
          and PTI will follow up to confirm the details.
        </SectionSubtitle>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <SeminarRegisterButton size="lg" variant="secondary">
            Register for a Seminar
          </SeminarRegisterButton>
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
