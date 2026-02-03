import type { Metadata } from "next";
import Blog from "@/views/Blog";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildBlogItemListSchema } from "@/lib/structuredData";

const title = "Dental Practice Transition Blog & Insights";
const description =
  "Expert insights on dental practice valuation, sales, ownership transitions, and growth strategies from PTI.";

type BlogSearchParams = {
  search?: string | string[];
};

const resolveSearchQuery = (searchParams?: BlogSearchParams): string => {
  if (!searchParams?.search) return "";
  if (Array.isArray(searchParams.search)) {
    return searchParams.search[0] ?? "";
  }
  return searchParams.search;
};

export function generateMetadata({
  searchParams,
}: {
  searchParams?: BlogSearchParams;
}): Metadata {
  const query = resolveSearchQuery(searchParams).trim();

  return buildPageMetadata({
    title,
    description,
    path: "/blog",
    noindex: Boolean(query),
    rssPath: "/blog/rss.xml",
  });
}

export default function Page({
  searchParams,
}: {
  searchParams?: BlogSearchParams;
}) {
  const query = resolveSearchQuery(searchParams);
  const blogListSchema = buildBlogItemListSchema();

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/blog",
          structuredData: blogListSchema,
        })}
      />
      <Blog initialQuery={query} />
    </>
  );
}
