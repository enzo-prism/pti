import Value from "@/views/services/Value";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Opinion of Value for Dental Practices";
const description =
  "Receive a data-backed opinion of value for your dental practice, built to inform confident transition decisions.";

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
