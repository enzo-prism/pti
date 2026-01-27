import PrivacyPolicy from "@/views/PrivacyPolicy";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Privacy Policy";
const description = "Practice Transitions Institute privacy policy and data practices.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({ title, description, path: "/privacy-policy" })}
      />
      <PrivacyPolicy />
    </>
  );
}
