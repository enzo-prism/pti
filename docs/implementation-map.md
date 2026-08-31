# PTI Implementation Map

This document records the current production architecture after the August 2026 site audit. Read it with the repository `AGENTS.md` before changing routes, events, analytics, long-form content, or service positioning.

## Route and service ownership

- PTI owns dental-practice transaction intent: valuation, selling, DSO offer review, acquisition advisory, associate buy-ins, and partnerships.
- `/services/buying` is the acquisition-advisory route. `/services/associateships` covers associate ownership and buy-ins.
- Core service routes use `src/components/services/EngagementDetails.tsx` for deliverables, timing, team roles, fees, representation/conflicts, and outside-advisor coordination.
- Dr. Njo's personal site owns his full biography, speaking/education authority, and non-transactional Dental Strategies advisory. PTI's `/drnjo` remains a concise team profile.

## Events and date state

- `src/data/practiceTransitionSeminar.ts` is the single seminar schedule.
- `src/data/events.ts` derives event-hub records from the seminar schedule so hub and detail pages cannot drift.
- `src/lib/dateUtils.ts` parses dates strictly and accepts an injected reference date for deterministic tests.
- Current-event UI, registration choices, pricing, and Event schema exclude expired dates. Event routes refresh hourly.
- The completed June 2026 Leadership Retreat is an archive, not an active registration funnel.

## Forms and lead handling

- The contact and seminar forms submit to the existing Formspree workflows.
- Seminar registration validates bounded inputs, phone format, consent, current seminar selection, and deadline-aware pricing; success/error states move focus appropriately.
- The readiness checklist offers immediate Print/Save-as-PDF access. Educational email consent is optional and separate from access to the checklist.
- Never emit submitted names, emails, phone numbers, messages, or other personal data in analytics events.

## Analytics and privacy

- `src/components/analytics/AnalyticsProviders.tsx` is the only provider mount.
- `src/lib/consent.ts` owns the versioned browser preference.
- Google Analytics, Hotjar, and Vercel Analytics stay unloaded until explicit consent and only run on the canonical production host.
- `src/components/privacy/` owns the banner and footer preference control. Privacy-policy changes must stay aligned with the providers actually mounted.

## Editorial rendering and QA

- Blog content is stored in `src/data/blogPosts.ts`.
- `src/lib/markdown.ts` sanitizes rendered HTML through a narrow allowlist; Instagram is the only allowed iframe host.
- Article tests reject drafting-process language, body H1s, unsafe HTML, and metadata beyond the configured title/description limits.
- Source cards and legal/tax/finance disclaimers describe the available evidence without inventing external review credentials.
- Homepage Latest Update and blog listing/featured cards honor `featuredImageFit` and `featuredImageAspect`. `src/lib/featuredImage.ts` classifies portrait, square, and landscape from metadata or known file sizes so contain images are not letterboxed inside a 16:9 crop. Vertical recaps set `featuredImageWidth` / `featuredImageHeight`. Untagged landscape post heroes use `object-cover`. Square graphics (Attitude `Frame_1`) use an `aspect-square` listing frame.
- Display dates go through `formatLocalDate`. The homepage Latest Update must not render a raw ISO date.
- Completed-event recaps must not keep upcoming-event CTAs. The August 14 Panel of Experts dinner post links to the August 27 Roseville recap instead of advertising a past dinner as upcoming.

## Service-page media and framing

- `src/views/Services.tsx` owns the two `/services` overview images.
- “Choose the Path That Fits Your Goals” uses `/lovable-uploads/drnjo-2026/san-mateo-symposium-workshop.jpg` (1800×1200) with an authentic description of Dr. Michael Njo advising dentists.
- “Our Process” uses `/lovable-uploads/services-transition-planning-hd.webp` (1672×941). It is an illustrative planning scene, not a representation of PTI clients or staff, so its alt text must stay activity-based.
- Both slots are fixed 16:9 `aspect-video` frames. Prefer sources at least 1600px wide with all faces, hands, and decision-making activity inside the centered safe area. Avoid portrait sources and do not compensate for a bad source with fragile breakpoint-specific object positioning.

## Locations and structured data

- State content lives in `src/data/locations.ts` and must remain materially distinct and sourced.
- California, Texas, and Florida are service-area pages, not verified office locations. Do not emit `LocalBusiness` office schema for them.
- Register new public routes in `src/lib/routeBreadcrumbs.ts`, `src/app/sitemap.ts`, and the sitemap test.

## Accessibility and progressive enhancement

- The desktop Services menu and mobile drawer support keyboard interaction, Escape dismissal, focus management, and accurate expanded/hidden state.
- `ScrollReveal` fails open and respects reduced motion; meaningful content must never depend on an observer firing.
- Accessibility: cookie-preference controls, the events “View Past Events” toggle, and primary consent buttons stay at least 44px tall. The cookie banner adds temporary bottom padding so it does not cover footer CTAs.

## Verification

Run the complete release gate:

```bash
npm run lint
npm run test
npm run build
npm run rss:check
git diff --check
```

For production-sensitive changes, also verify `/`, `/events`, `/events/practice-transition-seminar`, `/services`, `/services/buying`, `/blog`, `/contact`, `sitemap.xml`, and `robots.txt` on the stable public domain.
