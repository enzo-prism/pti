# SEO/AEO release — November 6, 2026

## Purpose and evidence
Implement the [GA4/GSC audit](https://app.notion.com/p/4103429581eb8135a82ed4a1f0afba40). Prioritize accurate lead measurement, the handbook discovery path, explicit author/business identity, and useful answers that connect to relevant services. Search rankings and AI citations remain outcomes to measure, not deployment guarantees.

## Measurement
GA4 `generate_lead` was verified as a key event in both properties on November 6. Report confirmed leads separately from CTA clicks. The consent change creates a measurement discontinuity: compare GSC clicks alongside GA4 sessions and do not present increased coverage as organic growth. Google AI-feature traffic is included in ordinary GSC Web reporting; do not treat branded or AI-related keyword filters as a complete AI-citation measure.

## Editorial and external dependencies
Do not invent a second-edition ISBN, confirmed purchase URL, professional review, client outcome, or market-supported valuation range. The November 17 launch needs its verified purchase destination before an Offer is added. Obtain rights-cleared excerpts/transcripts and actual practitioner-reviewed case material through the owner. External editorial links require outreach and publisher agreement. Indexing requests do not guarantee indexing. Continue to review the existing GSC exclusion cohorts and prioritize useful pages rather than publishing overlapping location or keyword variants.

## Follow-up readout
Use the first complete post-release 28-day period and the preceding 28 days, separating branded/nonbranded queries, device, landing page and query intent. Track handbook impressions/clicks, service-intent clicks, qualified enquiries, confirmed leads, and landing-page engagement. Validate professional review and link acquisition with dated evidence in the audit workspace. Do not fabricate retrospective attribution or equate impressions with appointments.

## PTI implementation
- Adopt the shared GA opt-out/regional Consent Mode model; preserve opt-in Hotjar/Vercel and canonical-host restrictions. Tests cover regional defaults before GA config and withdrawal.
- Clarify the dental-transition homepage title; connect founder identity explicitly rather than using the founder site as business sameAs.
- Add accurate two-edition Book nodes and related reading paths across services, locations and books.
- Add DSO offer-comparison questions and a concise LOI answer/checklist, preserving organizational authorship until a real named review occurs.
- Explain calculator assumptions, a reproducible worked example, and the limits of the fixed illustrative model. `scenarioInput.ts` rejects negative/malformed inputs; margins range from 0 to 100, without silent clamping. Submitted financial inputs remain in the browser.
- Update sitemap dates only for changed content.

## Validation
Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run rss:check` and `git diff --check` on Node 24. Review the calculator with the $1.2m / 40% worked example and invalid input, DSO comparison, books and contact on desktop/mobile. Confirm no overflow or browser errors. Never submit an unsolicited live lead. Verify production www redirects, sitemap/canonical tags, negative 404 controls and the deployed Git SHA.

## Additional SEO and lead-reliability release

### Evidence and purpose

[Source audit and implementation record](https://app.notion.com/p/4103429581eb8176beadea2ccc1301d5). For August 5–November 2 versus May 7–August 4: Google web clicks 87 versus 39, impressions 8,868 versus 5,261; GA4 organic sessions 118 versus 95. The recent period had one generate_lead, 22 registration clicks, six consultation clicks and zero recorded key events. These historical observations are not a joined conversion funnel or proof of missing leads.

### Changes

- Consultant-focused homepage title/H1, named expert and proof links.
- Three source-derived client stories linked from related services/resources. Original quotes remain unchanged; no private transaction facts, Review schema or expert review claims were invented.
- Valuation assumptions, owner-benefit definition, worked examples, strict input validation and service links. Multiples are educational model assumptions, not current transaction evidence or a formal Opinion of Value.
- Hypothetical cash/equity/earnout DSO comparison, selling milestones, opening LOI checklist, contextual FAQ links and Texas planning questions. No Texas transaction or local office is claimed.
- Separate canonical city/date pages for the three 2027 seminars. Collection pages emit ItemList; each detail page emits one Event. Public locations, client props and schema use city only. This does not claim eligibility for full-address event rich results.
- New routes registered in breadcrumbs, sitemap, search index and existing llms.txt inventory. The latter is route maintenance, not a claimed AI ranking mechanism.
- Consent-gated first-touch attribution, excluding arbitrary query strings and full referrer URLs. Contact data stays out of analytics.
- Contact/checklist/seminar submissions share a 20-second timeout and require HTTP success plus JSON {ok:true} before success UI/lead tracking. Duplicate submits are guarded. Seminar leads mean seminar_callback, with payment not collected online. Provider acceptance does not prove email delivery.
- Compatible development Undici patch to 8.12.4.

### Verification

Required gates: lint, TypeScript, image framing, full Vitest suite, production build, RSS and whitespace checks. Runtime form tests use mocked provider responses: failed acceptance records no lead, retains details and permits successful retry. Existing Pacific pricing rollover, stale submit, expired-date, privacy and client-boundary tests remain required. Release evidence, commit and production deployment belong in the Notion record.

Native GA4 Admin inspected November 6 shows generate_lead already starred as a key event, alongside qualify_lead, close_convert_lead and default purchase. No stream data was shown for the latter three. No key-event toggle was needed. Historical zero counts are not corrected retroactively. Browser input/evaluation repeatedly timed out, so other admin settings were not changed or claimed verified.

### Remaining business dependencies

1. Formspree acceptance is tested with mocks; actual intended inboxes, provider notification settings and receipt require account access and a coordinated marked delivery test. Do not change endpoints by guessing recipients.
2. Booked consultation, qualified lead, closed engagement and paid registration require authoritative booking/CRM/payment records. A click or callback request does not establish those outcomes.
3. Expert review, genuine Texas transaction evidence and approved video/podcast assets require the underlying material. Existing named authors are preserved; no new signoff is claimed.
4. Recovered Dr. Njo's November 2 TESTIMONIALS REV .doc from the source email. Searches of the document text bytes did not locate Parisa/Shahi. Connector extraction was truncated and local legacy DOC conversion unusable; reliable full extraction or original quote remains necessary. Do not invent missing text or close the existing task.
5. Independent references require third-party editorial action. Prepared target assets: valuation explanation, DSO comparison, seminar detail pages and client stories. No outreach or new external endorsement was sent or claimed.

Recheck comparable completed periods after recrawling: nonbrand clicks by page/query, native AI appearances separately from visits, and accepted/qualified leads by source. No ranking, citation or revenue lift is promised.

### Corrections and dependency scope

The initial missing-H1 seminar claim was an extraction error: the semantic header was excluded. The existing H1 was present. The Notion audit is corrected; this release adds program details and event pages, not a missing-H1 repair.

The original lockfile audit had 13 findings, including development Undici and Zod. Undici received a compatible patch. Zod 3 is used only for the browser contact form's bounded string fields; the constrained-collection advisory proposes a Zod 4 major upgrade. No server-side Zod parser or affected collection schema was found. The Zod/resolver migration and existing CSS-tooling advisory chain remain separate work; this release does not claim a clean dependency audit.

### Verified combined release gate

After integrating main commit 1d82f0f: lint and TypeScript passed, 246 tests in 40 files passed, image framing passed, production build passed, RSS passed, and git diff --check passed. Browser checks covered 390/1024/1280 widths, mobile menu with privacy banner, calculator results and invalid margin, seminar preselection and empty-form errors, client story and DSO table; no browser warnings/errors were captured. The local crawl covered 88 sitemap pages and 190 internal destinations. Production readback and exact commit/deployment evidence are recorded in the Notion audit after deployment.
