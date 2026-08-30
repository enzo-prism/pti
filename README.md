# Practice Transitions Institute Website

PTI's marketing site is a Next.js App Router application that showcases services, success stories, events, and long-form resources for dentists preparing for major career transitions. The project is typed end-to-end with TypeScript, styled with Tailwind CSS and shadcn/ui primitives, and rendered server-first for SEO.

## Tech Stack
- Next.js 14 App Router with React 18
- TypeScript with strict configuration
- Tailwind CSS design system (tokens in `tailwind.config.ts`) and custom globals in `src/app/globals.css`
- shadcn/ui component primitives backed by Radix UI

## Getting Started
1. Install Node.js 22.x (use `nvm` or a similar version manager).
2. Install dependencies: `npm install`
3. Launch the dev server: `npm run dev`

Common scripts:

| Command | Description |
| --- | --- |
| `npm run dev` | Start Next.js in development mode |
| `npm run build` | Create production build in `.next/` |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint using the repo's TypeScript-aware config |
| `npm run test` | Run the Vitest suite (`*.test.ts` colocated with source) |
| `npm run rss:check` | Validate the generated blog RSS feed |

## Project Structure

```
src/
  app/              # Next.js routes, layouts, metadata, sitemap/robots
  components/       # Reusable UI (shadcn wrappers, layout building blocks)
  data/             # Structured content for blogs, events, canonical reviews, updates
  lib/              # Utilities, constants, SEO helpers, analytics
  views/            # Route-level view components consumed by app routes
public/             # Static assets served as-is
```

Routes live in `src/app` and are wrapped by `src/app/(site)/layout.tsx` or `src/app/(minimal)/layout.tsx`. SEO metadata and JSON-LD are set per route using `src/lib/seo.ts` and `src/components/StructuredData.tsx`.

## Managing Site Content
- **Canonical reviews dataset**: Managed in `src/data/reviews.ts` and consumed by `/testimonials`, `/testimonials/[slug]`, homepage/service/event entry points, sitemap generation, and review JSON-LD.
  - Keep `id` and `slug` stable once published.
  - Keep `quote` source-exact.
  - Use `displayAuthorName` for UI presentation and `sourceAuthorName` for metadata fidelity.
  - Use `featuredSlots` for cards on home/services/events.
- **Testimonials route**:
  - Directory: `src/app/(site)/testimonials/page.tsx` + `src/views/Testimonials.tsx`
  - Detail pages: `src/app/(site)/testimonials/[slug]/page.tsx`
  - The UI intentionally does not render review-time labels.
- **Amazon source records**: Raw Amazon review data remains in `src/data/amazonReviews.ts` for recommendation surfaces that still use `BookReviewCard`.
- **Events hub**: `src/data/events.ts` contains non-seminar event records and derives seminar entries from the canonical schedule.
- **Seminar schedule**: Update `src/data/practiceTransitionSeminar.ts`; it is the single source of truth used by the events hub, seminar detail/registration form, pricing state, and Event JSON-LD. Expired dates are removed from current registration automatically.
- **Blog posts**: Authored as Markdown-in-strings inside `src/data/blogPosts.ts`. Each post includes metadata for slugs, gradients, and series links, plus an optional `dateModified` for substantive updates. The homepage displays the most recent blog post automatically.
- **Community impact posts**: Recent photo/video updates live in `src/data/communityImpactPosts.ts` and are merged ahead of `blogPosts`. Photo posts should include a `featuredImage` so the hero is not a CSS gradient. Vertical graphics set `featuredImageAspect: "portrait"` (or `"square"`) and the real pixel size so the homepage Latest Update, blog cards, and post heroes do not letterbox them inside a landscape crop. `src/lib/featuredImage.ts` also maps known files such as `/lovable-uploads/flyer-photo.webp`. Dates render through `formatLocalDate` — never the raw ISO string.
  - Client components must never import `blogPosts` directly (the full markdown bodies would ship in the JS bundle). Listing surfaces receive `BlogPostSummary[]` props mapped via `toBlogPostSummary` in a server page — see `src/app/(site)/blog/page.tsx`.
- **Lead magnet**: `/resources/practice-sale-readiness-checklist` (`src/views/PracticeSaleChecklist.tsx`) is a printable checklist with a Formspree email-capture form (`src/components/resources/ChecklistSignupForm.tsx`).
- **Buying a practice**: `/services/buying` is the dedicated acquisition-advisory route. Associate buy-ins remain under `/services/associateships`.
- **Resources hub & valuation calculator**: `/resources` (`src/views/Resources.tsx`) indexes the free tools. `/resources/how-much-is-my-dental-practice-worth` (`src/views/PracticeWorth.tsx`) is the valuation pillar page and embeds the interactive `PracticeValueCalculator` (`src/components/resources/`).
- **Location pages**: State service-area content is data-driven in `src/data/locations.ts`, rendered by `src/views/locations/LocationView.tsx`, with a `/locations` hub (`src/views/Locations.tsx`). Keep each state's copy genuinely distinct — these are not templated doorway pages. Adding a state requires a `LOCATIONS` entry, a route under `src/app/(site)/locations/`, and registration in `routeBreadcrumbs.ts` + `sitemap.ts` (and the sitemap test count).
- **Global contact info**: Shared constants like phone numbers live in `src/lib/constants.ts`; the business email is `SITE_CONTACT_EMAIL` in `src/lib/siteMetadata.ts`. Update here to propagate across components.

When editing long-form strings (blog posts, testimonials), preserve existing formatting such as Markdown headers and paragraph breaks to keep rendering consistent.

## UI Conventions
- Tailwind utility classes are preferred; extend design tokens in `tailwind.config.ts` when adding new colors or spacing.
- shadcn/ui components are exported from `src/components/ui`; co-locate any custom variants or wrappers alongside them.
- Animations rely on utility classes defined under `@layer components` in `src/app/globals.css`.

## SEO and Analytics
- Per-page metadata is generated with `buildPageMetadata` in `src/lib/seo.ts`.
- JSON-LD is rendered with `StructuredData` from `src/components/StructuredData.tsx`.
- Review-specific JSON-LD builders live in `src/lib/structuredData.ts`:
  - `buildReviewSchema`
  - `buildReviewItemListSchema`
  - `buildAggregateRatingSchema`
- Google Analytics 4 helpers live in `src/lib/analytics.ts`. Configure `NEXT_PUBLIC_GA_MEASUREMENT_ID` for the GA4 stream (legacy fallback ID remains during migration), and `NEXT_PUBLIC_HOTJAR_ID` optionally for Hotjar.
- Google Analytics, Hotjar, and Vercel Analytics are consent-gated by the single root `AnalyticsProviders` mount and load only on the canonical production host. Visitors can reset the saved choice from the footer.
- Lead-focused key events emitted by the app include `generate_lead`, `book_consultation_click`, and `phone_call_click`.
- Sitemap and robots are generated at runtime by `src/app/sitemap.ts` and `src/app/robots.ts`.
- Social profiles (schema `sameAs`): set `NEXT_PUBLIC_SOCIAL_PROFILES` to a comma-separated list of profile URLs (Google Business Profile, LinkedIn, Facebook, YouTube). When unset, it defaults to the founder's official site so at least one verified identity link is emitted.
- FAQ rich results: pages/sections expose a `{ question, answer }[]` array and pass `buildFAQSchema(...)` through `buildPageJsonLd`. Business structured data includes `geo` coordinates (`BUSINESS_GEO`).

## Deployment
The site deploys via Vercel using Next.js defaults.

- **Build command**: `npm run build`
- **Output directory**: `.next/`
- **Redirects**: All redirects (www→apex host normalization and legacy path redirects) are defined in `vercel.json`. The former Cloudflare/Vite `public/_redirects` and `public/_headers` files were removed after the Vercel migration.
- **Security**: HSTS, content-type, framing, referrer, permissions, and opener policies are defined in `next.config.mjs`.
- **Production host**: `https://practicetransitionsinstitute.com` (`www` permanently redirects to apex).

Before production, run:

```bash
npm run lint
npm run test
npm run build
npm run rss:check
```

See `docs/deployment-runbook.md` for release and live-smoke procedures.

## Coding Standards
- TypeScript is required for production code, with 2-space indentation enforced by ESLint and the repo configuration.
- Run `npm run lint` before opening a PR to catch style or typing issues.
- Favor functional React components and descriptive, PascalCase file names for exported components (e.g., `HeroSection.tsx`).

## Additional Runbooks
- `docs/ga4-runbook.md`: GA4 implementation and validation.
- `docs/reviews-runbook.md`: canonical reviews dataset, routing, metadata, and QA workflow.
- `docs/implementation-map.md`: current routing, events, analytics, editorial, service, and cross-site architecture.
- `docs/deployment-runbook.md`: main-branch release, Vercel production deployment, and live verification.
