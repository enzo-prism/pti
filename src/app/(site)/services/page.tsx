import Services from "@/views/Services";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildServiceItemListSchema } from "@/lib/structuredData";

const title = "Dental Practice Transition Services";
const description =
  "Explore PTI services for dental practice valuation, sales, acquisitions, DSO offer reviews, partnerships, and associate buy-ins.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/services",
});

export default function Page() {
  const serviceListSchema = buildServiceItemListSchema();

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/services",
          structuredData: serviceListSchema,
        })}
      />
      <Services />
    </>
  );
}
