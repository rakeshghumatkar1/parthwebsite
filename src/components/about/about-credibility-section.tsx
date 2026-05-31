import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { IconCheck } from "@/components/ui/icons";
import { ABOUT_CREDIBILITY_CHIPS } from "@/lib/about-page-content";

export function AboutCredibilitySection() {
  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow="Self-Built Credibility"
        title="Not only borrowed credentials."
        description="Many people lead with the institution they came from. Parth's stronger signal is the work he kept building before any institution could define him."
      />
      <div className="relative mx-auto max-w-4xl">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {ABOUT_CREDIBILITY_CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-slate-200/90 bg-white px-4 py-2 text-sm font-medium text-tb-text shadow-sm ring-1 ring-slate-100"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Connector diagram — desktop */}
        <div
          className="relative mx-auto mt-6 hidden h-14 max-w-2xl md:block"
          aria-hidden
        >
          <div className="absolute left-[12%] top-0 h-full w-px bg-gradient-to-b from-slate-300 to-tb-blue/40" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-slate-300 to-tb-blue/50" />
          <div className="absolute right-[12%] top-0 h-full w-px bg-gradient-to-b from-slate-300 to-tb-blue/40" />
          <div className="absolute bottom-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-tb-blue/30 to-transparent" />
        </div>

        {/* Connector — mobile */}
        <div className="mx-auto my-5 h-8 w-px bg-gradient-to-b from-slate-300 to-tb-blue/40 md:hidden" aria-hidden />

        <div className="relative mx-auto max-w-2xl">
          <div
            className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-tb-blue/10 via-transparent to-tb-cyan/10"
            aria-hidden
          />
          <div className="relative rounded-2xl border-2 border-tb-blue/20 bg-white px-6 py-6 text-center shadow-md ring-1 ring-tb-blue/10 sm:px-8 sm:py-7">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-tb-blue/10 text-tb-blue">
              <IconCheck className="h-5 w-5" />
            </div>
            <p className="text-lg font-semibold leading-snug text-tb-text sm:text-xl">
              Visible proof built over years of consistent work.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
