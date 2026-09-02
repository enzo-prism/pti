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

  it("includes recent dinner photos and shipped community photos", () => {
    const ids = galleryPhotos.map((photo) => photo.id);

    expect(ids).toContain("panelDinnerGroup");
    expect(ids).toContain("panelDinnerTable");
    expect(ids).toContain("poeRosevilleCollage");
    expect(ids).toContain("diana-fat-board-of-regents");
    expect(ids).toContain("bill-mikki-porch");
    expect(ids).toContain("bill-mikki-trio");
  });

  it("does not cover-crop people photos", () => {
    const peoplePhotoIds = [
      "officeSelfieGroup",
      "standingTrio",
      "dinnerTableFour",
      "birthdayCelebration",
      "team-michael-njo",
      "team-liz-armato",
      "dugoni-lunch-learn-presentation",
      "smcds-symposium-workshop",
      "smcds-associate-workshop",
      "dugoni-donation-ceremony",
    ];

    for (const id of peoplePhotoIds) {
      expect(galleryPhotos.find((photo) => photo.id === id)?.fit).toBe(
        "contain",
      );
    }
  });

  it("only labels faces already named in the repo", () => {
    const medal = galleryPhotos.find((photo) => photo.id === "blackTieMedalPortrait");
    const selfie = galleryPhotos.find((photo) => photo.id === "officeSelfieGroup");

    expect(medal?.names).toEqual(["Dr. Michael Njo", "Dr. Allen Budenz"]);
    expect(selfie?.names?.[0]).toMatch(/Nader Nadershahi/);
  });
});
