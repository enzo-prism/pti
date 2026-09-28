import { describe, expect, it } from "vitest";
import {
  formatEventDateTime,
  formatLocalDate,
  isEventPast,
  isEventUpcoming,
  parseEventDate,
  parseEventTimeRange,
  parseLocalDate,
  sortEventDates,
} from "./dateUtils";

describe("event date utilities", () => {
  const august17 = new Date("2026-08-17T23:59:00-07:00");

  it("runs the suite in UTC like Vercel and CI", () => {
    expect(new Date(0).getTimezoneOffset()).toBe(0);
  });

  it("formats ISO calendar dates for display without timezone shift", () => {
    expect(formatLocalDate("2026-08-28")).toBe("August 28, 2026");
    expect(
      formatLocalDate("2026-08-28", { month: "long", day: "numeric", year: "numeric" })
    ).toBe("August 28, 2026");
  });

  it("treats an event as current for its entire Pacific calendar day", () => {
    expect(isEventPast("August 17, 2026", august17)).toBe(false);
    expect(isEventUpcoming("August 17, 2026", august17)).toBe(true);
  });

  it("archives an event beginning on the following Pacific calendar day", () => {
    expect(isEventPast("August 16, 2026", august17)).toBe(true);
    expect(isEventUpcoming("August 18, 2026", august17)).toBe(true);
  });

  it("keeps an event current on Pacific evenings after the UTC date has rolled over", () => {
    // 8 PM PDT on October 2 is already October 3 in UTC.
    const eventEvening = new Date("2026-10-02T20:00:00-07:00");
    expect(eventEvening.toISOString().startsWith("2026-10-03")).toBe(true);
    expect(isEventPast("October 2, 2026", eventEvening)).toBe(false);
  });

  it("archives an event just after Pacific midnight", () => {
    expect(
      isEventPast("October 2, 2026", new Date("2026-10-03T00:01:00-07:00"))
    ).toBe(true);
  });

  it("rejects malformed and impossible display dates instead of using today", () => {
    expect(() => parseEventDate("2026-08-17")).toThrow(RangeError);
    expect(() => parseEventDate("February 30, 2026")).toThrow(RangeError);
    expect(() => parseLocalDate("2026-02-30")).toThrow(RangeError);
  });

  it("sorts event dates without mutating the source array", () => {
    const source = [
      { date: "March 12, 2027", city: "Anaheim" },
      { date: "October 2, 2026", city: "Sacramento" },
    ];

    const sorted = sortEventDates(source);

    expect(sorted.map((event) => event.city)).toEqual(["Sacramento", "Anaheim"]);
    expect(source[0].city).toBe("Anaheim");
  });
});

describe("event time parsing", () => {
  it("parses a start and end time from a dashed range", () => {
    expect(parseEventTimeRange("8:00 AM - 3:00 PM")).toEqual({
      start: { hours: 8, minutes: 0 },
      end: { hours: 15, minutes: 0 },
    });
    expect(parseEventTimeRange("8am - 3pm")).toEqual({
      start: { hours: 8, minutes: 0 },
      end: { hours: 15, minutes: 0 },
    });
  });

  it("does not treat a second time zone as an end time", () => {
    expect(parseEventTimeRange("5:30 PM PT • 8:30 PM ET")).toEqual({
      start: { hours: 17, minutes: 30 },
      end: undefined,
    });
  });

  it("returns no clock times for labels without one", () => {
    expect(parseEventTimeRange("Multi-day")).toEqual({
      start: undefined,
      end: undefined,
    });
    expect(parseEventTimeRange(undefined)).toEqual({});
  });
});

describe("schema.org event date-times", () => {
  it("keeps the Pacific wall time and daylight offset", () => {
    expect(formatEventDateTime("October 2, 2026", { hours: 8, minutes: 0 })).toBe(
      "2026-10-02T08:00:00-07:00"
    );
  });

  it("uses the standard-time offset in winter", () => {
    expect(formatEventDateTime("March 12, 2027", { hours: 8, minutes: 0 })).toBe(
      "2027-03-12T08:00:00-08:00"
    );
  });

  it("resolves the offset on either side of a DST change", () => {
    // Pacific clocks spring forward at 2 AM on March 14, 2027.
    expect(formatEventDateTime("March 14, 2027", { hours: 1, minutes: 0 })).toBe(
      "2027-03-14T01:00:00-08:00"
    );
    expect(formatEventDateTime("March 14, 2027", { hours: 8, minutes: 0 })).toBe(
      "2027-03-14T08:00:00-07:00"
    );
  });

  it("supports venues in other time zones", () => {
    expect(
      formatEventDateTime("June 4, 2026", { hours: 9, minutes: 30 }, "America/New_York")
    ).toBe("2026-06-04T09:30:00-04:00");
  });

  it("emits a date-only value when no clock time is known", () => {
    expect(formatEventDateTime("June 4, 2026")).toBe("2026-06-04");
  });
});
