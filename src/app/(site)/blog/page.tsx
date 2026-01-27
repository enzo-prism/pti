import type { Metadata } from "next";
import Blog from "@/views/Blog";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Dental Practice Transition Blog";
const description =
  "Insights and guidance on dental practice valuation, sales, and ownership transitions from PTI experts.";

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
  });
}

export default function Page({
  searchParams,
}: {
  searchParams?: BlogSearchParams;
}) {
  const query = resolveSearchQuery(searchParams);

  return (
    <>
      <StructuredData data={buildPageJsonLd({ title, description, path: "/blog" })} />
      <Blog initialQuery={query} />
    </>
  );
}
