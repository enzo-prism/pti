import Contact from "@/views/Contact";
import { StructuredData } from "@/components/StructuredData";
import { buildContactPageSchema } from "@/lib/structuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";

const title = "Contact Practice Transitions Institute";
const description =
  "Get in touch with PTI to discuss valuations, practice sales, and transition planning.";

const contactSchema = buildContactPageSchema();

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/contact",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/contact",
          structuredData: contactSchema,
          includeLocalBusinessSchema: true,
        })}
      />
      <Contact />
    </>
  );
}
