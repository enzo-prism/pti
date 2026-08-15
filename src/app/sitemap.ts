import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";
import { communityImpactPosts } from "@/data/communityImpactPosts";
import { reviews } from "@/data/reviews";
import { buildAbsoluteUrl } from "@/lib/siteMetadata";

interface StaticRoute {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: string;
}

const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0, lastModified: "2026-07-02" },
  { path: "/services", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-07-02" },
  { path: "/services/value", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-02-02" },
  { path: "/services/selling", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-03-02" },
  { path: "/services/selling-to-a-dso", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-07-02" },
  { path: "/services/associateships", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-05-26" },
  { path: "/services/partnerships", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-02-02" },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/locations", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-07-12" },
  { path: "/locations/california", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-07-12" },
  { path: "/locations/texas", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-07-12" },
  { path: "/locations/florida", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-07-12" },
  { path: "/resources", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-07-12" },
  { path: "/resources/practice-sale-readiness-checklist", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-06-11" },
  { path: "/resources/how-much-is-my-dental-practice-worth", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-07-02" },
  { path: "/about", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-28" },
  { path: "/drnjo", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-06-11" },
  { path: "/events", changeFrequency: "weekly", priority: 0.7, lastModified: "2026-06-11" },
  { path: "/events/practice-transition-seminar", changeFrequency: "weekly", priority: 0.7, lastModified: "2026-05-26" },
  { path: "/events/leadership-retreat", changeFrequency: "monthly", priority: 0.6, lastModified: "2026-01-27" },
  { path: "/testimonials", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-06-16" },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.6, lastModified: "2026-05-26" },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-01-27" },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-28" },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-02-02" },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-02-02" },
];

const toUtcDate = (dateString: string) => new Date(`${dateString}T00:00:00Z`);
const allBlogPosts = [...communityImpactPosts, ...blogPosts];

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPostDate = allBlogPosts
    .map((post) => post.dateModified ?? post.date)
    .sort()
    .at(-1);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => {
    const lastModified =
      route.lastModified ?? (route.path === "/blog" ? latestPostDate : undefined);
    return {
      url: buildAbsoluteUrl(route.path),
      ...(lastModified ? { lastModified: toUtcDate(lastModified) } : {}),
      changeFrequency: route.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: route.priority,
    };
  });

  const blogEntries: MetadataRoute.Sitemap = allBlogPosts
    .filter((post) => post.slug)
    .map((post) => ({
      url: buildAbsoluteUrl(`/blog/${post.slug}`),
      lastModified: toUtcDate(post.dateModified ?? post.date),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const reviewEntries: MetadataRoute.Sitemap = reviews.map((review) => ({
    url: buildAbsoluteUrl(`/testimonials/${review.slug}`),
    ...(review.sourceDateISO
      ? { lastModified: toUtcDate(review.sourceDateISO) }
      : {}),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...reviewEntries];
}
