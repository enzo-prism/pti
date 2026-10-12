# Registration preview, October 12, 2026

Local preview only. Based on main `6871e23d40f769da76b8ad1fbdf0bbc1531a9d6e`; selectively integrates registration work from draft `661df48`. No push, PR update, hosted deployment, production release, or external form submission is part of this work.

## Implemented

- Compact callback form with Reserve heading and seminar-specific Reserve header action. Site-wide search and ordinary header behavior remain on other routes.
- Prominent direct call before pricing/fields; large callback submit action.
- Liz's October 9 confirmation and Can't Attend consultation copy, using existing contact constants.
- Clear required callback/payment acknowledgement and separate optional SMS choice.
- Kevin Barry's source-exact seminar excerpt and full name. His quote is approved for seminar use. No post-sale claims or substitute portrait.
- Cancellation/refund policy retained; repeated cancellation-contact sentence removed.
- Canonical 2027 preview rates: $247 through December 31, 2026 Pacific, $397 January 1 onward, $197 additional attendees. Historical 2026 terms preserved.
- Price, group totals, expired promotion text, payload, and fresh Event offers derive from the same terms. Midnight/focus/selection refresh and pre-submit checks prevent silent quote changes. Both date-sensitive routes render on request; the events page layout/content is preserved.
- Successful legitimate requests produce lead events; filled honeypots do not. No payment-card fields.

## Verification

Run Node 24: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, and `npm run rss:check`.

Runtime tests mount the real React form in jsdom, mock all submission fetches, and cover automatic midnight rollover, stale first submit then reviewed second submit, focus refresh, attendee totals, and expired dates. No provider notification or payment result is implied.

## Still needed before publication

- Confirm final commercial rules, seat/rate-lock meaning, cancellation boundaries, actual receiving inbox/callback coverage, and San Francisco venue. Current source retains Kohan Group / 490 Post Street; Liz's mockup says QUO / 1 Post Street.
- Locate and confirm Kevin Barry's actual portrait. Email/Drive review found his approved quote, but no verifiable image. The testimonial SOP permits quote-only treatment when a consented image is unavailable.
- With explicit authorization, run a marked external delivery test and read back the intended recipient/provider result.
- Approve this exact release scope and commit before any publishing.

Unrelated address/schema, book-release timing, logo, Google Profile, and broader GHL work from the old draft are not included.
