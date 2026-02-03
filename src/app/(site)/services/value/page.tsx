import Value from "@/views/services/Value";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildServiceSchema } from "@/lib/structuredData";
import { serviceOfferings } from "@/data/services";

const title = "Dental Practice Valuation (Opinion of Value)";
const description =
  "Get a clear, data-backed valuation for your dental practice with PTI's Opinion of Value service.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/services/value",
});

export default function Page() {
  const service = serviceOfferings.find(
    (offering) => offering.url === "/services/value"
  );
  const serviceSchema = service ? buildServiceSchema(service) : null;

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/services/value",
          structuredData: serviceSchema,
        })}
      />
      <Value />
    </>
  );
}
