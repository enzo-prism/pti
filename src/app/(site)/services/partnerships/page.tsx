import Partnerships from "@/views/services/Partnerships";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Dental Practice Partnership Structuring";
const description =
  "Build equitable dental partnerships with PTI guidance on valuation, deal structure, and long-term success.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/services/partnerships",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/services/partnerships",
        })}
      />
      <Partnerships />
    </>
  );
}
