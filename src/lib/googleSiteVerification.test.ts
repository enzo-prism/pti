import { describe, expect, it } from "vitest";
import { googleSiteVerificationBody } from "./googleSiteVerification";

describe("googleSiteVerificationBody", () => {
  it("returns Google's FILE verification contents for an issued token", () => {
    expect(
      googleSiteVerificationBody("google12cfc68677988bb4.html"),
    ).toBe("google-site-verification: google12cfc68677988bb4.html\n");
    expect(
      googleSiteVerificationBody("google078b551f409128a8.html"),
    ).toBe("google-site-verification: google078b551f409128a8.html\n");
  });

  it("does not vouch for tokens PTI never issued", () => {
    expect(googleSiteVerificationBody("googleabc123notreal.html")).toBeNull();
    expect(googleSiteVerificationBody("GOOGLE12CFC68677988BB4.html")).toBeNull();
  });

  it("rejects paths that are not Google verification files", () => {
    expect(googleSiteVerificationBody("index.html")).toBeNull();
    expect(googleSiteVerificationBody("google.html")).toBeNull();
    expect(googleSiteVerificationBody("../google12cfc68677988bb4.html")).toBeNull();
  });
});
