import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

interface VercelRedirect {
  source: string;
  destination: string;
  permanent: boolean;
  has?: Array<{ type: string; value: string }>;
}

const APEX = "https://practicetransitionsinstitute.com";
const { redirects } = JSON.parse(
  readFileSync(join(process.cwd(), "vercel.json"), "utf8")
) as { redirects: VercelRedirect[] };

const legacyRedirects = redirects.filter((redirect) => !redirect.has);

describe("vercel.json redirects", () => {
  it("sends every legacy path to its final page in one permanent hop", () => {
    const sources = new Set(redirects.map((redirect) => redirect.source));
    const livePaths = new Set(sitemap().map((entry) => entry.url.replace(APEX, "") || "/"));

    for (const redirect of legacyRedirects) {
      expect(redirect.permanent, redirect.source).toBe(true);
      // Absolute apex destinations mean a www request needs no second hop.
      expect(redirect.destination.startsWith(`${APEX}/`), redirect.source).toBe(true);

      const path = redirect.destination.replace(APEX, "");
      expect(sources.has(path), `${redirect.source} → ${path} chains`).toBe(false);
      if (!path.includes(":")) {
        expect(livePaths.has(path), `${redirect.source} → ${path} is not a live page`).toBe(
          true
        );
      }
    }
  });

  it("matches legacy paths with and without a trailing slash", () => {
    const sources = new Set(legacyRedirects.map((redirect) => redirect.source));
    for (const source of sources) {
      const twin = source.endsWith("/") ? source.slice(0, -1) : `${source}/`;
      expect(sources.has(twin), `${source} has no ${twin} twin`).toBe(true);
    }
  });

  it("applies legacy paths before the www host redirect", () => {
    const hostIndex = redirects.findIndex((redirect) => redirect.has);
    expect(hostIndex).toBe(redirects.length - 1);
    expect(redirects[hostIndex]).toMatchObject({
      source: "/:path*",
      destination: `${APEX}/:path*`,
      permanent: true,
      has: [{ type: "host", value: "www.practicetransitionsinstitute.com" }],
    });
  });
});

describe("llms.txt", () => {
  it("links only to live pages and covers every indexed static route", () => {
    const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");
    const linked = new Set(
      [...llms.matchAll(/\]\((https:\/\/practicetransitionsinstitute\.com[^)]*)\)/g)].map(
        (match) => match[1].replace(APEX, "") || "/"
      )
    );
    const entries = sitemap().map((entry) => entry.url.replace(APEX, "") || "/");
    const staticRoutes = entries.filter((path) => !path.startsWith("/blog/"));
    const allowedExtras = new Set(["/sitemap.xml", "/robots.txt", "/blog/rss.xml"]);

    for (const path of linked) {
      expect(entries.includes(path) || allowedExtras.has(path), `${path} is not live`).toBe(
        true
      );
    }
    const missing = staticRoutes.filter(
      (path) => !linked.has(path) && path !== "/events/leadership-retreat"
    );
    expect(missing).toEqual([]);
  });
});
