import Books from "@/views/Books";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { BOOKS_PATH } from "@/lib/constants";

const title = "Books by Dr. Michael Njo";
const description =
  "Dr. Michael Njo's Dental Practice Transitions Handbook: the expanded Second Edition launching November 17, 2026, and the first edition on Amazon.";
const path = BOOKS_PATH;

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
      <Books />
    </>
  );
}
