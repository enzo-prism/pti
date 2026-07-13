import Selling, { sellingFaqs } from "@/views/services/Selling";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildFAQSchema, buildServiceSchema } from "@/lib/structuredData";
import { serviceOfferings } from "@/data/services";

const title = "Dental Practice Sale Advisory & Brokerage";
const description =
  "Plan and execute a successful dental practice sale with PTI's advisory, marketing, and negotiation support.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/services/selling",
});

export default function Page() {
  const service = serviceOfferings.find(
    (offering) => offering.url === "/services/selling"
  );
  const serviceSchema = service ? buildServiceSchema(service) : null;
  const faqSchema = buildFAQSchema(sellingFaqs);

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/services/selling",
          structuredData: [serviceSchema, faqSchema].filter(
            (schema): schema is NonNullable<typeof schema> => schema !== null
          ),
        })}
      />
      <Selling />
    </>
  );
}
