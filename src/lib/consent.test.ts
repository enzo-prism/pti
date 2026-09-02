import { describe, expect, it } from "vitest";
import {
  cookieBannerSpacePx,
  parseAnalyticsConsent,
  shouldFocusCookieBanner,
} from "./consent";

describe("analytics consent", () => {
  it("accepts only supported stored values", () => {
    expect(parseAnalyticsConsent("accepted")).toBe("accepted");
    expect(parseAnalyticsConsent("declined")).toBe("declined");
    expect(parseAnalyticsConsent("yes")).toBe("unset");
    expect(parseAnalyticsConsent(null)).toBe("unset");
  });

  it("does not move keyboard focus to the first-visit cookie banner", () => {
    expect(shouldFocusCookieBanner("first-visit")).toBe(false);
    expect(shouldFocusCookieBanner("preferences")).toBe(true);
  });

  it("sizes page padding from the live banner height", () => {
    expect(cookieBannerSpacePx(188)).toBe("204px");
    expect(cookieBannerSpacePx(0)).toBe("16px");
  });
});
