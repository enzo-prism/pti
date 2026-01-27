import Services from "@/views/Services";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Dental Practice Transition Services";
const description =
  "Explore PTI services for dental practice valuation, sales, partnerships, and associateships tailored to dentists at every career stage.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/services",
});

export default function Page() {
  return (
    <>
      <StructuredData data={buildPageJsonLd({ title, description, path: "/services" })} />
      <Services />
    </>
  );
}
