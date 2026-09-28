import Contact from "@/views/Contact";
import { StructuredData } from "@/components/StructuredData";
import { BUSINESS_ID } from "@/lib/structuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Contact PTI for Dental Practice Transitions";
const description =
  "Schedule a consultation with PTI to discuss practice valuation, sales, partnerships, or associateships.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/contact",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/contact",
          pageType: "ContactPage",
          pageProperties: { mainEntity: { "@id": BUSINESS_ID } },
          includeLocalBusinessSchema: true,
        })}
      />
      <Contact />
    </>
  );
}
