"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { PhoneFrame } from "./PhoneFrame";
import type { AppShot } from "@/content/app-shots";

/**
 * One phone, many screens. The slides sit in a horizontal track inside the
 * frame, so only the screen moves and the bezel stays put.
 *
 *  - Advances on its own every few seconds, and stops while the pointer or
 *    keyboard focus is on it, while a swipe is in progress, while the tab is
 *    hidden, and for anyone with "reduce motion" switched on (who also gets an
 *    instant cut instead of the slide; see .phone-track in globals.css).
 *  - Swipe left or right on the screen to change slide. The track follows the
 *    finger while dragging and settles on release; a drag shorter than 40px
 *    snaps back. Vertical scrolling is left to the browser (touch-action).
 *  - Prev/next sit outside the bezel from md up, where there is room beside
 *    the phone, and drop below it on narrower screens.
 *  - Only the active slide and its two neighbours are eager-loaded; the rest
 *    load lazily and are warmed one step ahead, so a slide never arrives
 *    blank without loading all thirteen images up front.
 */

export type Slide = AppShot & { alt: string };

const SWIPE_PX = 40;

export function PhoneCarousel({
  slides,
  prevLabel,
  nextLabel,
  intervalMs = 4500,
  className = "",
}: {
  slides: Slide[];
  prevLabel: string;
  nextLabel: string;
  intervalMs?: number;
  className?: string;
}) {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);

  // The active slide and its two neighbours load eagerly; everything else
  // lazily. An image that has already loaded stays loaded when it drops back
  // to "lazy", so this is pure derivation with no state to keep in sync.
  const isWarm = (i: number) => i === active || i === (active + 1) % n || i === (active - 1 + n) % n;

  // Restarts whenever the slide changes, so a manual click or swipe is always
  // followed by a full interval rather than an immediate auto-advance.
  useEffect(() => {
    if (paused || dragging || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % n);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [paused, dragging, intervalMs, n, active]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    startX.current = e.clientX;
    setDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* synthetic events have no capture; the move/up handlers still work */
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (startX.current === null) return;
    setDragX(e.clientX - startX.current);
  }

  function onPointerEnd(e: React.PointerEvent<HTMLDivElement>) {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    setDragging(false);
    setDragX(0);
    if (Math.abs(dx) > SWIPE_PX) go(active + (dx < 0 ? 1 : -1));
  }

  const arrow =
    "press flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink shadow-[0_8px_20px_rgba(8,40,26,0.25)] transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:absolute md:top-1/2 md:-translate-y-1/2";

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <PhoneFrame>
        <div
          aria-roledescription="carousel"
          className={`touch-pan-y select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
        >
          <ul
            className={`phone-track flex ${dragging ? "transition-none!" : ""}`}
            style={{ transform: `translateX(calc(${-active * 100}% + ${dragX}px))` }}
          >
            {slides.map((s, i) => (
              <li key={s.key} className="w-full shrink-0" aria-hidden={i !== active}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  sizes="(min-width: 1280px) 17rem, (min-width: 1024px) 16rem, 15rem"
                  loading={isWarm(i) ? "eager" : "lazy"}
                  draggable={false}
                  className="block h-auto w-full"
                />
              </li>
            ))}
          </ul>
        </div>
      </PhoneFrame>

      {/* Announced only while paused, so auto-advance never chatters. */}
      <p className="sr-only" aria-live={paused ? "polite" : "off"}>
        {slides[active]?.alt}
      </p>

      <div className="mt-5 flex justify-center gap-3 md:contents">
        <button type="button" onClick={() => go(active - 1)} aria-label={prevLabel} className={`${arrow} md:-left-16`}>
          <CaretLeft size={20} weight="bold" />
        </button>
        <button type="button" onClick={() => go(active + 1)} aria-label={nextLabel} className={`${arrow} md:-right-16`}>
          <CaretRight size={20} weight="bold" />
        </button>
      </div>
    </div>
  );
}
