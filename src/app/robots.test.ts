import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import robots from "./robots";

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV };
  delete process.env.NEXT_PUBLIC_VERCEL_ENV;
  delete process.env.VERCEL_ENV;
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe("robots metadata", () => {
  it("allows crawling and advertises the canonical sitemap on production", () => {
    vi.stubEnv("NODE_ENV", "production");

    expect(robots()).toEqual({
      rules: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
      sitemap: "https://practicetransitionsinstitute.com/sitemap.xml",
      host: "https://practicetransitionsinstitute.com",
    });
  });

  it("keeps non-production deployments blocked from indexing", () => {
    vi.stubEnv("NODE_ENV", "production");
    process.env.NEXT_PUBLIC_VERCEL_ENV = "preview";

    expect(robots()).toEqual({
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    });
  });

  it("treats production environment values case-insensitively", () => {
    vi.stubEnv("NODE_ENV", "development");
    process.env.VERCEL_ENV = " Production ";

    expect(robots().host).toBe("https://practicetransitionsinstitute.com");
  });
});
