export type StaticRoute = {
  path: string;
  changefreq: string;
  priority: number;
};

export const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/services", changefreq: "weekly", priority: 0.9 },
  { path: "/services/value", changefreq: "weekly", priority: 0.9 },
  { path: "/services/selling", changefreq: "weekly", priority: 0.9 },
  { path: "/services/associateships", changefreq: "weekly", priority: 0.9 },
  { path: "/services/partnerships", changefreq: "weekly", priority: 0.9 },
  { path: "/blog", changefreq: "daily", priority: 0.8 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
  { path: "/drnjo", changefreq: "monthly", priority: 0.7 },
  { path: "/events", changefreq: "weekly", priority: 0.7 },
  { path: "/testimonials", changefreq: "monthly", priority: 0.7 },
  { path: "/faq", changefreq: "monthly", priority: 0.7 },
  { path: "/contact", changefreq: "monthly", priority: 0.7 },
  { path: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changefreq: "yearly", priority: 0.3 },
];

export const PRERENDER_ONLY_ROUTES = ["/404"];

type BlogPostShape = {
  slug?: string;
  date?: string;
  lastmod?: string;
};

const normalizeRoute = (route: string): string => {
  if (!route) return "/";
  const withLeadingSlash = route.startsWith("/") ? route : `/${route}`;
  if (withLeadingSlash === "/") return "/";
  return withLeadingSlash.replace(/\/+$/, "");
};

const uniqueRoutes = (routes: string[]): string[] => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const route of routes) {
    const normalized = normalizeRoute(route);
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
  }

  return result;
};

export const getBlogPosts = async (): Promise<BlogPostShape[]> => {
  try {
    const blogData = await import("../src/data/blogPosts.js");
    const posts = blogData.blogPosts ?? blogData.default ?? [];
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.warn("Warning: could not import blog posts, using empty list.");
    return [];
  }
};

export const getBlogRoutes = async (): Promise<string[]> => {
  const blogPosts = await getBlogPosts();
  const routes = blogPosts
    .map((post) => (post?.slug ? `/blog/${post.slug}` : ""))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  return uniqueRoutes(routes);
};

export const getPrerenderRoutes = async (): Promise<string[]> => {
  const blogRoutes = await getBlogRoutes();
  return uniqueRoutes([
    ...STATIC_ROUTES.map((route) => route.path),
    ...blogRoutes,
    ...PRERENDER_ONLY_ROUTES,
  ]);
};
