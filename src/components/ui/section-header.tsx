type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const maxDesc = align === "center" ? "max-w-2xl mx-auto" : "max-w-3xl";

  return (
    <header className={`mb-10 sm:mb-12 ${alignClass}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-widest ${
            dark ? "text-tb-cyan" : "text-tb-blue"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl ${
          dark ? "text-white" : "text-tb-text"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-tb-text-on-dark-muted" : "text-tb-text-muted"
          } ${maxDesc}`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
