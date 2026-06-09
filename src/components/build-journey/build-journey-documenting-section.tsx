import { Section } from "@/components/ui/section";
import { BUILD_JOURNEY_DOCUMENTING_CHIPS } from "@/lib/build-journey-page-content";

export function BuildJourneyDocumentingSection() {
  return (
    <Section tone="light" dense>
      <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100/80">
        <div
          className="h-0.5 bg-gradient-to-r from-tb-blue via-tb-cyan/80 to-transparent"
          aria-hidden
        />
        <div className="p-3.5 sm:p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
            Documenting the Work
          </p>
          <h2 className="mt-1.5 text-balance text-xl font-semibold leading-snug tracking-tight text-tb-text sm:text-2xl">
            He was not only building. He was also learning how to present the work.
          </h2>
          <div className="mt-2 max-w-3xl space-y-2 text-sm leading-relaxed text-tb-text-muted sm:text-base">
            <p>
              Many of the early projects were not only built and tested — they were also
              recorded, explained, edited, and published by Parth himself. Across several
              videos, he handled video shooting, basic scripting, on-screen text, editing,
              music selection, and simple visual effects using tools like Filmora.
            </p>
            <p>
              That matters because it shows a second skill developing in parallel: the
              ability to explain technical work clearly. He was not just assembling
              electronics at home; he was also learning how to communicate what the
              project does, how it works, and why it matters.
            </p>
            <p>
              This documentation habit helped turn small experiments into visible proof
              of learning.
            </p>
          </div>

          <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">
            {BUILD_JOURNEY_DOCUMENTING_CHIPS.map((item) => (
              <li
                key={item}
                className="rounded-md border border-slate-200/90 bg-slate-50/50 px-2.5 py-1.5 text-xs font-medium leading-snug text-tb-text-muted"
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
