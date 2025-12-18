#!/usr/bin/env node

/**
 * Verify SEO-critical static assets exist in dist/ output:
 * - robots.txt
 * - llms.txt
 * - sitemap.xml (existence/basic sanity only; deeper validation in verify-sitemap.mjs)
 */

import fs from "fs";
import path from "path";

const DIST_DIR = path.resolve("dist");

const expect = (condition, message) => {
  if (!condition) throw new Error(message);
};

const readFile = (filePath) => fs.readFileSync(filePath, "utf8");

const checks = [
  {
    name: "robots.txt",
    filePath: path.join(DIST_DIR, "robots.txt"),
    validate: (content) => {
      expect(content.trim().length > 0, "robots.txt is empty");
      expect(
        /User-agent\s*:/i.test(content),
        "robots.txt missing User-agent directive"
      );
    },
  },
  {
    name: "llms.txt",
    filePath: path.join(DIST_DIR, "llms.txt"),
    validate: (content) => {
      expect(content.trim().length > 0, "llms.txt is empty");
      expect(
        content.includes("Practice Transitions Institute"),
        "llms.txt missing site name"
      );
      expect(
        /https:\/\/practicetransitionsinstitute\.com/i.test(content),
        "llms.txt missing canonical domain"
      );
      expect(
        /info@practicetransitions\.com/i.test(content),
        "llms.txt missing contact email"
      );
      expect(
        /\+1[- ]?833[- ]?784[- ]?1121/.test(content),
        "llms.txt missing contact phone"
      );
    },
  },
  {
    name: "sitemap.xml",
    filePath: path.join(DIST_DIR, "sitemap.xml"),
    validate: (content) => {
      expect(content.trim().length > 0, "sitemap.xml is empty");
      expect(
        content.includes("<urlset"),
        "sitemap.xml missing <urlset> root element"
      );
    },
  },
];

try {
  expect(fs.existsSync(DIST_DIR), `dist/ not found: ${DIST_DIR}`);

  for (const check of checks) {
    expect(
      fs.existsSync(check.filePath),
      `${check.name} not found in dist/: ${check.filePath}`
    );
    const content = readFile(check.filePath);
    check.validate(content);
  }

  console.log("✅ Static assets verified (robots.txt, llms.txt, sitemap.xml)");
} catch (error) {
  console.error("❌ Static assets verification failed");
  console.error(`   ${error?.message ?? error}`);
  process.exit(1);
}
