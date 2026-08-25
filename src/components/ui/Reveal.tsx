"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll-entry reveal. Purpose: sequence. It tells the reader which block they
 * have just arrived at, and in what order to read it.
 *
 * Deliberately restrained. It fires once, moves 12px, and lasts 420ms. There is
 * no parallax, no pinning and no scroll listener anywhere on this site: entry is
 * driven by whileInView, which is an IntersectionObserver underneath.
 *
 * Under prefers-reduced-motion the movement is dropped entirely and the content
 * renders in place, with no fade to sit through.
 */
export function Reveal({
  children,
  delay = 0,
  y = 12,
  className,
  id,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  id?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Cmp = motion[as];

  if (reduce) {
    const Static = as;
    return (
      <Static id={id} className={className}>
        {children}
      </Static>
    );
  }

  return (
    <Cmp
      data-reveal
      id={id}
      className={className}
      initial={{ opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.42, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </Cmp>
  );
}

/**
 * Staggered list entry. Children cascade 55ms apart, which is inside the
 * 30-80ms band where a cascade reads as sequence rather than as a queue.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.055,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotion();
  const Cmp = motion[as];

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Cmp
      data-reveal
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </Cmp>
  );
}

export function RevealItem({
  children,
  className,
  id,
  as = "div",
  y = 12,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "li" | "article";
  y?: number;
}) {
  const reduce = useReducedMotion();
  const Cmp = motion[as];

  if (reduce) {
    const Static = as;
    return (
      <Static id={id} className={className}>
        {children}
      </Static>
    );
  }

  return (
    <Cmp
      data-reveal
      id={id}
      className={className}
      variants={{
        hidden: { opacity: 0, transform: `translateY(${y}px)` },
        shown: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] },
        },
      }}
    >
      {children}
    </Cmp>
  );
}
