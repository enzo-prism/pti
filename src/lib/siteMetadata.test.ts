import { describe, expect, it } from "vitest";
import {
  CANONICAL_SITE_URL,
  FALLBACK_SITE_URL,
  buildAbsoluteUrl,
  normalizeSiteUrl,
} from "@/lib/siteMetadata";

describe("site metadata helpers", () => {
  it("normalizes the www hostname to the canonical apex host", () => {
    expect(
      normalizeSiteUrl("https://www.practicetransitionsinstitute.com/about")
    ).toBe(FALLBACK_SITE_URL);
  });

  it("falls back safely for invalid values", () => {
    expect(normalizeSiteUrl("not-a-url")).toBe(FALLBACK_SITE_URL);
    expect(normalizeSiteUrl("")).toBe(FALLBACK_SITE_URL);
  });

  it("builds absolute URLs against the canonical site URL", () => {
    expect(buildAbsoluteUrl("/faq")).toBe(`${CANONICAL_SITE_URL}/faq`);
    expect(buildAbsoluteUrl("https://example.com/page")).toBe(
      "https://example.com/page"
    );
  });
});
