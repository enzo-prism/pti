import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { communityImpactPosts } from "@/data/communityImpactPosts";
import { buildBlogRssXml } from "./rss";

const xml = buildBlogRssXml();
const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
const field = (item: string, tag: string) =>
  item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))?.[1];

describe("blog RSS feed", () => {
  it("is an RSS 2.0 document that declares its own URL", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain(
      '<atom:link href="https://practicetransitionsinstitute.com/blog/rss.xml" rel="self" type="application/rss+xml" />'
    );
  });

  it("lists every published post, newest first", () => {
    const published = [...communityImpactPosts, ...blogPosts].filter((post) => post.slug);
    expect(items).toHaveLength(published.length);

    const dates = items.map((item) => Date.parse(field(item, "pubDate") ?? ""));
    expect(dates.every(Number.isFinite)).toBe(true);
    for (let index = 1; index < dates.length; index += 1) {
      expect(dates[index]).toBeLessThanOrEqual(dates[index - 1]);
    }
  });

  it("gives every item the fields feed readers need", () => {
    for (const item of items) {
      for (const tag of ["title", "link", "guid", "pubDate", "dc:creator", "category", "description"]) {
        expect(field(item, tag), `${tag} in ${field(item, "link")}`).toBeTruthy();
      }
      expect(field(item, "link")).toMatch(
        /^https:\/\/practicetransitionsinstitute\.com\/blog\/[a-z0-9-]+$/
      );
    }
  });

  it("escapes every ampersand and angle bracket in text", () => {
    const text = items.map((item) => field(item, "title") + (field(item, "description") ?? "")).join("");
    expect(text).not.toMatch(/&(?!amp;|lt;|gt;|quot;|apos;)/);
    expect(text).not.toMatch(/[<>]/);
  });
});
