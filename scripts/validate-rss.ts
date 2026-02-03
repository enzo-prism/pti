import { buildBlogRssXml } from "../src/lib/rss.ts";

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
