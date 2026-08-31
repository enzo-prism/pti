export const PORTRAIT_FEATURED_FALLBACK = {
  width: 1003,
  height: 1568,
} as const;
export const SQUARE_FEATURED_FALLBACK = { width: 1024, height: 1024 } as const;

export const INTRINSIC_FEATURED_IMAGE_CLASS =
  "h-auto max-h-[28rem] w-auto max-w-full mx-auto object-contain";

/** Shared layout fields so BlogPost / BlogPostSummary remain assignable. */
export type FeaturedImageLayout = {
  featuredImage?: string;
  featuredImageAspect?: "portrait" | "square";
  featuredImageFit?: "cover" | "contain";
  featuredImageWidth?: number;
  featuredImageHeight?: number;
};

export type FeaturedImageShape = "portrait" | "square" | "landscape";

/**
 * Pixel sizes for posts that need a non-landscape frame even when the data
 * file has not yet been tagged. Prefer setting width/height on the post.
 */
const KNOWN_FEATURED_SIZES: Record<string, { width: number; height: number }> =
  {
    "/lovable-uploads/flyer-photo.webp": { width: 1700, height: 2188 },
    "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761757553/Frame_1_psbk9m.png":
      {
        width: 1024,
        height: 1024,
      },
  };

function resolveFeaturedSize(
  post: FeaturedImageLayout,
): { width: number; height: number } | null {
  if (post.featuredImageWidth && post.featuredImageHeight) {
    return { width: post.featuredImageWidth, height: post.featuredImageHeight };
  }
  if (post.featuredImage && KNOWN_FEATURED_SIZES[post.featuredImage]) {
    return KNOWN_FEATURED_SIZES[post.featuredImage];
  }
  return null;
}

export function getFeaturedImageShape(
  post: FeaturedImageLayout,
): FeaturedImageShape {
  if (post.featuredImageAspect === "square") return "square";
  if (post.featuredImageAspect === "portrait") return "portrait";

  const size = resolveFeaturedSize(post);
  if (size) {
    if (size.height === size.width) return "square";
    if (size.height > size.width) return "portrait";
    return "landscape";
  }

  return "landscape";
}

export function isPortraitFeaturedImage(post: FeaturedImageLayout): boolean {
  return getFeaturedImageShape(post) === "portrait";
}

export function shouldContainFeaturedImage(post: FeaturedImageLayout): boolean {
  return (
    post.featuredImageFit !== "cover" ||
    getFeaturedImageShape(post) !== "landscape"
  );
}

export function getIntrinsicFeaturedSize(post: FeaturedImageLayout): {
  width: number;
  height: number;
} {
  const size = resolveFeaturedSize(post);
  if (size) return size;
  if (getFeaturedImageShape(post) === "square") return SQUARE_FEATURED_FALLBACK;
  return PORTRAIT_FEATURED_FALLBACK;
}

export function getPortraitFeaturedSize(post: FeaturedImageLayout): {
  width: number;
  height: number;
} {
  return getIntrinsicFeaturedSize(post);
}

/** Frame class for blog listing cards and related-article thumbs. */
export function getFeaturedListingFrameClass(
  post: FeaturedImageLayout,
): string {
  if (!shouldContainFeaturedImage(post)) {
    return "aspect-video";
  }

  const shape = getFeaturedImageShape(post);
  if (shape === "square") {
    return "flex aspect-square items-center justify-center bg-slate-100";
  }
  if (shape === "portrait") {
    const size = resolveFeaturedSize(post);
    const ratio = size ? size.height / size.width : 4 / 3;
    const aspect = ratio >= 1.7 ? "aspect-[9/16]" : "aspect-[3/4]";
    return `flex ${aspect} items-center justify-center bg-slate-100`;
  }

  return "flex aspect-[4/3] items-center justify-center bg-slate-100";
}

export function getFeaturedListingImageClass(
  post: FeaturedImageLayout,
): string {
  return shouldContainFeaturedImage(post)
    ? "object-contain p-3"
    : "object-cover";
}
