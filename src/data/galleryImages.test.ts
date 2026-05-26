import { describe, expect, it } from "vitest";
import {
  GALLERY_CATEGORY_ORDER,
  galleryCategoryGroups,
  galleryPhotos,
} from "./galleryImages";

describe("gallery image registry", () => {
  it("has unique ids", () => {
    const ids = galleryPhotos.map((photo) => photo.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique image sources", () => {
    const sources = galleryPhotos.map((photo) => photo.src);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("gives every photo positive intrinsic dimensions", () => {
    for (const photo of galleryPhotos) {
      expect(photo.width).toBeGreaterThan(0);
      expect(photo.height).toBeGreaterThan(0);
    }
  });

  it("assigns every photo to a known category", () => {
    const known = new Set(GALLERY_CATEGORY_ORDER.map((category) => category.id));
    for (const photo of galleryPhotos) {
      expect(known.has(photo.category)).toBe(true);
    }
  });

  it("accounts for every photo across the grouped categories", () => {
    const grouped = galleryCategoryGroups.flatMap((group) => group.photos);
    expect(grouped.length).toBe(galleryPhotos.length);
  });
});
