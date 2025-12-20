#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import { getPrerenderRoutes } from "./route-config";

const packagePath = path.resolve("package.json");
const packageContents = fs.readFileSync(packagePath, "utf8");
const packageJson = JSON.parse(packageContents);

const includeRoutes = await getPrerenderRoutes();

const reactSnapConfig = packageJson.reactSnap ?? {};
packageJson.reactSnap = {
  ...reactSnapConfig,
  _note:
    "When adding blog posts, run scripts/update-react-snap-routes.ts to refresh prerendered routes.",
  include: includeRoutes,
};

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");

console.log(`Updated react-snap include list with ${includeRoutes.length} routes.`);
