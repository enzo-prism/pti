import { buildAbsoluteUrl } from "@/lib/siteMetadata";
import {
  DENTAL_TRANSITIONS_HANDBOOK_URL,
  HANDBOOK_PATH,
  SECOND_BOOK_PATH,
  SECOND_EDITION_ASIN,
  SECOND_EDITION_KINDLE_URL,
  SECOND_EDITION_PUBLISHED_ISO,
} from "@/lib/constants";

/** Stable Book @ids shared by every page that describes the handbook. */
export const FIRST_EDITION_BOOK_ID = `${buildAbsoluteUrl(HANDBOOK_PATH)}#book`;
export const SECOND_EDITION_BOOK_ID = `${buildAbsoluteUrl(SECOND_BOOK_PATH)}#book`;

const HANDBOOK_NAME = "Dental Practice Transitions Handbook";
const HANDBOOK_SUBTITLE =
  "A Blueprint for Buying and Selling Healthcare Practices in Different Economic Climates";

/**
 * Both handbook editions. The second edition's facts (Kindle format, Nov 17,
 * 2026 publication, 273 pages, ASIN, editor, foreword) were verified on its
 * Amazon listing on Nov 20, 2026. No price/offer, publisher, or ISBN is
 * emitted for it because none is confirmed.
 */
export function handbookEditions() {
  const author = {
    "@type": "Person",
    "@id": "https://michaelnjodds.com/#person",
    name: "Michael Njo, DDS",
    url: "https://michaelnjodds.com/michael-njo-dds",
  };
  return [
    {
      "@type": "Book",
      "@id": FIRST_EDITION_BOOK_ID,
      name: HANDBOOK_NAME,
      alternativeHeadline: HANDBOOK_SUBTITLE,
      bookEdition: "First edition",
      isbn: "1627878718",
      url: DENTAL_TRANSITIONS_HANDBOOK_URL,
      inLanguage: "en",
      author,
    },
    {
      "@type": "Book",
      "@id": SECOND_EDITION_BOOK_ID,
      name: `${HANDBOOK_NAME}, Second Edition`,
      alternativeHeadline: HANDBOOK_SUBTITLE,
      bookEdition: "Second edition",
      bookFormat: "https://schema.org/EBook",
      datePublished: SECOND_EDITION_PUBLISHED_ISO,
      numberOfPages: 273,
      inLanguage: "en",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "ASIN",
        value: SECOND_EDITION_ASIN,
      },
      url: buildAbsoluteUrl(SECOND_BOOK_PATH),
      ...(SECOND_EDITION_KINDLE_URL ? { sameAs: [SECOND_EDITION_KINDLE_URL] } : {}),
      author,
      editor: { "@type": "Person", name: "Catrise Austin" },
      contributor: { "@type": "Person", name: "Glenn Vo" },
      award: "#1 Best Seller in Dentistry on Amazon (November 2026)",
    },
  ];
}
