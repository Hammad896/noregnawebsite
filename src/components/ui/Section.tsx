import { Display } from "@/components/ui/Display";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
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

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? <div className="mb-4">{eyebrow}</div> : null}
      <Display level={2} as="h2">
        {title}
      </Display>
      {lead ? (
        <p className="mt-4 max-w-[62ch] text-[1rem] leading-[1.65] text-ink-muted">{lead}</p>
      ) : null}
    </Reveal>
  );
}

export function Card({
  children,
  className = "",
  interactive = false,
  tone = "surface",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  tone?: "surface" | "accent" | "outline";
}) {
  const tones = {
    surface: "bg-surface border-line",
    accent: "bg-accent-soft border-accent-soft-line",
    outline: "bg-transparent border-line",
  } as const;

  return (
    <div
      className={`rounded-2xl border ${tones[tone]} ${interactive ? "hover-lift" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/** Checkmark list. Used wherever the source copy is genuinely a list of claims. */
export function CheckList({
  items,
  className = "",
  columns = 1,
}: {
  items: string[];
  className?: string;
  columns?: 1 | 2;
}) {
  return (
    <ul
      className={`grid gap-x-8 gap-y-3 ${columns === 2 ? "sm:grid-cols-2" : ""} ${className}`}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.9375rem] leading-[1.6] text-ink-muted">
          <CheckDot />
          <span>{item}</span>
        </li>
      ))}
    </ul>
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
