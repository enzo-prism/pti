import Faq from "@/views/Faq";
import { faqItems } from "@/data/faq";
import { StructuredData } from "@/components/StructuredData";
import { buildFAQSchema } from "@/lib/structuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Dental Practice Transition FAQ";
const description =
  "Find answers to common questions about valuations, sales, partnerships, and dental practice transitions.";

const faqSchema = buildFAQSchema(faqItems);

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/faq",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/faq",
          structuredData: faqSchema,
        })}
      />
      <Faq />
    </>
  );
}
