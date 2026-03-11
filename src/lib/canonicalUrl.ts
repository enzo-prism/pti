import { CANONICAL_SITE_URL } from "@/lib/siteMetadata";

const canonicalUrl = new URL(CANONICAL_SITE_URL);

export const CANONICAL_HOSTNAME = canonicalUrl.hostname.toLowerCase();
export const WWW_CANONICAL_HOSTNAME = `www.${CANONICAL_HOSTNAME}`;

export const getCanonicalRedirectUrl = (input: URL | string): URL | null => {
  const url = input instanceof URL ? new URL(input.toString()) : new URL(input);
  const hostname = url.hostname.toLowerCase();

  if (hostname !== WWW_CANONICAL_HOSTNAME) {
    return null;
  }

  url.hostname = CANONICAL_HOSTNAME;
  url.protocol = canonicalUrl.protocol;
  url.port = canonicalUrl.port;
  return url;
};
