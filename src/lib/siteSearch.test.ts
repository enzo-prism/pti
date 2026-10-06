import { describe, expect, it } from "vitest";
import { buildSiteSearchIndex } from "@/data/searchIndex";
import {
  getSuggestedSearchRecords,
  searchKindLabel,
  searchSite,
  type SearchKind,
  type SearchRecord,
} from "./siteSearch";

const index = buildSiteSearchIndex();

const pathsFor = (query: string): string[] =>
  searchSite(index, query).map((hit) => hit.record.path);

describe("searchSite", () => {
  it("finds the key hub pages from short labels", () => {
    expect(pathsFor("home")[0]).toBe("/");
    expect(pathsFor("events")[0]).toBe("/events");
    expect(pathsFor("about")[0]).toBe("/about");
    expect(pathsFor("contact")[0]).toBe("/contact");
    expect(pathsFor("blog")[0]).toBe("/blog");
  });

  it("treats news as the blog / articles hub", () => {
    expect(pathsFor("news")[0]).toBe("/blog");
  });

  it("returns nothing for blank or single-character queries", () => {
    expect(searchSite(index, "")).toEqual([]);
    expect(searchSite(index, " ")).toEqual([]);
    expect(searchSite(index, "a")).toEqual([]);
  });

  it("requires every query token to match", () => {
    expect(pathsFor("contact consultation")).toContain("/contact");
    expect(pathsFor("contact xylophone")).toEqual([]);
  });

  it("keeps one result per path when several records share it", () => {
    const hits = searchSite(index, "seminar");
    const paths = hits.map((hit) => hit.record.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain("/events/practice-transition-seminar");
  });

  it("surfaces Dr. Njo, FAQ, and location pages", () => {
    expect(pathsFor("njo")[0]).toBe("/drnjo");
    expect(pathsFor("faq")[0]).toBe("/faq");
    expect(pathsFor("california")).toContain("/locations/california");
  });
});

describe("getSuggestedSearchRecords", () => {
  it("returns the hub pages used when the search panel first opens", () => {
    expect(getSuggestedSearchRecords(index).map((record) => record.path)).toEqual([
      "/",
      "/events",
      "/about",
      "/contact",
      "/blog",
      "/services",
    ]);
  });
});

describe("searchKindLabel", () => {
  it("labels every search kind", () => {
    const kinds: SearchKind[] = ["page", "article", "event", "faq", "location"];
    expect(kinds.map(searchKindLabel)).toEqual([
      "Page",
      "Article",
      "Event",
      "FAQ",
      "Location",
    ]);
  });
});

describe("search record shape", () => {
  it("never carries article bodies or seminar prices", () => {
    for (const record of index as Array<SearchRecord & { content?: string; offerPrice?: number }>) {
      expect(record).not.toHaveProperty("content");
      expect(record).not.toHaveProperty("offerPrice");
      expect(record.title.length).toBeGreaterThan(0);
      expect(record.path.startsWith("/")).toBe(true);
    }
  });
});
