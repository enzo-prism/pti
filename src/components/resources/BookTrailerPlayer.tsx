import { HANDBOOK_TRAILER } from "@/data/bookTrailer";

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
