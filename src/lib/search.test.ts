import { describe, expect, it } from "vitest";
import {
  SEARCH_RESULT_LIMIT,
  filterSearchRecords,
  searchTypeLabel,
  type SearchRecord,
  type SearchRecordType,
} from "./search";
import { buildSearchIndex, trimText } from "./searchIndex";

const record = (
  title: string,
  excerpt = "",
  url = "/",
  type: SearchRecordType = "page",
): SearchRecord => ({ title, excerpt, url, type });

describe("filterSearchRecords", () => {
  it("returns an empty list for an empty or blank query", () => {
    const records = [record("Selling a Practice")];
    expect(filterSearchRecords(records, "")).toEqual([]);
    expect(filterSearchRecords(records, "   ")).toEqual([]);
  });

  it("matches case-insensitively on title and excerpt", () => {
    const records = [
      record("Selling a Practice", "Confidential preparation and closing."),
      record("Buying a Practice", "Acquisition guidance for dentists."),
    ];
    expect(filterSearchRecords(records, "SELLING")).toHaveLength(1);
    expect(filterSearchRecords(records, "closing")).toHaveLength(1);
    expect(filterSearchRecords(records, "acquisition")).toHaveLength(1);
  });

  it("ranks title matches before excerpt-only matches", () => {
    const records = [
      record("About Us", "Learn about selling a practice with PTI."),
      record("Selling a Practice", "Confidential preparation and closing."),
    ];
    const results = filterSearchRecords(records, "selling");
    expect(results.map((result) => result.title)).toEqual([
      "Selling a Practice",
      "About Us",
    ]);
  });

  it("caps results at the dropdown limit", () => {
    const records = Array.from({ length: SEARCH_RESULT_LIMIT + 5 }, (_, i) =>
      record(`Practice transition guide ${i}`),
    );
    expect(filterSearchRecords(records, "practice")).toHaveLength(
      SEARCH_RESULT_LIMIT,
    );
  });

  it("returns an empty list when nothing matches", () => {
    const records = [record("Selling a Practice")];
    expect(filterSearchRecords(records, "orthodontics")).toEqual([]);
  });
});

describe("searchTypeLabel", () => {
  it("labels every record type", () => {
    const types: SearchRecordType[] = [
      "page",
      "post",
      "event",
      "resource",
      "faq",
      "location",
    ];
    for (const type of types) {
      expect(searchTypeLabel(type)).toMatch(/^[A-Za-z ]+$/);
    }
    expect(searchTypeLabel("post")).toBe("Article");
  });
});

describe("trimText", () => {
  it("leaves short text untouched", () => {
    expect(trimText("Short excerpt.")).toBe("Short excerpt.");
  });

  it("trims at a word boundary with an ellipsis", () => {
    const trimmed = trimText("word ".repeat(100), 20);
    expect(trimmed.length).toBeLessThanOrEqual(23);
    expect(trimmed).toMatch(/\.\.\.$/);
    expect(trimmed).not.toMatch(/ \.\.\.$/);
  });
});

describe("buildSearchIndex", () => {
  const records = buildSearchIndex(new Date("2026-01-01T00:00:00Z"));

  it("emits only trimmed record fields", () => {
    for (const result of records) {
      expect(Object.keys(result).sort()).toEqual([
        "excerpt",
        "title",
        "type",
        "url",
      ]);
    }
    // No full bodies leak into the JSON payload.
    expect(JSON.stringify(records)).not.toContain('"content":');
    expect(JSON.stringify(records)).not.toContain('"sources":');
  });

  it("keeps excerpts snippet-length", () => {
    for (const result of records) {
      expect(result.excerpt.length).toBeLessThanOrEqual(203);
    }
  });

  it("covers the expected routes", () => {
    const urls = new Set(records.map((result) => result.url));
    for (const url of ["/", "/about", "/services", "/blog", "/events", "/faq", "/contact", "/resources", "/testimonials", "/locations"]) {
      expect(urls.has(url)).toBe(true);
    }
    expect(
      records.some(
        (result) => result.url === "/events" && result.type === "page",
      ),
    ).toBe(true);
    expect(
      records.some(
        (result) => result.url === "/blog" && result.type === "page",
      ),
    ).toBe(true);
    expect(
      records.some(
        (result) => result.url === "/services" && result.type === "page",
      ),
    ).toBe(true);
  });

  it("uses only the allowed record types with site-relative urls", () => {
    const allowed: SearchRecordType[] = [
      "page",
      "post",
      "event",
      "resource",
      "faq",
      "location",
    ];
    for (const result of records) {
      expect(allowed).toContain(result.type);
      expect(result.url.startsWith("/")).toBe(true);
    }
  });

  it("includes service, location, faq, and post records", () => {
    const byType = (type: SearchRecordType) =>
      records.filter((result) => result.type === type);
    expect(byType("page").length).toBeGreaterThan(0);
    expect(byType("post").length).toBeGreaterThan(0);
    expect(byType("faq").length).toBeGreaterThan(0);
    expect(byType("location").length).toBeGreaterThan(0);
    // Blog posts link to their detail pages without leaking bodies.
    const post = byType("post")[0];
    expect(post.url).toMatch(/^\/blog\//);
  });

  it("links blog posts to /blog/:slug detail pages", () => {
    const posts = records.filter((result) => result.type === "post");
    for (const post of posts) {
      expect(post.url).toMatch(/^\/blog\/[a-z0-9-]+$/);
    }
  });
});
