import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-tb-blue text-white hover:bg-tb-blue-hover border border-transparent shadow-sm shadow-tb-blue/25",
  secondary:
    "bg-transparent text-tb-text-on-dark border border-white/25 hover:border-white/50 hover:bg-white/5",
  ghost:
    "bg-transparent text-tb-text border border-slate-300 hover:border-slate-400 hover:bg-tb-surface-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base",
  lg: "px-6 py-3 text-sm sm:px-8 sm:py-3.5 sm:text-base",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  dark?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  dark = false,
}: ButtonProps) {
  const ghostOnLight = !dark && variant === "secondary";
  const resolvedVariant = ghostOnLight ? "ghost" : variant;

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors ${sizeClasses[size]} ${variantClasses[resolvedVariant]} ${className}`}
    >
      {children}
    </Link>
  );
}
