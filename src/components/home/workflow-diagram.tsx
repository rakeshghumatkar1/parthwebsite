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

export function SoftwareFirstDiagram() {
  const steps = [
    "Problem",
    "Software Logic",
    "Data",
    "AI Layer",
    "Workflow Output",
  ] as const;

  return (
    <div
      className="w-full"
      aria-label="Software-first flow: problem through software, data, and AI to workflow output"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex flex-1 items-center gap-2 sm:min-w-0 sm:flex-col sm:gap-2 lg:flex-row lg:gap-3"
          >
            <div
              className={`w-full rounded-xl border px-4 py-3.5 text-center text-sm font-semibold sm:flex-1 sm:text-base ${
                index === 3
                  ? "border-tb-blue/50 bg-blue-50 text-tb-blue shadow-sm ring-1 ring-tb-blue/20"
                  : "border-slate-200 bg-white text-tb-text shadow-sm"
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 ? (
              <span
                className="shrink-0 text-center text-lg font-medium text-tb-blue/60 sm:text-xl"
                aria-hidden
              >
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
