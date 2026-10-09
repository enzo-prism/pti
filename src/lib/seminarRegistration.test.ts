import { describe, expect, it } from "vitest";
import {
  getApprovedSeminarOfferPrice,
  getSeminarFormEvents,
  getSeminarSeriesCardEvents,
  PENDING_LIZ_TERMS,
  practiceTransitionSeminarEvents,
  type PracticeTransitionSeminarEvent,
} from "@/data/practiceTransitionSeminar";
import {
  buildDefaultFormValues,
  buildSeminarFormPayload,
  resolveSeminarSelection,
  refreshSeminarRegistration,
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
  bestTimeToCall: "Morning",
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

  it("requires an explicit seminar choice and starts with none selected", () => {
    expect(
      validateSeminarRegistration({ ...validValues, selectedEvent: "" }, availableEvents)
        .selectedEvent
    ).toContain("available seminar date");
    expect(buildDefaultFormValues(availableEvents).selectedEvent).toBe("");
  });

  it("rejects an expired or otherwise unavailable event selection", () => {
    const errors = validateSeminarRegistration(
      { ...validValues, selectedEvent: "july-17-2026-san-francisco" },
      availableEvents
    );

    expect(errors.selectedEvent).toContain("available seminar date");
  });

  it("requires a best time to call", () => {
    const errors = validateSeminarRegistration(
      { ...validValues, bestTimeToCall: "" },
      availableEvents
    );
    expect(errors.bestTimeToCall).toContain("best time");
  });

  it("requires valid contact details and payment acknowledgement", () => {
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
      paymentConsent: expect.any(String),
    });
  });

  it("blocks a submit that omits payment consent and records payment_consent on a valid payload", () => {
    expect(
      validateSeminarRegistration(
        { ...validValues, paymentConsent: false },
        availableEvents
      ).paymentConsent
    ).toBeDefined();
    expect(
      buildSeminarFormPayload(validValues, availableEvents, {
        submittedAt: new Date("2026-10-01T12:00:00-07:00"),
        environment: "test",
        attribution: {},
      }).payment_consent
    ).toBe("yes");
    expect(
      buildSeminarFormPayload(
        { ...validValues, paymentConsent: false },
        availableEvents,
        {
          submittedAt: new Date("2026-10-01T12:00:00-07:00"),
          environment: "test",
          attribution: {},
        }
      ).payment_consent
    ).toBe("no");
  });
  it("accepts only core fields and consent, even for multiple attendees", () => {
    expect(validateSeminarRegistration({
      ...validValues, practiceName: "", cityState: "", heardAbout: "",
      attendeeCount: "5+", additionalAttendees: "",
    }, availableEvents)).toEqual({});
  });

  it("rejects forged enum values and oversized contact and optional fields", () => {
    const errors = validateSeminarRegistration({
      ...validValues, name: "n".repeat(101), email: "n".repeat(250) + "@example.com",
      phone: "1".repeat(100), practiceName: "p".repeat(201), cityState: "c".repeat(121),
      additionalAttendees: "g".repeat(501), heardAboutOther: "s".repeat(201),
      attendeeCount: "999" as SeminarFormValues["attendeeCount"],
      heardAbout: "invalid" as SeminarFormValues["heardAbout"],
      bestTimeToCall: "Midnight" as SeminarFormValues["bestTimeToCall"],
    }, availableEvents);
    expect(Object.keys(errors).sort()).toEqual([
      "name", "email", "phone", "practiceName", "cityState", "additionalAttendees",
      "heardAboutOther", "attendeeCount", "heardAbout", "bestTimeToCall",
    ].sort());
  });

  it("allows international phone formats and rejects phone numbers with letters", () => {
    expect(validateSeminarRegistration({ ...validValues, phone: "+44 20 7946 0958" }, availableEvents).phone).toBeUndefined();
    expect(validateSeminarRegistration({ ...validValues, phone: "call 9165550123" }, availableEvents).phone).toBeDefined();
  });

});

describe("seminar registration payload", () => {
  const context = (submittedAt: string) => ({
    submittedAt: new Date(submittedAt),
    environment: "test",
    attribution: { page_path: "/events/practice-transition-seminar" },
  });

  it("records the displayed early-bird price the registrant saw", () => {
    const payload = buildSeminarFormPayload(
      validValues,
      availableEvents,
      context("2026-10-01T12:00:00-07:00")
    );

    expect(payload).toMatchObject({
      selected_event_id: "pti-seminar-sacramento-2026",
      quoted_price: "$247",
      early_bird_applied: "yes",
      best_time_to_call: "Morning",
      payment_consent: "yes",
      sms_consent: "no",
      submitted_at: "2026-10-01T19:00:00.000Z",
      environment: "test",
      page_path: "/events/practice-transition-seminar",
    });
    expect(payload.message).toContain(
      "Price shown at registration: $247 (early-bird)"
    );
    expect(payload.message).toContain("Best time to call:");
    expect(payload.message).toContain("Morning");
  });

  it("records the standard price after the pending early-registration deadline", () => {
    const payload = buildSeminarFormPayload(
      { ...validValues, selectedEvent: "march-12-2027-anaheim" },
      availableEvents,
      context("2027-01-01T12:00:00-08:00")
    );

    expect(payload.quoted_price).toBe("$397");
    expect(payload.early_bird_applied).toBe("no");
  });

  it("does not retain hidden guest names when switching back to one attendee", () => {
    const payload = buildSeminarFormPayload({ ...validValues, additionalAttendees: "Previous guest" }, availableEvents, context("2026-09-01T12:00:00-07:00"));
    expect(payload.additional_attendee_names).toBe("");
    expect(payload.message).not.toContain("Previous guest");
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


describe("campaign selection and stale registrations", () => {
  const before = new Date("2026-10-02T23:59:00-07:00");
  const after = new Date("2026-10-03T00:01:00-07:00");
  it("selects a valid campaign date and safely falls back for invalid or expired links", () => {
    expect(resolveSeminarSelection(availableEvents, "july-30-2027-san-francisco", before)?.city).toBe("San Francisco");
    expect(resolveSeminarSelection(availableEvents, "not-real", before)?.value).toBe(validValues.selectedEvent);
    expect(resolveSeminarSelection(availableEvents, validValues.selectedEvent, after)?.city).toBe("Anaheim");
    expect(resolveSeminarSelection([], validValues.selectedEvent, after)).toBeUndefined();
  });
  it("stops a long-open form after the event closes in Pacific time", () => {
    const refreshed = refreshSeminarRegistration(availableEvents, validValues.selectedEvent, before, after);
    expect(refreshed.change).toBe("event_unavailable");
    expect(refreshed.selectedEvent?.city).toBe("Anaheim");
    expect(refreshed.openEvents.some((event) => event.value === validValues.selectedEvent)).toBe(false);
  });
  it("requires a fresh review after the displayed early-bird price changes", () => {
    const early = new Date("2026-12-31T12:00:00-08:00");
    const standard = new Date("2027-01-01T12:00:00-08:00");
    expect(refreshSeminarRegistration(availableEvents, "march-12-2027-anaheim", early, standard).change).toBe("price_changed");
    expect(refreshSeminarRegistration(availableEvents, "march-12-2027-anaheim", standard, standard).change).toBeUndefined();
  });

  it("does not treat the retired per-event early-bird flip as a displayed price change", () => {
    const early = new Date("2026-09-02T23:59:00-07:00");
    const standard = new Date("2026-09-03T00:01:00-07:00");
    expect(refreshSeminarRegistration(availableEvents, validValues.selectedEvent, early, standard).change).toBeUndefined();
  });
});

describe("pending Liz seminar terms", () => {
  it("keeps Event JSON-LD offers on the approved standard price", () => {
    for (const event of practiceTransitionSeminarEvents) {
      expect(getApprovedSeminarOfferPrice(event)).toBe(397);
      expect(event.standardPrice).toBe(397);
    }
  });

  it("uses the 2027 series dates for the one-screen cards", () => {
    const cards = getSeminarSeriesCardEvents(availableEvents);
    expect(PENDING_LIZ_TERMS.enabled).toBe(true);
    expect(cards.map((event) => event.date)).toEqual([
      "March 12, 2027",
      "July 30, 2027",
      "October 15, 2027",
    ]);
  });

  it("keeps October 2 2026 out of the registration select", () => {
    expect(getSeminarFormEvents(availableEvents).map((event) => event.value)).toEqual([
      "march-12-2027-anaheim",
      "july-30-2027-san-francisco",
      "october-15-2027-sacramento",
    ]);
  });
});
