import DrNjo from "@/views/DrNjo";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Dr. Michael Njo";
const description =
  "Learn about Dr. Michael Njo's leadership, expertise, and role at Practice Transitions Institute.";

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/drnjo",
});

export default function Page() {
  return (
    <>
      <StructuredData data={buildPageJsonLd({ title, description, path: "/drnjo" })} />
      <DrNjo />
    </>
  );
}
