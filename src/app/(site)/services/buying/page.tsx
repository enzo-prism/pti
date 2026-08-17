import Buying, { buyingFaqs } from "@/views/services/Buying";
import { StructuredData } from "@/components/StructuredData";
import { serviceOfferings } from "@/data/services";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildFAQSchema, buildServiceSchema } from "@/lib/structuredData";

const title = "Dental Practice Acquisition Advisory";
const description =
  "Evaluate and buy a dental practice with PTI guidance on readiness, valuation, due diligence, negotiation, financing coordination, and ownership transition.";
const path = "/services/buying";

export const metadata = buildPageMetadata({ title, description, path });

export default function Page() {
  const service = serviceOfferings.find((offering) => offering.url === path);
  const serviceSchema = service ? buildServiceSchema(service) : null;
  const faqSchema = buildFAQSchema(buyingFaqs);

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path,
          structuredData: [serviceSchema, faqSchema].filter(
            (schema): schema is NonNullable<typeof schema> => schema !== null
          ),
        })}
      />
      <Buying />
    </>
  );
}
