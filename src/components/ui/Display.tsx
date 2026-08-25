import type { ReactNode } from "react";

/**
 * The display type scale, defined once.
 *
 * Before this existed, seventeen headings across eleven files each carried
 * their own hand-written size, weight, leading and tracking, in five different
 * combinations. That is what made the site read as assembled rather than
 * designed.
 *
 * Weight is light at display sizes, following the register Conta and Sticos
 * use: at this scale, heavy weight reads as shouting and restraint reads as an
 * institution. Emphasis comes from the accent clause, not from bolding the
 * whole line.
 *
 * Sizes are calibrated against noregna.no's own measured values (body 16px,
 * h1 40px, h2 32px). An earlier scale ran h2 at 44px, thirty-seven per cent
 * over, which is what made the whole site read as zoomed in.
 *
 * FOUR LEVELS, AND NOTHING OUTSIDE THEM
 * -------------------------------------
 * A later audit of every rendered heading found the site had drifted back into
 * two parallel systems: this scale produced 44/34/19, while ProductTrio carried
 * a hand-written 30px row title and the contact and legal pages carried
 * hand-written 22px sub-headings. `h3` therefore meant 30px in one place and
 * 19px in another, which is exactly the incoherence this component exists to
 * prevent.
 *
 * The gap those hand-written sizes were filling was real, so the scale now has
 * a step for it:
 *
 *   1   40px   page and section-opening titles          (noregna.no's h1)
 *   2   32px   section titles                           (noregna.no's h2)
 *   3   24px   row and block titles
 *   4   19px   sub-headings, card titles, form legends
 *
 * The single sanctioned exception is the homepage hero at 44px, one step above
 * level 1, because it is the one heading on the site with no competition on
 * screen. It is written in HeroPower and nowhere else. Anything else that wants
 * a size not on this list is wrong; add a level or use an existing one.
 */

type Level = 1 | 2 | 3 | 4;
type Tone = "ink" | "field";

const LEVELS: Record<Level, string> = {
  1: "text-[1.75rem] font-light leading-[1.1] tracking-[-0.026em] sm:text-[2.125rem] lg:text-[2.5rem]",
  2: "text-[1.4375rem] font-light leading-[1.16] tracking-[-0.021em] sm:text-[1.625rem] lg:text-[2rem]",
  3: "text-[1.25rem] font-normal leading-[1.25] tracking-[-0.016em] sm:text-[1.375rem] lg:text-[1.5rem]",
  4: "text-[1.0625rem] font-medium leading-[1.35] tracking-[-0.011em] sm:text-[1.1875rem]",
};

const TONES: Record<Tone, { base: string; accent: string }> = {
  ink: { base: "text-ink", accent: "text-accent" },
  field: { base: "text-on-field", accent: "text-on-field-accent" },
};

export function Display({
  children,
  accent,
  level = 2,
  as,
  tone = "ink",
  balance = true,
  className = "",
}: {
  children: ReactNode;
  /** Emphasised clause, set in the accent colour at a heavier weight. */
  accent?: ReactNode;
  level?: Level;
  as?: "h1" | "h2" | "h3" | "p";
  tone?: Tone;
  balance?: boolean;
  className?: string;
}) {
  const Tag = as ?? (`h${level}` as "h1" | "h2" | "h3");
  const t = TONES[tone];

  return (
    <Tag
      className={`${LEVELS[level]} ${t.base} ${balance ? "text-balance" : ""} ${className}`}
    >
      {children}
      {accent ? (
        <>
          {" "}
          <span className={`font-semibold ${t.accent}`}>{accent}</span>
        </>
      ) : null}
    </Tag>
  );
}

/**
 * The small caps label that can sit above a Display. Kept here so the pair is
 * defined together; rationed to roughly one per three sections.
 */
export function Kicker({
  children,
  tone = "ink",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const color = tone === "field" ? "text-on-field-accent" : "text-accent";
  const bar = tone === "field" ? "bg-on-field-accent" : "bg-accent";

  return (
    <span
      className={`inline-flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] ${color}`}
    >
      <span aria-hidden className={`h-[2px] w-7 rounded-full ${bar}`} />
      {children}
    </span>
  );
}
