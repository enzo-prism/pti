import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { reviews } from "@/data/reviews";
import sitemap from "./sitemap";

const ORIGINAL_ENV = { ...process.env };
const BUILD_TIMESTAMP = String(Date.UTC(2026, 2, 11, 12, 0, 0));

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV, NEXT_PUBLIC_BUILD_TIMESTAMP: BUILD_TIMESTAMP };
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe("sitemap metadata", () => {
  it("returns a canonical, duplicate-free sitemap with all expected entries", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    const uniqueUrls = new Set(urls);
    const expectedCount = 16 + blogPosts.filter((post) => post.slug).length + reviews.length;

    expect(entries).toHaveLength(expectedCount);
    expect(uniqueUrls.size).toBe(entries.length);

    for (const url of urls) {
      expect(url.startsWith("https://practicetransitionsinstitute.com")).toBe(true);
      expect(url.includes("www.")).toBe(false);
      expect(url.includes("?")).toBe(false);
      expect(url.endsWith("/") && url !== "https://practicetransitionsinstitute.com/").toBe(false);
    }

    expect(urls).toContain("https://practicetransitionsinstitute.com/");
    expect(urls).toContain("https://practicetransitionsinstitute.com/blog");
    expect(urls).toContain("https://practicetransitionsinstitute.com/faq");
    expect(urls).toContain("https://practicetransitionsinstitute.com/contact");
    expect(urls).toContain(
      `https://practicetransitionsinstitute.com/blog/${blogPosts.find((post) => post.slug)?.slug}`
    );
    expect(urls).toContain(
      `https://practicetransitionsinstitute.com/testimonials/${reviews[0]?.slug}`
    );
  });

  it("uses the build timestamp for static pages so crawlers get a stable freshness signal", () => {
    const entries = sitemap();
    const homeEntry = entries.find(
      (entry) => entry.url === "https://practicetransitionsinstitute.com/"
    );

    expect(homeEntry?.lastModified).toEqual(new Date(Number(BUILD_TIMESTAMP)));
    expect(homeEntry?.changeFrequency).toBe("weekly");
    expect(homeEntry?.priority).toBe(1);
  });
});
