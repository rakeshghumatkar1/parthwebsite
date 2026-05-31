import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { BUILD_JOURNEY_EARLY_WORK_BRIDGE } from "@/lib/build-journey-page-content";

export function BuildJourneyEarlyWorkBridgeSection() {
  return (
    <Section tone="light">
      <div className="rounded-2xl border border-slate-200/90 bg-tb-surface-muted/60 px-6 py-8 text-center shadow-sm ring-1 ring-slate-100 sm:px-10 sm:py-10">
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-tb-text-muted sm:text-lg">
          {BUILD_JOURNEY_EARLY_WORK_BRIDGE}
        </p>
        <div className="mt-6">
          <Button href="/projects/early-work" variant="primary" size="lg">
            View Early Work
          </Button>
        </div>
      </div>
    </Section>
  );
}
