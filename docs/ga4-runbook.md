# GA4 runbook — PTI

Property: PTI Website (502361992). Verify the production stream Measurement ID against deployment configuration without exposing credentials.

## Outcomes and supporting actions

- generate_lead: accepted contact inquiry, checklist request or seminar callback, distinguished by lead_type/form_id. Only fire after provider acceptance and with analytics consent; suppress honeypot leads. This does not prove inbox receipt.
- book_consultation_click, phone_call_click, registration clicks and form starts: supporting interactions, not confirmed business outcomes.
- qualify_lead, close_convert_lead, confirmed booking and paid registration: require authoritative CRM/booking/payment evidence. Never manufacture them from browser clicks.

On November 6, native Admin > Data display > Events > Key events showed generate_lead already starred, with PTI Website stream activity. qualify_lead, close_convert_lead and default purchase were also listed without stream data. No configuration change was needed. Historical zero key-event counts remain historical. Other admin settings were not verified due browser timeouts.

## Configuration checks

Check Enhanced Measurement against the app's explicit page_view implementation to avoid duplicate SPA page views. Register needed event-scoped dimensions such as lead_type, form_id, form_provider, cta_name, cta_location and content_category only after inspecting existing definitions. Do not send names, email addresses, phone numbers, form messages or arbitrary query strings to GA4.

The existing main release loads Google Analytics unless declined, with regional Consent Mode defaults and advertising consent denied. Hotjar/Vercel remain opt-in and all providers are restricted to the canonical production host. This creates a measurement discontinuity; compare GSC alongside GA4 and do not call increased measurement coverage organic growth. Preview hosts stay disabled. First-touch attribution is captured after consent, restricted to path, external hostname and sanitized campaign fields, then added to inquiry payloads. Changing consent to declined clears attribution storage.

For internal traffic, obtain actual staff definitions; never guess IP addresses. Validate a filter in testing mode before activation. Investigate (not set) landing-page rows through consent/tag timing and actual session examples; aggregate counts do not establish a cause.

## Validation

Use local mocked form tests for success, provider rejection, retry, no duplicate submission and Pacific pricing changes. On production, inspect consent, navigation, phone/booking CTA and form-start behavior without sending a lead solely for analytics. Use Realtime/DebugView or Tag Assistant where available and verify absence of personal information. Current forms use Formspree, not Typeform.

External delivery verification is separate: confirm the intended receiving inbox and callback owner, coordinate a clearly marked synthetic submission, then record provider acceptance, actual inbox receipt and tracker entry separately. Bookings/payment must reconcile against their source records. See registration-preview.md and seo-aeo-release-2026-11-06.md.
