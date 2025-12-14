const CANONICAL_HOST = "practicetransitionsinstitute.com";
const WWW_HOST = `www.${CANONICAL_HOST}`;

const LEGACY_REDIRECTS: Record<string, string> = {
  "/dr-njo": "/drnjo",
  "/meet-our-team": "/about",
  "/speaking-engagements": "/events",
  "/podcasts": "/blog",
  "/client-testimonials": "/testimonials",
  "/contact-us": "/contact",
  "/updates/dugoni-business-club-donation": "/blog/dugoni-business-club-donation",
};

const normalizePathname = (pathname: string): string => {
  const raw = (pathname || "/").trim();
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const singleSlashes = withLeadingSlash.replace(/\/{2,}/g, "/");
  const withoutHtmlEntrypoint = singleSlashes.replace(
    /\/(?:index|200)\.html$/i,
    "/"
  );
  if (withoutHtmlEntrypoint === "/") return "/";
  return withoutHtmlEntrypoint.replace(/\/+$/, "");
};

const isHtmlRequest = (request: Request): boolean => {
  const accept = request.headers.get("accept") ?? "";
  return accept.includes("text/html");
};

type AssetsFetcher = {
  fetch: (request: Request) => Promise<Response>;
};

type MiddlewareEnv = {
  ASSETS: AssetsFetcher;
};

type MiddlewareContext = {
  request: Request;
  env: MiddlewareEnv;
};

export const onRequest = async (context: MiddlewareContext): Promise<Response> => {
  const { request, env } = context;
  const url = new URL(request.url);

  const canonicalHost = url.hostname === WWW_HOST ? CANONICAL_HOST : url.hostname;
  let canonicalPath = normalizePathname(url.pathname);
  canonicalPath = LEGACY_REDIRECTS[canonicalPath] ?? canonicalPath;

  if (
    url.protocol !== "https:" ||
    canonicalHost !== url.hostname ||
    canonicalPath !== url.pathname
  ) {
    const destination = new URL(request.url);
    destination.protocol = "https:";
    destination.hostname = canonicalHost;
    destination.pathname = canonicalPath;
    const redirectStatus =
      request.method === "GET" || request.method === "HEAD" ? 301 : 308;
    return Response.redirect(destination.toString(), redirectStatus);
  }

  const assetResponse = await env.ASSETS.fetch(request);
  if (assetResponse.status !== 404) return assetResponse;
  if (!isHtmlRequest(request)) return assetResponse;

  if (url.pathname !== "/" && !url.pathname.includes(".")) {
    const indexUrl = new URL(request.url);
    indexUrl.pathname = `${url.pathname}/index.html`;
    const indexResponse = await env.ASSETS.fetch(
      new Request(indexUrl.toString(), request)
    );
    if (indexResponse.status !== 404) return indexResponse;
  }

  const notFoundUrl = new URL(request.url);
  notFoundUrl.pathname = "/404.html";
  const notFoundResponse = await env.ASSETS.fetch(
    new Request(notFoundUrl.toString(), request)
  );
  if (notFoundResponse.status !== 404) {
    return new Response(notFoundResponse.body, {
      status: 404,
      headers: notFoundResponse.headers,
    });
  }

  const spaUrl = new URL(request.url);
  spaUrl.pathname = "/index.html";
  const spaResponse = await env.ASSETS.fetch(new Request(spaUrl.toString(), request));
  if (spaResponse.status === 404) return assetResponse;

  return new Response(spaResponse.body, {
    status: 404,
    headers: spaResponse.headers,
  });
};
