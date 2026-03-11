import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV };
  delete process.env.NEXT_PUBLIC_VERCEL_ENV;
  delete process.env.VERCEL_ENV;
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe("SEO helpers", () => {
  it("indexes production builds even outside Vercel", () => {
    process.env.NODE_ENV = "production";

    const metadata = buildPageMetadata({
      title: "FAQ",
      description: "Answers",
      path: "/faq",
    });

    expect(metadata.robots).toMatchObject({
      index: true,
      follow: true,
    });
  });

  it("keeps preview environments noindexed", () => {
    process.env.NODE_ENV = "production";
    process.env.NEXT_PUBLIC_VERCEL_ENV = "preview";

    const metadata = buildPageMetadata({
      title: "FAQ",
      description: "Answers",
      path: "/faq",
    });

    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
  });

  it("builds canonical JSON-LD URLs on the apex host", () => {
    const jsonLd = buildPageJsonLd({
      title: "Contact PTI",
      description: "Reach out",
      path: "/contact",
      includeLocalBusinessSchema: true,
    });

    const graph = jsonLd["@graph"];
    expect(Array.isArray(graph)).toBe(true);

    const webPage = (graph as Record<string, unknown>[]).find(
      (entry) => entry["@type"] === "WebPage"
    );
    expect(webPage).toMatchObject({
      url: "https://practicetransitionsinstitute.com/contact",
    });
  });
});
