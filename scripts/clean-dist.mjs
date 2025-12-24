// scripts/clean-dist.mjs
// Ensures a deterministic clean build by removing the Vite output directory.
// Kept intentionally small to avoid build-time surprises.

import fs from "node:fs";
import path from "node:path";

const distPath = path.resolve(process.cwd(), "dist");

try {
  fs.rmSync(distPath, { recursive: true, force: true });
  // eslint-disable-next-line no-console
  console.log(`[clean-dist] Removed ${distPath}`);
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn("[clean-dist] Skipped (non-fatal)", err);
}
