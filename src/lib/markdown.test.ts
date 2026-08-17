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
