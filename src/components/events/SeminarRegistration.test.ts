import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  getSeminarFormEvents,
  getSeminarSeriesCardEvents,
  getUpcomingPracticeTransitionSeminarEvents,
  PENDING_LIZ_TERMS,
} from "@/data/practiceTransitionSeminar";
import { SeminarRegistration } from "./SeminarRegistration";
import PracticeTransitionSeminar from "@/views/PracticeTransitionSeminar";

const referenceDateIso = "2026-10-01T12:00:00-07:00";
const events = getUpcomingPracticeTransitionSeminarEvents(new Date(referenceDateIso));

const renderForm = () =>
  renderToStaticMarkup(createElement(SeminarRegistration, { events, referenceDateIso }));

describe("seminar registration rendered content", () => {
  it("asks for a registration call and keeps the core required fields", () => {
    const html = renderForm();
    expect(html).toContain("Request your registration call");
    expect(html).toContain("Call me to register");
    expect(html).toContain("Registration is completed by phone");
    expect(html).toContain("Do not enter payment-card information");
    expect(html).toContain("Choose a seminar");
    expect(html).toContain("whitespace-nowrap");
    expect(html).toContain("Call me to register");
    expect(html.match(/<button[^>]*type="submit"[^>]*>/)?.[0]).toContain("text-base");
    expect(html).not.toContain("Request My Seat");
    expect(html).not.toContain("within one business day");
    for (const id of [
      "seminar-name",
      "seminar-phone",
      "seminar-email",
      "seminar-selected-event",
      "seminar-best-time-to-call",
      "seminar-attendee-count",
    ]) {
      expect(html.match(new RegExp(`<[^>]+id="${id}"[^>]*>`))?.[0]).toContain('required=""');
    }
    expect(html.match(/<[^>]+id="seminar-payment-consent"[^>]*>/)?.[0]).toContain(
      'aria-required="true"'
    );
    expect(html.match(/<[^>]+id="seminar-sms-consent"[^>]*>/)?.[0]).not.toContain(
      'aria-required="true"'
    );
    expect(html).toContain(
      "PTI may contact me to finalize registration and payment by phone"
    );
    expect(html).toContain("Send me registration-related texts (optional)");
    expect(html).not.toContain("seminar-practice-name");
    expect(html).not.toContain("seminar-city-state");
    expect(html).not.toContain("seminar-heard-about");
  });

  it("defaults the seminar select empty and lists only the 2027 card dates", () => {
    const html = renderForm();
    const formEvents = getSeminarFormEvents(events);
    expect(events.map((event) => event.value)).toContain("october-2-2026-sacramento");
    expect(html).not.toContain("october-2-2026-sacramento");
    expect(html).not.toContain("October 2, 2026");
    expect(html).toContain('value=""');
    expect(html).toContain("Choose a seminar");
    expect(formEvents.map((event) => event.value)).toEqual([
      "march-12-2027-anaheim",
      "july-30-2027-san-francisco",
      "october-15-2027-sacramento",
    ]);
    for (const event of formEvents) {
      expect(html).toContain(`value="${event.value}"`);
      expect(html).toContain(event.label);
    }
  });

  it("does not submit during render and only points at Formspree from the client handler", () => {
    const html = renderForm();
    expect(html).not.toContain('action="https://formspree.io');
    expect(html).toContain('id="seminar-register-form"');
  });
});

describe("seminar page one-screen layout", () => {
  it("puts hero and 2027 cards before the form, then facts, pricing, and bios", () => {
    const html = renderToStaticMarkup(
      createElement(PracticeTransitionSeminar, { events, referenceDateIso })
    );
    const h1 = html.indexOf("Mastering Your Dental Transition");
    const cards = html.indexOf("March 12, 2027");
    const form = html.indexOf('id="seminar-register-form"');
    const policy = html.indexOf("Cancellation policy");
    const facts = html.indexOf("Breakfast and lunch included");
    const pricing = html.indexOf("Early registration special");
    const bio = html.indexOf("Dr. Michael Njo, DDS");
    const back = html.indexOf("Return to Events Page");

    expect(h1).toBeGreaterThan(0);
    expect(cards).toBeGreaterThan(h1);
    expect(form).toBeGreaterThan(cards);
    expect(policy).toBeGreaterThan(form);
    expect(policy).toBeLessThan(facts);
    expect(facts).toBeGreaterThan(form);
    expect(pricing).toBeGreaterThan(facts);
    expect(bio).toBeGreaterThan(pricing);
    expect(back).toBeGreaterThan(bio);
    expect((html.match(/Cancellation policy/g) ?? []).length).toBe(1);
    expect((html.match(/<h1\b/g) ?? []).length).toBe(1);
  });

  it("shows the 2027 series cards from data and pending Liz terms", () => {
    const html = renderToStaticMarkup(
      createElement(PracticeTransitionSeminar, { events, referenceDateIso })
    );
    const series = getSeminarSeriesCardEvents(events);
    expect(series.map((event) => event.city)).toEqual([
      "Anaheim",
      "San Francisco",
      "Sacramento",
    ]);
    for (const event of series) {
      expect(html).toContain(event.city);
      expect(html).toContain(event.date);
      expect(html).toContain(event.venueName);
    }
    expect(html).toContain(String(PENDING_LIZ_TERMS.earlyBirdPrice));
    expect(html).toContain(String(PENDING_LIZ_TERMS.standardPrice));
    expect(html).toContain(PENDING_LIZ_TERMS.earlyBirdDeadline);
    expect(html).not.toContain("What You");
    expect(html).not.toContain("Questions Before You Register");
    expect(html).not.toContain("Make Your Next Move");
    expect(html).not.toContain("Trusted by Dental Professionals");
    expect(html).not.toContain("Ready to register");
    expect(html).not.toContain("Upcoming seminar dates");
    expect(html).not.toContain("?event=");
  });
});
