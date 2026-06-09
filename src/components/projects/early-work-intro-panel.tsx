import Link from "next/link";
import {
  EARLY_WORK_INTRO_CHIPS,
  EARLY_WORK_INTRO_EMPHASIS,
  EARLY_WORK_INTRO_EYEBROW,
  EARLY_WORK_INTRO_LEAD,
  EARLY_WORK_INTRO_SUPPORTING,
} from "@/lib/early-work-page-content";

type EarlyWorkIntroPanelProps = {
  totalCount: number;
};

function projectCountChipLabel(totalCount: number): string {
  if (totalCount <= 0) return "Documented early archive";
  const label = totalCount === 1 ? "documented project" : "documented projects";
  return `${totalCount} ${label}`;
}

export function EarlyWorkIntroPanel({ totalCount }: EarlyWorkIntroPanelProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-slate-200/90 bg-gradient-to-br from-tb-blue/[0.05] via-white to-tb-cyan/[0.04] shadow-sm ring-1 ring-slate-100/80 sm:mb-8">
      <div
        className="h-0.5 bg-gradient-to-r from-tb-blue via-tb-cyan/80 to-transparent"
        aria-hidden
      />

      <div className="p-4 sm:p-5 lg:p-6">
        <h1 className="text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-tb-text sm:text-[1.75rem] lg:text-[2rem]">
          Early Work
        </h1>

        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-tb-blue sm:text-[0.7rem] sm:tracking-[0.2em]">
          {EARLY_WORK_INTRO_EYEBROW}
        </p>

        <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-tb-text sm:text-base">
          {EARLY_WORK_INTRO_LEAD}
        </p>

        <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-tb-text-muted sm:text-[0.95rem]">
          {EARLY_WORK_INTRO_SUPPORTING}
        </p>

        <p className="mt-3 max-w-3xl text-sm font-medium leading-snug text-tb-text/90">
          {EARLY_WORK_INTRO_EMPHASIS}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          <li className="rounded-md border border-tb-blue/15 bg-white/90 px-2.5 py-1.5 text-xs font-medium leading-snug text-tb-text shadow-sm">
            {projectCountChipLabel(totalCount)}
          </li>
          {EARLY_WORK_INTRO_CHIPS.map((chip) => (
            <li
              key={chip.key}
              className="rounded-md border border-slate-200/90 bg-white/80 px-2.5 py-1.5 text-xs font-medium leading-snug text-tb-text-muted"
            >
              {chip.label}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-200/70 pt-4">
          <Link
            href="/about-us/build-journey"
            className="text-sm font-medium text-tb-blue hover:underline"
          >
            Back to Build Journey
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-tb-blue hover:underline"
          >
            View Current Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
