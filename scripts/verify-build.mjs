#!/usr/bin/env node

import fs from "fs";
import path from "path";

const DIST_DIR = path.resolve("dist");
const DIST_SITEMAP = path.join(DIST_DIR, "sitemap.xml");

const failures = [];

const recordFailure = (message) => {
  failures.push(message);
};

const walk = (dir) => {
  const entries = fs.readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const absolutePath = path.join(dir, entry);
    const stats = fs.statSync(absolutePath);
    if (stats.isDirectory()) files.push(...walk(absolutePath));
    else files.push(absolutePath);
  }
  return files;
};

const countMatches = (html, pattern) => (html.match(pattern) ?? []).length;

const extractTitle = (html) => {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match?.[1]?.trim() ?? "";
};

const countTitleTags = (html) => countMatches(html, /<title\b/gi);

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

const countMetaDescriptions = (html) =>
  countMatches(html, /<meta\b[^>]*\bname=["']description["'][^>]*>/gi);

const countCanonicalLinks = (html) =>
  countMatches(html, /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi);

const extractRobots = (html) => {
  const match =
    html.match(
      /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i
    ) ??
    html.match(
      /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']robots["'][^>]*>/i
    );
  return match?.[1]?.trim() ?? "";
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

const extractJsonLdScripts = (html) => {
  const matches = [];
  const regex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(regex)) {
    const raw = match[1] ?? "";
    const trimmed = raw.trim();
    if (trimmed) matches.push(trimmed);
  }
  return matches;
};

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

if (!fs.existsSync(DIST_DIR)) {
  console.error(`dist/ not found: ${DIST_DIR}`);
  process.exit(1);
}

const allFiles = walk(DIST_DIR);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));

if (!htmlFiles.length) {
  recordFailure("No HTML files found in dist/");
}

const htmlByPath = new Map();
for (const filePath of htmlFiles) {
  htmlByPath.set(filePath, fs.readFileSync(filePath, "utf8"));
}

const robotsPath = path.join(DIST_DIR, "robots.txt");
if (!fs.existsSync(robotsPath)) {
  recordFailure(`robots.txt not found in dist/: ${robotsPath}`);
} else {
  const content = fs.readFileSync(robotsPath, "utf8");
  if (!content.trim()) {
    recordFailure("robots.txt is empty");
  }
  if (!/User-agent\s*:/i.test(content)) {
    recordFailure("robots.txt missing User-agent directive");
  }
}

const llmsPath = path.join(DIST_DIR, "llms.txt");
if (!fs.existsSync(llmsPath)) {
  recordFailure(`llms.txt not found in dist/: ${llmsPath}`);
} else {
  const content = fs.readFileSync(llmsPath, "utf8");
  if (!content.trim()) {
    recordFailure("llms.txt is empty");
  }
  if (!content.includes("Practice Transitions Institute")) {
    recordFailure("llms.txt missing site name");
  }
  if (!/https:\/\/practicetransitionsinstitute\.com/i.test(content)) {
    recordFailure("llms.txt missing canonical domain");
  }
  if (!/info@practicetransitions\.com/i.test(content)) {
    recordFailure("llms.txt missing contact email");
  }
  if (!/\+1[- ]?833[- ]?784[- ]?1121/.test(content)) {
    recordFailure("llms.txt missing contact phone");
  }
}

let sitemapXml = "";
let sitemapLocs = [];

if (!fs.existsSync(DIST_SITEMAP)) {
  recordFailure(`sitemap.xml not found in dist/: ${DIST_SITEMAP}`);
} else {
  const sitemapBuffer = fs.readFileSync(DIST_SITEMAP);
  if (sitemapBuffer[0] !== 60) {
    recordFailure('sitemap.xml must start with "<" (no BOM/whitespace)');
  }

  sitemapXml = sitemapBuffer.toString("utf-8");
  if (!sitemapXml.includes("<?xml") || !sitemapXml.includes("<urlset")) {
    recordFailure("sitemap.xml missing XML declaration or <urlset> element");
  }

  const locRegex = /<loc>([^<]+)<\/loc>/gi;
  sitemapLocs = [];
  for (const match of sitemapXml.matchAll(locRegex)) {
    const loc = match[1]?.trim();
    if (loc) sitemapLocs.push(loc);
  }

  if (!sitemapLocs.length) {
    recordFailure("No <loc> URLs found in dist/sitemap.xml");
  }
}

const titlesByValue = new Map();
for (const filePath of htmlFiles) {
  if (filePath.endsWith(`${path.sep}200.html`)) continue;
  const html = htmlByPath.get(filePath) ?? "";
  const titleCount = countTitleTags(html);
  if (titleCount !== 1) {
    recordFailure(`Expected exactly 1 <title> tag in ${filePath}, found ${titleCount}`);
  }

  const metaDescriptionCount = countMetaDescriptions(html);
  if (metaDescriptionCount > 1) {
    recordFailure(
      `Expected at most 1 meta description tag in ${filePath}, found ${metaDescriptionCount}`
    );
  }

  const canonicalCount = countCanonicalLinks(html);
  if (canonicalCount > 1) {
    recordFailure(
      `Expected at most 1 canonical link tag in ${filePath}, found ${canonicalCount}`
    );
  }

  const title = extractTitle(html);
  if (!title) continue;
  const list = titlesByValue.get(title) ?? [];
  list.push(filePath);
  titlesByValue.set(title, list);
}

for (const [title, files] of titlesByValue.entries()) {
  if (files.length > 1) {
    recordFailure(
      `Duplicate <title> value detected (${files.length}): ${title} -> ${files.join(", ")}`
    );
  }
}

const descriptionsByValue = new Map();
for (const filePath of htmlFiles) {
  if (filePath.endsWith(`${path.sep}200.html`)) continue;
  const html = htmlByPath.get(filePath) ?? "";
  const robots = extractRobots(html).toLowerCase();
  if (robots.includes("noindex")) continue;

  const descriptionCount = countMetaDescriptions(html);
  if (descriptionCount !== 1) {
    recordFailure(
      `Expected exactly 1 meta description tag in ${filePath}, found ${descriptionCount}`
    );
  }

  const canonicalCount = countCanonicalLinks(html);
  if (canonicalCount !== 1) {
    recordFailure(
      `Expected exactly 1 canonical link tag in ${filePath}, found ${canonicalCount}`
    );
  }

  const description = extractMetaDescription(html);
  if (!description) {
    recordFailure(`Missing meta description in ${filePath}`);
    continue;
  }

  const list = descriptionsByValue.get(description) ?? [];
  list.push(filePath);
  descriptionsByValue.set(description, list);
}

for (const [description, files] of descriptionsByValue.entries()) {
  if (files.length > 1) {
    recordFailure(
      `Duplicate meta description detected (${files.length}): ${description} -> ${files.join(", ")}`
    );
  }
}

const notFoundPath = path.join(DIST_DIR, "404.html");
if (fs.existsSync(notFoundPath)) {
  const html = fs.readFileSync(notFoundPath, "utf8");
  const title = extractTitle(html);
  const robots = extractRobots(html).toLowerCase();

  if (!title || !title.includes("404")) {
    recordFailure(`dist/404.html title should contain "404" (got: ${JSON.stringify(title)})`);
  }

  if (!robots.includes("noindex")) {
    recordFailure(`dist/404.html should be noindex (got: ${JSON.stringify(robots)})`);
  }
}

if (sitemapLocs.length) {
  for (const loc of sitemapLocs) {
    let url;
    try {
      url = new URL(loc);
    } catch {
      recordFailure(`Invalid URL in sitemap.xml: ${loc}`);
      continue;
    }

    const pathname = normalizePathname(url.pathname);
    const expectedFile =
      pathname === "/"
        ? path.join(DIST_DIR, "index.html")
        : path.join(DIST_DIR, pathname.slice(1), "index.html");

    if (!fs.existsSync(expectedFile)) {
      recordFailure(`Missing prerendered file for ${loc}: ${expectedFile}`);
      continue;
    }

    const html = htmlByPath.get(expectedFile) ?? fs.readFileSync(expectedFile, "utf8");
    const canonical = extractCanonical(html);
    const title = extractTitle(html);
    const description = extractMetaDescription(html);

    if (!title) {
      recordFailure(`Missing <title> in ${expectedFile}`);
    }

    if (!description) {
      recordFailure(`Missing meta description in ${expectedFile}`);
    }

    if (!canonical) {
      recordFailure(`Missing canonical link in ${expectedFile}`);
      continue;
    }

    if (canonical !== loc) {
      recordFailure(
        `Canonical mismatch in ${expectedFile} (expected ${loc}, got ${canonical})`
      );
    }
  }
}

const SCHEMA_CONTEXTS = new Set([
  "https://schema.org",
  "http://schema.org",
  "https://schema.org/",
  "http://schema.org/",
]);

const DISALLOWED_TYPES = new Set(["Service", "Review"]);
const DISALLOWED_FIELDS = [
  "availableLanguage",
  "provider",
  "serviceType",
  "isVerified",
];

const normalizeType = (value) => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.filter((item) => typeof item === "string");
  return [];
};

const getNodes = (parsed) => {
  if (!parsed || typeof parsed !== "object") return [];
  if (Array.isArray(parsed["@graph"])) {
    return parsed["@graph"].filter((node) => node && typeof node === "object");
  }
  return [parsed];
};

let checkedScripts = 0;
for (const filePath of htmlFiles) {
  const html = htmlByPath.get(filePath) ?? "";
  const scripts = extractJsonLdScripts(html);
  let businessNodeCount = 0;

  for (const scriptContent of scripts) {
    checkedScripts += 1;
    let parsed;
    try {
      parsed = JSON.parse(scriptContent);
    } catch (error) {
      recordFailure(
        `Invalid JSON-LD in ${filePath} (JSON.parse failed): ${error?.message ?? error}`
      );
      continue;
    }

    if (!parsed || typeof parsed !== "object") continue;

    const context = parsed["@context"];
    if (typeof context === "string" && !SCHEMA_CONTEXTS.has(context)) {
      recordFailure(`Unexpected @context in ${filePath}: ${JSON.stringify(context)}`);
    }

    if ("@graph" in parsed && !Array.isArray(parsed["@graph"])) {
      recordFailure(`@graph must be an array when present in ${filePath}`);
    }

    const nodes = getNodes(parsed);
    for (const node of nodes) {
      for (const field of DISALLOWED_FIELDS) {
        if (field in node) {
          recordFailure(`Disallowed field present in ${filePath}: ${field}`);
        }
      }

      const id = typeof node["@id"] === "string" ? node["@id"] : null;
      const types = normalizeType(node["@type"]);
      const isBusinessNode = typeof id === "string" && /#business$/.test(id);
      const isLocalBusinessNode =
        types.includes("LocalBusiness") || types.includes("ProfessionalService");
      const isOrganizationNode = types.includes("Organization");
      const isBusinessType = isOrganizationNode || isLocalBusinessNode;

      if (types.some((type) => DISALLOWED_TYPES.has(type))) {
        recordFailure(
          `Disallowed @type present in ${filePath}: ${types
            .filter((type) => DISALLOWED_TYPES.has(type))
            .join(", ")}`
        );
      }

      if (isBusinessType) businessNodeCount += 1;

      if (!isBusinessNode && !isLocalBusinessNode) continue;

      if ("review" in node) {
        recordFailure(`Local business schema must not include review in ${filePath}`);
      }

      if ("aggregateRating" in node) {
        recordFailure(
          `Local business schema must not include aggregateRating in ${filePath}`
        );
      }

      if (!("name" in node)) {
        recordFailure(`Business schema missing name in ${filePath}`);
      }

      if (!("address" in node)) {
        recordFailure(`Business schema missing address in ${filePath}`);
      }

      if (types.includes("ProfessionalService")) {
        if (!("telephone" in node)) {
          recordFailure(`ProfessionalService schema missing telephone in ${filePath}`);
        }

        if (!("openingHoursSpecification" in node)) {
          recordFailure(
            `ProfessionalService schema missing openingHoursSpecification in ${filePath}`
          );
        }
      }
    }
  }

  if (scripts.length && businessNodeCount !== 1) {
    recordFailure(
      `Expected exactly 1 business schema node in ${filePath}, found ${businessNodeCount}`
    );
  }
}

if (failures.length) {
  console.error(`Build verification failed (${failures.length} issues)`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Build verification passed (${htmlFiles.length} HTML files, ${sitemapLocs.length} sitemap URLs, ${checkedScripts} JSON-LD scripts)`
);
