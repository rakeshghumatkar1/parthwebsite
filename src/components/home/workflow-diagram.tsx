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
      className={`rounded-lg border px-3 py-2 text-center font-medium ${
        compact ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"
      } ${
        highlight
          ? "border-tb-cyan/50 bg-tb-blue/20 text-tb-cyan"
          : "border-tb-navy-border bg-tb-navy-elevated text-tb-text-on-dark"
      }`}
    >
      {label}
    </div>
  );
}

export function WorkflowDiagram() {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-tb-navy-border bg-tb-navy-elevated/80 p-4 sm:p-6"
      aria-label="Software workflow diagram: business problem through software and AI layers to a usable product"
    >
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        {mainFlow.map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <FlowNode label={label} highlight={index === 3} />
            {index < mainFlow.length - 1 ? (
              <span className="hidden text-tb-text-on-dark-muted sm:inline" aria-hidden>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {satellites.map((label) => (
          <FlowNode key={label} label={label} compact />
        ))}
      </div>
    </div>
  );
}

export function SoftwareFirstDiagram() {
  const steps = [
    "Problem",
    "Software logic",
    "Data",
    "AI layer",
    "Workflow output",
  ] as const;

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      aria-label="Software-first flow: problem through software, data, and AI to workflow output"
    >
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-2 sm:gap-3">
          <div
            className={`rounded-lg border px-3 py-2 text-xs font-medium sm:text-sm ${
              index === 3
                ? "border-tb-blue/40 bg-blue-50 text-tb-blue"
                : "border-slate-200 bg-white text-tb-text"
            }`}
          >
            {step}
          </div>
          {index < steps.length - 1 ? (
            <span className="text-tb-text-muted" aria-hidden>
              →
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
