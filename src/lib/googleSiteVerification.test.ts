import { describe, expect, it } from "vitest";
import { googleSiteVerificationBody } from "./googleSiteVerification";

describe("googleSiteVerificationBody", () => {
  it("returns Google's FILE verification contents for a token filename", () => {
    expect(
      googleSiteVerificationBody("google12cfc68677988bb4.html"),
    ).toBe("google-site-verification: google12cfc68677988bb4.html\n");
  });

  it("rejects paths that are not Google verification files", () => {
    expect(googleSiteVerificationBody("index.html")).toBeNull();
    expect(googleSiteVerificationBody("google.html")).toBeNull();
    expect(googleSiteVerificationBody("../google12cfc68677988bb4.html")).toBeNull();
  });
});
