import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getUpcomingPracticeTransitionSeminarEvents, SEMINAR_REGISTRATION_CONFIRMATION } from "@/data/practiceTransitionSeminar";
import { SeminarRegistration } from "./SeminarRegistration";
import PracticeTransitionSeminar from "@/views/PracticeTransitionSeminar";

const renderPage = (referenceDateIso: string) => renderToStaticMarkup(createElement(PracticeTransitionSeminar, {
  events: getUpcomingPracticeTransitionSeminarEvents(new Date(referenceDateIso)), referenceDateIso,
}));
const renderForm = (referenceDateIso = "2026-10-12T12:00:00-07:00") => renderToStaticMarkup(createElement(SeminarRegistration, {
  events: getUpcomingPracticeTransitionSeminarEvents(new Date(referenceDateIso)), referenceDateIso,
}));

describe("registration preview", () => {
  it("shows price and direct calling before the compact form", () => {
    const html = renderForm();
    const form = html.indexOf('id="seminar-register-form"');
    expect(html.indexOf("Call now to register")).toBeLessThan(form);
    expect(html.indexOf("$247")).toBeLessThan(form);
    expect(html).toContain("Reserve your registration");
    expect(html).toContain(SEMINAR_REGISTRATION_CONFIRMATION);
    expect(html).toContain("PTI will contact me");
    expect(html).not.toContain("PTI may contact me");
    expect(html).not.toContain("To cancel");
    expect(html).toContain("$100 fee");
    for (const id of ["seminar-name", "seminar-phone", "seminar-email", "seminar-selected-event", "seminar-best-time-to-call", "seminar-attendee-count"]) {
      expect(html.match(new RegExp(`<[^>]+id="${id}"[^>]*>`))?.[0]).toContain('required=""');
    }
    expect(html.match(/<input[^>]+id="seminar-sms-consent"[^>]*>/)?.[0]).not.toContain('required=""');
    for (const field of ["seminar-practice-name", "seminar-city-state", "seminar-heard-about"]) expect(html).not.toContain(field);
    expect(html).not.toContain('action="https://formspree.io');
  });

  it("uses the same rollover for visible price and promotional copy", () => {
    const before = renderForm("2026-12-31T23:59:59-08:00");
    const after = renderForm("2027-01-01T00:00:00-08:00");
    expect(before).toContain("$247");
    expect(before).toContain("December 31, 2026");
    expect(before).toContain("save $150");
    expect(after).toContain("$397");
    expect(after).not.toContain("$247");
    expect(after).not.toContain("December 31, 2026");
    expect(after).not.toContain("Early registration special");
    expect(before).toContain("$197");
    expect(after).toContain("$197");
  });

  it("uses Kevin's source-exact seminar excerpt and Liz's consultation path", () => {
    const html = renderPage("2026-10-12T12:00:00-07:00");
    expect(html).toContain("Kevin Barry");
    expect(html).toContain("He went into meticulous detail about acquiring and selling a dental practice.");
    expect(html).not.toContain("When it is my time to sell");
    expect(html).toContain("Can’t Attend the Seminar?");
    expect(html).toContain("complimentary one-on-one consultation");
    expect(html).toContain('href="mailto:info@practicetransitions.com"');
    expect(html.match(/<h1\b/g)).toHaveLength(1);
  });
});
