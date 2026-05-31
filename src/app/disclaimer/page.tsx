import type { Metadata } from "next";
import { LegalContactNote, LegalDocumentPage } from "@/components/legal/legal-document-page";

export const metadata: Metadata = {
  title: "Disclaimer | Think Big Digital Solutions",
  description:
    "General disclaimer for the Think Big AI Systems website operated by Think Big Digital Solutions.",
};

export default function DisclaimerPage() {
  return (
    <LegalDocumentPage
      title="Disclaimer"
      intro="This disclaimer explains the general nature of the information published on the Think Big AI Systems website."
      sections={[
        {
          title: "Informational purpose",
          content: (
            <p>
              Content on this site describes software systems, projects, tools,
              and related work for informational purposes. It is not an offer,
              guarantee, or commitment unless confirmed separately in writing.
            </p>
          ),
        },
        {
          title: "Project descriptions",
          content: (
            <p>
              Project summaries, screenshots, demos, and technical notes reflect
              work at the time they were published. Features, availability, and
              outcomes may change. Past work does not guarantee future results.
            </p>
          ),
        },
        {
          title: "Third-party platforms",
          content: (
            <p>
              References to GitHub, YouTube, downloads, or other external
              platforms are provided for context. Those platforms and their
              content are subject to their own terms and availability.
            </p>
          ),
        },
        {
          title: "No reliance",
          content: (
            <>
              <p>
                Do not rely on this website as the sole basis for business,
                legal, or technical decisions. Verify details directly before
                acting on any information shown here.
              </p>
              <LegalContactNote />
            </>
          ),
        },
      ]}
    />
  );
}
