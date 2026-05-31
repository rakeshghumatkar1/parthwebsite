import type { Metadata } from "next";
import { LegalContactNote, LegalDocumentPage } from "@/components/legal/legal-document-page";

export const metadata: Metadata = {
  title: "Terms of Service | Think Big Digital Solutions",
  description:
    "General terms information for the Think Big AI Systems website operated by Think Big Digital Solutions.",
};

export default function TermsOfServicePage() {
  return (
    <LegalDocumentPage
      title="Terms of Service"
      intro="These terms provide general website-use information for the Think Big AI Systems site. They do not replace a signed statement of work, proposal, or other formal agreement."
      sections={[
        {
          title: "Use of this website",
          content: (
            <p>
              You may use this website for lawful informational purposes. Content
              is provided for general reference about software systems, projects,
              and related work. Availability and content may change without notice.
            </p>
          ),
        },
        {
          title: "No professional advice",
          content: (
            <p>
              Information on this site is not legal, financial, or technical
              advice. Any software, automation, or AI discussion on this site is
              descriptive and does not by itself create a service commitment.
            </p>
          ),
        },
        {
          title: "Intellectual property",
          content: (
            <p>
              Site content, branding, and materials are owned by Think Big Digital
              Solutions or used with permission unless otherwise stated. Do not
              copy, republish, or reuse materials without permission.
            </p>
          ),
        },
        {
          title: "External links",
          content: (
            <p>
              Links to third-party websites are provided for convenience. Think Big
              Digital Solutions is not responsible for the content or practices of
              external sites.
            </p>
          ),
        },
        {
          title: "Limitation of liability",
          content: (
            <>
              <p>
                This website is provided on an as-is basis to the extent permitted
                by applicable law. Think Big Digital Solutions does not make
                broad warranties about uninterrupted access, completeness, or
                fitness for a particular purpose through this page alone.
              </p>
              <LegalContactNote />
            </>
          ),
        },
      ]}
    />
  );
}
