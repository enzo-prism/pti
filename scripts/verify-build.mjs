// scripts/verify-build.mjs
// Lightweight sanity check for build artifacts.

import fs from "node:fs";
import path from "node:path";

const indexPath = path.resolve(process.cwd(), "dist", "index.html");

if (!fs.existsSync(indexPath)) {
  console.error(`[verify-build] Missing ${indexPath}`);
  process.exit(1);
}

const html = fs.readFileSync(indexPath, "utf8");
if (!html.includes("id=\"root\"")) {
  console.error("[verify-build] dist/index.html does not contain #root");
  process.exit(1);
}

console.log("[verify-build] OK");
