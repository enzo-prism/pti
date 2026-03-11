import { describe, expect, it } from "vitest";
import {
  CANONICAL_HOSTNAME,
  WWW_CANONICAL_HOSTNAME,
  getCanonicalRedirectUrl,
} from "@/lib/canonicalUrl";

describe("canonical host redirects", () => {
  it("redirects www requests to the apex host and preserves the path", () => {
    const redirectUrl = getCanonicalRedirectUrl(
      `https://${WWW_CANONICAL_HOSTNAME}/blog?search=valuation#faq`
    );

    expect(redirectUrl?.toString()).toBe(
      `https://${CANONICAL_HOSTNAME}/blog?search=valuation#faq`
    );
  });

  it("does not redirect canonical or preview hosts", () => {
    expect(
      getCanonicalRedirectUrl(`https://${CANONICAL_HOSTNAME}/services`)
    ).toBeNull();
    expect(
      getCanonicalRedirectUrl("https://practice-transitions-institute-git-main.vercel.app/")
    ).toBeNull();
  });
});
