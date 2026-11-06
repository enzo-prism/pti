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
- Explain calculator assumptions, a reproducible worked example, and the limits of the fixed illustrative model. `scenarioInput.ts` rejects negative/malformed inputs; margins must be greater than zero and no more than 100, without silent clamping. Submitted financial inputs remain in the browser.
- Update sitemap dates only for changed content.

## Validation
Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run rss:check` and `git diff --check` on Node 24. Review the calculator with the $1.2m / 40% worked example and invalid input, DSO comparison, books and contact on desktop/mobile. Confirm no overflow or browser errors. Never submit an unsolicited live lead. Verify production www redirects, sitemap/canonical tags, negative 404 controls and the deployed Git SHA.
