/** Hero system/workflow diagram — vertical flow with side nodes (mock-aligned) */

import type { ComponentType } from "react";
import {
  IconAutomation,
  IconChip,
  IconDashboard,
  IconDatabase,
  IconLayers,
  IconPipeline,
  IconTerminal,
  IconWorkflow,
} from "@/components/ui/icons";

type DiagramNodeProps = {
  label: string;
  highlight?: boolean;
  icon?: ComponentType<{ className?: string }>;
};

function DiagramNode({ label, highlight = false, icon: Icon }: DiagramNodeProps) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded border px-2 py-1.5 sm:px-2.5 ${
        highlight
          ? "relative z-[2] border-tb-cyan bg-gradient-to-r from-tb-blue/55 to-tb-blue/35 text-tb-cyan shadow-[0_0_32px_rgba(56,189,248,0.28)] ring-1 ring-tb-cyan/50 sm:py-2"
          : "border-tb-navy-border/80 bg-tb-navy/95 text-tb-text-on-dark backdrop-blur-[1px]"
      }`}
    >
      {Icon ? (
        <Icon
          className={`h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 ${highlight ? "text-tb-cyan" : "text-tb-cyan/75"}`}
        />
      ) : null}
      <span className="text-[10px] font-medium leading-tight sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}

const centerFlow = [
  { label: "Business problem", icon: IconWorkflow },
  { label: "Workflow logic", icon: IconPipeline },
  { label: "Software system", icon: IconTerminal },
  { label: "AI / data / automation", icon: IconChip, highlight: true },
  { label: "Usable product", icon: IconLayers },
] as const;

const leftNodes = [
  { label: "AI tools", icon: IconChip },
  { label: "Data pipelines", icon: IconDatabase },
  { label: "Automation", icon: IconAutomation },
] as const;

const rightNodes = [
  { label: "Internal systems", icon: IconTerminal },
  { label: "Dashboards", icon: IconDashboard },
  { label: "Content engines", icon: IconPipeline },
] as const;

export function WorkflowDiagram() {
  return (
    <div
      className="relative w-full min-w-0 overflow-hidden rounded-lg border border-tb-cyan/25 bg-tb-navy-elevated shadow-[0_16px_48px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(56,189,248,0.12)] sm:min-h-[252px]"
      aria-label="System flow diagram: business problem through software and AI layers to a usable product"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:14px_14px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(37,99,235,0.26),transparent_58%)]"
        aria-hidden
      />
      <div className="relative border-b border-tb-cyan/15 px-2.5 py-1.5 sm:px-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tb-cyan">
          System flow
        </p>
      </div>
      <div className="relative px-1.5 py-2 sm:px-2 sm:py-2.5">
        <div className="relative grid min-w-[260px] grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] items-center gap-x-0.5 sm:min-w-0 sm:gap-x-1">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
            viewBox="0 0 360 260"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M112 48 H148 M112 130 H148 M112 212 H148 M212 48 H248 M212 130 H248 M212 212 H248"
              stroke="rgba(56,189,248,0.35)"
              strokeWidth="1"
              strokeDasharray="3 2"
              fill="none"
            />
            <circle cx="148" cy="48" r="2" fill="rgba(56,189,248,0.5)" />
            <circle cx="148" cy="130" r="2" fill="rgba(56,189,248,0.5)" />
            <circle cx="148" cy="212" r="2" fill="rgba(56,189,248,0.5)" />
            <circle cx="212" cy="48" r="2" fill="rgba(56,189,248,0.5)" />
            <circle cx="212" cy="130" r="2" fill="rgba(56,189,248,0.5)" />
            <circle cx="212" cy="212" r="2" fill="rgba(56,189,248,0.5)" />
            {centerFlow.slice(0, -1).map((_, i) => {
              const y = 52 + i * 42;
              return (
                <path
                  key={i}
                  d={`M180 ${y} V${y + 28}`}
                  stroke="rgba(56,189,248,0.4)"
                  strokeWidth="1"
                  fill="none"
                />
              );
            })}
          </svg>

          <div className="relative z-[1] flex flex-col justify-center gap-2.5 sm:gap-3">
            {leftNodes.map((node) => (
              <DiagramNode key={node.label} label={node.label} icon={node.icon} />
            ))}
          </div>

          <div className="relative z-[1] flex flex-col items-stretch gap-0.5">
            {centerFlow.map((node, index) => (
              <div key={node.label} className="relative">
                <DiagramNode
                  label={node.label}
                  icon={node.icon}
                  highlight={"highlight" in node && node.highlight}
                />
                {index < centerFlow.length - 1 ? (
                  <div
                    className="mx-auto flex h-2 w-px items-center justify-center bg-gradient-to-b from-tb-cyan/60 via-tb-cyan/30 to-transparent sm:h-2.5"
                    aria-hidden
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="relative z-[1] flex flex-col justify-center gap-2.5 sm:gap-3">
            {rightNodes.map((node) => (
              <DiagramNode key={node.label} label={node.label} icon={node.icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const softwareFirstSteps = [
  { label: "Problem", icon: IconWorkflow },
  { label: "Software logic", icon: IconTerminal },
  { label: "Data", icon: IconDatabase },
  { label: "AI layer", icon: IconChip, highlight: true },
  { label: "Workflow output", icon: IconPipeline },
] as const;

export function SoftwareFirstDiagram() {
  return (
    <div
      className="w-full min-w-0 overflow-x-auto"
      aria-label="Software-first flow: problem through software, data, and AI to workflow output"
    >
      <ol className="flex min-w-[min(100%,320px)] flex-wrap items-center justify-start gap-y-2 lg:justify-center">
        {softwareFirstSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.label} className="flex items-center">
              <span
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-1.5 text-xs font-medium sm:px-2.5 ${
                  "highlight" in step && step.highlight
                    ? "border-tb-blue/45 bg-blue-50 text-tb-blue shadow-sm"
                    : "border-slate-200 bg-white text-tb-text"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {step.label}
              </span>
              {index < softwareFirstSteps.length - 1 ? (
                <span className="mx-1 shrink-0 text-xs text-tb-text-muted sm:mx-1.5" aria-hidden>
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
