import { describe, expect, it } from "vitest";
import { getPortraitFeaturedSize, isPortraitFeaturedImage } from "./featuredImage";

describe("featured image helpers", () => {
  it("treats explicit portrait flags as portrait", () => {
    expect(isPortraitFeaturedImage({ featuredImageAspect: "portrait" })).toBe(true);
  });

  it("treats taller-than-wide dimensions as portrait", () => {
    expect(isPortraitFeaturedImage({ featuredImageWidth: 1600, featuredImageHeight: 2133 })).toBe(
      true
    );
    expect(isPortraitFeaturedImage({ featuredImageWidth: 1600, featuredImageHeight: 900 })).toBe(
      false
    );
  });

  it("uses the post pixel size instead of the Board of Regents fallback", () => {
    expect(getPortraitFeaturedSize({ featuredImageWidth: 864, featuredImageHeight: 1821 })).toEqual({
      width: 864,
      height: 1821,
    });
    expect(getPortraitFeaturedSize({})).toEqual({ width: 1003, height: 1568 });
  });
});
