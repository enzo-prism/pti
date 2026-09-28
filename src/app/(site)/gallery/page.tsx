import Gallery from "@/views/Gallery";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildImageGalleryProperties } from "@/lib/structuredData";
import { galleryPhotos } from "@/data/galleryImages";

const title = "PTI Photo Gallery";
const description =
  "Photos of PTI speaking engagements, dental-society leadership, published work, the team, and the relationships behind every dental practice transition.";

const galleryImage = galleryPhotos[0]?.src;

const galleryProperties = buildImageGalleryProperties(
  galleryPhotos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
  }))
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
          pageType: "ImageGallery",
          pageProperties: galleryProperties,
        })}
      />
      <Gallery />
    </>
  );
}
