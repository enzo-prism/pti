import { describe, expect, it } from "vitest";
import {
  SOLD_OUT_EVENT_IDS,
  buildEventArchive,
  getEventArchiveCity,
} from "@/data/eventArchive";
import { rawEvents } from "@/data/events";

const nov2 = new Date("2026-11-02T12:00:00-08:00");

describe("past events archive", () => {
  it("groups past events by year, newest first", () => {
    const archive = buildEventArchive(nov2);
    expect(archive.map((year) => year.year)).toEqual([2026, 2025]);
    expect(archive[1].events.map((event) => event.dateLabel)).toEqual([
      "August 27, 2025",
      "July 11, 2025",
      "March 28, 2025",
    ]);
    expect(archive[0].events[0].dateLabel).toBe("October 2, 2026");
  });

  it("leaves upcoming events out", () => {
    const ids = buildEventArchive(nov2).flatMap((year) =>
      year.events.map((event) => event.id)
    );
    expect(ids).not.toContain("pti-seminar-anaheim-2027");
    expect(ids).not.toContain("panel-of-experts-sacramento-2027");
  });

  it("marks only the chosen past events sold out", () => {
    const events = buildEventArchive(nov2).flatMap((year) => year.events);
    const soldOut = events.filter((event) => event.soldOut).map((event) => event.id);
    expect(new Set(soldOut)).toEqual(new Set(SOLD_OUT_EVENT_IDS));
    expect(events.find((event) => event.id === 3)?.soldOut).toBe(false);
    expect(events.find((event) => event.id === 7)?.soldOut).toBe(false);
  });

  it("shows cities only, never a venue or firm name", () => {
    for (const event of rawEvents) {
      const city = getEventArchiveCity(event);
      expect(city, `city for ${event.id}`).toBeTruthy();
      expect(city).not.toMatch(/TDIC|Kohan|Phillips|Dugoni|Crown|QUO|Fat|Group|Headquarters/i);
    }
    const sacramento = buildEventArchive(nov2)[0].events.find(
      (event) => event.id === "pti-seminar-sacramento-2026"
    );
    expect(sacramento?.city).toBe("Sacramento");
  });

  it("moves an event into the archive the day after it, in Pacific time", () => {
    const eventEvening = new Date("2026-10-02T20:00:00-07:00");
    const ids = (date: Date) =>
      buildEventArchive(date).flatMap((year) => year.events.map((event) => event.id));
    expect(ids(eventEvening)).not.toContain("pti-seminar-sacramento-2026");
    expect(ids(new Date("2026-10-03T08:00:00-07:00"))).toContain(
      "pti-seminar-sacramento-2026"
    );
  });
});
