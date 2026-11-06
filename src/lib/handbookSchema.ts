import { buildAbsoluteUrl } from "@/lib/siteMetadata";
import { DENTAL_TRANSITIONS_HANDBOOK_URL, SECOND_BOOK_PATH } from "@/lib/constants";
export function handbookEditions() {
  const author = { "@type": "Person", "@id": "https://michaelnjodds.com/#person", name: "Michael Njo, DDS", url: "https://michaelnjodds.com/michael-njo-dds" };
  return [
    { "@type": "Book", "@id": `${buildAbsoluteUrl("/resources/dental-practice-transitions-handbook")}#book`, name: "Dental Practice Transitions Handbook", bookEdition: "First edition", isbn: "1627878718", url: DENTAL_TRANSITIONS_HANDBOOK_URL, author },
    { "@type": "Book", "@id": `${buildAbsoluteUrl(SECOND_BOOK_PATH)}#book`, name: "Dental Practice Transitions Handbook, Second Edition", bookEdition: "Second edition", url: buildAbsoluteUrl(SECOND_BOOK_PATH), author },
  ];
}
