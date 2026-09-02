import { Section } from "@/components/ui/section";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";

const PrivacyPolicy = () => {
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-3xl space-y-6 text-gray-700">
          <h1 className="mb-2 text-center text-3xl md:text-4xl font-bold">
            Privacy Policy
          </h1>
          <p className="text-center text-sm text-gray-500">
            Last updated: August 17, 2026
          </p>

          <p>
            Practice Transitions Institute (&ldquo;PTI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
            privacy. This policy explains what information we collect on this
            website and how we use it.
          </p>

          <h2 className="scroll-mt-24 text-xl font-semibold text-gray-900">
            Information We Collect
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Contact details you provide through forms or email (such as name,
              phone number, email address, and practice information).
            </li>
            <li>
              Usage data collected automatically, including pages visited,
              browser type, device information, and approximate location.
            </li>
            <li>
              Cookies and similar technologies used to remember preferences and
              measure site performance.
            </li>
          </ul>

          <h2 className="scroll-mt-24 text-xl font-semibold text-gray-900">
            How We Use Information
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Respond to inquiries and provide requested services.</li>
            <li>
              Improve site content, user experience, and marketing performance.
            </li>
            <li>
              Send updates or resources you opted in to receive (you can
              unsubscribe anytime).
            </li>
            <li>Maintain security and prevent fraud or abuse.</li>
          </ul>

          <h2 className="scroll-mt-24 text-xl font-semibold text-gray-900">
            Sharing of Information
          </h2>
          <p>
            We do not sell your personal information. We may share information
            with trusted service providers who help operate this site (for
            example analytics or email delivery), and only as necessary for
            those services. We may also disclose information if required by law.
          </p>

          <h2 className="scroll-mt-24 text-xl font-semibold text-gray-900">
            Cookies & Analytics
          </h2>
          <p>
            Optional analytics remain off unless you select &ldquo;Accept
            Analytics&rdquo; in our cookie preferences. If you accept, we use Google
            Analytics, Hotjar, and Vercel Analytics to understand aggregate site
            usage, identify usability problems, and improve site performance.
            These providers may set cookies or process device, browser,
            interaction, and approximate location information under their own
            privacy terms.
          </p>
          <p>
            You can change your selection at any time with the &ldquo;Cookie
            Preferences&rdquo; control in the website footer. Declining optional
            analytics does not prevent you from using the site or contacting
            PTI. Your browser may also let you delete previously stored cookies.
          </p>

          <h2 className="scroll-mt-24 text-xl font-semibold text-gray-900">
            Forms & External Services
          </h2>
          <p>
            When you submit a contact, checklist, or event form, the information
            you provide is processed by PTI and the form provider used on that
            page. Links to scheduling, social media, video, or other third-party
            websites are governed by those services&apos; privacy policies after you
            leave this site.
          </p>

          <h2 className="scroll-mt-24 text-xl font-semibold text-gray-900">
            Your Choices
          </h2>
          <p>
            You may request access to, correction of, or deletion of your
            personal information by contacting us. You can also opt out of
            marketing emails at any time.
          </p>

          <h2 className="scroll-mt-24 text-xl font-semibold text-gray-900">Contact</h2>
          <p>
            If you have questions about this policy, email us at{" "}
            <a
              href={`mailto:${SITE_CONTACT_EMAIL}`}
              className="rounded-sm text-primary underline underline-offset-4 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {SITE_CONTACT_EMAIL}
            </a>
            , PTI&apos;s established client inbox.
          </p>
        </div>
      </Section>
    </>
  );
};

export default PrivacyPolicy;
