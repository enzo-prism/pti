import Selling from "@/views/services/Selling";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Dental Practice Sale Advisory & Brokerage";
const description =
  "Plan and execute a successful dental practice sale with PTI's advisory, marketing, and negotiation support.";

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
