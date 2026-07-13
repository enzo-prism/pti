import LocationView from "@/views/locations/LocationView";
import { getLocation } from "@/data/locations";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

const location = getLocation("florida");
const path = "/locations/florida";

export const metadata = location
  ? buildPageMetadata({
      title: location.seoTitle,
      description: location.seoDescription,
      path,
    })
  : {};

export default function Page() {
  if (!location) notFound();

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title: location.seoTitle,
          description: location.seoDescription,
          path,
          includeLocalBusinessSchema: true,
        })}
      />
      <LocationView location={location} />
    </>
  );
}
