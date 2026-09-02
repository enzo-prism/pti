# PTI Deployment Runbook

This runbook covers releases from GitHub `enzo-prism/pti` `main` to the linked Vercel project `pti` and live verification on `https://practicetransitionsinstitute.com`.

## Pre-release

1. Confirm the intended branch and linked project:

```bash
git status --short --branch
cat .vercel/project.json
vercel project inspect pti
```

The production Git remote is `https://github.com/enzo-prism/pti.git`. Do not force-push a rewritten history from a scratch copy over `main`. Apply chrome/UX changes on top of current `main` so Search Console verification (`next.config.mjs` rewrites + `src/app/api/google-site-verification/` + `src/lib/googleSiteVerification.ts`) stays in place.

2. Use the repository Node runtime (24.x) and install from the lockfile.
3. Run the full local gate:

```bash
npm run lint
npm run test
npm run build
npm run rss:check
git diff --check
```

4. Review `git status --short` so new routes, tests, components, and assets are included in the commit.

## Release

The Git-connected production path is a push to `main` on `enzo-prism/pti`. If the production alias does not update from that push, deploy the same committed tree explicitly:

```bash
vercel deploy --prod --yes
```

Inspect the resulting deployment and alias state:

```bash
vercel ls pti
vercel inspect <deployment-url>
vercel inspect https://practicetransitionsinstitute.com
```

## Live smoke checks

Verify the stable public domain, not only an ephemeral Vercel URL:

- `/` renders the acquisition-to-legacy homepage and no meaningful section remains hidden.
- Header: at ~390px, Book and the hamburger are visible and tappable; at ~1024px the hamburger is used (no clipped desktop links); at ≥1280px the full nav, Services dropdown, phone number, and Book Consultation are visible. `/drnjo` uses the same Navbar.
- Open the mobile menu with the cookie banner visible and confirm Book/Call are not covered. Skip-to-content appears above the header, including on notched iPhones.
- `/events` lists only current seminars.
- `/events/practice-transition-seminar` excludes expired registration choices and schema.
- `/events/leadership-retreat` is a completed-event archive.
- `/services` renders the 3:2 workshop photo and the 1672:941 process photo sharply, with complete faces and no meaningful subject cropped at mobile or desktop widths.
- `/services/buying` renders acquisition-advisory content.
- `/gallery` and `/drnjo` show photos without captions or name bars under the image (alt text only).
- `/blog` exposes current topic filters and recent content. A community photo post such as `/blog/another-perfect-match` has no italic caption under the hero.
- `/contact`, `/privacy-policy`, and `/terms-of-service` render successfully.
- `/robots.txt`, `/sitemap.xml`, and `/blog/rss.xml` return valid public documents.
- `www.practicetransitionsinstitute.com` permanently redirects to the apex host.
- A Google Search Console HTML verification path still resolves (do not remove the `google*.html` rewrite).

## Analytics and privacy smoke

On the canonical host:

1. Reset privacy choices from the footer.
2. Confirm Google Analytics, Hotjar, and Vercel Analytics requests are absent before a decision.
3. Decline and confirm they remain absent.
4. Reset, accept, and confirm the configured providers load.
5. Do not submit a live lead solely to test analytics. Use non-submitting CTA/form-start interactions and confirm event properties contain no personal data.

Preview hosts intentionally keep analytics disabled.

## Security and redirect readback

Confirm the live response includes the configured HSTS, content-type, framing, referrer, permissions, and opener protections. Confirm the `www` redirect preserves the request path and lands on HTTPS apex.

## Dependency note

The repository remains on its specified Next.js 14 baseline. The current production audit retains advisories in Next.js and its bundled PostCSS that npm only resolves through a Next.js 16 major upgrade. Treat that migration as a separate compatibility and release project; do not silently force it during routine content releases.
