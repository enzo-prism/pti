import Partnerships from "@/views/services/Partnerships";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Dental Practice Partnerships";
const description =
  "Build a strong dental partnership with PTI's transition consulting and deal structuring expertise.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/services/partnerships",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/services/partnerships",
        })}
      />
      <Partnerships />
    </>
  );
}
