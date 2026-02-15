# GA4 Admin Runbook (PTI)

This runbook covers the manual Google Analytics 4 (GA4) admin steps required after the code-side GA hardening changes.

## 1. Confirm Stream And Measurement ID
1. Open GA4: **Admin** > **Data collection and modification** > **Data streams**.
2. Open the PTI web stream.
3. Confirm the Measurement ID (`G-...`) matches `NEXT_PUBLIC_GA_MEASUREMENT_ID` in production.

## 2. Enhanced Measurement (Avoid Duplicate SPA Pageviews)
1. In the same web stream, open **Enhanced measurement**.
2. Disable automatic page views if you are relying on manual SPA pageview tracking from the app (`send_page_view: false` + explicit `page_view` events).
3. Save changes.

## 3. Mark Key Events
1. Open **Admin** > **Data display** > **Events**.
2. Wait until events appear from live traffic/test traffic.
3. Mark these as key events:
- `generate_lead`
- `book_consultation_click`
- `phone_call_click`

## 4. Create Custom Dimensions
Open **Admin** > **Data display** > **Custom definitions** > **Create custom dimension**.

Create event-scoped dimensions for:
- `cta_name`
- `cta_location`
- `content_category`
- `lead_type`
- `form_id`
- `form_provider`
- `event_name`
- `channel`

## 5. Configure Internal Traffic Filtering
1. Open **Admin** > **Data collection and modification** > **Data filters**.
2. Ensure **Internal traffic** filter is set up.
3. Add PTI office/home IP definitions in **Data streams** > **Configure tag settings** > **Define internal traffic**.
4. Start in testing mode first, then set to active after validation.

## 6. Validation Procedure
1. Open PTI production site in one browser session.
2. Open GA4 **Reports** > **Realtime** in another tab.
3. Open **Admin** > **DebugView**.
4. Use [Tag Assistant](https://tagassistant.google.com/) connected to production.
5. Trigger these flows:
- Home -> Blog -> Blog post -> Events -> Contact page navigation.
- Click navbar phone link.
- Click navbar consultation CTA.
- Submit Typeform contact form.

Expected validation:
- Realtime shows `page_view` plus custom events.
- DebugView shows events with expected parameters.
- Tag Assistant confirms the GA4 tag fires and payloads are present.

## 7. Acceptance Screenshot Checklist
Capture screenshots for:
1. Web stream Measurement ID page.
2. Enhanced measurement settings.
3. Events list showing required events.
4. Key events configuration showing all three lead-focused key events.
5. Custom definitions list containing all required dimensions.
6. Internal traffic filter settings.
7. Realtime report with active event traffic.
8. DebugView trace showing `generate_lead` and CTA clicks.
