import type { ReactNode } from "react";

type FeatureCardVariant = "default" | "emphasis" | "library";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  variant?: FeatureCardVariant;
};

const variantStyles: Record<FeatureCardVariant, string> = {
  default:
    "rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition-shadow hover:shadow-md sm:p-8",
  emphasis:
    "rounded-2xl border border-slate-200 bg-white p-7 shadow-md shadow-slate-200/50 transition-shadow hover:shadow-lg sm:p-8",
  library:
    "rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm ring-1 ring-slate-100 transition-shadow hover:border-tb-blue/20 hover:shadow-md sm:p-8",
};

export function FeatureCard({
  title,
  description,
  icon,
  variant = "default",
}: FeatureCardProps) {
  return (
    <article
      className={`flex h-full min-h-[220px] flex-col ${variantStyles[variant]}`}
    >
      {icon ? (
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-tb-blue ring-1 ring-blue-100/80">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg font-semibold leading-snug text-tb-text sm:text-xl">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-tb-text-muted sm:text-base">
        {description}
      </p>
    </article>
  );
}
