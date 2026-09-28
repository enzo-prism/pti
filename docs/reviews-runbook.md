# Reviews System Runbook

This runbook documents the canonical review architecture used across PTI pages.

## Goals
- Keep one source of truth for all review content.
- Show every review in full on `/testimonials`, with a shareable detail page per review.
- Preserve source fidelity while allowing professional UI display names.

## Source of Truth
- File: `src/data/reviews.ts`
- Main type: `ReviewRecord`
- Supported sources: `google`, `internal`, `amazon`, `alignable`
- Supported categories: `buyer`, `seller`, `workshop`, `valuation`, `consulting`, `book`
- Display labels: `src/data/reviewLabels.ts` (safe to import from client components; `reviews.ts` is not)

Key rules:
1. `id` and `slug` are stable identifiers and should not be regenerated for existing records.
2. `quote` should remain source-exact unless a content correction is explicitly requested.
3. `sourceAuthorName` preserves original source identity.
4. `displayAuthorName` is the professional alias shown in UI.
5. UI review-time labels are intentionally hidden.

## Routing
- Directory page: `src/app/(site)/testimonials/page.tsx`
- Directory view: `src/views/Testimonials.tsx`
- Detail route: `src/app/(site)/testimonials/[slug]/page.tsx`

Route behavior:
1. `generateStaticParams()` prebuilds all review slugs.
2. `dynamicParams = false` ensures only known review pages are generated.
3. Detail pages include breadcrumb path: `Home > Testimonials > {Reviewer}`.
4. Detail pages render `noindex,follow` and are left out of the sitemap. Each quote already appears in full on `/testimonials` and is mirrored on michaelnjodds.com, so the one-quote pages were thin duplicates. To index them again, set `REVIEW_DETAIL_PAGES_INDEXED` in `src/data/reviews.ts`.

## Structured Data
No Review, AggregateRating, or review ItemList JSON-LD is emitted. Google does not show review stars for a business's reviews of itself, or for reviews republished from other sites (Google, Amazon, Alignable). The markup also labelled Amazon reviews of the handbook as reviews of the consulting service. Do not reintroduce it without a qualifying, first-party review source.

## Whole-Site Entry Points
Featured review cards are sourced from `featuredSlots` via `getFeaturedReviews(slot)`.

Current slot integrations:
- `home` -> `src/views/Home.tsx`
- `selling` -> `src/views/services/Selling.tsx`
- `associateships` -> `src/views/services/Associateships.tsx`
- `events` -> `src/views/Events.tsx`

All entry-point cards should link to canonical detail pages (`/testimonials/[slug]`).

## Sitemap
- File: `src/app/sitemap.ts`
- Includes `/testimonials`; detail URLs are included only when `REVIEW_DETAIL_PAGES_INDEXED` is true.

## Tests
- `src/data/reviews.test.ts`
  - id uniqueness
  - slug uniqueness
  - featured slot ordering
  - distinct story titles for repeated first names
- `src/app/sitemap.test.ts`
  - detail pages stay out of the sitemap while noindexed

Run:
- `npm run test`
- `npm run lint`
- `npm run build`

## Manual QA Checklist
1. `/testimonials` shows searchable/filterable directory rows.
2. No visible review-time labels on review cards.
3. Review row links open full review detail pages.
4. Detail pages show breadcrumbs and previous/next links, and their `robots` meta is `noindex, follow`.
5. Home/services/events cards link to review detail pages.
6. Mobile and desktop layouts are clean and readable.

## Updating Reviews Safely
1. Add/update records in `src/data/reviews.ts`.
2. Preserve existing `slug` values unless explicitly migrating URLs.
3. Keep `sourceAuthorName` unchanged; adjust `displayAuthorName` for presentation only.
4. Verify featured slot assignments still map to intended pages.
5. Mirror the change to michaelnjodds.com.
6. Run tests/lint/build and perform manual spot checks.
