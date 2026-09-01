import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  drNjoGalleryImages,
  type DrNjoGalleryAspect,
} from "../src/data/drNjoGallery.ts";

const root = process.cwd();
const errors: string[] = [];
const aspectRatios: Record<DrNjoGalleryAspect, number> = {
  square: 1,
  landscape: 4 / 3,
  portrait: 4 / 5,
  wide: 16 / 10,
  tall: 3 / 4,
  story: 148 / 320,
  poster: 864 / 1821,
};

async function source(relativePath: string) {
  return readFile(path.join(root, relativePath), "utf8");
}

async function checkGalleryAssets() {
  for (const image of drNjoGalleryImages) {
    if (!image.src.startsWith("/")) continue;

    const filePath = path.join(root, "public", image.src.slice(1));
    const metadata = await sharp(filePath).metadata();
    const width = metadata.width;
    const height = metadata.height;

    if (!width || !height) {
      errors.push(`${image.src}: image dimensions could not be read.`);
      continue;
    }

    const orientation = metadata.orientation ?? 1;
    const swapsAxes = orientation >= 5 && orientation <= 8;
    const displayWidth = swapsAxes ? height : width;
    const displayHeight = swapsAxes ? width : height;
    const actualRatio = displayWidth / displayHeight;
    const declaredRatio = aspectRatios[image.aspect];
    const ratioDrift = Math.abs(actualRatio - declaredRatio) / actualRatio;

    if (image.fit === "cover" && ratioDrift > 0.025) {
      errors.push(
        `${image.id}: cover frame ${image.aspect} differs from the displayed image ratio by ${(ratioDrift * 100).toFixed(1)}%.`,
      );
    }
  }
}

async function checkSharedPolicies() {
  const featuredImage = await source("src/lib/featuredImage.ts");
  const services = await source("src/views/Services.tsx");
  const partnerships = await source("src/views/services/Partnerships.tsx");
  const home = await source("src/views/Home.tsx");
  const gallery = await source("src/views/Gallery.tsx");
  const photoCard = await source("src/components/DrNjoPhotoCard.tsx");
  const blogPost = await source("src/views/BlogPost.tsx");

  if (!featuredImage.includes('post.featuredImageFit !== "cover"')) {
    errors.push(
      "Untagged featured images must default to full-frame rendering.",
    );
  }
  if (
    !services.includes("aspect-[3/2]") ||
    !services.includes("aspect-[1672/941]")
  ) {
    errors.push(
      "The services-page photo frames must match their source ratios.",
    );
  }
  if (services.includes('className="object-cover')) {
    errors.push("Services-page content photos must not use object-cover.");
  }
  if (
    partnerships.includes("object-cover") ||
    !partnerships.includes("width={320}")
  ) {
    errors.push(
      "The historical partnership photo must stay intrinsic and uncropped.",
    );
  }
  if (!home.includes('className="h-auto w-full object-contain"')) {
    errors.push(
      "Homepage gallery previews must preserve their complete source images.",
    );
  }
  if (
    gallery.includes("group-hover:scale") ||
    photoCard.includes("group-hover:scale")
  ) {
    errors.push("Editorial gallery images must not be zoom-cropped on hover.");
  }
  if (
    gallery.includes("from-black/75") ||
    gallery.includes("group-hover:opacity-100")
  ) {
    errors.push(
      "Gallery captions must sit under photos, not as overlays on faces.",
    );
  }
  if (!gallery.includes('className="h-auto w-full object-contain"')) {
    errors.push("Gallery tiles must preserve complete source images.");
  }
  if (
    blogPost.includes("sm:aspect-[16/10]") ||
    blogPost.includes("md:aspect-[16/9]")
  ) {
    errors.push("Blog hero crop ratios must not change across breakpoints.");
  }
}

async function main() {
  await Promise.all([checkGalleryAssets(), checkSharedPolicies()]);

  if (errors.length) {
    console.error("Image framing checks failed:\n");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log("Image framing checks passed.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
