"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";
import { PhotoNameOverlay } from "@/components/DrNjoPhotoCard";
import { galleryCategoryGroups, type GalleryPhoto } from "@/data/galleryImages";

// Flatten in display (grouped) order so lightbox prev/next matches the page.
const orderedPhotos: GalleryPhoto[] = galleryCategoryGroups.flatMap(
  (group) => group.photos,
);

const TILE_SIZES = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw";

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = activeIndex !== null;
  const activePhoto = isOpen ? orderedPhotos[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null
          ? current
          : (current - 1 + orderedPhotos.length) % orderedPhotos.length,
      ),
    [],
  );
  const showNext = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null ? current : (current + 1) % orderedPhotos.length,
      ),
    [],
  );

  // Keyboard controls + scroll lock while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isOpen, close, showPrev, showNext]);

  let globalIndex = -1;

  return (
    <>
      <section className="bg-gradient-to-b from-accent to-white px-4 pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal direction="blur-in" delay={100} intensity="subtle">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
              PTI Photo Gallery
            </p>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Moments from the work behind every transition
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Speaking engagements, dental-society leadership, published work,
              and the long-term relationships that shape how Practice
              Transitions Institute guides dentists.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {galleryCategoryGroups.map((group, groupIndex) => (
        <Section
          key={group.id}
          background={groupIndex % 2 === 0 ? "white" : "light"}
          className="py-12 md:py-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 max-w-2xl">
              <SectionTitle className="mb-3 text-2xl sm:text-3xl">
                {group.label}
              </SectionTitle>
              <SectionSubtitle className="mb-0">
                {group.description}
              </SectionSubtitle>
            </div>

            <div className="gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
              {group.photos.map((photo) => {
                globalIndex += 1;
                const index = globalIndex;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget;
                      setActiveIndex(index);
                    }}
                    aria-label={`View larger image: ${photo.alt}`}
                    className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <div className="relative">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        sizes={TILE_SIZES}
                        className={cn(
                          "h-auto w-full",
                          photo.fit === "contain" &&
                            "bg-slate-50 object-contain",
                        )}
                      />
                      {photo.names?.length ? (
                        <PhotoNameOverlay names={photo.names} />
                      ) : null}
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 text-left text-sm leading-snug text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {photo.caption}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Section>
      ))}

      <Section background="primary" className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to write your own transition story?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            See the full story behind PTI&apos;s leadership, or start the
            conversation with our team.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/contact">Let&apos;s Talk</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full border-white bg-transparent text-white hover:bg-white hover:text-primary sm:w-auto"
            >
              <Link href="/drnjo">Meet Dr. Njo</Link>
            </Button>
          </div>
        </div>
      </Section>

      {isOpen && activePhoto && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
          className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-end p-4">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            <figure className="flex max-h-full max-w-5xl flex-col items-center">
              <div className="relative h-[70vh] w-[88vw] max-w-5xl">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <figcaption className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/85">
                {activePhoto.names?.length ? (
                  <span className="mb-2 block font-semibold text-white">
                    {activePhoto.names.join(" · ")}
                  </span>
                ) : null}
                {activePhoto.caption}
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
