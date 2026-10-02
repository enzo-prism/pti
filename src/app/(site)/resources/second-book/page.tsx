import SecondBook from "@/views/SecondBook";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { SECOND_BOOK_PATH } from "@/lib/constants";
import { SECOND_BOOK_ANNOUNCEMENT } from "@/data/secondBook";

const title = "Dental Practice Transitions Handbook, Second Edition";
const description = SECOND_BOOK_ANNOUNCEMENT.description;
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
