import { rawEvents, type RawEvent } from "@/data/events";
import { practiceTransitionSeminarEvents } from "@/data/practiceTransitionSeminar";
import { isEventPast, parseEventDate } from "@/lib/dateUtils";

/**
 * Past events PTI marks as sold out. Dr. Njo asked for "sold out" banners on
 * past in-person events in the November 2, 2026 sync. The online webinar and
 * the partner-hosted Leadership Retreat are listed without a banner.
 */
export const SOLD_OUT_EVENT_IDS: ReadonlySet<RawEvent["id"]> = new Set<
  RawEvent["id"]
>([
  1,
  2,
  4,
  "pti-seminar-san-francisco-2026",
  "practice-blueprint-dinner-roseville-2026",
  "beyond-the-chair-anaheim-2026",
  "pti-seminar-sacramento-2026",
]);

/**
 * City shown in the past-events archive. Cities only, no venue or firm names
 * (Dr. Njo, November 2, 2026). Seminar dates take `city` from
 * `practiceTransitionSeminar.ts`; every other event needs an entry here.
 */
const EVENT_ARCHIVE_CITY: Readonly<Record<string, string>> = {
  "1": "Costa Mesa",
  "2": "San Francisco",
  "3": "Online",
  "4": "Orange County",
  "7": "Savannah, Georgia",
  "practice-blueprint-dinner-roseville-2026": "Roseville",
  "beyond-the-chair-anaheim-2026": "Anaheim",
  "panel-of-experts-sacramento-2027": "Sacramento",
  "gargle-growth-summit-2027": "Cancun, Mexico",
};

export const getEventArchiveCity = (event: RawEvent): string | undefined =>
  practiceTransitionSeminarEvents.find((seminar) => seminar.id === event.id)
    ?.city ?? EVENT_ARCHIVE_CITY[String(event.id)];

export interface ArchivedEvent {
  id: RawEvent["id"];
  title: string;
  type: RawEvent["type"];
  dateLabel: string;
  city: string;
  soldOut: boolean;
}

export interface EventArchiveYear {
  year: number;
  events: ArchivedEvent[];
}

/**
 * Past events grouped by year, newest year and newest date first. Decided in
 * Pacific time on the server, like the rest of `/events`.
 */
export const buildEventArchive = (
  referenceDate: Date = new Date()
): EventArchiveYear[] => {
  const past = rawEvents
    .filter((event) => isEventPast(event.date, referenceDate))
    .sort(
      (a, b) =>
        parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime()
    );

  const years = new Map<number, ArchivedEvent[]>();
  for (const event of past) {
    const city = getEventArchiveCity(event);
    if (!city) {
      throw new Error(`Add an archive city for past event ${event.id}`);
    }
    const year = parseEventDate(event.date).getFullYear();
    const archived: ArchivedEvent = {
      id: event.id,
      title: event.title,
      type: event.type,
      dateLabel: event.dateDisplay ?? event.date,
      city,
      soldOut: SOLD_OUT_EVENT_IDS.has(event.id),
    };
    const bucket = years.get(year);
    if (bucket) {
      bucket.push(archived);
    } else {
      years.set(year, [archived]);
    }
  }

  return [...years.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, events]) => ({ year, events }));
};
