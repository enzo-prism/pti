
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
  breadcrumbs?: BreadcrumbNode[];
  structuredData?: JsonLdShape | JsonLdShape[] | null;
}

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value);

const TITLE_MAX_LENGTH = 60;
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

const truncateAtWord = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) return value;
  const truncated = value.slice(0, maxLength - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  const safeCut =
    lastSpace > maxLength * 0.6 ? truncated.slice(0, lastSpace) : truncated;
  return `${safeCut}…`;
};

const buildTitleTag = (rawTitle: string): string => {
  const baseTitle = rawTitle.trim();
  const brandSuffix = ` | ${SITE_NAME}`;
  const shortBrandSuffix = ` | ${SHORT_SITE_NAME}`;
  const baseLower = baseTitle.toLowerCase();
  const hasBrand =
    baseLower.includes(SITE_NAME.toLowerCase()) ||
    baseLower.includes(SHORT_SITE_NAME.toLowerCase());

  if (hasBrand) {
    return truncateAtWord(baseTitle, TITLE_MAX_LENGTH);
  }

  const fullWithBrand = `${baseTitle}${brandSuffix}`;
  if (fullWithBrand.length <= TITLE_MAX_LENGTH) {
    return fullWithBrand;
  }

  const fullWithShortBrand = `${baseTitle}${shortBrandSuffix}`;
  if (fullWithShortBrand.length <= TITLE_MAX_LENGTH) {
    return fullWithShortBrand;
  }

  const availableBaseLength = TITLE_MAX_LENGTH - brandSuffix.length;
  const truncatedBase = truncateAtWord(baseTitle, availableBaseLength);
  return `${truncatedBase}${brandSuffix}`;
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
}: SEOProps) => {
  const fullTitle = buildTitleTag(title);
  const canonicalSource = canonicalUrl ?? canonicalPath ?? path;
  const canonicalHref = isAbsoluteUrl(canonicalSource)
    ? normalizeCanonicalHref(canonicalSource)
    : buildAbsoluteUrl(normalizeCanonicalHref(canonicalSource));
  const url = canonicalHref;
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

  return (
    <Helmet defer={false}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
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
      {structuredDataPayload.map((schema, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
