import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ABOUT_CREDIBILITY_CHIPS } from "@/lib/about-page-content";

export function AboutCredibilitySection() {
  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow="Self-Built Credibility"
        title="Not only borrowed credentials."
        description="Many people lead with the institution they came from. Parth's stronger signal is the work he kept building before any institution could define him."
      />
      <div className="space-y-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {ABOUT_CREDIBILITY_CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-tb-text shadow-sm"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="mx-auto max-w-2xl border-t border-slate-200 pt-8 text-center">
          <p className="text-lg font-semibold text-tb-text sm:text-xl">
            Visible proof built over years of consistent work.
          </p>
        </div>
      </div>
    </Section>
  );
}
