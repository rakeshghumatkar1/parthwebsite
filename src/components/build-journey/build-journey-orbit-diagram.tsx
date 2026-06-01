import {
  BUILD_JOURNEY_ORBIT_CENTER,
  BUILD_JOURNEY_ORBIT_ITEMS,
} from "@/lib/build-journey-page-content";

type BuildJourneyOrbitDiagramProps = {
  compact?: boolean;
};

export function BuildJourneyOrbitDiagram({
  compact = false,
}: BuildJourneyOrbitDiagramProps) {
  const orbitHeight = compact ? "h-[260px]" : "h-[340px]";
  const centerClass = compact
    ? "w-[140px] rounded-lg border-2 border-tb-blue/30 bg-white px-3 py-3 text-center shadow-sm ring-1 ring-tb-blue/10"
    : "w-[160px] rounded-2xl border-2 border-tb-blue/30 bg-white px-4 py-4 text-center shadow-md ring-1 ring-tb-blue/10";

  return (
    <div className="relative overflow-hidden rounded-md border border-slate-200/80 bg-slate-50/50 p-2.5 sm:p-3">
      <div className={`relative mx-auto hidden max-w-md xl:block ${orbitHeight}`}>
        <div
          className="pointer-events-none absolute inset-3 rounded-full border border-dashed border-tb-blue/25"
          aria-hidden
        />
        <div
          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${centerClass}`}
        >
          <p className="text-xs font-semibold leading-snug text-tb-text sm:text-sm">
            {BUILD_JOURNEY_ORBIT_CENTER}
          </p>
        </div>
        {BUILD_JOURNEY_ORBIT_ITEMS.map((item, index) => {
          const angle =
            (index / BUILD_JOURNEY_ORBIT_ITEMS.length) * 2 * Math.PI - Math.PI / 2;
          const radius = compact ? 128 : 148;
          const x = 50 + (Math.cos(angle) * radius) / 3.4;
          const y = 50 + (Math.sin(angle) * radius) / 3.4;
          return (
            <span
              key={item}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/90 bg-white px-2 py-0.5 text-[10px] font-medium text-tb-text shadow-sm ring-1 ring-slate-100"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {item}
            </span>
          );
        })}
      </div>

      <div className="xl:hidden">
        <div className="mx-auto mb-2.5 max-w-sm rounded-lg border-2 border-tb-blue/30 bg-white px-3 py-3 text-center shadow-sm ring-1 ring-tb-blue/10">
          <p className="text-xs font-semibold leading-snug text-tb-text sm:text-sm">
            {BUILD_JOURNEY_ORBIT_CENTER}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2">
          {BUILD_JOURNEY_ORBIT_ITEMS.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200/90 bg-white px-2.5 py-1 text-[11px] font-medium leading-snug text-tb-text shadow-sm ring-1 ring-slate-100"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
