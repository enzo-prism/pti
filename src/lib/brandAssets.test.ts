import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import * as brandLogos from "@/lib/brandLogos";
import { LOGO_COMPACT_WHITE, LOGO_MARK_WHITE } from "@/lib/brandLogos";
import { DEFAULT_OG_IMAGE } from "@/lib/siteMetadata";
import { buildBusinessSchema } from "@/lib/structuredData";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");

const CHROME = {
  navbar: join(SRC, "components/layout/Navbar.tsx"),
  hero: join(SRC, "components/ui/hero-content.tsx"),
  footer: join(SRC, "components/layout/Footer.tsx"),
  blog: join(SRC, "views/Blog.tsx"),
} as const;

const WHITE_LOGO_SRCS = new Set<string>([
  "/lovable-uploads/pti-compact-white-gold.svg",
  "/lovable-uploads/pti-mark-white-gold.svg",
]);

type BrandLogo = { src: string; width: number; height: number };

const logoByName: Record<string, BrandLogo> = Object.fromEntries(
  Object.entries(brandLogos).flatMap(([name, value]) => {
    if (
      typeof value === "object" &&
      value !== null &&
      "src" in value &&
      "width" in value &&
      "height" in value
    ) {
      return [[name, value as BrandLogo]];
    }
    return [];
  }),
);

const publicPath = (src: string) => {
  const path = src.replace(/^\//, "").replace(/[?#].*$/, "");
  return join(PUBLIC, path);
};

const toPublicSrc = (url: string) => {
  try {
    const parsed = new URL(url, "https://practicetransitionsinstitute.com");
    return parsed.pathname;
  } catch {
    return url.split("?")[0] ?? url;
  }
};

const logoImageBlocks = (source: string) =>
  [...source.matchAll(/<Image\b[\s\S]*?\/>/g)]
    .map((match) => match[0])
    .filter((block) => /LOGO_[A-Z0-9_]*\.src|Practice Transitions Institute logo/.test(block));

const imageSourcesIn = (source: string) => {
  const fromConstants: Array<{
    name: string;
    src: string;
    width: number;
    height: number;
  }> = [];
  const literals: string[] = [];

  for (const block of logoImageBlocks(source)) {
    const constant = block.match(/src=\{\s*([A-Z][A-Z0-9_]*)\.src\s*\}/);
    const literal = block.match(/src=["']([^"']+)["']/);
    if (constant) {
      const name = constant[1];
      const logo = name ? logoByName[name] : undefined;
      expect(logo, `unknown brand logo constant ${name}`).toBeDefined();
      if (!logo || !name) {
        throw new Error(`unknown brand logo constant ${name}`);
      }
      fromConstants.push({
        name,
        src: logo.src,
        width: logo.width,
        height: logo.height,
      });
    } else if (literal) {
      literals.push(literal[1].split("?")[0] ?? literal[1]);
    }
  }
  return { fromConstants, literals };
};

const metadataIconRefs = (source: string) => {
  const refs: { src: string; sizes?: string }[] = [];
  const iconBlocks = source.matchAll(
    /url:\s*[`'"]([^`'"]+)[`'"][\s\S]*?sizes:\s*["']([^"']+)["']/g,
  );
  for (const match of iconBlocks) {
    refs.push({ src: toPublicSrc(match[1]), sizes: match[2] });
  }
  const shortcuts = source.matchAll(/shortcut:\s*\[\s*[`'"]([^`'"]+)[`'"]/g);
  for (const match of shortcuts) {
    refs.push({ src: toPublicSrc(match[1]) });
  }
  return refs;
};

describe("brand and icon files resolve on disk", () => {
  it("keeps every brand-logo constant pointed at a real file of the declared size", async () => {
    expect(Object.keys(logoByName).length).toBeGreaterThan(0);

    for (const [name, logo] of Object.entries(logoByName)) {
      expect(existsSync(publicPath(logo.src)), `${name} missing ${logo.src}`).toBe(
        true,
      );
      const meta = await sharp(publicPath(logo.src)).metadata();
      expect(meta.width, `${name} width`).toBe(logo.width);
      expect(meta.height, `${name} height`).toBe(logo.height);
    }
  });

  it("resolves metadata icons, apple-touch, 192/512, and OG to real matching files", async () => {
    const layout = readFileSync(join(SRC, "app/layout.tsx"), "utf8");
    const icons = metadataIconRefs(layout);
    const srcs = new Set(icons.map((icon) => icon.src));

    expect(srcs.has("/favicon-192.png")).toBe(true);
    expect(srcs.has("/favicon-512.png")).toBe(true);
    expect(srcs.has("/apple-touch-icon.png")).toBe(true);
    expect(existsSync(publicPath(DEFAULT_OG_IMAGE)), DEFAULT_OG_IMAGE).toBe(true);

    for (const icon of icons) {
      expect(existsSync(publicPath(icon.src)), icon.src).toBe(true);
      if (!icon.sizes || icon.sizes === "any") continue;
      const match = icon.sizes.match(/^(\d+)x(\d+)$/);
      expect(match, `${icon.src} sizes ${icon.sizes}`).not.toBeNull();
      const meta = await sharp(publicPath(icon.src)).metadata();
      expect(meta.width, icon.src).toBe(Number(match?.[1]));
      expect(meta.height, icon.src).toBe(Number(match?.[2]));
    }

    const og = await sharp(publicPath(DEFAULT_OG_IMAGE)).metadata();
    expect(og.width).toBe(1200);
    expect(og.height).toBe(630);
  });

  it("uses brand-logo constants for navbar, hero, footer and blog, and a white mark on the dark footer", async () => {
    for (const [slot, file] of Object.entries(CHROME)) {
      const source = readFileSync(file, "utf8");
      const { fromConstants, literals } = imageSourcesIn(source);
      expect(fromConstants, `${slot} has no brand-logo Image src`).not.toHaveLength(0);
      expect(literals, `${slot} uses a raw Image src instead of a brand constant`).toEqual(
        [],
      );

      for (const logo of fromConstants) {
        expect(existsSync(publicPath(logo.src)), `${slot} ${logo.src}`).toBe(true);
        const meta = await sharp(publicPath(logo.src)).metadata();
        expect(meta.width, `${slot} ${logo.name} width`).toBe(logo.width);
        expect(meta.height, `${slot} ${logo.name} height`).toBe(logo.height);
      }
    }

    expect(WHITE_LOGO_SRCS.has(LOGO_COMPACT_WHITE.src)).toBe(true);
    expect(WHITE_LOGO_SRCS.has(LOGO_MARK_WHITE.src)).toBe(true);

    const footer = readFileSync(CHROME.footer, "utf8");
    expect(footer).toContain("bg-[#06243f]");
    const footerLogos = imageSourcesIn(footer).fromConstants;
    expect(footerLogos.length).toBeGreaterThan(0);
    for (const logo of footerLogos) {
      expect(
        WHITE_LOGO_SRCS.has(logo.src),
        `dark footer must use a white+gold logo, got ${logo.src}`,
      ).toBe(true);
      expect(logo.src).toMatch(/white/i);
      expect(logo.src).not.toMatch(/website-blue|stacked/i);
      expect(logo.src).toBe(LOGO_COMPACT_WHITE.src);
    }
  });

  it("keeps the JSON-LD organization logo on a real raster matching its declared size", async () => {
    const business = buildBusinessSchema();
    const logo = business.logo as { url?: string; width?: number; height?: number };
    expect(logo.url).toBeDefined();
    const src = toPublicSrc(String(logo.url));
    expect(existsSync(publicPath(src)), src).toBe(true);

    const meta = await sharp(publicPath(src)).metadata();
    expect(meta.width, "JSON-LD logo width").toBe(logo.width);
    expect(meta.height, "JSON-LD logo height").toBe(logo.height);
    expect(logo.width).toBe(brandLogos.LOGO_MARK_BLUE_RASTER.width);
    expect(logo.height).toBe(brandLogos.LOGO_MARK_BLUE_RASTER.height);
  });
});
