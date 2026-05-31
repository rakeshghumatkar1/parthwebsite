import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  IconBranch,
  IconCheck,
  IconChip,
  IconTerminal,
} from "@/components/ui/icons";
import {
  founderCredibilityPoints,
  founderDeliveryNote,
} from "@/lib/home-data";
import type { ComponentType } from "react";

const founderIcons: ComponentType<{ className?: string }>[] = [
  IconChip,
  IconTerminal,
  IconBranch,
  IconCheck,
];

export function TechnicalFounderSection() {
  return (
    <Section id="technical-founder" tone="muted" dense>
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
          Technical Founder Layer
        </p>
        <h2 className="mt-1.5 text-balance text-xl font-semibold leading-snug tracking-tight text-tb-text sm:text-2xl">
          Self-built credibility shaped through building, testing, and improving.
        </h2>

        <div className="mt-2 space-y-2 text-sm leading-relaxed text-tb-text-muted sm:text-base">
          <p>
            Parth’s technical path started with curiosity, electronics, YouTube
            learning, robotics, Arduino, C++, IoT, drones, Python, Raspberry Pi,
            and public project demos.
          </p>
          <p>
            Over time, that foundation moved into software systems, AI-assisted
            workflows, data platforms, internal tools, and business-facing
            applications.
          </p>
          <p className="font-medium text-tb-text">
            The stronger point is not that he started young. It is that he kept
            building.
          </p>
        </div>

        <div className="mt-3">
          <Button href="/about-parth" variant="ghost">
            Read About Parth
          </Button>
        </div>
      </div>

      <div className="mt-3.5 overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm">
        <ul className="grid divide-y divide-slate-200/90 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {founderCredibilityPoints.map((point, index) => {
            const Icon = founderIcons[index];
            return (
              <li key={point.title} className="flex">
                <article className="flex w-full flex-col p-3 sm:p-3.5">
                  <div className="mb-2 flex h-7 w-7 items-center justify-center rounded border border-slate-200/90 bg-slate-50 text-tb-blue">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-sm font-semibold leading-snug text-tb-text">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-tb-text-muted">
                    {point.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-2.5 flex gap-3 rounded-lg border border-slate-200/90 border-l-[3px] border-l-tb-blue bg-white px-3.5 py-2.5 sm:items-center sm:px-4">
        <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-tb-blue sm:text-xs">
          Think Big delivery
        </p>
        <p className="text-sm leading-relaxed text-tb-text-muted">
          {founderDeliveryNote}
        </p>
      </div>
    </Section>
  );
}
