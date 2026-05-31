import type { ReactNode } from "react";

type FeatureCardVariant = "default" | "emphasis" | "library";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  variant?: FeatureCardVariant;
  compact?: boolean;
};

const variantStyles: Record<FeatureCardVariant, string> = {
  default:
    "rounded-xl border border-slate-200/90 bg-white shadow-sm transition-shadow hover:shadow-md",
  emphasis:
    "rounded-xl border border-slate-200 bg-white shadow-md shadow-slate-200/40 transition-shadow hover:shadow-lg",
  library:
    "rounded-xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:border-tb-blue/20 hover:shadow-md",
};

export function FeatureCard({
  title,
  description,
  icon,
  variant = "default",
  compact = false,
}: FeatureCardProps) {
  const padding = compact ? "p-5 sm:p-6" : "p-7 sm:p-8";
  const minHeight = compact ? "min-h-[180px]" : "min-h-[220px]";

  return (
    <article className={`flex h-full flex-col ${minHeight} ${variantStyles[variant]} ${padding}`}>
      {icon ? (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200/90 bg-slate-50/90 text-tb-blue">
          {icon}
        </div>
      ) : null}
      <h3 className="text-base font-semibold leading-snug text-tb-text sm:text-lg">
        {title}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-tb-text-muted">
        {description}
      </p>
    </article>
  );
}
