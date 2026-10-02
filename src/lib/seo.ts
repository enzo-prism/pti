import type { Metadata } from "next";
import type { BreadcrumbNode } from "@/lib/breadcrumbs";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getBreadcrumbsForPath } from "@/lib/routeBreadcrumbs";
import type { JsonLdShape, WebPageType } from "@/lib/structuredData";
import {
  buildBusinessSchema,
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

/**
 * Append the brand when it fits within TITLE_MAX_LENGTH, preferring the full
 * name, then "PTI". Titles are never cut mid-phrase: a title too long for any
 * suffix is used as written, and route/post tests keep authored titles short.
 */
export const buildTitleTag = (rawTitle: string): string => {
  const baseTitle = normalizeTitleWhitespace(rawTitle);
  if (!baseTitle) return SITE_NAME;
  const baseLower = baseTitle.toLowerCase();
  const hasBrand =
    baseLower.includes(SITE_NAME.toLowerCase()) ||
    /\bpti\b/.test(baseLower);

  if (hasBrand) {
    return baseTitle;
  }

  for (const brand of [SITE_NAME, SHORT_SITE_NAME]) {
    const withBrand = `${baseTitle} | ${brand}`;
    if (withBrand.length <= TITLE_MAX_LENGTH) {
      return withBrand;
    }
  }

  return baseTitle;
};

const resolveAbsoluteUrl = (value: string): string =>
  isAbsoluteUrl(value) ? value : buildAbsoluteUrl(value);

const buildRobotsMetadata = (noindex?: boolean): Metadata["robots"] => {
  const deploymentEnv =
    process.env.NEXT_PUBLIC_VERCEL_ENV?.trim().toLowerCase() ??
    process.env.VERCEL_ENV?.trim().toLowerCase();
  const isProduction = deploymentEnv
    ? deploymentEnv === "production"
    : process.env.NODE_ENV === "production";
  const shouldIndex = isProduction && !noindex;
  // A noindexed production page still passes its links on; previews do not.
  const shouldFollow = isProduction;

  return {
    index: shouldIndex,
    follow: shouldFollow,
    googleBot: {
      index: shouldIndex,
      follow: shouldFollow,
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
  rssPath?: string;
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
    rssPath,
    ogType = "website",
    noindex,
    author,
    article,
  } = input;
  const canonical = normalizePathname(canonicalPath ?? path);
  const fullTitle = buildTitleTag(title);
  const imageUrl = resolveAbsoluteUrl(image ?? DEFAULT_OG_IMAGE);
  const url = buildAbsoluteUrl(canonical);

  const alternates: Metadata["alternates"] = {
    canonical,
  };

  if (rssPath) {
    alternates.types = {
      ...(alternates.types ?? {}),
      "application/rss+xml": rssPath,
    };
  }

  const metadata: Metadata = {
    title: fullTitle,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: ogType,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
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
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
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
  /** schema.org type of the page node (defaults to WebPage). */
  pageType?: WebPageType;
  /** Extra properties merged into the page node. */
  pageProperties?: JsonLdShape;
}

export const buildPageJsonLd = ({
  title,
  description,
  path = "/",
  image,
  breadcrumbs,
  structuredData,
  pageType,
  pageProperties,
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

  const baseSchemas: JsonLdShape[] = [
    buildBusinessSchema(),
    buildWebSiteSchema(),
    buildWebPageSchema({
      url,
      name: pageTitle,
      description,
      image: imageUrl,
      type: pageType,
      properties: pageProperties,
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
