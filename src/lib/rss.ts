import { blogPosts } from "../data/blogPosts";
import { communityImpactPosts } from "../data/communityImpactPosts";
import {
  SITE_NAME,
  BUSINESS_DESCRIPTION,
  buildAbsoluteUrl,
} from "./siteMetadata";

const RSS_DESCRIPTION =
  "Expert insights on dental practice valuation, sales, ownership transitions, and growth strategies from PTI.";

export const RSS_PATH = "/blog/rss.xml";

// Newest first, as feed readers expect; ties keep the newer id first.
const feedPosts = [...communityImpactPosts, ...blogPosts]
  .filter((post) => post.slug)
  .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toRssDate = (isoDate: string) =>
  new Date(`${isoDate}T00:00:00Z`).toUTCString();

/** The most recent publish or update date across the feed. */
const getLastBuildDate = () => {
  const latest = feedPosts
    .map((post) => post.dateModified ?? post.date)
    .sort()
    .at(-1);
  return latest ? toRssDate(latest) : new Date().toUTCString();
};

export const buildBlogRssXml = () => {
  const channelTitle = `${SITE_NAME} Blog`;
  const channelLink = buildAbsoluteUrl("/blog");
  const channelDescription = RSS_DESCRIPTION || BUSINESS_DESCRIPTION;

  const items = feedPosts
    .map((post) => {
      const postUrl = buildAbsoluteUrl(`/blog/${post.slug}`);
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${toRssDate(post.date)}</pubDate>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${channelLink}</link>
    <atom:link href="${buildAbsoluteUrl(RSS_PATH)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(channelDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${getLastBuildDate()}</lastBuildDate>${items}
  </channel>
</rss>`;
};
