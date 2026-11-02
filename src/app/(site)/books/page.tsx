import Books from "@/views/Books";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import {
  BOOKS_PATH,
  DENTAL_EXIT_BLUEPRINT_URL,
  DENTAL_TRANSITIONS_HANDBOOK_URL,
  MICHAEL_NJO_WEBSITE_URL,
  SECOND_BOOK_PATH,
} from "@/lib/constants";
import { buildAbsoluteUrl } from "@/lib/siteMetadata";

const title = "Books by Dr. Michael Njo";
const description =
  "Dr. Michael Njo's books: Dental Practice Transitions Handbook, its Second Edition launching November 17, 2026, and The Dental Exit Blueprint.";
const path = BOOKS_PATH;

const author = {
  "@type": "Person",
  name: "Michael A. Njo, DDS",
  url: MICHAEL_NJO_WEBSITE_URL,
};

const bookListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Books by and with Dr. Michael Njo",
  itemListElement: [
    {
      "@type": "Book",
      name: "Dental Practice Transitions Handbook: A Blueprint for Buying and Selling Healthcare Practices in Different Economic Climates",
      bookEdition: "First Edition",
      author,
      sameAs: [DENTAL_TRANSITIONS_HANDBOOK_URL],
    },
    {
      "@type": "Book",
      name: "Dental Practice Transitions Handbook, Second Edition",
      bookEdition: "Second Edition",
      author,
      url: buildAbsoluteUrl(SECOND_BOOK_PATH),
    },
    {
      "@type": "Book",
      name: "The Dental Exit Blueprint: The 13 EBITDA Levers That Drive Maximum Value",
      datePublished: "2026-07-15",
      author: { "@type": "Person", name: "Elijah Desmond" },
      contributor: [author],
      sameAs: [DENTAL_EXIT_BLUEPRINT_URL],
    },
  ].map((item, index) => ({ "@type": "ListItem", position: index + 1, item })),
};

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
          pageType: "CollectionPage",
          structuredData: bookListSchema,
        })}
      />
      <Books />
    </>
  );
}
