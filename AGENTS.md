# Repository Guide for Codex CLI

## Project overview
This is a Next.js 14 App Router site with React 18, TypeScript (strict), Tailwind CSS, and shadcn/ui. Routes live in `src/app`, and view components are in `src/views`. Global styles load from `src/app/globals.css`. Layouts are defined in `src/app/(site)/layout.tsx` and `src/app/(minimal)/layout.tsx`.

## Key directories and source of truth
- `src/app`: route-level pages, layouts, and metadata.
- `src/views`: route-level view components consumed by app routes.
- `src/components`: reusable UI and layout; `src/components/ui` is the shadcn/ui layer (only components actually in use are kept — add new shadcn components only when something imports them).
- `src/lib`: utilities, analytics, SEO helpers, structured data, date utilities, constants.
- `src/data`: static content (blog posts, events, canonical reviews, FAQs).
- `public`: static assets, redirects, and `lovable-uploads` image folder.

## Local commands
- `npm run dev`: Next.js dev server.
- `npm run build`: production build.
- `npm run start`: serve production build locally.
- `npm run lint`: ESLint on the full repo.
- `npm run test`: Vitest suite (`*.test.ts` colocated with source).
- `npm run rss:check`: validates the generated blog RSS document.

## Routing and layout
- Routes live in `src/app`. `src/app/(site)/layout.tsx` adds `Navbar` and `Footer`.
- `DrNjo` uses the `(minimal)` route group.
- Legacy URL redirects live in `vercel.json` (Vercel host + www→apex + legacy path redirects). The old portable `public/_redirects` and `public/_headers` files were removed after the Vercel migration. There is no middleware.
- Add new routes to `src/lib/routeBreadcrumbs.ts` for breadcrumb data and to `STATIC_ROUTES` in `src/app/sitemap.ts`, then bump the static-route count assertion in `src/app/sitemap.test.ts`.

## Content management
- Blog posts: `src/data/blogPosts.ts` (Markdown-in-strings, optional embedded HTML).
  - Required fields: `id`, `title`, `excerpt`, `category`, `date` (YYYY-MM-DD), `readTime`, `slug`, `author`.
  - Optional fields: `dateModified`, `featuredImage`, `featuredImageAlt`, `featuredImageFit`, `series`, `cta`.
  - Dev-only internal link validation runs via `src/lib/linkValidation.ts`; `/blog/...` links must match slugs.
  - IMPORTANT: never import `blogPosts` from a client component — the full markdown bodies would ship in the JS bundle. Listing surfaces receive `BlogPostSummary[]` props mapped via `toBlogPostSummary` in a server page (see `src/app/(site)/blog/page.tsx`).
- Recent photo/video community posts: `src/data/communityImpactPosts.ts` (merged ahead of `blogPosts` in the blog listing, post route, and sitemap). Photo stories need a real `featuredImage` — a gradient-only hero looks like a missing photograph.
- Gallery storytelling set: `src/data/drNjoGallery.ts` plus dimensions in `src/data/galleryImages.ts`. Files live in `public/lovable-uploads/drnjo-2026/`. Several historical thumbs (`mayflower-trio`, `conference-room-meeting`, `dugoni-group-photo`, `dinner-duo`, `publication-spread`, `blue-print-for-success-flyer`, `black-tie-medal-portrait`) are native ~240–320px; keep `fit: "contain"` so they are not cover-cropped and upscaled. Do not invent higher-resolution replacements unless a true original is supplied.
- Events: `src/data/practiceTransitionSeminar.ts` is the single source of truth for seminar dates; `src/data/events.ts` derives the event-hub records from it. Date utilities are strict and injectable for tests, expired seminars are archived automatically, and current event pages refresh hourly.
- Testimonials: canonical reviews dataset in `src/data/reviews.ts` (see `docs/reviews-runbook.md`).
- Amazon reviews: `src/data/amazonReviews.ts`.
- Lead magnet: `/resources/practice-sale-readiness-checklist` (`src/views/PracticeSaleChecklist.tsx`, form in `src/components/resources/`).
- Resources hub: `/resources` (`src/views/Resources.tsx`) links the calculator, checklist, DSO guide, and blog.
- Valuation pillar + calculator: `/resources/how-much-is-my-dental-practice-worth` (`src/views/PracticeWorth.tsx`) embeds the client-side `src/components/resources/PracticeValueCalculator.tsx` (percent-of-collections + earnings-multiple estimate; emits the `calculate_practice_value` analytics event).
- Location / service-area pages: content lives in `src/data/locations.ts` (one entry per state with distinct, sourced market context — never templated doorway copy). The shared renderer is `src/views/locations/LocationView.tsx`; the `/locations` hub is `src/views/Locations.tsx`. These pages describe service areas, not verified PTI offices, so they must not emit `LocalBusiness` office schema. To add a state: add a `LOCATIONS` entry, create `src/app/(site)/locations/<slug>/page.tsx`, and register it in `routeBreadcrumbs.ts` + `sitemap.ts` (+ test count).
- Business contact info: `src/lib/constants.ts` and `SITE_CONTACT_EMAIL` in `src/lib/siteMetadata.ts` — always use these constants, never hardcode emails or phone numbers.

## Blog system behavior
- Listing page: `src/views/Blog.tsx` (client component receiving summaries as props). The route is statically generated; `?search=` deep links are applied after hydration from `window.location.search`.
- Post page: `src/views/BlogPost.tsx` renders Markdown through the allowlist sanitizer in `src/lib/markdown.ts` before `dangerouslySetInnerHTML`.
  - Content is split on blank lines, so avoid extra blank lines inside HTML blocks.
  - Raw HTML is allowlisted; iframes are limited to Instagram embeds. Do not broaden the allowlist without tests and a concrete publishing need.
  - Editorial QA tests reject internal drafting language, body H1s, unsafe HTML, and overlong search metadata.
- Series navigation uses `post.series` and `getSeriesPosts`.
- Related posts are filtered by category and sorted most-recent first.
- Use `formatLocalDate` for display to avoid timezone shifts.

## SEO and structured data
- `src/lib/seo.ts` builds metadata; `src/components/StructuredData.tsx` renders JSON-LD.
- `src/lib/structuredData.ts` includes schemas for blog posts, events, contact, and FAQs (`buildFAQSchema`). The `ProfessionalService`/`LocalBusiness` schema carries `geo` (`BUSINESS_GEO` in `siteMetadata.ts`) and `sameAs`.
- Canonical host is controlled by `NEXT_PUBLIC_CANONICAL_SITE_URL` in `src/lib/siteMetadata.ts`.
- `sameAs` profiles come from `NEXT_PUBLIC_SOCIAL_PROFILES` (comma-separated URLs); when unset it defaults to the founder's official site. Set it in Vercel to add the Google Business Profile, LinkedIn, etc. without a code change.
- FAQ pages/sections export a plain `{ question, answer }[]` array from the view and pass `buildFAQSchema(...)` into `buildPageJsonLd({ structuredData })` (see `/services/selling`, `/resources/how-much-is-my-dental-practice-worth`).
- Search schema targets `/blog` via `SITE_SEARCH_PATH`.

## Analytics
- `AnalyticsProviders` is mounted once from the root layout. Google Analytics, Hotjar, and Vercel Analytics load only after explicit consent on the canonical production host; privacy choices can be reset from the footer.
- Custom events in `src/lib/analytics.ts` (lead generation, blog views, CTAs, series navigation).

## Styling and UI conventions
- Tailwind is primary; extend tokens in `tailwind.config.ts` (primary is `#06437A`).
- Global styles and utilities live in `src/app/globals.css` under Tailwind layers.
- Common layout helpers: `Section`, `SectionTitle`, `SectionSubtitle`.
- Fonts are loaded via `next/font` (Inter and Montserrat) in `src/app/layout.tsx`.
- `Navbar` and `Footer` are `print:hidden`; keep printable pages (e.g., the checklist) working when adding chrome.
- `Navbar` desktop submenus and the mobile drawer must remain keyboard-operable, Escape-dismissable, and absent from the accessibility tree while closed.
- `ScrollReveal` is progressive enhancement: content must remain visible if observer or animation support fails, and reduced-motion users should not receive reveal motion.
- Use the `@` alias for `src` imports.

## Assets
- Use `/lovable-uploads/...` for local assets in `public/lovable-uploads`.
- Panel of Experts dinner photos: `public/lovable-uploads/drnjo-2026/IMG_4918.webp`, `IMG_4923.webp`, `IMG_3346.webp` (1600×2133 WebP from the original iPhone JPEGs).
- Industry-leaders reel stays an Instagram embed; the blog hero uses a saved poster at `public/lovable-uploads/drnjo-2026/industry-leaders-reel-poster.webp`. Do not hotlink Instagram CDN URLs (they expire).
- External image URLs are allowed; include meaningful `alt` text.
- `featuredImageFit` supports `"cover"` or `"contain"` for blog posts.
- Portrait community graphics set `featuredImageAspect: "portrait"` plus the file's `featuredImageWidth` / `featuredImageHeight` so listing cards, the homepage Latest Update, and post heroes use that intrinsic frame instead of a 16:9 box that letterboxes `object-contain` images. Vertical recaps that need this include the Board of Regents graphic, Roseville collage, Bill/Mikki porch, Beyond the Chair flyer, and Panel of Experts dinner photos.
- Always render post dates with `formatLocalDate`. Never print the raw `YYYY-MM-DD` string in UI.

## Build and deployment notes
- The build defines `NEXT_PUBLIC_BUILD_TIMESTAMP` in `next.config.mjs`.
- Sitemap and robots are generated by `src/app/sitemap.ts` and `src/app/robots.ts`.
- Security headers and the `www` → apex redirect are defined in `next.config.mjs` and `vercel.json`.
- The linked Vercel project is `pti`; the canonical production host is `https://practicetransitionsinstitute.com`.

## Coding style and naming
- TypeScript only; 2-space indentation; functional components.
- PascalCase component filenames; hooks start with `use`.
- Prefer `cn` for class merging and shadcn patterns for variants.

## Testing and verification
- Vitest suite lives next to source files (`*.test.ts`); run with `npm run test`.
- The sitemap test asserts the static-route count — update it when adding routes.
- For UI changes, manually verify key routes: `/`, `/blog`, `/blog/:slug`, `/events`, `/contact`.

## Commit and PR guidelines
- Commit messages: short, imperative (e.g., "Fix blog post runtime error").
- PRs should describe user-facing changes and list verification steps.

## Current service architecture

- `/services/buying` owns acquisition-advisory intent; keep it distinct from associate buy-ins.
- Core service pages use `EngagementDetails` to explain deliverables, typical timing, roles, fees, representation/conflicts, and attorney/CPA coordination.
- PTI owns detailed transition-service and transaction-proof search intent. Dr. Njo's personal site owns his full biography, education/speaking authority, and non-transactional Dental Strategies guidance.
