import type { UpdateRecord } from "@/types/cms";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

type LatestUpdatesSectionProps = {
  updates: UpdateRecord[];
};

/**
 * CMS-ready: hidden at launch when no updates exist.
 */
export function LatestUpdatesSection({ updates }: LatestUpdatesSectionProps) {
  if (updates.length === 0) {
    return null;
  }

  return (
    <Section id="latest-updates" tone="light" dense>
      <SectionHeader
        dense
        eyebrow="Latest Updates"
        title="Follow recent project updates, build notes, and technical observations."
      />
      <ul className="space-y-3">
        {updates.map((update) => (
          <li
            key={update.id}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <time className="text-xs font-medium text-tb-text-muted">
              {update.date}
            </time>
            <h3 className="mt-1 text-lg font-semibold text-tb-text">
              {update.title}
            </h3>
            <p className="mt-2 text-sm text-tb-text-muted">
              {update.shortSummary}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
