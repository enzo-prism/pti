import SecondBook from "@/views/SecondBook";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { SECOND_BOOK_PATH } from "@/lib/constants";

const title = "Second Book (Coming)";
const description =
  "Dr. Michael Njo is working on a second book. The title has not been announced. See the published Dental Practice Transitions Handbook in the meantime.";
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
