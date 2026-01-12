import SEO from "@/components/layout/SEO";
import { Section } from "@/components/ui/section";

const TermsOfService = () => {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms governing use of the Practice Transitions Institute website."
        path="/terms-of-service"
      />
      <Section className="pt-24">
        <div className="mx-auto max-w-3xl space-y-6 text-gray-700">
          <h1 className="mb-2 text-center text-3xl md:text-4xl font-bold">
            Terms of Service
          </h1>
          <p className="text-center text-sm text-gray-500">
            Last updated: December 12, 2025
          </p>

          <p>
            These Terms of Service ("Terms") govern your access to and use of
            the Practice Transitions Institute website (the "Site"). By using
            the Site, you agree to these Terms.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            Use of the Site
          </h2>
          <p>
            You may use the Site for lawful purposes only. You agree not to
            misuse the Site, attempt to gain unauthorized access, or interfere
            with its operation.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            Content & Intellectual Property
          </h2>
          <p>
            All content on the Site, including text, graphics, logos, and
            materials, is owned by PTI or its licensors and is protected by
            applicable intellectual property laws. You may not reproduce or
            distribute Site content without written permission.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            No Professional Advice
          </h2>
          <p>
            Information on the Site is provided for general informational
            purposes and does not constitute legal, financial, or professional
            advice. You should consult qualified professionals for advice
            specific to your situation.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            Third‑Party Links
          </h2>
          <p>
            The Site may contain links to third‑party websites. PTI is not
            responsible for the content or practices of those sites.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            Disclaimers & Limitation of Liability
          </h2>
          <p>
            The Site is provided "as is" without warranties of any kind. To the
            fullest extent permitted by law, PTI will not be liable for any
            damages arising from your use of the Site.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            Site after changes means you accept the updated Terms.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
          <p>
            Questions about these Terms can be sent to{" "}
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

export default TermsOfService;
