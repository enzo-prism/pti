import { describe, expect, it } from "vitest";
import {
  practiceTransitionSeminarEvents,
  type PracticeTransitionSeminarEvent,
} from "@/data/practiceTransitionSeminar";
import {
  type SeminarFormValues,
  validateSeminarRegistration,
} from "./PracticeTransitionSeminar";

const validValues: SeminarFormValues = {
  selectedEvent: "october-2-2026-sacramento",
  name: "Jordan Lee",
  email: "jordan@example.com",
  phone: "(916) 555-0123",
  practiceName: "Example Dental",
  cityState: "Sacramento, CA",
  attendeeCount: "1",
  additionalAttendees: "",
  heardAbout: "Website",
  heardAboutOther: "",
  paymentConsent: true,
  smsConsent: false,
  gotcha: "",
};

const availableEvents: PracticeTransitionSeminarEvent[] =
  practiceTransitionSeminarEvents.filter(
    (event) => event.value !== "july-17-2026-san-francisco"
  );

describe("seminar registration validation", () => {
  it("accepts a complete request for an available date", () => {
    expect(
      validateSeminarRegistration(validValues, availableEvents)
    ).toEqual({});
  });

  it("rejects an expired or otherwise unavailable event selection", () => {
    const errors = validateSeminarRegistration(
      { ...validValues, selectedEvent: "july-17-2026-san-francisco" },
      availableEvents
    );

    expect(errors.selectedEvent).toContain("available seminar date");
  });

  it("requires valid contact details, conditional attendee names, and payment acknowledgement", () => {
    const errors = validateSeminarRegistration(
      {
        ...validValues,
        email: "not-an-email",
        phone: "555-12",
        attendeeCount: "2",
        additionalAttendees: "",
        paymentConsent: false,
      },
      availableEvents
    );

    expect(errors).toMatchObject({
      email: expect.any(String),
      phone: expect.any(String),
      additionalAttendees: expect.any(String),
      paymentConsent: expect.any(String),
    });
  });
});
