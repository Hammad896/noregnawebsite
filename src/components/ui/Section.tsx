import type { ReactNode } from "react";
import { Icon } from "@/lib/icons";

export function Section({
  children,
  className = "",
  id,
  tone = "base",
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Tints stay inside one theme family. Nothing here inverts the page. */
  tone?: "base" | "sunken" | "accent";
  size?: "sm" | "md" | "lg";
}) {
  const tones = {
    base: "",
    sunken: "bg-bg-sunken",
    accent: "bg-accent-soft",
  } as const;

  const sizes = {
    sm: "py-14 md:py-20",
    md: "py-20 md:py-28",
    lg: "py-24 md:py-36",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} ${sizes[size]} ${className}`}>
      {children}
    </section>
  );
}

/**
 * Small caps label above a headline. Rationed on purpose: the homepage uses
 * three across nine sections, because a label above every heading is what makes
 * a page read as a template.
 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-accent">
      <span aria-hidden className="h-[2px] w-7 rounded-full bg-accent" />
      {children}
    </span>
  );
}

/** The filled green circle check used for every benefit list on the site. */
export function CheckDot() {
  return (
    <span
      aria-hidden
      className="mt-[0.15rem] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink"
    >
      <Icon name="check" size={11} weight="bold" />
    </span>
  );
}
