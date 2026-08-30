export const PORTRAIT_FEATURED_FALLBACK = { width: 1003, height: 1568 } as const;

export function isPortraitFeaturedImage(post: {
  featuredImageAspect?: "portrait";
  featuredImageWidth?: number;
  featuredImageHeight?: number;
}): boolean {
  if (post.featuredImageAspect === "portrait") return true;
  if (post.featuredImageWidth && post.featuredImageHeight) {
    return post.featuredImageHeight > post.featuredImageWidth;
  }
  return false;
}

export function getPortraitFeaturedSize(post: {
  featuredImageWidth?: number;
  featuredImageHeight?: number;
}): { width: number; height: number } {
  return {
    width: post.featuredImageWidth ?? PORTRAIT_FEATURED_FALLBACK.width,
    height: post.featuredImageHeight ?? PORTRAIT_FEATURED_FALLBACK.height,
  };
}
