import Image from "next/image";
import { HANDBOOK_TRAILER } from "@/data/bookTrailer";
import { SECOND_EDITION_COVER } from "@/data/handbookCover";

export function BookTrailerPlayer() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-sm">
      <video
        className="aspect-video h-auto w-full"
        controls
        playsInline
        preload="metadata"
        poster={HANDBOOK_TRAILER.posterPath}
        title={HANDBOOK_TRAILER.label}
        aria-label={HANDBOOK_TRAILER.label}
      >
        <source src={HANDBOOK_TRAILER.src} type="video/mp4" />
      </video>
    </div>
  );
}

/** Cover on the left, trailer on the right (stacked cover-first on small screens). */
export function BookTrailerWithCover() {
  return (
    <div className="grid items-center gap-6 md:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)] md:gap-8">
      <div className="mx-auto w-full max-w-[240px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:max-w-none">
        <Image
          src={SECOND_EDITION_COVER.src}
          alt={SECOND_EDITION_COVER.alt}
          width={SECOND_EDITION_COVER.width}
          height={SECOND_EDITION_COVER.height}
          className="h-auto w-full object-contain"
          sizes="(min-width: 768px) 220px, 240px"
          priority
        />
      </div>
      <BookTrailerPlayer />
    </div>
  );
}
