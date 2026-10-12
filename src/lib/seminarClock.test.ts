import { describe, expect, it } from "vitest";
import { nextSeminarRefreshDelay } from "./seminarClock";

describe("registration refresh clock", () => {
  it("refreshes at the Pacific price cutoff rather than UTC midnight", () => {
    expect(nextSeminarRefreshDelay(new Date("2027-01-01T07:59:59.000Z"))).toBe(1025);
    expect(nextSeminarRefreshDelay(new Date("2027-01-01T00:00:00.000Z"))).toBe(8 * 3600000 + 25);
  });
  it("handles the shorter and longer daylight-saving days", () => {
    expect(nextSeminarRefreshDelay(new Date("2027-03-14T00:00:00-08:00"))).toBe(23 * 3600000 + 25);
    expect(nextSeminarRefreshDelay(new Date("2026-11-01T00:00:00-07:00"))).toBe(25 * 3600000 + 25);
  });
});
