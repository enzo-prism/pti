import { handbookEditions, handbookTrailerVideo } from "@/lib/handbookSchema";
import SecondBook, { secondBookFaqs } from "@/views/SecondBook";
import { buildFAQSchema } from "@/lib/structuredData";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { SECOND_BOOK_PATH } from "@/lib/constants";

const title = "Dental Practice Transitions Handbook, Second Edition";
const description =
  "Dr. Michael Njo's expanded handbook, now on Kindle. It reached #1 Best Seller in Dentistry on Amazon and adds a foreword by Dr. Glenn Vo.";
const path = SECOND_BOOK_PATH;
const faqSchema = buildFAQSchema(secondBookFaqs);

export const metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path,
          structuredData: faqSchema
            ? [...handbookEditions(), handbookTrailerVideo(), faqSchema]
            : [...handbookEditions(), handbookTrailerVideo()],
        })}
      />
      <SecondBook />
    </>
  );
}
