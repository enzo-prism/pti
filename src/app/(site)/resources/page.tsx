import Resources from "@/views/Resources";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Dental Practice Transition Resources";
const description =
  "Free dental practice transition tools and guides: a practice value calculator, a sale readiness checklist, a DSO decision guide, and in-depth articles.";
const path = "/resources";

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
      <Resources />
    </>
  );
}
