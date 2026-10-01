import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getUpcomingPracticeTransitionSeminarEvents } from "@/data/practiceTransitionSeminar";
import { SeminarRegistration } from "./SeminarRegistration";
import PracticeTransitionSeminar from "@/views/PracticeTransitionSeminar";

const referenceDateIso = "2026-10-01T12:00:00-07:00";
const events = getUpcomingPracticeTransitionSeminarEvents(new Date(referenceDateIso));

const renderForm = () => renderToStaticMarkup(createElement(SeminarRegistration, { events, referenceDateIso }));

describe("seminar registration rendered content", () => {
  it("puts the date, venue, and both attendee prices before the form at every viewport", () => {
    const html = renderForm();
    const formStart = html.indexOf('<form id="seminar-register-form"');
    expect(formStart).toBeGreaterThan(0);
    for (const detail of ["October 2, 2026", "TDIC Headquarters", "$397", "$197", "First attendee", "Each additional attendee"])
      expect(html.indexOf(detail)).toBeLessThan(formStart);
  });

  it("requires only the core contact fields, attendee count, date, and payment permission", () => {
    const html = renderForm();
    for (const id of ["seminar-name", "seminar-email", "seminar-phone", "seminar-attendee-count", "seminar-selected-event"])
      expect(html.match(new RegExp(`<[^>]+id="${id}"[^>]*>`))?.[0]).toContain('required=""');
    for (const id of ["seminar-practice-name", "seminar-city-state", "seminar-heard-about"])
      expect(html.match(new RegExp(`<[^>]+id="${id}"[^>]*>`))?.[0]).not.toContain('required=""');
    expect(html.match(/<[^>]+id="seminar-payment-consent"[^>]*>/)?.[0]).toContain('aria-required="true"');
    expect(html.match(/<[^>]+id="seminar-sms-consent"[^>]*>/)?.[0]).not.toContain('aria-required="true"');
    expect(html).toContain("Register Now");
    expect(html).toContain("Your seat is confirmed after payment");
    expect(html).not.toContain("within one business day");
  });

  it("retains all future dates as campaign links without multiplying the hero event cards", () => {
    const html = renderToStaticMarkup(createElement(PracticeTransitionSeminar, { events, referenceDateIso }));
    expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
    for (const event of events) expect(html).toContain(`?event=${event.value}#register`);
    expect(html).not.toContain("Request a Seminar Seat");
  });
});
