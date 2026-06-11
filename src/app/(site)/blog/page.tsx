import type { Metadata } from "next";
import Blog from "@/views/Blog";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildBlogItemListSchema } from "@/lib/structuredData";
import { blogPosts, toBlogPostSummary } from "@/data/blogPosts";

const title = "Dental Practice Transition Blog & Insights";
const description =
  "Expert insights on dental practice valuation, sales, ownership transitions, and growth strategies from PTI.";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/blog",
  rssPath: "/blog/rss.xml",
});

export default function Page() {
  const blogListSchema = buildBlogItemListSchema();
  const summaries = blogPosts.map(toBlogPostSummary);

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
      <Blog posts={summaries} />
    </>
  );
}
