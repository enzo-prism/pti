#!/usr/bin/env tsx

import fs from "fs";
import { parse as parseUrl } from "url";
import { getPrerenderRoutes } from "./route-config";

const packageContents = fs.readFileSync("package.json", "utf8");
const packageJson = JSON.parse(packageContents);
const reactSnapConfig = { ...(packageJson.reactSnap ?? {}) };
delete reactSnapConfig._note;

const include = await getPrerenderRoutes();
const publicUrl = process.env.PUBLIC_URL || packageJson.homepage;
const publicPath = publicUrl ? parseUrl(publicUrl).pathname || "/" : "/";

const reactSnapModule = await import("react-snap");
const run = reactSnapModule.run ?? reactSnapModule.default?.run;

if (typeof run !== "function") {
  throw new Error("react-snap run export not found");
}

await run({
  publicPath,
  ...reactSnapConfig,
  include,
});

console.log(`react-snap complete (${include.length} routes)`);
