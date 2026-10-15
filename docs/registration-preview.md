# Seminar registration update, October 12, 2026

Based on main `6871e23d40f769da76b8ad1fbdf0bbc1531a9d6e`; selectively integrates registration work from draft `661df48`. Enzo authorized updating project documentation and pushing this completed registration change to main and production on October 12, 2026. The release verification and exact deployed SHA belong in the Michael Njo / PTI Outcomes & Deliverables shipped log. This file retains its preview filename for existing links.

## Implemented

- Compact callback form with Reserve heading and seminar-specific Reserve header action. Site-wide search and ordinary header behavior remain on other routes.
- Prominent direct call before pricing/fields; large callback submit action.
- Liz's October 9 confirmation and Can't Attend consultation copy, using existing contact constants.
- Clear required callback/payment acknowledgement and separate optional SMS choice.
- Kevin Barry's source-exact seminar excerpt and full name. His quote is approved for seminar use. His verified portrait appears beside the attribution in a small circular frame; no post-sale claims or substitute portrait.
- Cancellation/refund policy retained; repeated cancellation-contact sentence removed.
- Canonical 2027 rates: $247 through December 31, 2026 Pacific, $397 January 1 onward, $197 additional attendees. Historical 2026 terms preserved.
- Price, group totals, expired promotion text, payload, and fresh Event offers derive from the same terms. Midnight/focus/selection refresh and pre-submit checks prevent silent quote changes. Both date-sensitive routes render on request; the events page layout/content is preserved.
- Successful legitimate requests produce lead events; filled honeypots do not. No payment-card fields.

## Verification

Run Node 24: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, and `npm run rss:check`.

The preview passed 196 tests in 34 files, lint, TypeScript, image framing, RSS checks, and the production build. Browser checks covered 390px, 1024px, and 1280px layouts and key site routes. Re-run the release gate when source changes.

Runtime tests mount the real React form in jsdom, mock all submission fetches, and cover automatic midnight rollover, stale first submit then reviewed second submit, focus refresh, attendee totals, and expired dates. Fresh server Event offers use the same terms as the visible price. An already-open page retains its original JSON-LD while the visible form quote refreshes. No provider notification or payment result is implied.

## Open follow-ups

- Confirm final commercial rules, seat/rate-lock meaning, cancellation boundaries, actual receiving inbox/callback coverage, and San Francisco venue. The release retains Kohan Group / 490 Post Street from current main; Liz's mockup says QUO / 1 Post Street. Do not silently replace the venue without confirmation.
- With explicit authorization to send the test, run a marked external delivery test and read back the intended recipient/provider result. Publication approval does not prove actual notification delivery, a completed callback, or payment.

These follow-ups remain documented separately from the authorized website release. The existing Formspree endpoint and contact constants are retained.

## Kevin Barry portrait, October 15, 2026

Recovered the portrait from the [Kevin Barry Google reviewer profile](https://www.google.com/maps/contrib/115219715606618582569/reviews?hl=en) linked in Liz's August 4, 2025 email, "Testimonial." The labeled profile contains the exact PTI seminar review. A separate historical photo attachment was not located. Enzo approved the saved image for the PTI website on October 15.

The original 144×144 PNG is stored at `public/lovable-uploads/kevin-barry-google-profile.png` and rendered at 56×56 CSS pixels beside his seminar attribution. It is served locally without image enlargement, added cropping, or a dependency on the remote Google image URL.

Release preparation also applied compatible dependency fixes, including Next.js and its ESLint configuration 15.5.27. The remaining audit findings are documented in `docs/deployment-runbook.md`; no forced framework or Tailwind major upgrade is part of this release.

Unrelated address/schema, book-release timing, logo, Google Profile, and broader GHL work from the old draft are not included.
