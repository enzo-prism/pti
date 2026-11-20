# SEO/AEO pass — 2026-11-20

Follow-up to `seo-aeo-release-2026-11-06.md`, after the Second Edition launch.

## What changed

- **Second Edition is published.** Prelaunch wording ("Launching November 17", "Coming soon", "pre-order", "purchase details will be shared", "(November 17)") is gone from pages, metadata, footer, site search, gallery captions and `llms.txt`. Pages now state the verified facts from the Amazon listing (read Nov 20): Kindle edition published November 17, 2026, 273 pages, editor Catrise Austin, foreword by Dr. Glenn Vo, ASIN B0HRL1C1LZ, and the #1 Best Seller in Dentistry milestone.
- `/resources/second-book` has a visible FAQ (publication, where to buy, what's new, edition differences, audience) with matching FAQPage JSON-LD.
- **Book JSON-LD** (`src/lib/handbookSchema.ts`): stable exported `@id`s per edition; the Second Edition adds `datePublished`, EBook `bookFormat`, `numberOfPages`, ASIN `identifier`, Amazon `sameAs`, `editor`, foreword `contributor` and the bestseller `award`. No ISBN, publisher or Offer.
- `/drnjo` hero callout for the Second Edition; `/gallery` gets a descriptive title.
- `public/llms.txt` has a Key facts section for answer engines.
- Sitemap `lastModified` 2026-11-20 for `/books`, `/resources`, `/resources/second-book`, `/drnjo`.
- IndexNow key and `npm run indexnow` (see README).

## Rules

- The bestseller is a milestone it **reached**; never write that it "is" #1 or claim the exact day.
- Don't claim a paperback, ISBN, publisher or price end date until Dr. Njo confirms one.

## Still needed from the client

- Final Second Edition cover art (pages still show the "Coming soon" announcement graphic).
- Print edition, ISBN and publisher, if any; how long the $2.99 Kindle price lasts.
