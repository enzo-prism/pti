import Associateships from "@/views/services/Associateships";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildServiceSchema } from "@/lib/structuredData";
import { serviceOfferings } from "@/data/services";

const title = "Dental Associateships & Buy-In Planning";
const description =
  "Plan a dental associateship or buy-in with guidance on fit, responsibilities, compensation, valuation, milestones, financing coordination, and ownership transition.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/services/associateships",
});

export default function Page() {
  const service = serviceOfferings.find(
    (offering) => offering.url === "/services/associateships"
  );
  const serviceSchema = service ? buildServiceSchema(service) : null;

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/services/associateships",
          structuredData: serviceSchema,
        })}
      />
      <Associateships />
    </>
  );
}
