import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Section } from "@/components/ui/section";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalDocumentPageProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalDocumentPage({
  title,
  intro,
  sections,
}: LegalDocumentPageProps) {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-tb-text sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-tb-text-muted sm:text-lg">
              {intro}
            </p>
            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-lg font-semibold text-tb-text">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-tb-text-muted sm:text-base">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function LegalContactNote() {
  return (
    <p>
      For formal or business-specific terms, contact{" "}
      <a
        href="https://thinkbigdigital.co/contact"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-tb-blue hover:underline"
      >
        Think Big Digital Solutions
      </a>
      .
    </p>
  );
}
