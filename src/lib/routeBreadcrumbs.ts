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
  "/services/selling-to-a-dso": [
    HOME_CRUMB,
    { name: "Services", path: "/services" },
    { name: "Selling to a DSO", path: "/services/selling-to-a-dso" },
  ],
  "/services/buying": [
    HOME_CRUMB,
    { name: "Services", path: "/services" },
    { name: "Buying a Practice", path: "/services/buying" },
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
  "/gallery": [
    HOME_CRUMB,
    { name: "Gallery", path: "/gallery" },
  ],
  "/events": [
    HOME_CRUMB,
    { name: "Events", path: "/events" },
  ],
  "/events/leadership-retreat": [
    HOME_CRUMB,
    { name: "Events", path: "/events" },
    { name: "Leadership Retreat", path: "/events/leadership-retreat" },
  ],
  "/events/practice-transition-seminar": [
    HOME_CRUMB,
    { name: "Events", path: "/events" },
    {
      name: "Practice Transitions Seminar",
      path: "/events/practice-transition-seminar",
    },
  ],
  "/blog": [
    HOME_CRUMB,
    { name: "Blog", path: "/blog" },
  ],
  "/resources": [
    HOME_CRUMB,
    { name: "Resources", path: "/resources" },
  ],
  "/resources/practice-sale-readiness-checklist": [
    HOME_CRUMB,
    { name: "Resources", path: "/resources" },
    {
      name: "Practice Sale Readiness Checklist",
      path: "/resources/practice-sale-readiness-checklist",
    },
  ],
  "/resources/how-much-is-my-dental-practice-worth": [
    HOME_CRUMB,
    { name: "Resources", path: "/resources" },
    {
      name: "How Much Is My Dental Practice Worth?",
      path: "/resources/how-much-is-my-dental-practice-worth",
    },
  ],
  "/resources/dental-practice-transitions-handbook": [
    HOME_CRUMB,
    { name: "Resources", path: "/resources" },
    {
      name: "Dental Practice Transitions Handbook",
      path: "/resources/dental-practice-transitions-handbook",
    },
  ],
  "/resources/second-book": [
    HOME_CRUMB,
    { name: "Resources", path: "/resources" },
    { name: "Handbook, Second Edition (Coming Soon)", path: "/resources/second-book" },
  ],
  "/resources/navigating-dental-insurance-podcast": [
    HOME_CRUMB,
    { name: "Resources", path: "/resources" },
    {
      name: "Navigating Dental Insurance Podcast",
      path: "/resources/navigating-dental-insurance-podcast",
    },
  ],
  "/locations": [
    HOME_CRUMB,
    { name: "Locations", path: "/locations" },
  ],
  "/locations/california": [
    HOME_CRUMB,
    { name: "Locations", path: "/locations" },
    { name: "California", path: "/locations/california" },
  ],
  "/locations/texas": [
    HOME_CRUMB,
    { name: "Locations", path: "/locations" },
    { name: "Texas", path: "/locations/texas" },
  ],
  "/locations/florida": [
    HOME_CRUMB,
    { name: "Locations", path: "/locations" },
    { name: "Florida", path: "/locations/florida" },
  ],
  "/faq": [
    HOME_CRUMB,
    { name: "FAQ", path: "/faq" },
  ],
  "/contact": [
    HOME_CRUMB,
    { name: "Contact", path: "/contact" },
  ],
  "/privacy-policy": [
    HOME_CRUMB,
    { name: "Privacy Policy", path: "/privacy-policy" },
  ],
  "/terms-of-service": [
    HOME_CRUMB,
    { name: "Terms of Service", path: "/terms-of-service" },
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
