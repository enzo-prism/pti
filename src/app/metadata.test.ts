import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import {
  blogPosts,
  getBlogMetaDescription,
  getBlogMetaTitle,
} from "@/data/blogPosts";
import { communityImpactPosts } from "@/data/communityImpactPosts";
import { buildTitleTag } from "@/lib/seo";

const APP_DIR = join(process.cwd(), "src/app");
const TITLE_LIMIT = 65;
const DESCRIPTION_LIMIT = 160;
const ELLIPSIS = /\.\.\.|…/;

const findStaticPages = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return findStaticPages(full);
    return entry === "page.tsx" && !full.includes("[") ? [full] : [];
  });

describe("search metadata", () => {
  it("keeps every static route's title and description whole and within limits", async () => {
    const pages = findStaticPages(APP_DIR);
    expect(pages.length).toBeGreaterThan(25);

    for (const file of pages) {
      const route = relative(APP_DIR, file);
      const { metadata } = await import(file);
      const title = String(metadata?.title ?? "");
      const description = String(metadata?.description ?? "");

      expect(title, route).not.toBe("");
      expect(title, route).not.toMatch(ELLIPSIS);
      expect(title.length, `${route}: ${title}`).toBeLessThanOrEqual(TITLE_LIMIT);
      expect(description, route).not.toMatch(ELLIPSIS);
      expect(description.length, `${route}: ${description}`).toBeLessThanOrEqual(
        DESCRIPTION_LIMIT
      );
    }
  }, 90_000);

  it("keeps every post's title tag and description whole and within limits", () => {
    for (const post of [...communityImpactPosts, ...blogPosts]) {
      const title = buildTitleTag(getBlogMetaTitle(post));
      const description = getBlogMetaDescription(post);

      expect(title, post.slug).not.toMatch(ELLIPSIS);
      expect(title.length, `${post.slug}: ${title}`).toBeLessThanOrEqual(TITLE_LIMIT);
      expect(description, post.slug).not.toMatch(ELLIPSIS);
      expect(description.length, post.slug).toBeLessThanOrEqual(DESCRIPTION_LIMIT);
    }
  });

  it("adds the brand only when it fits and never cuts a title", () => {
    expect(buildTitleTag("Dental Practice FAQ")).toBe(
      "Dental Practice FAQ | Practice Transitions Institute"
    );
    expect(buildTitleTag("Selling Your Dental Practice to a DSO")).toBe(
      "Selling Your Dental Practice to a DSO | PTI"
    );
    const long = "How Long Should a Seller Stay After a Dental Practice Sale Closes?";
    expect(buildTitleTag(long)).toBe(long);
    expect(buildTitleTag("Congratulations, Dr. Diana Fat | PTI")).toBe(
      "Congratulations, Dr. Diana Fat | PTI"
    );
    // "Options" contains the letters p-t-i but is not the brand.
    expect(buildTitleTag("Know Your Options")).toBe(
      "Know Your Options | Practice Transitions Institute"
    );
  });
});
