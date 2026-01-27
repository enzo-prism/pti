import Value from "@/views/services/Value";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Dental Practice Valuation (Opinion of Value)";
const description =
  "Get a clear, data-backed valuation for your dental practice with PTI's Opinion of Value service.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/services/value",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({ title, description, path: "/services/value" })}
      />
      <Value />
    </>
  );
}
