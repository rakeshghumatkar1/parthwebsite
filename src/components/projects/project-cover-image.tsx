import {
  projectCoverObjectFitClass,
  projectCoverObjectPosition,
} from "@/lib/projects/cover-image";

type ProjectCoverImageProps = {
  src: string;
  alt: string;
  fit?: string | null;
  position?: string | null;
  variant?: "card" | "detail";
  className?: string;
};

export function ProjectCoverImage({
  src,
  alt,
  fit,
  position,
  variant = "card",
  className = "",
}: ProjectCoverImageProps) {
  const frameClass =
    variant === "detail"
      ? "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2 sm:aspect-[18/10]"
      : "relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-1.5";

  return (
    <div className={`${frameClass} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={variant === "detail" ? "eager" : "lazy"}
        className={`h-full w-full rounded-md ${projectCoverObjectFitClass(fit)}`}
        style={{ objectPosition: projectCoverObjectPosition(position) }}
      />
    </div>
  );
}
