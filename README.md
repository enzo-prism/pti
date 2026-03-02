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
  data/             # Structured content for blogs, events, canonical reviews, updates
  hooks/            # Custom hooks (e.g., responsive helpers)
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
- Review-specific JSON-LD builders live in `src/lib/structuredData.ts`:
  - `buildReviewSchema`
  - `buildReviewItemListSchema`
  - `buildAggregateRatingSchema`
- Google Analytics 4 helpers live in `src/lib/analytics.ts`. Configure `NEXT_PUBLIC_GA_MEASUREMENT_ID` for the GA4 stream (legacy fallback ID remains during migration), and `NEXT_PUBLIC_HOTJAR_ID` optionally for Hotjar.
- Analytics run only on production + canonical host with a valid GA measurement ID. `NEXT_PUBLIC_VERCEL_ENV` is optional and, when set, controls production detection.
- Lead-focused key events emitted by the app include `generate_lead`, `book_consultation_click`, and `phone_call_click`.
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

## Additional Runbooks
- `docs/ga4-runbook.md`: GA4 implementation and validation.
- `docs/reviews-runbook.md`: canonical reviews dataset, routing, metadata, and QA workflow.
