import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = join(process.cwd(), "src");

// Modules whose runtime exports carry full article or review bodies. Client
// components must receive trimmed props from a server component instead.
const SERVER_ONLY_DATA = ["@/data/blogPosts", "@/data/communityImpactPosts"];

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.tsx?$/.test(entry) && !entry.endsWith(".test.ts") ? [full] : [];
  });

const isClientModule = (source: string) =>
  /^\s*(?:\/\/[^\n]*\n\s*)*["']use client["']/.test(source);

describe("client component boundary", () => {
  it("never imports article data into client components at runtime", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles(SRC)) {
      const source = readFileSync(file, "utf8");
      if (!isClientModule(source)) continue;

      for (const specifier of SERVER_ONLY_DATA) {
        const runtimeImport = new RegExp(
          `import\\s+(?!type\\b)[^;]*from\\s+["']${specifier}["']`
        );
        if (runtimeImport.test(source)) {
          offenders.push(`${relative(SRC, file)} imports ${specifier}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });
});

describe("contact details", () => {
  it("come from the shared constants instead of being typed into pages", () => {
    const allowed = new Set(["lib/constants.ts", "lib/siteMetadata.ts"]);
    const offenders = sourceFiles(SRC)
      .filter((file) => !allowed.has(relative(SRC, file)))
      .filter((file) =>
        /info@practicetransitions\.com|\(833\) ?784-1121|\+?1?8337841121/.test(
          readFileSync(file, "utf8")
        )
      )
      .map((file) => relative(SRC, file));

    expect(offenders).toEqual([]);
  });
});
