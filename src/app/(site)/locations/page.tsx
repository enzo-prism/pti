import Locations from "@/views/Locations";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Dental Practice Transition Locations";
const description =
  "Dental practice transition advisors serving California, Texas, Florida, and dentists nationwide — valuations, sales, buy-ins, and DSO offer reviews.";
const path = "/locations";

export const metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path,
        })}
      />
      <Locations />
    </>
  );
}
