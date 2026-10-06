import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { blogPosts } from "@/data/blogPosts";
import { communityImpactPosts } from "@/data/communityImpactPosts";
import { reviews } from "@/data/reviews";
import { STATIC_SEARCH_PAGE_PATHS, buildSiteSearchIndex } from "./searchIndex";

const sitemapPath = (url: string): string => {
  const pathname = new URL(url).pathname;
  return pathname === "" ? "/" : pathname;
};

describe("buildSiteSearchIndex", () => {
  const records = buildSiteSearchIndex();
  const indexedPaths = new Set(records.map((record) => record.path));

  it("covers every sitemap URL so public pages are findable", () => {
    const sitemapPaths = sitemap().map((entry) => sitemapPath(entry.url));
    expect(sitemapPaths.length).toBeGreaterThan(30);

    for (const path of sitemapPaths) {
      expect(indexedPaths.has(path), path).toBe(true);
    }
  });

  it("includes the authored static page catalog", () => {
    for (const path of STATIC_SEARCH_PAGE_PATHS) {
      expect(indexedPaths.has(path), path).toBe(true);
    }
  });

  it("indexes blog and community articles without review detail pages", () => {
    const articlePaths = records
      .filter((record) => record.kind === "article")
      .map((record) => record.path);

    for (const post of [...communityImpactPosts, ...blogPosts]) {
      expect(articlePaths).toContain(`/blog/${post.slug}`);
    }

    for (const review of reviews) {
      expect(indexedPaths.has(`/testimonials/${review.slug}`)).toBe(false);
    }
  });

  it("keeps article records to title, excerpt, and routing fields", () => {
    const firstPost = blogPosts[0];
    expect(firstPost).toBeDefined();
    if (!firstPost) return;

    const article = records.find((record) => record.path === `/blog/${firstPost.slug}`);
    expect(article?.description).toBe(firstPost.excerpt);
    expect(JSON.stringify(article)).not.toContain(firstPost.content.slice(0, 80));
  });
});
