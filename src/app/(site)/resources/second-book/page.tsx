import SecondBook from "@/views/SecondBook";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { SECOND_BOOK_PATH } from "@/lib/constants";

const title = "Dental Practice Transitions Handbook, Second Edition (Coming Soon)";
const description =
  "Coming soon: the expanded second edition of Dr. Michael Njo's Dental Practice Transitions Handbook, with a foreword by Dr. Glenn Vo, new advisor material, and new appendices.";
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
