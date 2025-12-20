#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { execSync } from "child_process";

const readGit = (args: string): string => {
  try {
    return execSync(`git ${args}`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return "";
  }
};

const builtAt = new Date().toISOString();
const buildId = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
const gitSha =
  process.env.GIT_SHA?.trim() || readGit("rev-parse HEAD") || "unknown";

const envBranch =
  process.env.GIT_BRANCH?.trim() ||
  process.env.GITHUB_REF_NAME?.trim() ||
  process.env.BRANCH_NAME?.trim();
const gitBranchRaw = envBranch || readGit("rev-parse --abbrev-ref HEAD");
const gitBranch =
  gitBranchRaw && gitBranchRaw !== "HEAD" ? gitBranchRaw : "unknown";

const buildInfo = {
  buildId,
  builtAt,
  gitSha,
  gitBranch,
};

const outputDir = path.resolve("public");
const outputPath = path.join(outputDir, "build-info.json");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(buildInfo, null, 2) + "\n");

console.log(`build-info: sha=${gitSha} buildId=${buildId} builtAt=${builtAt}`);
