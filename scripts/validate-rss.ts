import { blogPosts } from "../src/data/blogPosts.ts";

const SITE_URL =
  process.env.NEXT_PUBLIC_CANONICAL_SITE_URL ??
  "https://practicetransitionsinstitute.com";
const SITE_NAME = "Practice Transitions Institute";
const RSS_DESCRIPTION =
  "Expert insights on dental practice valuation, sales, ownership transitions, and growth strategies from PTI.";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildAbsoluteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};

const resolvePostDate = (postDate: string) =>
  new Date(`${postDate}T00:00:00Z`).toUTCString();

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

const buildBlogRssXml = () => {
  const channelTitle = `${SITE_NAME} Blog`;
  const channelLink = buildAbsoluteUrl("/blog");

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
    <description>${escapeXml(RSS_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${getLatestPostDate()}</lastBuildDate>${items}
  </channel>
</rss>`;
};

const xml = buildBlogRssXml();
const itemCount = (xml.match(/<item>/g) || []).length;

console.log("rss-length", xml.length);
console.log("rss-items", itemCount);
console.log("rss-preview");
console.log(xml.slice(0, 600));

if (!xml.includes("<rss")) {
  console.error("RSS output missing <rss> root element.");
  process.exit(1);
}

if (itemCount === 0) {
  console.error("RSS output contains no <item> entries.");
  process.exit(1);
}
