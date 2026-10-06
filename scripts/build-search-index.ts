/**
 * Build-time search index generator.
 *
 * Run via the `prebuild` npm script so `public/search-index.json` regenerates
 * on every build. Imports the content datasets server-side only and writes
 * trimmed records ({ title, excerpt, url, type }); no full post bodies are
 * ever written to the JSON.
 *
 * Usage: node --experimental-strip-types scripts/build-search-index.ts
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { buildSearchIndex } from "../src/lib/searchIndex.ts";

const root = process.cwd();

function main(): void {
  const records = buildSearchIndex();
  const outputPath = path.join(root, "public", "search-index.json");
  writeFileSync(outputPath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
  console.log(`Wrote ${records.length} search records to ${outputPath}`);
}

main();
