import Home from "@/views/Home";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { BUSINESS_DESCRIPTION } from "@/lib/siteMetadata";

const title = "Dental Practice Transition Consultants | PTI";
const description =
  "Led by Dr. Michael Njo, PTI helps dentists value, buy, sell, and transition a practice, compare DSO offers, and plan ownership changes.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/",
  ogType: "website",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/",
        })}
      />
      <Home />
    </>
  );
}
