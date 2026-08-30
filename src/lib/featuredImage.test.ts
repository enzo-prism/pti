import { describe, expect, it } from "vitest";
import {
  getFeaturedImageShape,
  getFeaturedListingFrameClass,
  getIntrinsicFeaturedSize,
  getPortraitFeaturedSize,
  isPortraitFeaturedImage,
  shouldContainFeaturedImage,
} from "./featuredImage";

describe("featured image helpers", () => {
  it("treats explicit portrait flags as portrait", () => {
    expect(isPortraitFeaturedImage({ featuredImageAspect: "portrait" })).toBe(true);
    expect(getFeaturedImageShape({ featuredImageAspect: "portrait" })).toBe("portrait");
  });

  it("treats explicit square flags as square", () => {
    expect(getFeaturedImageShape({ featuredImageAspect: "square" })).toBe("square");
    expect(isPortraitFeaturedImage({ featuredImageAspect: "square" })).toBe(false);
  });

  it("treats taller-than-wide dimensions as portrait", () => {
    expect(isPortraitFeaturedImage({ featuredImageWidth: 1600, featuredImageHeight: 2133 })).toBe(
      true
    );
    expect(isPortraitFeaturedImage({ featuredImageWidth: 1600, featuredImageHeight: 900 })).toBe(
      false
    );
  });

  it("classifies the Dugoni flyer by known pixel size without metadata", () => {
    expect(
      getFeaturedImageShape({ featuredImage: "/lovable-uploads/flyer-photo.webp" })
    ).toBe("portrait");
    expect(
      shouldContainFeaturedImage({ featuredImage: "/lovable-uploads/flyer-photo.webp" })
    ).toBe(true);
  });

  it("classifies the Attitude graphic as square by known pixel size", () => {
    expect(
      getFeaturedImageShape({
        featuredImage: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761757553/Frame_1_psbk9m.png",
      })
    ).toBe("square");
    expect(
      getFeaturedListingFrameClass({
        featuredImage: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761757553/Frame_1_psbk9m.png",
        featuredImageFit: "contain",
      })
    ).toContain("aspect-square");
  });

  it("uses a 9:16 listing frame for very tall portraits", () => {
    expect(
      getFeaturedListingFrameClass({
        featuredImageAspect: "portrait",
        featuredImageWidth: 864,
        featuredImageHeight: 1821,
        featuredImageFit: "contain",
      })
    ).toContain("aspect-[9/16]");
  });

  it("uses a 3:4 listing frame for standard portraits", () => {
    expect(
      getFeaturedListingFrameClass({
        featuredImageAspect: "portrait",
        featuredImageWidth: 1199,
        featuredImageHeight: 1600,
        featuredImageFit: "contain",
      })
    ).toContain("aspect-[3/4]");
  });

  it("defaults landscape cover cards to a video frame", () => {
    expect(getFeaturedListingFrameClass({ featuredImageFit: "cover" })).toBe("aspect-video");
  });

  it("uses the post pixel size instead of the Board of Regents fallback", () => {
    expect(getPortraitFeaturedSize({ featuredImageWidth: 864, featuredImageHeight: 1821 })).toEqual({
      width: 864,
      height: 1821,
    });
    expect(getPortraitFeaturedSize({ featuredImageAspect: "portrait" })).toEqual({
      width: 1003,
      height: 1568,
    });
    expect(getIntrinsicFeaturedSize({ featuredImageAspect: "square" })).toEqual({
      width: 1024,
      height: 1024,
    });
  });
});
