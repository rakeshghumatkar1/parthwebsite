import { Section } from "@/components/ui/section";

export function BuildJourneyOriginSection() {
  return (
    <Section tone="light" dense>
      <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100/80">
        <div
          className="h-0.5 bg-gradient-to-r from-tb-blue via-tb-cyan/80 to-transparent"
          aria-hidden
        />
        <div className="p-3.5 sm:p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
            Where the Journey Started
          </p>
          <h2 className="mt-1.5 text-balance text-xl font-semibold leading-snug tracking-tight text-tb-text sm:text-2xl">
            Football stopped. Curiosity did not.
          </h2>
          <div className="mt-2 max-w-3xl space-y-2 text-sm leading-relaxed text-tb-text-muted sm:text-base">
            <p>
              Football was one of Parth&apos;s early interests. A knee problem stopped
              him from continuing the way he wanted — while friends played and went
              for tournaments, he stayed away from the playground. YouTube became a
              way to pass time.
            </p>
            <p>
              One video about sharpening a pencil with a motor sparked an interest
              in electronics: technology could move, control, respond, and solve
              small real-world problems. When materials were hard to find, the next
              step became a robotics class in Pune.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
