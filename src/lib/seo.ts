import type { Metadata } from "next";
import type { BreadcrumbNode } from "@/lib/breadcrumbs";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getBreadcrumbsForPath } from "@/lib/routeBreadcrumbs";
import type { JsonLdShape } from "@/lib/structuredData";
import {
  buildOrganizationSchema,
  buildProfessionalServiceSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
} from "@/lib/structuredData";
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_LOCALE,
  buildAbsoluteUrl,
} from "@/lib/siteMetadata";

const TITLE_MAX_LENGTH = 65;
const SHORT_SITE_NAME = "PTI";

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value);

const normalizeTitleWhitespace = (value: string): string =>
  value.trim().replace(/\s+/g, " ");

const normalizePathname = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "/";

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const withoutQueryOrHash = withLeadingSlash.split(/[?#]/, 1)[0];
  const withoutHtmlEntrypoint = withoutQueryOrHash.replace(
    /\/(?:index|200)\.html$/i,
    "/"
  );
  if (withoutHtmlEntrypoint === "/") return "/";
  return withoutHtmlEntrypoint.replace(/\/+$/, "");
};

const truncateAtWord = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) return value;
  const truncated = value.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  const safeCut =
    lastSpace > maxLength * 0.6 ? truncated.slice(0, lastSpace) : truncated;
  return `${safeCut}...`;
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
  if (maxLength <= 1) return "...";

  const ellipsis = "...";
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

export const buildTitleTag = (rawTitle: string): string => {
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

const resolveAbsoluteUrl = (value: string): string =>
  isAbsoluteUrl(value) ? value : buildAbsoluteUrl(value);

const buildRobotsMetadata = (noindex?: boolean): Metadata["robots"] => {
  const isProduction = process.env.VERCEL_ENV === "production";
  const shouldIndex = isProduction && !noindex;

  return {
    index: shouldIndex,
    follow: shouldIndex,
    googleBot: {
      index: shouldIndex,
      follow: shouldIndex,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
};

interface PageMetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  author?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export const buildPageMetadata = (input: PageMetadataInput): Metadata => {
  const {
    title,
    description,
    path = "/",
    image,
    canonicalPath,
    ogType = "website",
    noindex,
    author,
    article,
  } = input;
  const canonical = normalizePathname(canonicalPath ?? path);
  const fullTitle = buildTitleTag(title);
  const imageUrl = resolveAbsoluteUrl(image ?? DEFAULT_OG_IMAGE);
  const url = buildAbsoluteUrl(canonical);

  const metadata: Metadata = {
    title: fullTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: ogType,
      images: [imageUrl],
      ...(ogType === "article"
        ? {
            publishedTime: article?.publishedTime,
            modifiedTime: article?.modifiedTime,
            authors: article?.author ? [article.author] : undefined,
            section: article?.section,
            tags: article?.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: buildRobotsMetadata(noindex),
  };

  const authorName = author ?? article?.author;
  if (authorName) {
    metadata.authors = [{ name: authorName }];
  }

  return metadata;
};

interface PageJsonLdInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  breadcrumbs?: BreadcrumbNode[] | null;
  structuredData?: JsonLdShape | JsonLdShape[] | null;
  includeLocalBusinessSchema?: boolean;
  enableSiteSearch?: boolean;
}

export const buildPageJsonLd = ({
  title,
  description,
  path = "/",
  image,
  breadcrumbs,
  structuredData,
  includeLocalBusinessSchema = false,
  enableSiteSearch = true,
}: PageJsonLdInput): JsonLdShape => {
  const normalizedPath = normalizePathname(path);
  const url = buildAbsoluteUrl(normalizedPath);
  const pageTitle = buildTitleTag(title);
  const imageUrl = resolveAbsoluteUrl(image ?? DEFAULT_OG_IMAGE);
  const resolvedBreadcrumbs =
    breadcrumbs ?? getBreadcrumbsForPath(normalizedPath) ?? undefined;
  const breadcrumbSchema = resolvedBreadcrumbs
    ? buildBreadcrumbSchema(resolvedBreadcrumbs)
    : null;

  const businessSchema = includeLocalBusinessSchema
    ? buildProfessionalServiceSchema()
    : buildOrganizationSchema();
  const baseSchemas: JsonLdShape[] = [
    businessSchema,
    buildWebSiteSchema({ enableSearch: enableSiteSearch }),
    buildWebPageSchema({
      url,
      name: pageTitle,
      description,
      image: imageUrl,
    }),
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
  ];

  const structuredDataPayload = Array.isArray(structuredData)
    ? structuredData.filter(Boolean)
    : structuredData
    ? [structuredData]
    : [];

  const graphItems = [...baseSchemas, ...structuredDataPayload].map(
    (schema) => {
      if (schema["@context"] !== "https://schema.org") return schema;
      const { ["@context"]: _context, ...rest } = schema;
      return rest;
    }
  );

  return {
    "@context": "https://schema.org",
    "@graph": graphItems,
  };
};
