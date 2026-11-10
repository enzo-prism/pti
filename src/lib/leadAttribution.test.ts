// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { ANALYTICS_CONSENT_STORAGE_KEY } from "./consent";
import { attributionFromUrl, captureLeadAttribution } from "./leadAttribution";

beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });
describe("inquiry attribution", () => {
  it("keeps useful campaign labels and drops arbitrary parameters and contact data", () => {
    const data = attributionFromUrl("https://practicetransitionsinstitute.com/resources?utm_source=chatgpt.com&utm_campaign=owner-guide&email=private@example.com&utm_content=private%40example.com", "https://www.google.com/search?q=private");
    expect(data).toEqual({ landing_page: "/resources", referrer_host: "www.google.com", utm_source: "chatgpt.com", utm_campaign: "owner-guide" });
    expect(JSON.stringify(data)).not.toMatch(/private|email|search\?/);
  });
  it("does not persist a visit before consent or after withdrawal", () => {
    history.replaceState(null, "", "/contact?utm_source=testing");
    expect(captureLeadAttribution()).toEqual({ page_path: "/contact" });
    expect(sessionStorage.length).toBe(0);
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, "accepted");
    captureLeadAttribution();
    expect(sessionStorage.length).toBe(1);
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, "declined");
    expect(captureLeadAttribution()).toEqual({ page_path: "/contact" });
    expect(sessionStorage.length).toBe(0);
  });
  it("retains the consented first landing page when an inquiry starts later", () => {
    localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, "accepted");
    history.replaceState(null, "", "/resources/how-much-is-my-dental-practice-worth?utm_source=google&utm_medium=organic");
    captureLeadAttribution();
    history.replaceState(null, "", "/contact");
    expect(captureLeadAttribution()).toEqual({ landing_page: "/resources/how-much-is-my-dental-practice-worth", page_path: "/contact", utm_source: "google", utm_medium: "organic" });
  });
});
