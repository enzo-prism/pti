import { describe, expect, it } from "vitest";
import {
  isEventPast,
  isEventUpcoming,
  parseEventDate,
  parseLocalDate,
  sortEventDates,
} from "./dateUtils";

describe("event date utilities", () => {
  const august17 = new Date(2026, 7, 17, 23, 59);

  it("treats an event as current for its entire local calendar day", () => {
    expect(isEventPast("August 17, 2026", august17)).toBe(false);
    expect(isEventUpcoming("August 17, 2026", august17)).toBe(true);
  });

  it("archives an event beginning on the following local calendar day", () => {
    expect(isEventPast("August 16, 2026", august17)).toBe(true);
    expect(isEventUpcoming("August 18, 2026", august17)).toBe(true);
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
