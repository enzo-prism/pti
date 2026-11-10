import { afterEach, describe, expect, it, vi } from "vitest";
import { submitLeadForm } from "./formSubmission";

afterEach(() => vi.unstubAllGlobals());
describe("confirmed form acceptance", () => {
  it("accepts the provider confirmation for multipart and JSON submissions", async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true, next: "/thanks" }) });
    vi.stubGlobal("fetch", fetcher);
    await expect(submitLeadForm("https://formspree.io/f/example", new FormData())).resolves.toBeUndefined();
    await expect(submitLeadForm("https://formspree.io/f/example", "{}")).resolves.toBeUndefined();
    expect(fetcher.mock.calls[0][1].headers).not.toHaveProperty("Content-Type");
    expect(fetcher.mock.calls[1][1].headers["Content-Type"]).toBe("application/json");
    expect(fetcher.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
  });
  it.each([
    { ok: false, json: async () => ({ error: "over limit" }) },
    { ok: true, json: async () => ({ ok: false }) },
    { ok: true, json: async () => ({ errors: [{ message: "verification required" }] }) },
    { ok: true, json: async () => { throw new SyntaxError("HTML response"); } },
  ])("rejects unconfirmed acceptance instead of counting a lead", async (response) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
    await expect(submitLeadForm("https://formspree.io/f/example", "{}")).rejects.toThrow();
  });
});
