
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
  breadcrumbs?: BreadcrumbNode[];
  structuredData?: JsonLdShape | JsonLdShape[] | null;
}

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value);

const SEO = ({
  title,
  description,
  path = "/",
  image,
  breadcrumbs,
  structuredData,
}: SEOProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = buildAbsoluteUrl(path);
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
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
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
