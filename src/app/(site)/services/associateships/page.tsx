import Associateships from "@/views/services/Associateships";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Dental Associateships & Buying In";
const description =
  "Secure the right associateship or buy-in opportunity with PTI guidance on fit, valuation, and transition strategy.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/services/associateships",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/services/associateships",
        })}
      />
      <Associateships />
    </>
  );
}
