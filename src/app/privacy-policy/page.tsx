import type { Metadata } from "next";
import { LegalContactNote, LegalDocumentPage } from "@/components/legal/legal-document-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Think Big Digital Solutions",
  description:
    "Privacy information for the Think Big AI Systems website operated by Think Big Digital Solutions.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      title="Privacy Policy"
      intro="This page provides general privacy information for the Think Big AI Systems website. It is not a substitute for formal legal advice or a signed business agreement."
      sections={[
        {
          title: "Scope",
          content: (
            <p>
              This website is operated by Think Big Digital Solutions and presents
              software systems, projects, and related information. This policy
              describes how information may be handled when you use this site.
            </p>
          ),
        },
        {
          title: "Information we may collect",
          content: (
            <p>
              If you contact Think Big Digital Solutions through an external
              contact form or email, you may provide information such as your
              name, email address, company, and message content. Standard website
              logs and hosting analytics may also be collected by the hosting
              provider.
            </p>
          ),
        },
        {
          title: "How information is used",
          content: (
            <p>
              Information is used to respond to enquiries, operate the website,
              improve content, and maintain security. We do not describe specific
              retention periods here because those may depend on the enquiry type
              and applicable requirements.
            </p>
          ),
        },
        {
          title: "Third-party services",
          content: (
            <p>
              This site may link to external services such as GitHub, YouTube, or
              the main Think Big Digital Solutions website. Those services have
              their own privacy practices.
            </p>
          ),
        },
        {
          title: "Updates and contact",
          content: (
            <>
              <p>
                This page may be updated from time to time. The current version
                should be read together with any formal terms provided for a
                specific engagement.
              </p>
              <LegalContactNote />
            </>
          ),
        },
      ]}
    />
  );
}
