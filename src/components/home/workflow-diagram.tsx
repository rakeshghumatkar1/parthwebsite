/** Hero system/workflow diagram — live SVG architecture, not a baked image */

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
      className={`rounded-lg border px-2.5 py-2 text-center font-medium ${
        compact ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm"
      } ${
        highlight
          ? "border-tb-cyan/60 bg-tb-blue/30 text-tb-cyan shadow-sm shadow-tb-cyan/10"
          : "border-tb-navy-border bg-tb-navy/80 text-tb-text-on-dark"
      }`}
    >
      {label}
    </div>
  );
}

export function WorkflowDiagram() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-tb-navy-border bg-tb-navy-elevated/95 p-4 shadow-xl shadow-black/25 sm:p-5"
      aria-label="System architecture diagram: business problem through software and AI layers to a usable product"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-tb-blue/10 via-transparent to-tb-cyan/5"
        aria-hidden
      />
      <p className="relative mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-tb-cyan/90 sm:text-[11px]">
        System architecture
      </p>
      <div className="relative space-y-4">
        <div className="hidden sm:block">
          <svg
            viewBox="0 0 520 88"
            className="h-auto w-full"
            aria-hidden
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker
                id="flow-arrow"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill="rgba(148,163,184,0.8)" />
              </marker>
            </defs>
            {[0, 1, 2, 3].map((index) => {
              const x1 = 20 + index * 104;
              const x2 = x1 + 84;
              return (
                <line
                  key={index}
                  x1={x1}
                  y1="44"
                  x2={x2}
                  y2="44"
                  stroke="rgba(148,163,184,0.45)"
                  strokeWidth="1.5"
                  markerEnd="url(#flow-arrow)"
                />
              );
            })}
          </svg>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5 sm:gap-2">
          {mainFlow.map((label, index) => (
            <FlowNode key={label} label={label} highlight={index === 3} />
          ))}
        </div>
        <div className="relative pt-1">
          <div
            className="pointer-events-none absolute left-1/2 top-0 hidden h-3 w-px -translate-x-1/2 bg-tb-cyan/40 sm:block"
            aria-hidden
          />
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-tb-text-on-dark-muted sm:text-[11px]">
            Supporting layers
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {satellites.map((label) => (
              <FlowNode key={label} label={label} compact />
            ))}
          </div>
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
