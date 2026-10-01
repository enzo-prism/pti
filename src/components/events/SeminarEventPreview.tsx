import type { PracticeTransitionSeminarEvent } from "@/data/practiceTransitionSeminar";

interface SeminarEventPreviewProps {
  events: PracticeTransitionSeminarEvent[];
}

/** 2027 series date cards. City and date stay the largest type on each card. */
export const SeminarEventPreview = ({ events }: SeminarEventPreviewProps) => {
  if (events.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-card p-5 text-base text-muted-foreground">
        New seminar dates will be announced here.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <article
          key={event.id}
          className="rounded-xl border border-border bg-card p-4 shadow-sm"
        >
          <p className="text-xl font-bold uppercase tracking-wide text-primary">
            {event.city}
          </p>
          <p className="mt-1 text-xl font-bold text-foreground">{event.date}</p>
          <p className="mt-3 text-sm font-medium text-foreground">
            {event.venueName}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {event.addressLines.join(", ")}
          </p>
        </article>
      ))}
    </div>
  );
};
