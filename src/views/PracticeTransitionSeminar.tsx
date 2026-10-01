import Link from "next/link";
import {
  SeminarCancellationPolicy,
  SeminarRegistration,
} from "@/components/events/SeminarRegistration";
import { SeminarEventPreview } from "@/components/events/SeminarEventPreview";
import {
  PENDING_LIZ_TERMS,
  PRACTICE_TRANSITION_SEMINAR_BIOS,
  PRACTICE_TRANSITION_SEMINAR_EYEBROW,
  PRACTICE_TRANSITION_SEMINAR_FACTS,
  PRACTICE_TRANSITION_SEMINAR_HEADLINE,
  PRACTICE_TRANSITION_SEMINAR_INTRO,
  PRACTICE_TRANSITION_SEMINAR_SUBHEAD,
  getSeminarSeriesCardEvents,
  isPendingLizEarlyBirdOpen,
  type PracticeTransitionSeminarEvent,
} from "@/data/practiceTransitionSeminar";
import { formatCurrency } from "@/lib/seminarRegistration";

interface PracticeTransitionSeminarProps {
  events: PracticeTransitionSeminarEvent[];
  referenceDateIso: string;
}

const PracticeTransitionSeminar = ({
  events,
  referenceDateIso,
}: PracticeTransitionSeminarProps) => {
  const seriesEvents = getSeminarSeriesCardEvents(events);
  const referenceDate = new Date(referenceDateIso);
  const earlyBirdOpen = isPendingLizEarlyBirdOpen(referenceDate);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:items-start">
          <div className="order-1 space-y-6 lg:col-span-3 lg:row-start-1">
            <header>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                {PRACTICE_TRANSITION_SEMINAR_EYEBROW}
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                {PRACTICE_TRANSITION_SEMINAR_HEADLINE}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {PRACTICE_TRANSITION_SEMINAR_INTRO}
              </p>
              <h2 className="mt-8 text-2xl font-bold text-foreground">
                {PRACTICE_TRANSITION_SEMINAR_SUBHEAD}
              </h2>
            </header>
            <SeminarEventPreview events={seriesEvents} />
          </div>

          <div
            id="register"
            className="order-2 scroll-mt-24 lg:col-span-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-[calc(var(--pti-header-height)+1rem)]"
          >
            <SeminarRegistration
              events={events}
              referenceDateIso={referenceDateIso}
            />
          </div>

          <div className="order-3 space-y-8 lg:col-span-3 lg:row-start-2">
            <ul className="grid gap-3 sm:grid-cols-3">
              {PRACTICE_TRANSITION_SEMINAR_FACTS.map((fact) => (
                <li
                  key={fact}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-center text-base font-medium text-foreground"
                >
                  {fact}
                </li>
              ))}
            </ul>

            {PENDING_LIZ_TERMS.enabled && (
              <section className="rounded-xl border border-primary/20 bg-primary/5 p-5 md:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Early registration special
                </p>
                <p className="mt-3 text-base leading-relaxed text-foreground">
                  Register by {PENDING_LIZ_TERMS.earlyBirdDeadline} and save $
                  {PENDING_LIZ_TERMS.earlyBirdSavings}.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  {earlyBirdOpen ? (
                    <>
                      <span className="text-3xl font-bold text-primary">
                        {formatCurrency(PENDING_LIZ_TERMS.earlyBirdPrice)}
                      </span>{" "}
                      <span className="text-base text-muted-foreground line-through">
                        {formatCurrency(PENDING_LIZ_TERMS.standardPrice)}
                      </span>{" "}
                      <span className="text-base text-foreground">
                        first participant
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-primary">
                        {formatCurrency(PENDING_LIZ_TERMS.standardPrice)}
                      </span>{" "}
                      <span className="text-base text-foreground">
                        first participant
                      </span>
                    </>
                  )}
                </p>
                <p className="mt-3 text-base leading-relaxed text-foreground">
                  Additional attendees are{" "}
                  {formatCurrency(PENDING_LIZ_TERMS.guestPrice)} each. Bring a
                  partner, associate, or future successor.
                </p>
              </section>
            )}

            <section className="grid gap-5 sm:grid-cols-2">
              {PRACTICE_TRANSITION_SEMINAR_BIOS.map((person) => (
                <div key={person.name}>
                  <h3 className="text-lg font-bold text-foreground">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-base font-medium text-primary">
                    {person.title}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {person.bio}
                  </p>
                </div>
              ))}
            </section>

            <SeminarCancellationPolicy className="lg:hidden" />
          </div>
        </div>

        <p className="mt-10">
          <Link
            href="/events"
            className="inline-flex min-h-11 items-center text-base font-medium text-primary underline underline-offset-4"
          >
            ← Return to Events Page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PracticeTransitionSeminar;
