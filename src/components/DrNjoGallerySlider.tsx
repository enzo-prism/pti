import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { drNjoGalleryImages, type DrNjoGalleryImage } from "@/data/drNjoGallery";
import { cn } from "@/lib/utils";

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
              <div className="flex h-[240px] items-center justify-center sm:h-[320px] md:h-[420px] lg:h-[520px]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className={cn("h-full w-full object-contain", imageClassName)}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  sizes={DEFAULT_SIZES}
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
