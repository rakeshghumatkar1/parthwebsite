/** Hero system/workflow diagram — live SVG labels, not a baked image */

const mainFlow = [
  "Business problem",
  "Workflow logic",
  "Software system",
  "AI / data / automation",
  "Usable product",
] as const;

const satellites = [
  "AI tools",
  "Data pipelines",
  "Automation",
  "Internal systems",
  "Dashboards",
  "Content engines",
] as const;

function FlowNode({
  label,
  highlight = false,
  compact = false,
}: {
  label: string;
  highlight?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-3 py-2.5 text-center font-medium ${
        compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"
      } ${
        highlight
          ? "border-tb-cyan/60 bg-tb-blue/25 text-tb-cyan shadow-sm shadow-tb-cyan/10"
          : "border-tb-navy-border bg-tb-navy-elevated/90 text-tb-text-on-dark"
      }`}
    >
      {label}
    </div>
  );
}

export function WorkflowDiagram() {
  return (
    <div
      className="relative w-full min-h-[280px] overflow-hidden rounded-2xl border border-tb-navy-border bg-tb-navy-elevated/90 p-5 shadow-xl shadow-black/20 sm:min-h-[320px] sm:p-7 lg:min-h-[380px] lg:p-8"
      aria-label="Software workflow diagram: business problem through software and AI layers to a usable product"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-tb-blue/10 via-transparent to-tb-cyan/5"
        aria-hidden
      />
      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-2">
          {mainFlow.map((label, index) => (
            <div key={label} className="flex items-center gap-2">
              <FlowNode label={label} highlight={index === 3} />
              {index < mainFlow.length - 1 ? (
                <span
                  className="hidden shrink-0 text-tb-text-on-dark-muted sm:inline"
                  aria-hidden
                >
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {satellites.map((label) => (
            <FlowNode key={label} label={label} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

const softwareFirstSteps = [
  "Problem",
  "Software Logic",
  "Data",
  "AI Layer",
  "Workflow Output",
] as const;

export function SoftwareFirstDiagram() {
  return (
    <div
      className="w-full overflow-x-auto"
      aria-label="Software-first flow: problem through software, data, and AI to workflow output"
    >
      <ol className="flex flex-wrap items-center justify-center gap-y-2">
        {softwareFirstSteps.map((step, index) => {
          const isHighlight = index === 3;
          return (
            <li key={step} className="flex items-center">
              <span
                className={`whitespace-nowrap rounded-md border px-2.5 py-1.5 text-xs font-medium sm:px-3 sm:py-2 sm:text-sm ${
                  isHighlight
                    ? "border-tb-blue/40 bg-blue-50 text-tb-blue"
                    : "border-slate-200 bg-white text-tb-text"
                }`}
              >
                {step}
              </span>
              {index < softwareFirstSteps.length - 1 ? (
                <span
                  className="mx-1.5 shrink-0 text-sm text-tb-text-muted sm:mx-2"
                  aria-hidden
                >
                  →
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
