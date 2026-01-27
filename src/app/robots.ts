import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL, buildAbsoluteUrl } from "@/lib/siteMetadata";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

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
