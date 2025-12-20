# Practice Transitions Institute Website

PTI's marketing site is a Vite + React application that showcases services, success stories, events, and long-form resources for dentists preparing for major career transitions. The project is typed end-to-end with TypeScript, styled with Tailwind CSS and shadcn/ui primitives, and routed with React Router.

## Tech Stack
- Vite build system with SWC-powered React plugin
- React 18 + React Router 6 for views and routing
- TypeScript with strict configuration
- Tailwind CSS design system (tokens in `tailwind.config.ts`) and custom globals in `src/index.css`
- shadcn/ui component primitives backed by Radix UI

## Getting Started
1. Install Node.js 18+ (use `nvm` or a similar version manager).
2. Install dependencies: `npm install`
3. Launch the dev server: `npm run dev`

Common scripts:

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite in development mode with hot module replacement |
| `npm run build` | Create a production bundle in `dist/` |
| `npm run build:ci` | Build and verify the prerendered output |
| `npm run build:dev` | Produce a debuggable development build |
| `npm run preview` | Serve the last build locally |
| `npm run lint` | Run ESLint using the repo's TypeScript-aware config |
| `npm run verify` | Validate build output (sitemap, SEO tags, JSON-LD, prerendered routes) |

## Project Structure

```
src/
  components/       # Reusable UI (shadcn wrappers, layout building blocks)
  data/             # Structured content for blogs, events, book reviews, updates
  hooks/            # Custom hooks (e.g., responsive helpers)
  lib/              # Utilities, constants, sitemap helpers, analytics
  pages/            # Route-level views grouped by feature area
  index.css         # Global Tailwind layers and custom styles
scripts/            # Automation for sitemap generation and verification
public/             # Static assets served as-is
```

Routes are registered in `src/App.tsx` and wrapped by `src/components/layout/Layout.tsx`, which also mounts the `<SEO />` metadata component.

## Managing Site Content
- **Testimonials**: Maintained inline in `src/pages/Testimonials.tsx`. Entries include `quote`, `author`, `role`, `rating`, and `category` (`seller`, `buyer`, `workshop`, `valuation`, or `book`). Filters on the page rely on `category`, so keep values consistent.
- **Amazon book reviews**: Stored in `src/data/amazonReviews.ts` and rendered via `BookReviewCard` when the "Book Reviews" filter is active.
- **Events**: Update `src/data/events.ts`; the events page derives grouped views and "past" logic from this dataset.
- **Blog posts**: Authored as Markdown-in-strings inside `src/data/blogPosts.ts`. Each post includes metadata for slugs, gradients, and series links. The homepage displays the most recent blog post automatically.
- **Global contact info**: Shared constants like phone numbers live in `src/lib/constants.ts`; update here to propagate across components.

When editing long-form strings (blog posts, testimonials), preserve existing formatting such as Markdown headers and paragraph breaks to keep rendering consistent.

## UI Conventions
- Tailwind utility classes are preferred; extend design tokens in `tailwind.config.ts` when adding new colors or spacing.
- shadcn/ui components are exported from `src/components/ui`; co-locate any custom variants or wrappers alongside them.
- Animations rely on utility classes defined under `@layer components` in `src/index.css`.

## SEO, Analytics, and Automation
- `<SEO />` centralizes per-page meta tags. Ensure new pages provide `title`, `description`, and optional `image` props.
- Google Analytics 4 helpers live in `src/lib/analytics.ts` and expect the production GA ID (`G-XCBKH87HG5`). Analytics are suppressed during development builds.
- Build-time SEO verification (recommended): `npm run build:ci` runs `react-snap` prerendering plus `npm run verify` checks for sitemap output, canonicals, unique `<title>` tags, and JSON-LD validity.
- Prerender route generation: routes are derived from `scripts/route-config.ts` and `src/data/blogPosts.ts` at build time, so no manual include list updates are needed.
- Sitemap tooling: run `tsx scripts/generate-sitemap.ts` to regenerate `public/sitemap.xml` before building.
- Deploy freshness: `public/build-info.json` stamps each build and `src/lib/deployGuard.ts` forces a reload if a newer build is detected; `/sw-kill.html` clears caches/service workers for manual resets.
- Live-site smoke checks: run `npm run verify:live` to confirm redirects (www → apex, slash normalization), real 404 behavior, and prerendered route HTML in production.

## Deployment Notes
- `npm run build` emits the static bundle in `dist/` and prerenders key routes for SEO; avoid deploying with `vite build` alone or crawlers will see the generic SPA shell HTML.
- Cloudflare Pages: set build command to `npm run build` and output directory to `dist/` (canonicalization and legacy redirects live in `functions/_middleware.ts`).
- Lovable native deployments: use `npm run build:lovable` for sitemap generation plus a Vite build without prerender verification.
- The project originated in Lovable; changes pushed to `main` remain compatible with the Lovable editor experience.

## Coding Standards
- TypeScript is required for production code, with 2-space indentation enforced by ESLint and the repo configuration.
- Run `npm run lint` before opening a PR to catch style or typing issues.
- Favor functional React components and descriptive, PascalCase file names for exported components (e.g., `HeroSection.tsx`).
