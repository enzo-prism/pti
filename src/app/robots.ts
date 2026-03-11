import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL, buildAbsoluteUrl } from "@/lib/siteMetadata";

const isProductionDeployment = () => {
  const deploymentEnv =
    process.env.NEXT_PUBLIC_VERCEL_ENV?.trim().toLowerCase() ??
    process.env.VERCEL_ENV?.trim().toLowerCase();

  if (deploymentEnv) {
    return deploymentEnv === "production";
  }

  return process.env.NODE_ENV === "production";
};

export default function robots(): MetadataRoute.Robots {
  const isProduction = isProductionDeployment();

  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
    host: CANONICAL_SITE_URL,
  };
}
