// scripts/write-build-info.ts
// Legacy build step retained for compatibility with existing CI/build scripts.
// Writes a small build-info file into /public for debugging deployments.

import fs from "node:fs";
import path from "node:path";

type BuildInfo = {
  buildTimestamp: number;
  buildIso: string;
  gitSha?: string;
};

const buildTimestamp = Date.now();
const buildIso = new Date(buildTimestamp).toISOString();

const buildInfo: BuildInfo = {
  buildTimestamp,
  buildIso,
  gitSha: process.env.GITHUB_SHA || process.env.COMMIT_REF || process.env.VERCEL_GIT_COMMIT_SHA,
};

const publicDir = path.resolve(process.cwd(), "public");
fs.mkdirSync(publicDir, { recursive: true });

const outPath = path.join(publicDir, "build-info.json");
fs.writeFileSync(outPath, JSON.stringify(buildInfo, null, 2));

// eslint-disable-next-line no-console
console.log(`[write-build-info] Wrote ${outPath}`);
