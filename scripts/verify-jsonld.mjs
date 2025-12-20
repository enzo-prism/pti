#!/usr/bin/env node

/**
 * Verify JSON-LD scripts in dist/ HTML output:
 * - Every <script type="application/ld+json"> parses as JSON
 * - @context (when present) is schema.org
 * - @graph (when present) is an array
 *
 * This catches common structured-data "Invalid JSON" / parsing failures in crawlers.
 */

import fs from "fs";
import path from "path";

const DIST_DIR = path.resolve("dist");

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

const SCHEMA_CONTEXTS = new Set([
  "https://schema.org",
  "http://schema.org",
  "https://schema.org/",
  "http://schema.org/",
]);

if (!fs.existsSync(DIST_DIR)) {
  console.error(`❌ dist/ not found: ${DIST_DIR}`);
  process.exit(1);
}

const htmlFiles = walk(DIST_DIR).filter((file) => file.endsWith(".html"));
if (!htmlFiles.length) {
  console.error("❌ No HTML files found in dist/");
  process.exit(1);
}

const failures = [];
let checkedScripts = 0;

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

for (const filePath of htmlFiles) {
  const html = fs.readFileSync(filePath, "utf8");
  const scripts = extractJsonLdScripts(html);
  let businessNodeCount = 0;

  for (const scriptContent of scripts) {
    checkedScripts += 1;
    let parsed;
    try {
      parsed = JSON.parse(scriptContent);
    } catch (error) {
      failures.push({
        filePath,
        reason: `Invalid JSON-LD (JSON.parse failed): ${error?.message ?? error}`,
      });
      continue;
    }

    if (!parsed || typeof parsed !== "object") continue;

    const context = parsed["@context"];
    if (typeof context === "string" && !SCHEMA_CONTEXTS.has(context)) {
      failures.push({
        filePath,
        reason: `Unexpected @context: ${JSON.stringify(context)}`,
      });
    }

    if ("@graph" in parsed && !Array.isArray(parsed["@graph"])) {
      failures.push({
        filePath,
        reason: "@graph must be an array when present",
      });
    }

    const nodes = getNodes(parsed);
    for (const node of nodes) {
      for (const field of DISALLOWED_FIELDS) {
        if (field in node) {
          failures.push({
            filePath,
            reason: `Disallowed field present: ${field}`,
          });
        }
      }

      const id = typeof node["@id"] === "string" ? node["@id"] : null;
      const types = normalizeType(node["@type"]);
      const isBusinessNode =
        typeof id === "string" && /#business$/.test(id);
      const isLocalBusinessNode = types.includes("LocalBusiness") || types.includes("ProfessionalService");
      const isOrganizationNode = types.includes("Organization");
      const isBusinessType = isOrganizationNode || isLocalBusinessNode;

      if (types.some((type) => DISALLOWED_TYPES.has(type))) {
        failures.push({
          filePath,
          reason: `Disallowed @type present: ${types.filter((type) => DISALLOWED_TYPES.has(type)).join(", ")}`,
        });
      }

      if (isBusinessType) businessNodeCount += 1;

      if (!isBusinessNode && !isLocalBusinessNode) continue;

      if ("review" in node) {
        failures.push({
          filePath,
          reason: "Local business schema must not include review",
        });
      }

      if ("aggregateRating" in node) {
        failures.push({
          filePath,
          reason: "Local business schema must not include aggregateRating",
        });
      }

      if (!("name" in node)) {
        failures.push({
          filePath,
          reason: "Business schema missing name",
        });
      }

      if (!("address" in node)) {
        failures.push({
          filePath,
          reason: "Business schema missing address",
        });
      }

      if (types.includes("ProfessionalService")) {
        if (!("telephone" in node)) {
          failures.push({
            filePath,
            reason: "ProfessionalService schema missing telephone",
          });
        }

        if (!("openingHoursSpecification" in node)) {
          failures.push({
            filePath,
            reason: "ProfessionalService schema missing openingHoursSpecification",
          });
        }
      }
    }
  }

  if (scripts.length && businessNodeCount !== 1) {
    failures.push({
      filePath,
      reason: `Expected exactly 1 business schema node, found ${businessNodeCount}`,
    });
  }
}

if (failures.length) {
  console.error(`❌ JSON-LD verification failed (${failures.length} issues)`);
  for (const failure of failures) {
    console.error(`- ${failure.filePath}: ${failure.reason}`);
  }
  process.exit(1);
}

console.log(
  `✅ JSON-LD verified (${checkedScripts} scripts across ${htmlFiles.length} HTML files)`
);
