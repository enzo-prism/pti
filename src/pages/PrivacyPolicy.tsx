import SEO from "@/components/layout/SEO";
import { Section } from "@/components/ui/section";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How Practice Transitions Institute collects, uses, and protects your information."
        path="/privacy-policy"
      />
      <Section className="pt-24">
        <div className="mx-auto max-w-3xl space-y-6 text-gray-700">
          <h1 className="mb-2 text-center text-3xl md:text-4xl font-bold">
            Privacy Policy
          </h1>
          <p className="text-center text-sm text-gray-500">
            Last updated: December 12, 2025
          </p>

          <p>
            Practice Transitions Institute ("PTI", "we", "us") respects your
            privacy. This policy explains what information we collect on this
            website and how we use it.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
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

          <h2 className="text-xl font-semibold text-gray-900">
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

          <h2 className="text-xl font-semibold text-gray-900">
            Sharing of Information
          </h2>
          <p>
            We do not sell your personal information. We may share information
            with trusted service providers who help operate this site (for
            example analytics or email delivery), and only as necessary for
            those services. We may also disclose information if required by law.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            Cookies & Analytics
          </h2>
          <p>
            PTI uses cookies and analytics tools (such as Google Analytics) to
            understand site usage and improve our services. You can control
            cookies through your browser settings.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            Your Choices
          </h2>
          <p>
            You may request access to, correction of, or deletion of your
            personal information by contacting us. You can also opt out of
            marketing emails at any time.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
          <p>
            If you have questions about this policy, email us at{" "}
            <a
              href="mailto:info@practicetransitions.com"
              className="text-primary underline"
            >
              info@practicetransitions.com
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
};

export default PrivacyPolicy;
