"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-entry reveal. Purpose: sequence. It tells the reader which block they
 * have just arrived at, and in what order to read it.
 *
 * Deliberately restrained. It fires once, moves 12px, and lasts 420ms. There is
 * no parallax, no pinning and no scroll listener anywhere on this site: entry is
 * driven by whileInView, which is an IntersectionObserver underneath.
 *
 * Visible first, animated second
 * ------------------------------
 * The HTML ships every block visible. Only once the script has mounted does a
 * block that sits below the fold get hidden, to be revealed when it scrolls
 * into view. Anything already on screen at that moment is left alone. Two
 * reasons:
 *
 *  1. Largest Contentful Paint. Shipping blocks hidden and un-hiding them
 *     after hydration pushed the largest paint out by the whole script
 *     download on a slow phone, for an animation nobody scrolled into.
 *  2. Reduced motion. An earlier version rendered a different tree for
 *     reduced-motion users; the server cannot know the preference, so the
 *     mismatch left the server's opacity:0 in place and blanked the page.
 *     Now the preference only stops the arming, and a CSS rule in globals.css
 *     forces the shown state for [data-reveal] regardless.
 */

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** Matches the viewport margin below: a block starting past this line is "not yet in view". */
const FOLD = 0.88;

/**
 * Reports whether the element mounted below the fold. Measured once, in the
 * ref callback at commit, so no effect sets state and nothing runs on the
 * server.
 */
function useBelowFold() {
  const [below, setBelow] = useState(false);
  const measured = useRef(false);
  const ref = useCallback((el: HTMLElement | null) => {
    if (!el || measured.current) return;
    measured.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top > window.innerHeight * FOLD) setBelow(true);
  }, []);
  return { ref, below };
}

export function Reveal({
  children,
  delay = 0,
  y = 12,
  className,
  id,
  as = "div",
  eager = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  id?: string;
  as?: "div" | "section" | "li" | "article";
  /** Never animate, even if mounted below the fold. For page-top content. */
  eager?: boolean;
}) {
  const reduce = useReducedMotion();
  const { ref, below } = useBelowFold();
  const Cmp = motion[as];

  return (
    <Cmp
      ref={eager ? undefined : ref}
      data-reveal
      id={id}
      className={className}
      initial={false}
      animate={below ? "hidden" : "shown"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: { opacity: 0, transform: `translateY(${y}px)`, transition: { duration: 0 } },
        shown: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: reduce ? { duration: 0 } : { duration: 0.42, delay, ease: EASE },
        },
      }}
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
  const { ref, below } = useBelowFold();
  const Cmp = motion[as];

  return (
    <Cmp
      ref={ref}
      data-reveal
      className={className}
      initial={false}
      animate={below ? "hidden" : "shown"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: { transition: { duration: 0 } },
        shown: { transition: { staggerChildren: reduce ? 0 : stagger } },
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

  return (
    <Cmp
      data-reveal
      id={id}
      className={className}
      variants={{
        hidden: { opacity: 0, transform: `translateY(${y}px)`, transition: { duration: 0 } },
        shown: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: reduce ? { duration: 0 } : { duration: 0.42, ease: EASE },
        },
      }}
    >
      {children}
    </Cmp>
  );
}
