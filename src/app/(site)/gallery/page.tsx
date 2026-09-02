import Gallery from "@/views/Gallery";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildImageGallerySchema } from "@/lib/structuredData";
import { galleryPhotos } from "@/data/galleryImages";

const title = "PTI Photo Gallery";
const description =
  "Photos from Practice Transitions Institute: speaking engagements, dental-society leadership, published work, the PTI team, and the relationships behind every dental practice transition.";

const galleryImage = galleryPhotos[0]?.src;

const gallerySchema = buildImageGallerySchema(
  galleryPhotos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
  })),
  { name: title, description }
);

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/gallery",
  image: galleryImage,
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/gallery",
          image: galleryImage,
          structuredData: gallerySchema,
        })}
      />
      <Gallery />
    </>
  );
}
