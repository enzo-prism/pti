// scripts/run-react-snap.ts
// Pre-render static routes after a Vite build for better SEO discoverability.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { defaultOptions, run } from "react-snap";
import { getPrerenderRoutes } from "./route-config";

type ReactSnapConfig = Partial<typeof defaultOptions> & {
  include?: string[];
};

const loadPackageReactSnapConfig = async (): Promise<ReactSnapConfig> => {
  const pkgPath = path.resolve(process.cwd(), "package.json");
  const raw = await readFile(pkgPath, "utf8");
  const parsed = JSON.parse(raw) as { reactSnap?: ReactSnapConfig };
  return parsed.reactSnap ?? {};
};

const runReactSnap = async () => {
  const [config, routes] = await Promise.all([
    loadPackageReactSnapConfig(),
    getPrerenderRoutes(),
  ]);

  const options = {
    ...defaultOptions,
    ...config,
    source: config.source ?? "dist",
    include: routes,
    crawl: false,
  };

  // eslint-disable-next-line no-console
  console.log(
    `[run-react-snap] Pre-rendering ${options.include.length} routes from ${options.source}`
  );

  await run(options);
};

runReactSnap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("[run-react-snap] Failed", error);
  process.exit(1);
});
