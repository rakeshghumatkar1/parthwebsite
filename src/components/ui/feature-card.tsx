import type { ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {icon ? (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-tb-blue">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg font-semibold text-tb-text">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-tb-text-muted sm:text-base">
        {description}
      </p>
    </article>
  );
}
