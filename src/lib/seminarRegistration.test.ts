import { describe, expect, it } from "vitest";
import {
  practiceTransitionSeminarEvents,
  type PracticeTransitionSeminarEvent,
} from "@/data/practiceTransitionSeminar";
import {
  buildSeminarFormPayload,
  type SeminarFormValues,
  validateSeminarRegistration,
} from "./seminarRegistration";

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

describe("seminar registration payload", () => {
  const context = (submittedAt: string) => ({
    submittedAt: new Date(submittedAt),
    environment: "test",
    attribution: { page_path: "/events/practice-transition-seminar" },
  });

  it("records the early-bird price the registrant saw", () => {
    // Sacramento's early-bird deadline is September 2, 2026 (Pacific).
    const payload = buildSeminarFormPayload(
      validValues,
      availableEvents,
      context("2026-09-02T22:00:00-07:00")
    );

    expect(payload).toMatchObject({
      selected_event_id: "pti-seminar-sacramento-2026",
      quoted_price: "$297",
      early_bird_applied: "yes",
      submitted_at: "2026-09-03T05:00:00.000Z",
      environment: "test",
      page_path: "/events/practice-transition-seminar",
    });
    expect(payload.message).toContain(
      "Price shown at registration: $297 (early-bird)"
    );
  });

  it("records the standard price after the Pacific deadline", () => {
    const payload = buildSeminarFormPayload(
      validValues,
      availableEvents,
      context("2026-09-03T00:05:00-07:00")
    );

    expect(payload.quoted_price).toBe("$397");
    expect(payload.early_bird_applied).toBe("no");
  });

  it("passes the honeypot through so Formspree can flag spam", () => {
    const payload = buildSeminarFormPayload(
      { ...validValues, gotcha: "bot text" },
      availableEvents,
      context("2026-09-01T12:00:00-07:00")
    );

    expect(payload._gotcha).toBe("bot text");
  });
});
