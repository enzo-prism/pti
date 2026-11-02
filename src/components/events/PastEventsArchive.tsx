import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import type { EventArchiveYear } from "@/data/eventArchive";
import { PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH } from "@/data/practiceTransitionSeminar";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";

interface PastEventsArchiveProps {
  years: EventArchiveYear[];
}

/** Past events by year, with a sold out banner on the events PTI marks. */
export const PastEventsArchive = ({ years }: PastEventsArchiveProps) => {
  if (years.length === 0) return null;

  return (
    <Section
      id="past-events"
      className="py-12 md:py-16 scroll-mt-24 border-t border-gray-100"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionTitle>Past Events</SectionTitle>
          <SectionSubtitle>
            A look back at recent PTI seminars, dinners, and workshops.
          </SectionSubtitle>
        </div>
        <Button asChild>
          <Link href={PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH}>
            Reserve the Next Seminar
          </Link>
        </Button>
      </div>

      <div className="space-y-10">
        {years.map(({ year, events }) => (
          <div key={year}>
            <h3 className="mb-4 text-xl md:text-2xl font-semibold text-gray-900">
              {year} Events
            </h3>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 pt-6 shadow-sm"
                >
                  {event.soldOut ? (
                    <span className="absolute right-0 top-0 rounded-bl-lg bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                      Sold Out
                    </span>
                  ) : (
                    <span className="absolute right-0 top-0 rounded-bl-lg bg-gray-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Completed
                    </span>
                  )}
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                    {event.type}
                  </p>
                  <h4 className="mb-3 pr-20 text-base font-semibold leading-snug text-gray-900">
                    {event.title}
                  </h4>
                  <p className="flex items-center text-sm text-gray-600">
                    <Calendar
                      size={16}
                      aria-hidden="true"
                      className="mr-2 flex-shrink-0 text-primary"
                    />
                    {event.dateLabel}
                  </p>
                  <p className="mt-1 flex items-center text-sm text-gray-600">
                    <MapPin
                      size={16}
                      aria-hidden="true"
                      className="mr-2 flex-shrink-0 text-primary"
                    />
                    {event.city}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};
