
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const SEO = ({ title, description, path = "", image }: SEOProps) => {
  const siteName = "Practice Transitions Institute";
  const fullTitle = `${title} | ${siteName}`;
  const url = `${window.location.origin}${path}`;
  const ogImageUrl = image || "/lovable-uploads/26ea1640-396f-4e68-b342-d7cc429029fa.png";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
};

export default SEO;
