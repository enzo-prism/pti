const CANONICAL_HOST = "practicetransitionsinstitute.com";
const WWW_HOST = `www.${CANONICAL_HOST}`;

const LEGACY_REDIRECTS = new Map([
  ["/dr-njo", "/drnjo"],
  ["/meet-our-team", "/about"],
  ["/speaking-engagements", "/events"],
  ["/podcasts", "/blog"],
  ["/client-testimonials", "/testimonials"],
  ["/contact-us", "/contact"],
  ["/updates/dugoni-business-club-donation", "/blog/dugoni-business-club-donation"],
]);

const normalizePathname = (pathname) => {
  const raw = (pathname || "/").trim();
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const singleSlashes = withLeadingSlash.replace(/\/{2,}/g, "/");
  const withoutIndex = singleSlashes.replace(/\/index\.html$/i, "/");
  if (withoutIndex === "/") return "/";
  return withoutIndex.replace(/\/+$/, "");
};

const isHtmlRequest = (request) => {
  const accept = request.headers.get("accept") || "";
  return accept.includes("text/html");
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const canonicalHost = url.hostname === WWW_HOST ? CANONICAL_HOST : url.hostname;
    let canonicalPath = normalizePathname(url.pathname);
    canonicalPath = LEGACY_REDIRECTS.get(canonicalPath) ?? canonicalPath;

    if (
      url.protocol !== "https:" ||
      canonicalHost !== url.hostname ||
      canonicalPath !== url.pathname
    ) {
      const destination = new URL(request.url);
      destination.protocol = "https:";
      destination.hostname = canonicalHost;
      destination.pathname = canonicalPath;
      return Response.redirect(destination.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    if (!isHtmlRequest(request)) return response;

    if (url.pathname !== "/" && !url.pathname.includes(".")) {
      const indexUrl = new URL(request.url);
      indexUrl.pathname = `${url.pathname}/index.html`;
      const indexResponse = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));
      if (indexResponse.status !== 404) return indexResponse;
    }

    const spaUrl = new URL(request.url);
    spaUrl.pathname = "/index.html";
    const spaResponse = await env.ASSETS.fetch(new Request(spaUrl.toString(), request));
    if (spaResponse.status === 404) return response;

    return new Response(spaResponse.body, {
      status: 200,
      headers: spaResponse.headers,
    });
  },
};

