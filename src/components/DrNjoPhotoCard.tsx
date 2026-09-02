import Image from "next/image";
import {
  type DrNjoGalleryAspect,
  type DrNjoGalleryImage,
} from "@/data/drNjoGallery";
import { cn } from "@/lib/utils";

const DEFAULT_SIZES =
  "(min-width: 1280px) 720px, (min-width: 1024px) 48vw, (min-width: 640px) 80vw, 100vw";

const ASPECT_CLASS_MAP: Record<DrNjoGalleryAspect, string> = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[4/5]",
  wide: "aspect-[16/10]",
  tall: "aspect-[3/4]",
  story: "aspect-[148/320]",
  poster: "aspect-[864/1821]",
};

export function PhotoNameOverlay({ names }: { names?: string[] }) {
  // Name bars and captions are intentionally not rendered. Some labels
  // do not match the photos, so the image stands on its own.
  void names;
  return null;
}

export const getDrNjoGalleryAspectClass = (aspect: DrNjoGalleryAspect) =>
  ASPECT_CLASS_MAP[aspect];

interface DrNjoPhotoCardProps {
  image: DrNjoGalleryImage;
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}

export function DrNjoPhotoCard({
  image,
  className,
  frameClassName,
  imageClassName,
  sizes = DEFAULT_SIZES,
  priority = false,
}: DrNjoPhotoCardProps) {
  const isContained = image.fit === "contain";

  return (
    <figure className={cn("group", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm",
          frameClassName,
        )}
      >
        <div
          className={cn(
            "relative",
            getDrNjoGalleryAspectClass(image.aspect),
            isContained && "bg-slate-50",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes={sizes}
            className={cn(
              "transition-opacity duration-300",
              isContained ? "object-contain p-4 sm:p-5" : "object-cover",
              imageClassName,
            )}
          />
        </div>
      </div>
    </figure>
  );
}
