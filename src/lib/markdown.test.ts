import { describe, expect, it } from "vitest";
import { renderMarkdown, sanitizeArticleHtml } from "./markdown";

describe("article HTML sanitization", () => {
  it("removes executable markup and unsafe URL schemes", () => {
    const html = sanitizeArticleHtml(
      '<p onclick="alert(1)">Safe</p><script>alert(1)</script><a href="javascript:alert(1)">Bad link</a><img src="/photo.webp" onerror="alert(1)" alt="Photo">'
    );

    expect(html).toContain("<p>Safe</p>");
    expect(html).not.toContain("script");
    expect(html).not.toContain("onclick");
    expect(html).not.toContain("javascript:");
    expect(html).not.toContain("onerror");
    expect(html).toContain('src="/photo.webp"');
  });

  it("allows the existing Instagram embed but removes other iframe hosts", () => {
    const html = sanitizeArticleHtml(
      '<iframe src="https://www.instagram.com/reel/example/embed" title="Instagram reel"></iframe><iframe src="https://example.com/embed"></iframe>'
    );

    expect(html).toContain("www.instagram.com/reel/example/embed");
    expect(html).not.toContain("example.com/embed");
  });

  it("renders Markdown and preserves safe legacy callout styling", () => {
    const html = renderMarkdown(
      '## Practical note\n\n<div style="background: #f0f9ff; padding: 20px; position: fixed;">Helpful</div>'
    );

    expect(html).toContain("<h2>Practical note</h2>");
    expect(html).toContain("background:#f0f9ff");
    expect(html).toContain("padding:20px");
    expect(html).not.toContain("position");
  });
});

describe("inline post images", () => {
  it("lazy-loads raw <img> tags without overriding explicit choices", () => {
    const html = sanitizeArticleHtml(
      '<img src="/a.webp" alt="A" width="1200" height="1600" /><img src="/b.webp" alt="B" loading="eager" />'
    );
    expect(html).toContain(
      '<img src="/a.webp" alt="A" width="1200" height="1600" loading="lazy" decoding="async" />'
    );
    expect(html).toContain('loading="eager"');
  });

  it("gives every raw image in post bodies its real pixel size", async () => {
    const { default: sharp } = await import("sharp");
    const { join } = await import("node:path");
    const { communityImpactPosts } = await import("@/data/communityImpactPosts");
    const { blogPosts } = await import("@/data/blogPosts");

    for (const post of [...communityImpactPosts, ...blogPosts]) {
      for (const [tag] of post.content.matchAll(/<img\b[^>]*>/g)) {
        const src = tag.match(/src="([^"]+)"/)?.[1] ?? "";
        const width = Number(tag.match(/width="(\d+)"/)?.[1]);
        const height = Number(tag.match(/height="(\d+)"/)?.[1]);
        expect(width && height, `${post.slug}: ${src} needs width/height`).toBeTruthy();
        if (!src.startsWith("/")) continue;

        const metadata = await sharp(join(process.cwd(), "public", src)).metadata();
        expect([width, height], `${post.slug}: ${src}`).toEqual([
          metadata.width,
          metadata.height,
        ]);
      }
    }
  }, 60_000);
});
