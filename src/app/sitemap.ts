import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";
import { buildAbsoluteUrl } from "@/lib/siteMetadata";

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services/value", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services/selling", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services/associateships", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services/partnerships", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/drnjo", changeFrequency: "monthly", priority: 0.7 },
  { path: "/events", changeFrequency: "weekly", priority: 0.7 },
  { path: "/events/leadership-retreat", changeFrequency: "monthly", priority: 0.6 },
  { path: "/testimonials", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
];

const toBlogLastModified = (dateString: string) =>
  new Date(`${dateString}T00:00:00Z`);

const resolveBuildDate = (): Date => {
  const rawTimestamp = process.env.NEXT_PUBLIC_BUILD_TIMESTAMP;
  const numericTimestamp = rawTimestamp ? Number(rawTimestamp) : Date.now();
  return Number.isFinite(numericTimestamp)
    ? new Date(numericTimestamp)
    : new Date();
};

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = resolveBuildDate();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: buildAbsoluteUrl(route.path),
    lastModified: buildDate,
    changeFrequency: route.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.slug)
    .map((post) => ({
      url: buildAbsoluteUrl(`/blog/${post.slug}`),
      lastModified: toBlogLastModified(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticEntries, ...blogEntries];
}
