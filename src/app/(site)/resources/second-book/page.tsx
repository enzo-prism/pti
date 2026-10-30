import SecondBook from "@/views/SecondBook";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { SECOND_BOOK_PATH } from "@/lib/constants";

const title = "Dental Practice Transitions Handbook, Second Edition";
const description =
  "Launching November 17, 2026: Dr. Michael Njo's expanded Dental Practice Transitions Handbook, Second Edition, with a foreword by Dr. Glenn Vo.";
const path = SECOND_BOOK_PATH;

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
        })}
      />
      <SecondBook />
    </>
  );
}
