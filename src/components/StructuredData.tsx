import type { JsonLdShape } from "@/lib/structuredData";

interface StructuredDataProps {
  data?: JsonLdShape | null;
  id?: string;
}

// Escape "<" so text such as "</script>" inside a quote cannot end the script
// element early.
export const serializeJsonLd = (data: JsonLdShape): string =>
  JSON.stringify(data).replace(/</g, "\\u003c");

export const StructuredData = ({ data, id }: StructuredDataProps) => {
  if (!data) return null;

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
};
