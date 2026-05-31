/** Hero technical blueprint — live SVG/CSS, no raster mock or human imagery. */

function BlueprintNode({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-tb-cyan/30 bg-tb-navy-elevated/90 px-2.5 py-2 text-center text-[10px] font-medium leading-tight text-tb-cyan sm:text-xs ${className}`}
    >
      {label}
    </div>
  );
}

export function BuildJourneyBlueprintDiagram() {
  return (
    <div
      className="relative w-full min-h-[280px] overflow-hidden rounded-2xl border border-tb-navy-border bg-tb-navy-elevated/90 p-5 shadow-xl shadow-black/20 sm:min-h-[320px] sm:p-7 lg:min-h-[360px]"
      aria-label="Technical blueprint diagram: code, motor, drone, microcontroller, and robotics elements"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-tb-blue/10 via-transparent to-tb-cyan/5"
        aria-hidden
      />

      <div className="relative flex h-full flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <BlueprintNode label="Laptop / Code" className="max-w-[88px]" />
          <svg
            className="mt-4 hidden h-px flex-1 text-tb-cyan/40 sm:block"
            aria-hidden
          >
            <line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
          <BlueprintNode label="Motor / Electronics" className="max-w-[100px]" />
        </div>

        <div className="flex items-center justify-center">
          <svg
            viewBox="0 0 200 120"
            className="h-28 w-full max-w-[280px] text-tb-cyan/70 sm:h-32"
            aria-hidden
          >
            <rect
              x="70"
              y="40"
              width="60"
              height="40"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="85" cy="55" r="3" fill="currentColor" />
            <circle cx="100" cy="55" r="3" fill="currentColor" />
            <circle cx="115" cy="55" r="3" fill="currentColor" />
            <path
              d="M100 20 L110 40 L90 40 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="100"
              y1="80"
              x2="100"
              y2="95"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="85"
              y1="95"
              x2="115"
              y2="95"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="40"
              y1="60"
              x2="70"
              y2="60"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <line
              x1="130"
              y1="60"
              x2="160"
              y2="60"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <BlueprintNode label="Arduino Board" />
          <BlueprintNode label="Drone" />
          <BlueprintNode label="Robotics / Lego" />
        </div>
      </div>
    </div>
  );
}
