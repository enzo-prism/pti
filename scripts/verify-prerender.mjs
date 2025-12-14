#!/usr/bin/env node

/**
 * Verify that every URL in dist/sitemap.xml has a prerendered HTML file,
 * and that the HTML declares the expected canonical URL.
 */

import fs from "fs";
import path from "path";

const DIST_DIR = path.resolve("dist");
const SITEMAP_PATH = path.join(DIST_DIR, "sitemap.xml");

const normalizePathname = (value) => {
  const raw = (value || "/").trim();
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const withoutQueryOrHash = withLeadingSlash.split(/[?#]/, 1)[0];
  const withoutEntrypoint = withoutQueryOrHash.replace(
    /\/(?:index|200)\.html$/i,
    "/"
  );
  if (withoutEntrypoint === "/") return "/";
  return withoutEntrypoint.replace(/\/+$/, "");
};

const extractCanonical = (html) => {
  const match =
    html.match(
      /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i
    ) ??
    html.match(
      /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i
    );
  return match?.[1]?.trim() ?? "";
};

const extractTitle = (html) => {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match?.[1]?.trim() ?? "";
};

const extractMetaDescription = (html) => {
  const match =
    html.match(
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i
    ) ??
    html.match(
      /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i
    );
  return match?.[1]?.trim() ?? "";
};

if (!fs.existsSync(DIST_DIR)) {
  console.error(`❌ dist/ not found: ${DIST_DIR}`);
  process.exit(1);
}

if (!fs.existsSync(SITEMAP_PATH)) {
  console.error(`❌ sitemap.xml not found in dist/: ${SITEMAP_PATH}`);
  process.exit(1);
}

const sitemapXml = fs.readFileSync(SITEMAP_PATH, "utf8");
const locRegex = /<loc>([^<]+)<\/loc>/gi;
const locs = [];
for (const match of sitemapXml.matchAll(locRegex)) {
  const loc = match[1]?.trim();
  if (loc) locs.push(loc);
}

if (!locs.length) {
  console.error("❌ No <loc> URLs found in dist/sitemap.xml");
  process.exit(1);
}

const failures = [];

for (const loc of locs) {
  let url;
  try {
    url = new URL(loc);
  } catch {
    failures.push({ loc, reason: "Invalid URL in sitemap.xml" });
    continue;
  }

  const pathname = normalizePathname(url.pathname);
  const expectedFile =
    pathname === "/"
      ? path.join(DIST_DIR, "index.html")
      : path.join(DIST_DIR, pathname.slice(1), "index.html");

  if (!fs.existsSync(expectedFile)) {
    failures.push({ loc, reason: `Missing prerendered file: ${expectedFile}` });
    continue;
  }

  const html = fs.readFileSync(expectedFile, "utf8");
  const canonical = extractCanonical(html);
  const title = extractTitle(html);
  const description = extractMetaDescription(html);

  if (!title) {
    failures.push({ loc, reason: `Missing <title> in ${expectedFile}` });
  }

  if (!description) {
    failures.push({ loc, reason: `Missing meta description in ${expectedFile}` });
  }

  if (!canonical) {
    failures.push({ loc, reason: `Missing canonical link in ${expectedFile}` });
    continue;
  }

  if (canonical !== loc) {
    failures.push({
      loc,
      reason: `Canonical mismatch in ${expectedFile} (got ${canonical})`,
    });
  }
}

if (failures.length) {
  console.error(`❌ Prerender verification failed (${failures.length} issues)`);
  for (const failure of failures) {
    console.error(`- ${failure.loc}: ${failure.reason}`);
  }
  process.exit(1);
}

console.log(`✅ Prerender verified (${locs.length} URLs from sitemap.xml)`);
