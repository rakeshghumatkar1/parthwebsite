import { Section } from "@/components/ui/section";
import { BUILD_JOURNEY_EARLY_OUTPUT_STATS } from "@/lib/build-journey-page-content";

export function BuildJourneyEarlyOutputSection() {
  return (
    <Section tone="light" dense>
      <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100/80">
        <div
          className="h-0.5 bg-gradient-to-r from-tb-blue via-tb-cyan/80 to-transparent"
          aria-hidden
        />
        <div className="p-3.5 sm:p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
            Early Output
          </p>
          <h2 className="mt-1.5 text-balance text-xl font-semibold leading-snug tracking-tight text-tb-text sm:text-2xl">
            He did not stop at one or two projects.
          </h2>
          <div className="mt-2 max-w-3xl space-y-2 text-sm leading-relaxed text-tb-text-muted sm:text-base">
            <p>
              Between roughly the ages of 12 and 14, Parth built or documented nearly
              35 early projects across robotics, drones, Arduino, IoT, Bluetooth, GSM,
              Alexa, sensors, lighting, home automation, Python, and simple web
              experiments. A few smaller experiments were left out, so the actual number
              was slightly higher.
            </p>
            <p>
              Some projects were guided, some were learning exercises, and many later
              ones were self-driven home builds. What matters is the pattern: he kept
              building, testing, documenting, and moving from one idea to the next over
              a relatively short period.
            </p>
            <p>
              This consistency matters more than any one individual project. It shows
              sustained curiosity, working discipline, and a genuine habit of turning
              ideas into prototypes.
            </p>
          </div>

          <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {BUILD_JOURNEY_EARLY_OUTPUT_STATS.map((item) => (
              <li
                key={item}
                className="rounded-md border border-slate-200/90 bg-slate-50/50 px-2.5 py-2 text-xs font-medium leading-snug text-tb-text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
