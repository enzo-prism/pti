import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import {
  LOGO_COMPACT_WHITE,
  LOGO_MARK_BLUE,
  LOGO_MARK_BLUE_RASTER,
  LOGO_STACKED_BLUE,
} from "@/lib/brandLogos";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(tsx?|css)$/.test(entry) && !entry.endsWith(".test.ts")
      ? [full]
      : [];
  });

const publicPath = (src: string) => join(ROOT, "public", src.replace(/^\//, ""));

describe("gold accent tokens and logo usage", () => {
  it("registers gold as named Tailwind colors, not primary", () => {
    const tailwind = readFileSync(join(ROOT, "tailwind.config.ts"), "utf8");
    const css = readFileSync(join(SRC, "app/globals.css"), "utf8");

    expect(css).toContain("--pti-gold: #C4A35A");
    expect(css).toContain("--pti-gold-text: #7A5F17");
    expect(css).toContain("--pti-gold-tint: #F8F4EB");
    expect(css).toContain("--pti-gold-hairline:");
    expect(css).toContain("--primary: 209 90% 25%");

    expect(tailwind).toMatch(/primary:\s*\{[^}]*DEFAULT:\s*'#06437A'/);
    expect(tailwind).toContain("'pti-gold'");
    expect(tailwind).not.toMatch(/primary:[\s\S]*C4A35A/);
  });

  it("keeps gold off body, heading, nav, and button text", () => {
    const offenders: string[] = [];

    for (const file of sourceFiles(SRC)) {
      const source = readFileSync(file, "utf8");
      const rel = relative(SRC, file);

      if (/(?:class(?:Name)?|=)[^"'`\n]*text-pti-gold(?!-text)/.test(source)) {
        offenders.push(`${rel}: text-pti-gold`);
      }
      if (source.includes("text-[#C4A35A]") || source.includes("text-[#c4a35a]")) {
        offenders.push(`${rel}: literal gold text color`);
      }
      if (
        /<(?:Button|button)[^>]*className=["'][^"']*(?:bg-pti-gold|text-pti-gold)/.test(
          source,
        )
      ) {
        offenders.push(`${rel}: gold button`);
      }
    }

    expect(offenders).toEqual([]);
  });

  it("ships the approved blue and reversed logos used in chrome", () => {
    for (const asset of [
      LOGO_MARK_BLUE.src,
      LOGO_MARK_BLUE_RASTER.src,
      LOGO_STACKED_BLUE.src,
      LOGO_COMPACT_WHITE.src,
    ]) {
      expect(existsSync(publicPath(asset)), asset).toBe(true);
    }

    const navbar = readFileSync(join(SRC, "components/layout/Navbar.tsx"), "utf8");
    const hero = readFileSync(join(SRC, "components/ui/hero-content.tsx"), "utf8");
    const footer = readFileSync(join(SRC, "components/layout/Footer.tsx"), "utf8");
    const layout = readFileSync(join(SRC, "app/layout.tsx"), "utf8");

    expect(navbar).toContain("LOGO_MARK_BLUE");
    expect(navbar).toContain("border-pti-gold-hairline");
    expect(hero).toContain("LOGO_STACKED_BLUE");
    expect(footer).toContain("LOGO_COMPACT_WHITE");
    expect(footer).not.toMatch(/bg-white p-1\.5/);
    expect(layout).toContain('const ICON_VERSION = "4"');
  });
});
