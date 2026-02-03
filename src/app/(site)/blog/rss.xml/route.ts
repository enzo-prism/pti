import { buildBlogRssXml } from "@/lib/rss";

export async function GET() {
  const xml = buildBlogRssXml();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
