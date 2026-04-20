import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { drNjoGalleryImages, type DrNjoGalleryImage } from "@/data/drNjoGallery";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface DrNjoGallerySliderProps {
  images?: DrNjoGalleryImage[];
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
  showControls?: boolean;
  ariaLabel?: string;
}

const DEFAULT_SIZES =
  "(min-width: 1280px) 960px, (min-width: 1024px) 840px, (min-width: 640px) 90vw, 100vw";

export function DrNjoGallerySlider({
  images = drNjoGalleryImages,
  className,
  frameClassName,
  imageClassName,
  showControls = true,
  ariaLabel = "Dr. Njo photo gallery"
}: DrNjoGallerySliderProps) {
  if (!images.length) {
    return null;
  }

  return (
    <Carousel
      opts={{ align: "center", loop: true }}
      className={cn("w-full touch-pan-y", className)}
      aria-label={ariaLabel}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={`${image.src}-${index}`}>
            <div
              className={cn(
                "overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm",
                frameClassName
              )}
            >
              <div
                className={cn(
                  "relative h-[280px] sm:h-[360px] md:h-[460px] lg:h-[560px]",
                  image.fit === "contain" && "bg-slate-50"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={DEFAULT_SIZES}
                  className={cn(
                    image.fit === "contain"
                      ? "object-contain p-4 sm:p-6"
                      : "object-cover",
                    imageClassName
                  )}
                  priority={index === 0}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {showControls ? (
        <>
          <CarouselPrevious className="left-2 sm:-left-10" />
          <CarouselNext className="right-2 sm:-right-10" />
        </>
      ) : null}
    </Carousel>
  );
}
