import { describe, expect, it } from "vitest";
import { parseAnalyticsConsent } from "./consent";

describe("analytics consent", () => {
  it("accepts only supported stored values", () => {
    expect(parseAnalyticsConsent("accepted")).toBe("accepted");
    expect(parseAnalyticsConsent("declined")).toBe("declined");
    expect(parseAnalyticsConsent("yes")).toBe("unset");
    expect(parseAnalyticsConsent(null)).toBe("unset");
  });
});
