import { describe, expect, it } from "vitest";
import { rawEvents } from "@/data/events";
import {
  PRACTICE_TRANSITION_SEMINAR_PATH,
  PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH,
} from "@/data/practiceTransitionSeminar";

describe("events dataset", () => {
  it("routes upcoming practice transition seminars to the native registration page", () => {
    const upcomingSeminars = rawEvents.filter(
      (event) =>
        event.title === "Mastering Your Dental Transition Into and Out of Practice" &&
        (event.date === "July 17, 2026" || event.date === "October 2, 2026")
    );

    expect(upcomingSeminars).toHaveLength(2);

    for (const event of upcomingSeminars) {
      expect(event.registrationLink).toBe(PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH);
      expect(event.detailPath).toBe(PRACTICE_TRANSITION_SEMINAR_PATH);
      expect(event.offerPrice).toBe(297);
      expect(event.offerPriceCurrency).toBe("USD");
    }
  });

  it("uses confirmed venues for the 2026 San Francisco and Sacramento seminars", () => {
    const sanFrancisco = rawEvents.find((event) => event.date === "July 17, 2026");
    const sacramento = rawEvents.find((event) => event.date === "October 2, 2026");

    expect(sanFrancisco?.location).toContain("Kohan Group");
    expect(sanFrancisco?.location).toContain("490 Post St.");
    expect(sacramento?.location).toContain("TDIC Headquarters");
    expect(sacramento?.location).toContain("1201 K St");
  });
});
