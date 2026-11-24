import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Books from "@/views/Books";
import SecondBook from "@/views/SecondBook";
import { buildPageJsonLd } from "@/lib/seo";
import {
  handbookTrailerVideo,
  SECOND_EDITION_BOOK_ID,
} from "@/lib/handbookSchema";
import { BOOKS_PATH, SECOND_BOOK_PATH } from "@/lib/constants";
import { HANDBOOK_TRAILER } from "./bookTrailer";
import { SECOND_EDITION_COVER } from "./handbookCover";
import sharp from "sharp";

const publicPath = (src: string) =>
  join(process.cwd(), "public", src.replace(/^\//, ""));

const videoMarkup = (html: string) => {
  const match = html.match(/<video\b[^>]*>[\s\S]*?<\/video>/);
  expect(match, "expected a native video player").not.toBeNull();
  return match![0];
};

describe("handbook book trailer", () => {
  it("ships the supplied mp4 unchanged, with a 16:9 poster", () => {
    const videoFile = publicPath(HANDBOOK_TRAILER.src);
    const posterFile = publicPath(HANDBOOK_TRAILER.posterPath);

    expect(existsSync(videoFile)).toBe(true);
    expect(statSync(videoFile).size).toBe(HANDBOOK_TRAILER.byteLength);
    expect(createHash("sha256").update(readFileSync(videoFile)).digest("hex")).toBe(
      HANDBOOK_TRAILER.sha256,
    );

    expect(existsSync(posterFile)).toBe(true);
    expect(statSync(posterFile).size).toBeGreaterThan(10_000);
  });

  it("ships a native-resolution Second Edition front cover, not an upscale", async () => {
    const coverFile = publicPath(SECOND_EDITION_COVER.src);
    expect(existsSync(coverFile)).toBe(true);

    const metadata = await sharp(coverFile).metadata();
    expect(metadata.format).toBe("webp");
    expect(metadata.width).toBe(SECOND_EDITION_COVER.width);
    expect(metadata.height).toBe(SECOND_EDITION_COVER.height);
    expect(metadata.width).toBe(488);
    expect(metadata.height).toBe(732);
    expect(metadata.width).toBeLessThanOrEqual(512);
  });

  it("renders a labeled 16:9 player with native controls and no autoplay", () => {
    for (const view of [SecondBook, Books]) {
      const html = renderToStaticMarkup(createElement(view));
      const video = videoMarkup(html);

      expect(video).toContain(`src="${HANDBOOK_TRAILER.src}"`);
      expect(video).toContain(`poster="${HANDBOOK_TRAILER.posterPath}"`);
      expect(video).toContain(`aria-label="${HANDBOOK_TRAILER.label}"`);
      expect(video).toContain(`title="${HANDBOOK_TRAILER.label}"`);
      expect(video).toContain("controls");
      expect(video).toContain('preload="metadata"');
      expect(video).toMatch(/playsinline/i);
      expect(video).toContain("aspect-video");
      expect(video).not.toContain("autoplay");

      expect(html).toContain("handbook-second-edition-front-cover.webp");
      expect(html).toContain(`alt="${SECOND_EDITION_COVER.alt}"`);
      expect(html).toContain(
        "md:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)]",
      );
      expect(html.indexOf("handbook-second-edition-front-cover.webp")).toBeLessThan(
        html.indexOf(HANDBOOK_TRAILER.src),
      );
    }
  });

  it("emits VideoObject JSON-LD on the book pages that already have structured data", () => {
    const trailer = handbookTrailerVideo();
    expect(trailer).toMatchObject({
      "@type": "VideoObject",
      "@id": "https://practicetransitionsinstitute.com/resources/second-book#trailer",
      name: HANDBOOK_TRAILER.label,
      uploadDate: "2026-11-20",
      duration: "PT31S",
      contentUrl:
        "https://practicetransitionsinstitute.com/videos/dental-practice-transitions-handbook-trailer.mp4",
      thumbnailUrl:
        "https://practicetransitionsinstitute.com/videos/dental-practice-transitions-handbook-trailer-poster.webp",
      about: { "@id": SECOND_EDITION_BOOK_ID },
    });

    for (const path of [SECOND_BOOK_PATH, BOOKS_PATH]) {
      const graph = buildPageJsonLd({
        title: "Handbook",
        description: "Handbook",
        path,
        structuredData: [handbookTrailerVideo()],
      })["@graph"] as Array<Record<string, unknown>>;
      const video = graph.find((node) => node["@type"] === "VideoObject");
      expect(video).toMatchObject({
        name: HANDBOOK_TRAILER.label,
        uploadDate: "2026-11-20",
        duration: "PT31S",
      });
    }
  });
});
