#!/usr/bin/env node

/**
 * Live-site smoke checks for SEO-critical behavior:
 * - Canonical host redirect (www -> apex)
 * - URL normalization (trailing slash, index.html, 200.html)
 * - Real 404s (not soft-404 200 responses)
 * - Prerendered HTML contains correct <title> and canonical
 *
 * Usage:
 *   LIVE_BASE_URL=https://practicetransitionsinstitute.com node scripts/verify-live.mjs
 */

const BASE_URL = (process.env.LIVE_BASE_URL ?? "https://practicetransitionsinstitute.com").replace(
  /\/$/,
  ""
);
const CANONICAL_BASE = "https://practicetransitionsinstitute.com";

const fetchManual = async (url, init) => {
  const response = await fetch(url, { redirect: "manual", ...init });
  const location = response.headers.get("location") ?? "";
  const body =
    (init?.method ?? "GET").toUpperCase() === "HEAD" ? "" : await response.text();
  return { response, location, body };
};

const expect = (condition, message) => {
  if (!condition) throw new Error(message);
};

const extractTitle = (html) => {
  const match = html.match(/<title>([^<]*)<\/title>/i);
  return match?.[1]?.trim() ?? "";
};

const extractMetaDescription = (html) => {
  const match =
    html.match(
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i
    ) ??
    html.match(
      /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i
    );
  return match?.[1]?.trim() ?? "";
};

const extractCanonical = (html) => {
  const match =
    html.match(
      /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i
    ) ??
    html.match(
      /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i
    );
  return match?.[1]?.trim() ?? "";
};

const extractRobots = (html) => {
  const match =
    html.match(
      /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i
    ) ??
    html.match(
      /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']robots["'][^>]*>/i
    );
  return match?.[1]?.trim() ?? "";
};

const isRedirect = (status) => status === 301 || status === 308;

const checks = [
  {
    name: "llms.txt available",
    run: async () => {
      const { response, body } = await fetchManual(`${BASE_URL}/llms.txt`, {
        method: "GET",
      });
      expect(response.status === 200, `Expected 200, got ${response.status}`);
      const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
      expect(
        contentType.includes("text/plain"),
        `Expected text/plain content-type, got ${JSON.stringify(contentType)}`
      );
      expect(
        body.includes("Practice Transitions Institute"),
        "Expected llms.txt to include site name"
      );
      expect(
        body.includes(CANONICAL_BASE),
        `Expected llms.txt to include ${CANONICAL_BASE}`
      );
    },
  },
  {
    name: "www → apex redirect",
    run: async () => {
      const { response, location } = await fetchManual(
        "https://www.practicetransitionsinstitute.com/",
        { method: "HEAD" }
      );
      expect(isRedirect(response.status), `Expected 301/308, got ${response.status}`);
      expect(
        location.startsWith(CANONICAL_BASE),
        `Expected Location to start with ${CANONICAL_BASE}, got ${JSON.stringify(location)}`
      );
    },
  },
  {
    name: "Trailing slash normalization",
    run: async () => {
      const { response, location } = await fetchManual(`${BASE_URL}/about/`, {
        method: "HEAD",
      });
      expect(isRedirect(response.status), `Expected 301/308, got ${response.status}`);
      expect(
        location === `${CANONICAL_BASE}/about`,
        `Expected Location ${CANONICAL_BASE}/about, got ${JSON.stringify(location)}`
      );
    },
  },
  {
    name: "index.html normalization",
    run: async () => {
      const { response, location } = await fetchManual(`${BASE_URL}/index.html`, {
        method: "HEAD",
      });
      expect(isRedirect(response.status), `Expected 301/308, got ${response.status}`);
      expect(
        location === `${CANONICAL_BASE}/`,
        `Expected Location ${CANONICAL_BASE}/, got ${JSON.stringify(location)}`
      );
    },
  },
  {
    name: "200.html normalization",
    run: async () => {
      const { response, location } = await fetchManual(`${BASE_URL}/200.html`, {
        method: "HEAD",
      });
      expect(isRedirect(response.status), `Expected 301/308, got ${response.status}`);
      expect(
        location === `${CANONICAL_BASE}/`,
        `Expected Location ${CANONICAL_BASE}/, got ${JSON.stringify(location)}`
      );
    },
  },
  {
    name: "Real 404 (not soft-404)",
    run: async () => {
      const { response, body } = await fetchManual(
        `${BASE_URL}/this-should-404`,
        { method: "GET" }
      );
      expect(response.status === 404, `Expected 404, got ${response.status}`);
      const title = extractTitle(body);
      const robots = extractRobots(body).toLowerCase();
      expect(title.includes("404"), `Expected 404 title, got ${JSON.stringify(title)}`);
      expect(
        robots.includes("noindex"),
        `Expected noindex robots, got ${JSON.stringify(robots)}`
      );
    },
  },
  {
    name: "Prerendered About page HTML",
    run: async () => {
      const { body: homeBody } = await fetchManual(`${BASE_URL}/`, {
        method: "GET",
      });
      const { response, body } = await fetchManual(`${BASE_URL}/about`, {
        method: "GET",
      });
      expect(response.status === 200, `Expected 200, got ${response.status}`);
      const homeDescription = extractMetaDescription(homeBody);
      const title = extractTitle(body);
      const description = extractMetaDescription(body);
      const canonical = extractCanonical(body);
      expect(
        title && title !== "Practice Transitions Institute",
        `Expected route-specific title, got ${JSON.stringify(title)}`
      );
      expect(description, "Expected meta description on /about");
      expect(
        !homeDescription || description !== homeDescription,
        "Expected /about meta description to differ from homepage"
      );
      expect(
        canonical === `${CANONICAL_BASE}/about`,
        `Expected canonical ${CANONICAL_BASE}/about, got ${JSON.stringify(canonical)}`
      );
    },
  },
];

const run = async () => {
  const failures = [];
  for (const check of checks) {
    try {
      await check.run();
      console.log(`✅ ${check.name}`);
    } catch (error) {
      console.error(`❌ ${check.name}`);
      console.error(`   ${error?.message ?? error}`);
      failures.push(check.name);
    }
  }

  if (failures.length) {
    console.error(`\n❌ Live verification failed (${failures.length} checks)`);
    process.exit(1);
  }

  console.log("\n✅ Live verification passed");
};

run();
