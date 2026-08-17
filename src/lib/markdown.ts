import { Marked, type Tokens } from "marked";
import sanitizeHtml from "sanitize-html";

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

const SAFE_STYLE_VALUE = /^(?!.*(?:expression|url|@import|javascript))[-#(),.%\w\s]+$/i;

/**
 * Blog copy currently lives in the repository, but the rendering boundary is
 * intentionally safe for a future CMS/import. Keep this allowlist narrow: it
 * supports the semantic markup and legacy callout styling already used by the
 * articles while removing scripts, event handlers, unsafe URLs, and embeds.
 */
export const sanitizeArticleHtml = (html: string): string =>
  sanitizeHtml(html, {
    allowedTags: [
      "a",
      "blockquote",
      "br",
      "caption",
      "code",
      "div",
      "em",
      "h2",
      "h3",
      "h4",
      "hr",
      "img",
      "iframe",
      "li",
      "ol",
      "p",
      "pre",
      "span",
      "strong",
      "table",
      "tbody",
      "td",
      "th",
      "thead",
      "tr",
      "ul",
    ],
    allowedAttributes: {
      "*": ["class", "id", "role", "aria-*", "data-label", "style"],
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "loading", "decoding", "sizes", "width", "height"],
      iframe: ["src", "width", "height", "frameborder", "scrolling", "allow", "allowtransparency", "title", "loading"],
      th: ["scope"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    allowedIframeHostnames: ["www.instagram.com"],
    allowedStyles: {
      "*": {
        background: [SAFE_STYLE_VALUE],
        "border-left": [SAFE_STYLE_VALUE],
        "border-radius": [SAFE_STYLE_VALUE],
        color: [SAFE_STYLE_VALUE],
        display: [/^(?:flex|grid)$/],
        "flex-wrap": [/^wrap$/],
        "font-size": [SAFE_STYLE_VALUE],
        "font-style": [/^(?:italic|normal)$/],
        "font-weight": [/^(?:[1-9]00|normal|bold)$/],
        gap: [SAFE_STYLE_VALUE],
        height: [SAFE_STYLE_VALUE],
        margin: [SAFE_STYLE_VALUE],
        "max-width": [SAFE_STYLE_VALUE],
        "min-height": [SAFE_STYLE_VALUE],
        "object-fit": [/^(?:contain|cover)$/],
        padding: [SAFE_STYLE_VALUE],
        "padding-left": [SAFE_STYLE_VALUE],
        "grid-template-columns": [SAFE_STYLE_VALUE],
        "text-decoration": [/^(?:none|underline)$/],
        width: [SAFE_STYLE_VALUE],
      },
    },
  });

export const renderMarkdown = (source: string): string =>
  sanitizeArticleHtml(markdown.parse(source) as string);
