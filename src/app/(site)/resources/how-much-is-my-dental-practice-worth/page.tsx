import PracticeWorth, { practiceWorthFaqs } from "@/views/PracticeWorth";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildFAQSchema } from "@/lib/structuredData";

const title = "How Much Is My Dental Practice Worth?";
const description =
  "What actually determines dental practice value — cash flow, patient base, location, team — and how to get a defensible number before you sell or sign a DSO offer.";
const path = "/resources/how-much-is-my-dental-practice-worth";

export const metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function Page() {
  const faqSchema = buildFAQSchema(practiceWorthFaqs);

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path,
          structuredData: faqSchema,
        })}
      />
      <PracticeWorth />
    </>
  );
}
