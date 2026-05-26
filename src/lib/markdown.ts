import { Marked, type Tokens } from "marked";

const escapeHtmlAttribute = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/**
 * Shared Markdown renderer for blog content. Inline images are emitted with
 * native lazy-loading and async decoding so below-the-fold figures inside long
 * posts do not block rendering. Source assets are pre-optimized (WebP); raw
 * <img> inside dangerouslySetInnerHTML cannot use next/image, so this is the
 * meaningful optimization available for inline markdown imagery.
 */
const markdown = new Marked({
  renderer: {
    image({ href, title, text }: Tokens.Image): string {
      const src = escapeHtmlAttribute(href ?? "");
      const alt = escapeHtmlAttribute(text ?? "");
      const titleAttr = title ? ` title="${escapeHtmlAttribute(title)}"` : "";
      return `<img src="${src}" alt="${alt}"${titleAttr} loading="lazy" decoding="async" sizes="(min-width: 1024px) 768px, 100vw" />`;
    },
  },
});

export const renderMarkdown = (source: string): string =>
  markdown.parse(source) as string;
