import Partnerships from "@/views/services/Partnerships";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildServiceSchema } from "@/lib/structuredData";
import { serviceOfferings } from "@/data/services";

const title = "Dental Practice Partnership Structuring";
const description =
  "Build equitable dental partnerships with PTI guidance on valuation, deal structure, and long-term success.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/services/partnerships",
});

export default function Page() {
  const service = serviceOfferings.find(
    (offering) => offering.url === "/services/partnerships"
  );
  const serviceSchema = service ? buildServiceSchema(service) : null;

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/services/partnerships",
          structuredData: serviceSchema,
        })}
      />
      <Partnerships />
    </>
  );
}
