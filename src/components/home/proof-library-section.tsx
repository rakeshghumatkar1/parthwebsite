import type { ProofRecord } from "@/types/cms";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

type ProofLibrarySectionProps = {
  items: ProofRecord[];
};

/**
 * CMS-ready: renders only when featured proof items exist.
 * Phase 1–2: empty array → section hidden on public page.
 */
export function ProofLibrarySection({ items }: ProofLibrarySectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section id="proof-library" tone="muted">
      <SectionHeader
        eyebrow="Proof Library Preview"
        title="Every important claim should connect to something visible."
        description="The Proof Library collects the material behind the claims: repositories, demos, presentations, recognition proof, screenshots, downloads, and project documents."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-tb-blue">
              {item.proofType}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-tb-text">{item.title}</h3>
            {item.shortDescription ? (
              <p className="mt-2 text-sm text-tb-text-muted">
                {item.shortDescription}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
