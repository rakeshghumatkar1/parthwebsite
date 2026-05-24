import type { ReactNode } from "react";

type SectionTone = "dark" | "light" | "muted";

const toneClasses: Record<SectionTone, string> = {
  dark: "bg-tb-navy text-tb-text-on-dark",
  light: "bg-tb-surface text-tb-text",
  muted: "bg-tb-surface-muted text-tb-text",
};

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
};

export function Section({
  id,
  tone = "light",
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`${toneClasses[tone]} ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        {children}
      </div>
    </section>
  );
}
