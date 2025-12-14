#!/usr/bin/env node

/**
 * Verify basic SEO invariants in dist/ output:
 * - No duplicate <title> tags across HTML files (common truncation regression)
 * - No duplicate meta descriptions across indexable HTML files
 * - 404 page includes a 404 title and is noindex
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

const extractTitle = (html) => {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match?.[1]?.trim() ?? "";
};

const extractMetaDescription = (html) => {
  const match =
    html.match(
      /<meta[^>]*name=[\"']description[\"'][^>]*content=[\"']([^\"']*)[\"'][^>]*>/i
    ) ??
    html.match(
      /<meta[^>]*content=[\"']([^\"']*)[\"'][^>]*name=[\"']description[\"'][^>]*>/i
    );
  return match?.[1]?.trim() ?? "";
};

const extractRobots = (html) => {
  const match =
    html.match(/<meta[^>]*name=[\"']robots[\"'][^>]*content=[\"']([^\"']+)[\"'][^>]*>/i) ??
    html.match(/<meta[^>]*content=[\"']([^\"']+)[\"'][^>]*name=[\"']robots[\"'][^>]*>/i);
  return match?.[1]?.trim() ?? "";
};

if (!fs.existsSync(DIST_DIR)) {
  console.error(`❌ dist/ not found: ${DIST_DIR}`);
  process.exit(1);
}

const htmlFiles = walk(DIST_DIR).filter((file) => file.endsWith(".html"));
if (!htmlFiles.length) {
  console.error("❌ No HTML files found in dist/");
  process.exit(1);
}

const titlesByValue = new Map();
for (const filePath of htmlFiles) {
  const html = fs.readFileSync(filePath, "utf8");
  const title = extractTitle(html);
  if (!title) continue;
  const list = titlesByValue.get(title) ?? [];
  list.push(filePath);
  titlesByValue.set(title, list);
}

const duplicateTitles = [...titlesByValue.entries()].filter(([, files]) => files.length > 1);
if (duplicateTitles.length) {
  console.error(`❌ Duplicate <title> values detected (${duplicateTitles.length})`);
  for (const [title, files] of duplicateTitles) {
    console.error(`\nTITLE (${files.length}): ${title}`);
    for (const filePath of files) console.error(` - ${filePath}`);
  }
  process.exit(1);
}

const descriptionsByValue = new Map();
for (const filePath of htmlFiles) {
  if (filePath.endsWith(`${path.sep}200.html`)) continue;
  const html = fs.readFileSync(filePath, "utf8");
  const robots = extractRobots(html).toLowerCase();
  if (robots.includes("noindex")) continue;

  const description = extractMetaDescription(html);
  if (!description) {
    console.error(`❌ Missing meta description in ${filePath}`);
    process.exit(1);
  }

  const list = descriptionsByValue.get(description) ?? [];
  list.push(filePath);
  descriptionsByValue.set(description, list);
}

const duplicateDescriptions = [...descriptionsByValue.entries()].filter(([, files]) => files.length > 1);
if (duplicateDescriptions.length) {
  console.error(`❌ Duplicate meta descriptions detected (${duplicateDescriptions.length})`);
  for (const [description, files] of duplicateDescriptions) {
    console.error(`\nDESCRIPTION (${files.length}): ${description}`);
    for (const filePath of files) console.error(` - ${filePath}`);
  }
  process.exit(1);
}

const notFoundPath = path.join(DIST_DIR, "404.html");
if (fs.existsSync(notFoundPath)) {
  const html = fs.readFileSync(notFoundPath, "utf8");
  const title = extractTitle(html);
  const robots = extractRobots(html).toLowerCase();

  if (!title || !title.includes("404")) {
    console.error(`❌ dist/404.html title should contain \"404\" (got: ${JSON.stringify(title)})`);
    process.exit(1);
  }

  if (!robots.includes("noindex")) {
    console.error(`❌ dist/404.html should be noindex (got: ${JSON.stringify(robots)})`);
    process.exit(1);
  }
}

console.log(`✅ SEO verified (${htmlFiles.length} HTML files)`);
