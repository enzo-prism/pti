# PTI Deployment Runbook

This runbook covers releases from GitHub `enzo-prism/pti` `main` to the linked Vercel project `pti` and live verification on `https://practicetransitionsinstitute.com`.

## Pre-release

1. Confirm the intended branch and linked project:

```bash
git status --short --branch
cat .vercel/project.json
vercel project inspect pti
```

The production Git remote is `https://github.com/enzo-prism/pti.git`. The Vercel project ID is `prj_qDSA7QllaQmMZjFzwViyDdGSz3BY`, in team `team_NbogaPSGlnnTm8RNaeS0B4Pl`. A projectless worktree may not have `.vercel/project.json`; verify the linked project with the authenticated Vercel project API instead of creating a new project. Do not force-push a rewritten history from a scratch copy over `main`. Fetch current `main` and apply chrome/UX changes on top of it so Search Console verification (`next.config.mjs` rewrites + `src/app/api/google-site-verification/` + the issued-token allowlist in `src/lib/googleSiteVerification.ts`) stays in place.

2. Use the repository Node runtime (24.x) and install from the lockfile.
3. Run the full local gate:

```bash
npm run lint
npm run typecheck
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

Verify that remote `main` equals the intended release SHA, the Vercel production deployment is `READY`, and its Git metadata has that same SHA. Resolve the stable custom domain to that deployment; a successful push or a ready preview alone does not confirm a production release. Record the SHA, deployment ID, live checks, and any operational gaps in the project shipped log.

## Live smoke checks

Verify the stable public domain, not only an ephemeral Vercel URL:

- `/` renders the acquisition-to-legacy homepage and no meaningful section remains hidden.
- Header: at ~390px, the primary action and hamburger are visible and tappable; at ~1024px the hamburger is used (no clipped desktop links); at ≥1280px the full nav, Services dropdown, phone number, and primary action are visible. The seminar route shows Reserve linking to `#register`; other routes show Book / Book Consultation. `/drnjo` uses the same Navbar.
- Open the mobile menu with the cookie banner visible and confirm Book/Call are not covered. Skip-to-content appears above the header, including on notched iPhones.
- `/events` lists only current seminars.
- `/events/practice-transition-seminar` excludes expired registration choices and schema, and its Event JSON-LD `startDate` carries a Pacific offset (e.g. `T08:00:00-07:00`), not `Z`.
- Seminar pricing and fresh Event offers match the current Pacific deadline: $247 through December 31, 2026, $397 from January 1, 2027, and $197 per additional attendee. Confirm callback/direct-call actions, required acknowledgement, separate optional SMS consent, and empty-form validation without sending a live lead. See `docs/registration-preview.md` for the rollover tests and open business follow-ups.
- `/faq` and a service page such as `/services/selling` include the FAQ answer text in the page HTML, not only in JSON-LD.
- `/events/leadership-retreat` is a completed-event archive.
- `/services` renders the 3:2 workshop photo and the 1672:941 process photo sharply, with complete faces and no meaningful subject cropped at mobile or desktop widths.
- `/services/buying` renders acquisition-advisory content.
- `/gallery` and `/drnjo` show photos without captions or name bars under the image (alt text only).
- `/blog` exposes current topic filters and recent content. A community photo post such as `/blog/another-perfect-match` has no italic caption under the hero.
- `/contact`, `/privacy-policy`, and `/terms-of-service` render successfully.
- `/robots.txt`, `/sitemap.xml`, and `/blog/rss.xml` return valid public documents.
- `www.practicetransitionsinstitute.com` permanently redirects to the apex host, and a legacy path such as `www…/seminar` reaches its page in one hop.
- An issued Search Console token such as `/google078b551f409128a8.html` still resolves, and a made-up one such as `/googleabc123.html` returns 404.
- A testimonial detail page serves `noindex, follow` and is absent from `sitemap.xml`.

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

The repository uses Next.js 15.5.28 with matching ESLint configuration, React 18, and Sharp 0.35.5. Dynamic blog and review routes await their parameters. A scoped override keeps Next.js's bundled PostCSS on the patched root version; ESLint's `brace-expansion` override uses 1.1.21.

The October 23, 2026 local audit prompted compatible updates to Next.js/ESLint 15.5.28, sanitize-html 2.18.1, Vite 7.3.7, and Vitest 4.1.12. The full lockfile audit then reports 4 moderate findings; the production-only audit reports 3 moderate findings, with no high or critical findings in either mode. The remaining chain is `postcss-selector-parser <7.1.6` through Tailwind 3, `postcss-nested`, and `@tailwindcss/typography`. npm's proposed remediations require a Tailwind 4 migration and a typography downgrade; neither was forced into this release. This is not a clean audit. Run full and production-only audits again for future releases because advisory data changes, and track the CSS tooling migration separately.
