import { describe, expect, it } from "vitest";
import {
  blogPosts,
  getBlogMetaDescription,
  getBlogMetaTitle,
  toBlogPostSummary,
} from "./blogPosts";

const EDITORIALLY_REVISED_POST_IDS = new Set([18, 25, 28, 29, 30, 31, 32, 33]);
const INTERNAL_DRAFTING_PATTERNS = [
  /fresh (?:web )?research/i,
  /outside research/i,
  /the live (?:PTI )?site/i,
  /why this topic fits/i,
  /fits (?:Practice Transitions Institute|PTI|the PTI site)/i,
  /reviewed (?:this morning|for this run)/i,
  /recent PTI drafts/i,
  /content gap to address/i,
];

describe("blog editorial quality", () => {
  it("does not publish internal research or drafting language", () => {
    for (const post of blogPosts) {
      for (const pattern of INTERNAL_DRAFTING_PATTERNS) {
        expect(post.content, `${post.slug} matched ${pattern}`).not.toMatch(pattern);
      }
    }
  });

  it("documents the sensitive-post revisions without claiming an external review", () => {
    const revisedPosts = blogPosts.filter((post) => EDITORIALLY_REVISED_POST_IDS.has(post.id));
    expect(revisedPosts).toHaveLength(EDITORIALLY_REVISED_POST_IDS.size);

    for (const post of revisedPosts) {
      expect(post.dateModified).toBe("2026-08-17");
      expect(post.disclaimer).toMatch(/general educational information/i);
      expect(post).not.toHaveProperty("reviewedBy");
      for (const source of post.sources ?? []) {
        expect(source.name).toBeTruthy();
        expect(source.publisher).toBeTruthy();
        expect(new URL(source.url).protocol).toBe("https:");
      }
    }
  });

  it("keeps generated metadata within search-result length targets", () => {
    for (const post of blogPosts) {
      const title = getBlogMetaTitle(post);
      const description = getBlogMetaDescription(post);
      expect(title.length, post.slug).toBeLessThanOrEqual(60);
      expect(description.length, post.slug).toBeLessThanOrEqual(160);
      expect(title, post.slug).not.toContain("...");
    }
  });

  it("does not place another H1 inside an article body", () => {
    for (const post of blogPosts) {
      expect(post.content, post.slug).not.toMatch(/(^|\n)#\s|<h1\b/i);
    }
  });

  it("does not send editorial-only fields to the client listing", () => {
    const revisedPost = blogPosts.find((post) => post.id === 33);
    expect(revisedPost).toBeDefined();
    const summary = toBlogPostSummary(revisedPost!);
    expect(summary).not.toHaveProperty("content");
    expect(summary).not.toHaveProperty("sources");
    expect(summary).not.toHaveProperty("disclaimer");
    expect(summary).not.toHaveProperty("metaDescription");
  });
});
