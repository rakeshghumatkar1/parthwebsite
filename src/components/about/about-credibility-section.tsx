import { Section } from "@/components/ui/section";
import { IconCheck } from "@/components/ui/icons";
import { ABOUT_CREDIBILITY_CHIPS } from "@/lib/about-page-content";

export function AboutCredibilitySection() {
  return (
    <Section tone="muted" dense>
      <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-3.5 py-3 sm:px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
            Self-Built Credibility
          </p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-tb-text sm:text-2xl">
            Not only borrowed credentials.
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-tb-text-muted sm:text-base">
            Many people lead with the institution they came from. Parth&apos;s
            stronger signal is the work he kept building before any institution
            could define him.
          </p>
        </div>

        <div className="px-3.5 py-3 sm:px-4">
          <div className="flex flex-wrap gap-1.5">
            {ABOUT_CREDIBILITY_CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-slate-200/90 bg-slate-50 px-3 py-1 text-xs font-medium text-tb-text sm:text-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-start gap-3 rounded-md border border-tb-blue/15 bg-blue-50/40 px-3.5 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-tb-blue/20 bg-white text-tb-blue">
              <IconCheck className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold leading-snug text-tb-text sm:text-base">
              Visible work built over years of consistent building.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
