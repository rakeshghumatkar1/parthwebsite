import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ABOUT_PATH_SNAPSHOT } from "@/lib/about-page-content";

export function AboutPathSnapshotSection() {
  return (
    <Section tone="muted">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Technical Path Snapshot"
          title="A technical path built over time."
          className="mb-0 lg:max-w-2xl"
        />
        <Button href="/about-us/build-journey" variant="ghost" size="lg" className="shrink-0">
          Explore Full Build Journey
        </Button>
      </div>
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {ABOUT_PATH_SNAPSHOT.map((node) => (
          <li
            key={node.period}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-tb-blue">{node.period}</p>
            <p className="mt-2 text-sm leading-relaxed text-tb-text-muted">
              {node.label}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
