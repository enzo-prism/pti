import { BreadcrumbNode, HOME_CRUMB } from "./breadcrumbs";

const normalizePath = (path: string) => {
  if (!path) return "/";
  if (path.length > 1 && path.endsWith("/")) {
    return path.replace(/\/+$/, "");
  }
  return path;
};

const ROUTE_BREADCRUMBS: Record<string, BreadcrumbNode[]> = {
  "/about": [
    HOME_CRUMB,
    { name: "About Us", path: "/about" },
  ],
  "/services": [
    HOME_CRUMB,
    { name: "Services", path: "/services" },
  ],
  "/services/value": [
    HOME_CRUMB,
    { name: "Services", path: "/services" },
    { name: "Opinion of Value", path: "/services/value" },
  ],
  "/services/selling": [
    HOME_CRUMB,
    { name: "Services", path: "/services" },
    { name: "Selling a Practice", path: "/services/selling" },
  ],
  "/services/associateships": [
    HOME_CRUMB,
    { name: "Services", path: "/services" },
    { name: "Associateships / Buying In", path: "/services/associateships" },
  ],
  "/services/partnerships": [
    HOME_CRUMB,
    { name: "Services", path: "/services" },
    { name: "Partnerships", path: "/services/partnerships" },
  ],
  "/testimonials": [
    HOME_CRUMB,
    { name: "Testimonials", path: "/testimonials" },
  ],
  "/events": [
    HOME_CRUMB,
    { name: "Events", path: "/events" },
  ],
  "/blog": [
    HOME_CRUMB,
    { name: "Blog", path: "/blog" },
  ],
  "/faq": [
    HOME_CRUMB,
    { name: "FAQ", path: "/faq" },
  ],
  "/contact": [
    HOME_CRUMB,
    { name: "Contact", path: "/contact" },
  ],
  "/drnjo": [
    HOME_CRUMB,
    { name: "Dr. Njo", path: "/drnjo" },
  ],
};

export const getBreadcrumbsForPath = (
  pathname: string
): BreadcrumbNode[] | null => {
  const normalized = normalizePath(pathname);
  return ROUTE_BREADCRUMBS[normalized] ?? null;
};
