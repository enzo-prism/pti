import TermsOfService from "@/views/TermsOfService";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Terms of Service";
const description = "Review the Practice Transitions Institute terms of service.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/terms-of-service",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({ title, description, path: "/terms-of-service" })}
      />
      <TermsOfService />
    </>
  );
}
