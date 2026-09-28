import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // Vercel and CI run in UTC; match them so date logic is tested as deployed.
    env: { TZ: "UTC" },
  },
  // Page modules are imported by metadata tests; compile their JSX the way
  // Next.js does.
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
