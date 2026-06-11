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

## Routing and layout
- Routes live in `src/app`. `src/app/(site)/layout.tsx` adds `Navbar` and `Footer`.
- `DrNjo` uses the `(minimal)` route group.
- Legacy URL redirects are in `public/_redirects` (portable) and `vercel.json` (Vercel host + www→apex redirects). There is no middleware.
- Add new routes to `src/lib/routeBreadcrumbs.ts` for breadcrumb data and to `STATIC_ROUTES` in `src/app/sitemap.ts`.

## Content management
- Blog posts: `src/data/blogPosts.ts` (Markdown-in-strings, optional embedded HTML).
  - Required fields: `id`, `title`, `excerpt`, `category`, `date` (YYYY-MM-DD), `readTime`, `slug`, `author`.
  - Optional fields: `dateModified`, `featuredImage`, `featuredImageAlt`, `featuredImageFit`, `series`, `cta`.
  - Dev-only internal link validation runs via `src/lib/linkValidation.ts`; `/blog/...` links must match slugs.
  - IMPORTANT: never import `blogPosts` from a client component — the full markdown bodies would ship in the JS bundle. Listing surfaces receive `BlogPostSummary[]` props mapped via `toBlogPostSummary` in a server page (see `src/app/(site)/blog/page.tsx`).
- Events: `src/data/events.ts` (date strings like "March 28, 2025"; optional `dateDisplay` for ranges).
- Testimonials: canonical reviews dataset in `src/data/reviews.ts` (see `docs/reviews-runbook.md`).
- Amazon reviews: `src/data/amazonReviews.ts`.
- Lead magnet: `/resources/practice-sale-readiness-checklist` (`src/views/PracticeSaleChecklist.tsx`, form in `src/components/resources/`).
- Business contact info: `src/lib/constants.ts` and `SITE_CONTACT_EMAIL` in `src/lib/siteMetadata.ts` — always use these constants, never hardcode emails or phone numbers.

## Blog system behavior
- Listing page: `src/views/Blog.tsx` (client component receiving summaries as props). The route is statically generated; `?search=` deep links are applied after hydration from `window.location.search`.
- Post page: `src/views/BlogPost.tsx` uses `marked` and `dangerouslySetInnerHTML`.
  - Content is split on blank lines, so avoid extra blank lines inside HTML blocks.
  - Do not introduce untrusted HTML (no sanitization is applied).
- Series navigation uses `post.series` and `getSeriesPosts`.
- Related posts are filtered by category and sorted most-recent first.
- Use `formatLocalDate` for display to avoid timezone shifts.

## SEO and structured data
- `src/lib/seo.ts` builds metadata; `src/components/StructuredData.tsx` renders JSON-LD.
- `src/lib/structuredData.ts` includes schemas for blog posts, events, and contact.
- Canonical host is controlled by `NEXT_PUBLIC_CANONICAL_SITE_URL` in `src/lib/siteMetadata.ts`.
- Search schema targets `/blog` via `SITE_SEARCH_PATH`.

## Analytics
- `GoogleAnalytics` and `HotjarAnalytics` (in `src/components/analytics/`) are mounted from the root layout and inject GA + Hotjar only in production on the canonical host (`shouldEnableAnalytics` in `src/lib/analytics.ts`).
- Custom events in `src/lib/analytics.ts` (lead generation, blog views, CTAs, series navigation).

## Styling and UI conventions
- Tailwind is primary; extend tokens in `tailwind.config.ts` (primary is `#06437A`).
- Global styles and utilities live in `src/app/globals.css` under Tailwind layers.
- Common layout helpers: `Section`, `SectionTitle`, `SectionSubtitle`.
- Fonts are loaded via `next/font` (Inter and Montserrat) in `src/app/layout.tsx`.
- `Navbar` and `Footer` are `print:hidden`; keep printable pages (e.g., the checklist) working when adding chrome.
- Use the `@` alias for `src` imports.

## Assets
- Use `/lovable-uploads/...` for local assets in `public/lovable-uploads`.
- External image URLs are allowed; include meaningful `alt` text.
- `featuredImageFit` supports `"cover"` or `"contain"` for blog posts.

## Build and deployment notes
- The build defines `NEXT_PUBLIC_BUILD_TIMESTAMP` in `next.config.mjs`.
- Sitemap and robots are generated by `src/app/sitemap.ts` and `src/app/robots.ts`.

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
