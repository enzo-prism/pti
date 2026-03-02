# Reviews System Runbook

This runbook documents the canonical review architecture used across PTI pages.

## Goals
- Keep one source of truth for all review content.
- Support crawlable review detail pages.
- Keep review metadata bot-readable via JSON-LD.
- Preserve source fidelity while allowing professional UI display names.

## Source of Truth
- File: `src/data/reviews.ts`
- Main type: `ReviewRecord`
- Supported sources: `google`, `internal`, `amazon`
- Supported categories: `buyer`, `seller`, `workshop`, `valuation`, `book`

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

## Structured Data
Review schemas are built in `src/lib/structuredData.ts`.

- `buildReviewSchema(review, pageUrl)` for detail pages.
- `buildReviewItemListSchema(reviews, pageUrl)` for directory listing.
- `buildAggregateRatingSchema(reviews)` for aggregate summary.

Where applied:
- `/testimonials` includes `ItemList` + `AggregateRating`.
- `/testimonials/[slug]` includes `Review`.

Notes:
- `author` in JSON-LD uses `sourceAuthorName` for source fidelity.
- `datePublished` is included only when `sourceDateISO` exists.

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
- Includes `/testimonials` and one URL per review slug.
- Uses `sourceDateISO` for `lastModified` when available, otherwise build timestamp.

## Tests
- `src/data/reviews.test.ts`
  - id uniqueness
  - slug uniqueness
  - aggregate calculation
  - featured slot ordering
- `src/lib/structuredData.reviews.test.ts`
  - review schema shape
  - item list shape
  - aggregate rating shape

Run:
- `npm run test`
- `npm run lint`
- `npm run build`

## Manual QA Checklist
1. `/testimonials` shows searchable/filterable directory rows.
2. No visible review-time labels on review cards.
3. Review row links open full review detail pages.
4. Detail pages show breadcrumbs and previous/next links.
5. Home/services/events cards link to review detail pages.
6. `/sitemap.xml` contains all review detail URLs.
7. Mobile and desktop layouts are clean and readable.

## Updating Reviews Safely
1. Add/update records in `src/data/reviews.ts`.
2. Preserve existing `slug` values unless explicitly migrating URLs.
3. Keep `sourceAuthorName` unchanged; adjust `displayAuthorName` for presentation only.
4. Verify featured slot assignments still map to intended pages.
5. Run tests/lint/build and perform manual spot checks.
