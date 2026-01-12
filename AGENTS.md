# Repository Guide for Codex CLI

## Project overview
This is a Vite + React 18 single-page app with React Router, TypeScript (strict), Tailwind CSS, and shadcn/ui. The entry point is `src/main.tsx`, which renders `src/App.tsx` and pulls in `src/index.css`. Routing and layout are defined in `src/App.tsx`, with most pages wrapped by `Layout` and a small subset using `MinimalLayout`.

## Key directories and source of truth
- `src/pages`: route-level views (one file per route).
- `src/components`: reusable UI and layout; `src/components/ui` is the shadcn/ui layer.
- `src/hooks`: shared hooks like `useIsMobile`, `useScrollToTop`, and analytics helpers.
- `src/lib`: utilities, analytics, SEO helpers, structured data, date utilities, constants.
- `src/data`: static content (blog posts, events, amazon reviews).
- `public`: static assets, redirects, sitemap, and `lovable-uploads` image folder.
- `scripts`: build and sitemap automation.

## Local commands
- `npm run dev`: Vite dev server with hot reload.
- `npm run build`: clean `dist`, write `public/build-info.json`, generate sitemap, then Vite build.
- `npm run build:dev`: development build.
- `npm run preview`: preview the last build.
- `npm run lint`: ESLint on the full repo.
- `npm run verify`: checks `dist/index.html` for `#root`.
- `npm run build:ssg`: legacy no-op after build (this is a SPA).

## Routing and layout
- Routes live in `src/App.tsx`. `Layout` adds `Navbar`, `Footer`, and `useScrollToTop`.
- `Contact` wraps itself in `Layout`, so the App route does not wrap it again.
- `DrNjo` uses `MinimalLayout`.
- Legacy URL redirects are in `public/_redirects`. Keep the SPA fallback as the last rule.
- Add new routes to:
  - `src/lib/routeBreadcrumbs.ts` for breadcrumb data.
  - `scripts/route-config.ts` for sitemap and prerender routes.

## Content management
- Blog posts: `src/data/blogPosts.ts` (Markdown-in-strings, optional embedded HTML).
  - Required fields: `id`, `title`, `excerpt`, `category`, `date` (YYYY-MM-DD), `readTime`, `slug`, `author`.
  - Optional fields: `featuredImage`, `featuredImageAlt`, `featuredImageFit`, `series`.
  - Dev-only internal link validation runs via `src/lib/linkValidation.ts`; `/blog/...` links must match slugs.
- Events: `src/data/events.ts` (date strings like "March 28, 2025"; optional `dateDisplay` for ranges).
- Testimonials: inline in `src/pages/Testimonials.tsx`.
- Amazon reviews: `src/data/amazonReviews.ts`.
- Business contact info: `src/lib/constants.ts` and `src/lib/siteMetadata.ts`.

## Blog system behavior
- Listing page: `src/pages/Blog.tsx` with `?search=` query param.
- Post page: `src/pages/BlogPost.tsx` uses `marked` and `dangerouslySetInnerHTML`.
  - Content is split on blank lines, so avoid extra blank lines inside HTML blocks.
  - Do not introduce untrusted HTML (no sanitization is applied).
- Series navigation uses `post.series` and `getSeriesPosts`.
- Related posts are filtered by category and left in array order (no recency sort).
- Use `formatLocalDate` for display to avoid timezone shifts.

## SEO and structured data
- `<SEO />` in `src/components/layout/SEO.tsx` sets title, meta, canonical URL, and JSON-LD.
- `src/lib/structuredData.ts` includes schemas for blog posts, events, and contact.
- Canonical host is controlled by `VITE_CANONICAL_SITE_URL` in `src/lib/siteMetadata.ts`.
- Search schema targets `/blog` via `SITE_SEARCH_PATH`.

## Analytics
- `useAnalytics` injects GA + Hotjar only in production on the canonical host.
- `useGoogleAnalytics` tracks SPA page views.
- Custom events in `src/lib/analytics.ts` (blog views, CTAs, series navigation).

## Styling and UI conventions
- Tailwind is primary; extend tokens in `tailwind.config.ts` (primary is `#06437A`).
- Global styles and utilities live in `src/index.css` under Tailwind layers.
- Common layout helpers: `Section`, `SectionTitle`, `SectionSubtitle`.
- Fonts are loaded in `src/index.css` (Inter and Montserrat).
- Use the `@` alias for `src` imports.

## Assets
- Use `/lovable-uploads/...` for local assets in `public/lovable-uploads`.
- External image URLs are allowed; include meaningful `alt` text.
- `featuredImageFit` supports `"cover"` or `"contain"` for blog posts.

## Build and deployment notes
- The build defines `__BUILD_TIMESTAMP__` in `vite.config.ts`.
- Sitemap generation is automatic in `npm run build` via `scripts/generate-sitemap.ts`.
- `public/robots.txt` references the sitemap URL; keep it in sync with canonical host.

## Coding style and naming
- TypeScript only; 2-space indentation; functional components.
- PascalCase component filenames; hooks start with `use`.
- Prefer `cn` for class merging and shadcn patterns for variants.

## Testing and verification
- No automated tests yet. If you add tests, use `.test.ts(x)` next to source files.
- For UI changes, manually verify key routes: `/`, `/blog`, `/blog/:slug`, `/events`, `/contact`.

## Commit and PR guidelines
- Commit messages: short, imperative (e.g., "Fix blog post runtime error").
- PRs should describe user-facing changes and list verification steps.
