import type { ReactNode } from "react";

type SectionTone = "dark" | "light" | "muted";

const toneClasses: Record<SectionTone, string> = {
  dark: "bg-gradient-to-b from-tb-navy-deep via-tb-navy to-tb-navy text-tb-text-on-dark",
  light: "border-t border-slate-100/80 bg-tb-surface text-tb-text",
  muted: "bg-tb-surface-muted text-tb-text",
};

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** Tighter vertical padding for nested bands */
  compact?: boolean;
  /** Denser rhythm for homepage-style sections */
  dense?: boolean;
};

export function Section({
  id,
  tone = "light",
  children,
  className = "",
  containerClassName = "max-w-6xl",
  compact = false,
  dense = false,
}: SectionProps) {
  const padding = dense
    ? "px-6 py-6 sm:px-8 sm:py-7 lg:py-8"
    : compact
      ? "px-6 py-14 sm:px-8 sm:py-16 lg:py-20"
      : "px-6 py-20 sm:px-8 sm:py-24 lg:py-28";

  return (
    <section id={id} className={`${toneClasses[tone]} ${className}`}>
      <div className={`mx-auto w-full ${containerClassName} ${padding}`}>
        {children}
      </div>
    </section>
  );
}
