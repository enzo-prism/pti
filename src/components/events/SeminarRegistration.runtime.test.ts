// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getUpcomingPracticeTransitionSeminarEvents, SEMINAR_REGISTRATION_CONFIRMATION } from "@/data/practiceTransitionSeminar";
import { SeminarRegistration } from "./SeminarRegistration";

let root: Root;
let container: HTMLDivElement;
const beforeCutoff = "2026-12-31T23:59:59-08:00";
const afterCutoff = "2027-01-01T00:01:00-08:00";
const post = vi.fn(async (_url: string, _options: RequestInit) => ({ ok: true }));

const setField = async (id: string, value: string) => {
  await act(async () => {
    const element = container.querySelector<HTMLInputElement | HTMLSelectElement>(`#${id}`)!;
    const prototype = element.tagName === "SELECT" ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, "value")!.set!.call(element, value);
    element.dispatchEvent(new Event(element.tagName === "SELECT" ? "change" : "input", { bubbles: true }));
  });
};
const completeForm = async () => {
  await setField("seminar-name", "Preview Test");
  await setField("seminar-phone", "(916) 555-0123");
  await setField("seminar-email", "preview@example.com");
  await setField("seminar-selected-event", "march-12-2027-anaheim");
  await setField("seminar-best-time-to-call", "Morning");
  await act(async () => container.querySelector<HTMLInputElement>("#seminar-payment-consent")!.click());
};
const submit = async () => act(async () => {
  container.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
});
const price = () => container.querySelector('[data-testid="seminar-primary-price"]')?.textContent;

beforeEach(async () => {
  vi.useFakeTimers({ toFake: ["Date", "setTimeout", "clearTimeout"] });
  vi.setSystemTime(new Date(beforeCutoff));
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("fetch", post);
  post.mockClear();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root.render(createElement(SeminarRegistration, {
    events: getUpcomingPracticeTransitionSeminarEvents(new Date()), referenceDateIso: new Date().toISOString(),
  })));
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("live registration quote", () => {
  it("refreshes the visible price and removes promotion copy at midnight without interaction", async () => {
    expect(price()).toBe("$247");
    await act(async () => vi.advanceTimersByTimeAsync(1050));
    expect(price()).toBe("$397");
    expect(container.textContent).not.toContain("December 31, 2026");
    expect(container.textContent).not.toContain("save $150");
    expect(post).not.toHaveBeenCalled();
  });

  it("blocks a stale submit, shows the new price, and only then posts that price", async () => {
    await completeForm();
    expect(price()).toBe("$247");
    vi.setSystemTime(new Date(afterCutoff));
    await submit();
    expect(post).not.toHaveBeenCalled();
    expect(price()).toBe("$397");
    expect(container.textContent).toContain("Please review the updated registration price");
    await submit();
    expect(post).toHaveBeenCalledOnce();
    const payload = JSON.parse(String(post.mock.calls[0][1].body));
    expect(payload.quoted_price).toBe("$397");
    expect(payload.quoted_guest_price).toBe("$197");
    expect(payload.early_bird_applied).toBe("no");
    expect(payload.sms_consent).toBe("no");
    expect(container.textContent).toContain(SEMINAR_REGISTRATION_CONFIRMATION);
  });

  it("updates the quote on focus and keeps group totals consistent", async () => {
    await setField("seminar-attendee-count", "3");
    expect(container.textContent).toContain("Total for 3 attendees: $641");
    vi.setSystemTime(new Date(afterCutoff));
    await act(async () => window.dispatchEvent(new Event("focus")));
    expect(price()).toBe("$397");
    expect(container.textContent).toContain("Total for 3 attendees: $791");
    await setField("seminar-attendee-count", "5+");
    expect(container.textContent).toContain("PTI will confirm your group total by phone");
    expect(container.textContent).not.toContain("Total for 5");
  });

  it("rejects an event that expired while the tab was open", async () => {
    await completeForm();
    vi.setSystemTime(new Date("2027-03-13T00:01:00-08:00"));
    await submit();
    expect(post).not.toHaveBeenCalled();
    expect(container.textContent).toContain("That date is no longer available");
    expect(container.querySelector<HTMLSelectElement>("#seminar-selected-event")!.value).toBe("");
    expect(container.textContent).not.toContain("March 12, 2027 - Anaheim");
  });
});
