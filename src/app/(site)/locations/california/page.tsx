import California from "@/views/locations/California";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Sell a Dental Practice in California";
const description =
  "California dental practice transition experts. Bay Area based, serving the whole state with valuations, sales, buy-ins, and DSO offer reviews.";
const path = "/locations/california";

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
          includeLocalBusinessSchema: true,
        })}
      />
      <California />
    </>
  );
}
