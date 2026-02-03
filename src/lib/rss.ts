import { blogPosts } from "../data/blogPosts";
import {
  SITE_NAME,
  BUSINESS_DESCRIPTION,
  buildAbsoluteUrl,
} from "./siteMetadata";

const RSS_DESCRIPTION =
  "Expert insights on dental practice valuation, sales, ownership transitions, and growth strategies from PTI.";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

const formatRssDate = (dateString: string) =>
  new Date(dateString).toUTCString();

const resolvePostDate = (postDate: string) =>
  formatRssDate(`${postDate}T00:00:00Z`);

const getLatestPostDate = () => {
  const datedPosts = blogPosts
    .filter((post) => post.slug)
    .map((post) => new Date(`${post.date}T00:00:00Z`))
    .filter((date) => Number.isFinite(date.getTime()));

  if (!datedPosts.length) {
    return new Date().toUTCString();
  }

  const latest = datedPosts.reduce((max, current) =>
    current > max ? current : max
  );
  return latest.toUTCString();
};

export const buildBlogRssXml = () => {
  const channelTitle = `${SITE_NAME} Blog`;
  const channelLink = buildAbsoluteUrl("/blog");
  const channelDescription = RSS_DESCRIPTION || BUSINESS_DESCRIPTION;

  const items = blogPosts
    .filter((post) => post.slug)
    .map((post) => {
      const postUrl = buildAbsoluteUrl(`/blog/${post.slug}`);
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${resolvePostDate(post.date)}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${channelLink}</link>
    <description>${escapeXml(channelDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${getLatestPostDate()}</lastBuildDate>${items}
  </channel>
</rss>`;
};
