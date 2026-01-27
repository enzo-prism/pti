import Home from "@/views/Home";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { BUSINESS_DESCRIPTION } from "@/lib/siteMetadata";

const title = "Dental Practice Transition Experts";
const description = BUSINESS_DESCRIPTION;

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
