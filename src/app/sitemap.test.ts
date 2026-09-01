import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { communityImpactPosts } from "@/data/communityImpactPosts";
import { reviews } from "@/data/reviews";
import sitemap from "./sitemap";

describe("sitemap metadata", () => {
  it("returns a canonical, duplicate-free sitemap with all expected entries", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    const uniqueUrls = new Set(urls);
    const allBlogPosts = [...communityImpactPosts, ...blogPosts];
    const expectedCount = 30 + allBlogPosts.filter((post) => post.slug).length + reviews.length;

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
    expect(urls).toContain(
      "https://practicetransitionsinstitute.com/events/practice-transition-seminar"
    );
    expect(urls).toContain("https://practicetransitionsinstitute.com/gallery");
    expect(urls).toContain("https://practicetransitionsinstitute.com/faq");
    expect(urls).toContain(
      "https://practicetransitionsinstitute.com/resources/practice-sale-readiness-checklist"
    );
    expect(urls).toContain(
      "https://practicetransitionsinstitute.com/resources/how-much-is-my-dental-practice-worth"
    );
    expect(urls).toContain(
      "https://practicetransitionsinstitute.com/resources/dental-practice-transitions-handbook"
    );
    expect(urls).toContain(
      "https://practicetransitionsinstitute.com/resources/second-book"
    );
    expect(urls).toContain(
      "https://practicetransitionsinstitute.com/resources/navigating-dental-insurance-podcast"
    );
    expect(urls).toContain(
      "https://practicetransitionsinstitute.com/services/selling-to-a-dso"
    );
    expect(urls).toContain(
      "https://practicetransitionsinstitute.com/services/buying"
    );
    expect(urls).toContain("https://practicetransitionsinstitute.com/resources");
    expect(urls).toContain("https://practicetransitionsinstitute.com/locations");
    expect(urls).toContain(
      "https://practicetransitionsinstitute.com/locations/california"
    );
    expect(urls).toContain(
      "https://practicetransitionsinstitute.com/locations/texas"
    );
    expect(urls).toContain(
      "https://practicetransitionsinstitute.com/locations/florida"
    );
    expect(urls).toContain("https://practicetransitionsinstitute.com/contact");
    expect(urls).toContain(
      `https://practicetransitionsinstitute.com/blog/${allBlogPosts.find((post) => post.slug)?.slug}`
    );
    expect(urls).toContain(
      `https://practicetransitionsinstitute.com/testimonials/${reviews[0]?.slug}`
    );
  });

  it("uses maintained content dates for static pages so crawlers get a real freshness signal", () => {
    const entries = sitemap();
    const homeEntry = entries.find(
      (entry) => entry.url === "https://practicetransitionsinstitute.com/"
    );

    expect(homeEntry?.lastModified).toBeInstanceOf(Date);
    expect(homeEntry?.changeFrequency).toBe("weekly");
    expect(homeEntry?.priority).toBe(1);

    const blogEntry = entries.find(
      (entry) => entry.url === "https://practicetransitionsinstitute.com/blog"
    );
    const latestPostDate = [...communityImpactPosts, ...blogPosts]
      .map((post) => post.dateModified ?? post.date)
      .sort()
      .at(-1);

    expect(blogEntry?.lastModified).toEqual(
      new Date(`${latestPostDate}T00:00:00Z`)
    );

    const postWithDateModified = blogPosts.find((post) => post.dateModified);
    if (postWithDateModified) {
      const postEntry = entries.find(
        (entry) =>
          entry.url ===
          `https://practicetransitionsinstitute.com/blog/${postWithDateModified.slug}`
      );
      expect(postEntry?.lastModified).toEqual(
        new Date(`${postWithDateModified.dateModified}T00:00:00Z`)
      );
    }
  });
});
