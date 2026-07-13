import SellingToADso, { dsoFaqs } from "@/views/services/SellingToADso";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildFAQSchema, buildServiceSchema } from "@/lib/structuredData";
import { serviceOfferings } from "@/data/services";

const title = "Selling Your Dental Practice to a DSO";
const description =
  "Received a DSO offer? PTI reviews the LOI, values your practice independently, compares DSO vs private buyer paths, and negotiates on your behalf.";
const path = "/services/selling-to-a-dso";

export const metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function Page() {
  const service = serviceOfferings.find((offering) => offering.url === path);
  const serviceSchema = service ? buildServiceSchema(service) : null;
  const faqSchema = buildFAQSchema(dsoFaqs);
  const structuredData = [serviceSchema, faqSchema].filter(
    (schema): schema is NonNullable<typeof schema> => Boolean(schema)
  );

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path,
          structuredData,
        })}
      />
      <SellingToADso />
    </>
  );
}
