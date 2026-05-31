type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  dense?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
  dense = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const maxDesc = align === "center" ? "max-w-2xl mx-auto" : "max-w-3xl";
  const spacing = dense ? "mb-4 sm:mb-5" : "mb-12 sm:mb-14";

  return (
    <header className={`${spacing} ${alignClass} ${className}`}>
      {eyebrow ? (
        <p
          className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${
            dark ? "text-tb-cyan" : "text-tb-blue"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-balance text-2xl font-semibold leading-[1.15] tracking-tight sm:text-[1.75rem] lg:text-[2rem] lg:leading-[1.12] ${
          dark ? "text-white" : "text-tb-text"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-sm leading-relaxed sm:text-base ${
            dark ? "text-tb-text-on-dark-muted" : "text-tb-text-muted"
          } ${maxDesc}`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
