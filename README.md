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

## Project Structure

```
src/
  app/              # Next.js routes, layouts, metadata, sitemap/robots
  components/       # Reusable UI (shadcn wrappers, layout building blocks)
  data/             # Structured content for blogs, events, book reviews, updates
  hooks/            # Custom hooks (e.g., responsive helpers)
  lib/              # Utilities, constants, SEO helpers, analytics
  views/            # Route-level view components consumed by app routes
public/             # Static assets served as-is
```

Routes live in `src/app` and are wrapped by `src/app/(site)/layout.tsx` or `src/app/(minimal)/layout.tsx`. SEO metadata and JSON-LD are set per route using `src/lib/seo.ts` and `src/components/StructuredData.tsx`.

## Managing Site Content
- **Testimonials**: Maintained inline in `src/views/Testimonials.tsx`. Entries include `quote`, `author`, `role`, `rating`, and `category` (`seller`, `buyer`, `workshop`, `valuation`, or `book`). Filters on the page rely on `category`, so keep values consistent.
- **Amazon book reviews**: Stored in `src/data/amazonReviews.ts` and rendered via `BookReviewCard` when the "Book Reviews" filter is active.
- **Events**: Update `src/data/events.ts`; the events page derives grouped views and "past" logic from this dataset.
- **Blog posts**: Authored as Markdown-in-strings inside `src/data/blogPosts.ts`. Each post includes metadata for slugs, gradients, and series links. The homepage displays the most recent blog post automatically.
- **Global contact info**: Shared constants like phone numbers live in `src/lib/constants.ts`; update here to propagate across components.

When editing long-form strings (blog posts, testimonials), preserve existing formatting such as Markdown headers and paragraph breaks to keep rendering consistent.

## UI Conventions
- Tailwind utility classes are preferred; extend design tokens in `tailwind.config.ts` when adding new colors or spacing.
- shadcn/ui components are exported from `src/components/ui`; co-locate any custom variants or wrappers alongside them.
- Animations rely on utility classes defined under `@layer components` in `src/app/globals.css`.

## SEO and Analytics
- Per-page metadata is generated with `buildPageMetadata` in `src/lib/seo.ts`.
- JSON-LD is rendered with `StructuredData` from `src/components/StructuredData.tsx`.
- Google Analytics 4 helpers live in `src/lib/analytics.ts` and expect the production GA ID (`G-XCBKH87HG5`). Analytics are suppressed during development builds.
- Sitemap and robots are generated at runtime by `src/app/sitemap.ts` and `src/app/robots.ts`.
- Social profiles (schema `sameAs`): set `NEXT_PUBLIC_SOCIAL_PROFILES` to a comma-separated list of profile URLs.

## Deployment
The site deploys via Vercel using Next.js defaults.

- **Build command**: `npm run build`
- **Output directory**: `.next/`
- **Redirects**: Vercel redirects are defined in `vercel.json`; portable legacy redirects remain in `public/_redirects`.

## Coding Standards
- TypeScript is required for production code, with 2-space indentation enforced by ESLint and the repo configuration.
- Run `npm run lint` before opening a PR to catch style or typing issues.
- Favor functional React components and descriptive, PascalCase file names for exported components (e.g., `HeroSection.tsx`).
