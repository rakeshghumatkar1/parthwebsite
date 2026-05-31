import {
  BUILD_JOURNEY_ORBIT_CENTER,
  BUILD_JOURNEY_ORBIT_ITEMS,
} from "@/lib/build-journey-page-content";

export function BuildJourneyOrbitDiagram() {
  return (
    <div className="relative">
      {/* Desktop orbit */}
      <div className="relative mx-auto hidden h-[340px] max-w-md lg:block">
        <div
          className="pointer-events-none absolute inset-4 rounded-full border border-dashed border-tb-blue/25"
          aria-hidden
        />
        <div className="absolute left-1/2 top-1/2 z-10 w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-tb-blue/30 bg-white px-4 py-4 text-center shadow-md ring-1 ring-tb-blue/10">
          <p className="text-sm font-semibold leading-snug text-tb-text">
            {BUILD_JOURNEY_ORBIT_CENTER}
          </p>
        </div>
        {BUILD_JOURNEY_ORBIT_ITEMS.map((item, index) => {
          const angle = (index / BUILD_JOURNEY_ORBIT_ITEMS.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 148;
          const x = 50 + (Math.cos(angle) * radius) / 3.4;
          const y = 50 + (Math.sin(angle) * radius) / 3.4;
          return (
            <span
              key={item}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200/90 bg-white px-2.5 py-1 text-[11px] font-medium text-tb-text shadow-sm ring-1 ring-slate-100"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {item}
            </span>
          );
        })}
      </div>

      {/* Mobile / tablet grouped chips */}
      <div className="lg:hidden">
        <div className="mx-auto mb-5 max-w-sm rounded-2xl border-2 border-tb-blue/30 bg-white px-5 py-5 text-center shadow-md ring-1 ring-tb-blue/10">
          <p className="text-sm font-semibold leading-snug text-tb-text">
            {BUILD_JOURNEY_ORBIT_CENTER}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {BUILD_JOURNEY_ORBIT_ITEMS.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-medium text-tb-text shadow-sm ring-1 ring-slate-100"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
