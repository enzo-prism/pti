export const PORTRAIT_FEATURED_FALLBACK = { width: 1003, height: 1568 } as const;

/** Shared layout fields so BlogPost / BlogPostSummary remain assignable. */
export type FeaturedImageLayout = {
  featuredImageAspect?: "portrait";
  featuredImageFit?: "cover" | "contain";
  featuredImageWidth?: number;
  featuredImageHeight?: number;
};

export function isPortraitFeaturedImage(post: FeaturedImageLayout): boolean {
  if (post.featuredImageAspect === "portrait") return true;
  if (post.featuredImageWidth && post.featuredImageHeight) {
    return post.featuredImageHeight > post.featuredImageWidth;
  }
  return false;
}

export function getPortraitFeaturedSize(post: FeaturedImageLayout): {
  width: number;
  height: number;
} {
  return {
    width: post.featuredImageWidth ?? PORTRAIT_FEATURED_FALLBACK.width,
    height: post.featuredImageHeight ?? PORTRAIT_FEATURED_FALLBACK.height,
  };
}
