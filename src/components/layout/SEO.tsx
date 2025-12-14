
import { Helmet } from "react-helmet-async";
import type { BreadcrumbNode } from "@/lib/breadcrumbs";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumbs";
import type { JsonLdShape } from "@/lib/structuredData";
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  buildAbsoluteUrl,
} from "@/lib/siteMetadata";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  canonicalPath?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  robots?: string;
  breadcrumbs?: BreadcrumbNode[];
  structuredData?: JsonLdShape | JsonLdShape[] | null;
}

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value);

const TITLE_MAX_LENGTH = 65;
const SHORT_SITE_NAME = "PTI";

const normalizePathname = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "/";

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const withoutQueryOrHash = withLeadingSlash.split(/[?#]/, 1)[0];
  const withoutIndexHtml = withoutQueryOrHash.replace(/\/index\.html$/i, "/");
  if (withoutIndexHtml === "/") return "/";
  return withoutIndexHtml.replace(/\/+$/, "");
};

const normalizeCanonicalHref = (value: string): string => {
  if (!isAbsoluteUrl(value)) return normalizePathname(value);

  try {
    const url = new URL(value);
    url.pathname = normalizePathname(url.pathname);
    url.hash = "";
    return url.toString();
  } catch {
    return value;
  }
};

const normalizeTitleWhitespace = (value: string): string =>
  value.trim().replace(/\s+/g, " ");

const truncateAtWord = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) return value;
  const truncated = value.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  const safeCut =
    lastSpace > maxLength * 0.6 ? truncated.slice(0, lastSpace) : truncated;
  return `${safeCut}…`;
};

const truncateAtWordWithoutEllipsis = (
  value: string,
  maxLength: number
): string => {
  if (value.length <= maxLength) return value;
  const truncated = value.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  const safeCut =
    lastSpace > maxLength * 0.6 ? truncated.slice(0, lastSpace) : truncated;
  return safeCut.trimEnd();
};

const getImportantTail = (value: string): string | null => {
  const normalized = normalizeTitleWhitespace(value);
  const pattern = /\b(part|episode|chapter)\s+(?:\d+|[ivx]{1,8})\b/gi;
  let lastMatchIndex: number | null = null;
  for (const match of normalized.matchAll(pattern)) {
    if (typeof match.index === "number") {
      lastMatchIndex = match.index;
    }
  }

  if (lastMatchIndex === null) return null;
  return normalized.slice(lastMatchIndex).trim();
};

const truncateForTitle = (value: string, maxLength: number): string => {
  const normalized = normalizeTitleWhitespace(value);
  if (normalized.length <= maxLength) return normalized;
  if (maxLength <= 1) return "…";

  const ellipsis = "…";
  const maxTailLength = Math.min(
    Math.max(12, Math.floor(maxLength * 0.45)),
    maxLength - 8
  );

  const partTail = getImportantTail(normalized);
  const tailCandidate = partTail && partTail.length <= maxTailLength
    ? partTail
    : null;
  const tailFromWords = (() => {
    const words = normalized.split(" ");
    const collected: string[] = [];
    let total = 0;
    for (let i = words.length - 1; i >= 0; i -= 1) {
      const word = words[i];
      const added = word.length + (collected.length ? 1 : 0);
      if (total + added > maxTailLength) break;
      collected.unshift(word);
      total += added;
      if (collected.length >= 5) break;
    }
    const tail = collected.join(" ").trim();
    return tail.length ? tail : null;
  })();

  const tail = tailCandidate ?? tailFromWords;
  if (!tail) return truncateAtWord(normalized, maxLength);

  const needsSpace = /^[A-Za-z0-9]/.test(tail);
  const startLength =
    maxLength - tail.length - ellipsis.length - (needsSpace ? 1 : 0);
  if (startLength < 8) return truncateAtWord(normalized, maxLength);

  const start = truncateAtWordWithoutEllipsis(normalized, startLength);
  if (!start.length) return truncateAtWord(normalized, maxLength);

  return `${start}${ellipsis}${needsSpace ? " " : ""}${tail}`;
};

const buildTitleTag = (rawTitle: string): string => {
  const baseTitle = normalizeTitleWhitespace(rawTitle);
  if (!baseTitle) return SITE_NAME;
  const brandSuffix = ` | ${SITE_NAME}`;
  const shortBrandSuffix = ` | ${SHORT_SITE_NAME}`;
  const baseLower = baseTitle.toLowerCase();
  const hasBrand =
    baseLower.includes(SITE_NAME.toLowerCase()) ||
    baseLower.includes(SHORT_SITE_NAME.toLowerCase());

  if (hasBrand) {
    return truncateForTitle(baseTitle, TITLE_MAX_LENGTH);
  }

  const fullWithBrand = `${baseTitle}${brandSuffix}`;
  if (fullWithBrand.length <= TITLE_MAX_LENGTH) {
    return fullWithBrand;
  }

  const fullWithShortBrand = `${baseTitle}${shortBrandSuffix}`;
  if (fullWithShortBrand.length <= TITLE_MAX_LENGTH) {
    return fullWithShortBrand;
  }

  const availableBaseLength = TITLE_MAX_LENGTH - shortBrandSuffix.length;
  const truncatedBase = truncateForTitle(baseTitle, availableBaseLength);
  return `${truncatedBase}${shortBrandSuffix}`;
};

const SEO = ({
  title,
  description,
  path = "/",
  image,
  breadcrumbs,
  structuredData,
  canonicalPath,
  canonicalUrl,
  noindex,
  robots,
}: SEOProps) => {
  const fullTitle = buildTitleTag(title);
  const canonicalSource = canonicalUrl ?? canonicalPath ?? path;
  const canonicalHref = isAbsoluteUrl(canonicalSource)
    ? normalizeCanonicalHref(canonicalSource)
    : buildAbsoluteUrl(normalizeCanonicalHref(canonicalSource));
  const url = canonicalHref;
  const robotsContent = robots ?? (noindex ? "noindex, nofollow" : undefined);
  const imageSource = image || DEFAULT_OG_IMAGE;
  const ogImageUrl = isAbsoluteUrl(imageSource)
    ? imageSource
    : buildAbsoluteUrl(imageSource);
  const breadcrumbJsonLd = breadcrumbs
    ? buildBreadcrumbJsonLd(breadcrumbs)
    : null;
  const structuredDataPayload = Array.isArray(structuredData)
    ? structuredData.filter(Boolean)
    : structuredData
    ? [structuredData]
    : [];
  const jsonLdGraphPayload =
    structuredDataPayload.length > 1
      ? {
          "@context": "https://schema.org",
          "@graph": structuredDataPayload.map((schema) => {
            if (schema["@context"] !== "https://schema.org") return schema;
            const { ["@context"]: _context, ...rest } = schema;
            return rest;
          }),
        }
      : structuredDataPayload[0] ?? null;

  return (
    <Helmet defer={false}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {robotsContent && <meta name="robots" content={robotsContent} />}
      
      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          key={`breadcrumbs-${path}`}
        >
          {breadcrumbJsonLd}
        </script>
      )}
      {jsonLdGraphPayload && (
        <script
          key={`structured-data-${path}`}
          type="application/ld+json"
        >
          {JSON.stringify(jsonLdGraphPayload)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
