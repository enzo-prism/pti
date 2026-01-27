import Testimonials from "@/views/Testimonials";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Client Testimonials";
const description =
  "Hear how dentists describe working with Practice Transitions Institute during their practice transitions.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/testimonials",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({ title, description, path: "/testimonials" })}
      />
      <Testimonials />
    </>
  );
}
