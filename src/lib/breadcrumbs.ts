import { buildAbsoluteUrl } from "./siteMetadata";
import type { JsonLdShape } from "./structuredData";

export interface BreadcrumbNode {
  name: string;
  path?: string;
}

export const HOME_CRUMB: BreadcrumbNode = {
  name: "Home",
  path: "/",
};

export const buildBreadcrumbJsonLd = (
  nodes: BreadcrumbNode[]
): string | null => {
  const schema = buildBreadcrumbSchema(nodes);
  return schema ? JSON.stringify(schema) : null;
};

export const shouldRenderBreadcrumbJsonLd = (nodes?: BreadcrumbNode[]) => {
  return Array.isArray(nodes) && nodes.length >= 2;
};

export const buildBreadcrumbSchema = (
  nodes: BreadcrumbNode[]
): JsonLdShape | null => {
  const normalizedNodes = nodes.filter(
    (node) => node.name && (node.path || node === nodes[nodes.length - 1])
  );

  if (normalizedNodes.length < 2) {
    return null;
  }

  const itemListElement = normalizedNodes.map((node, index) => {
    const baseData = {
      "@type": "ListItem" as const,
      position: index + 1,
      name: node.name,
    };

    if (node.path) {
      return {
        ...baseData,
        item: buildAbsoluteUrl(node.path),
      };
    }

    return baseData;
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
};
