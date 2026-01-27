import Home from "@/views/Home";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { BUSINESS_DESCRIPTION } from "@/lib/siteMetadata";

const title = "Dental Practice Transition Consulting & Valuation";
const description =
  "Expert guidance for dentists buying, selling, partnering, or valuing a practice. PTI delivers end-to-end transition strategy, negotiation, and support.";

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
          includeLocalBusinessSchema: true,
        })}
      />
      <Home />
    </>
  );
}
