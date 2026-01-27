import Selling from "@/views/services/Selling";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Selling a Dental Practice";
const description =
  "Plan and execute a successful dental practice sale with PTI's expert guidance, negotiation support, and transition planning.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/services/selling",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({ title, description, path: "/services/selling" })}
      />
      <Selling />
    </>
  );
}
