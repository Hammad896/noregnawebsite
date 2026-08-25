"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { EXTERNAL, type Dict, type Locale } from "@/content/site";
import { Icon } from "@/lib/icons";
import { hrefFor } from "@/lib/routing";

/**
 * THE HEADER'S JOB IS TO SELL, NOT TO INDEX.
 *
 * The old nav was four flat words — Hjem, Våre systemer, App, Kontakt oss —
 * which tells a first-time visitor nothing about what Noregna is. Everything
 * that would actually persuade them was one click away and invisible: eight
 * modules and three separate products, none of them named until you commit to a
 * page. Every competitor worth matching (PowerOffice, Conta, Sticos, DNB) puts
 * the product breadth in the header for exactly this reason. A visitor who
 * never scrolls should still learn the shape of what is on offer.
 *
 * So "Våre systemer" opens a panel instead of navigating:
 *
 *   left   the eight modules, each with its own one-line tagline, deep-linked
 *          to its anchor on the services page
 *   right  the three products, with where each one lives and the fact that
 *          Invoice is free and separate — the most persuasive thing Noregna has
 *          and previously reachable only through the FAQ
 *
 * Every string is Noregna's own. Nothing is written for the menu.
 *
 * On the interaction
 * ------------------
 * The trigger is a real <button> that toggles on click, so keyboard and touch
 * work without hover. A pointer opens it on enter and closes it on leave after
 * a short grace period, because a menu that vanishes the instant the cursor
 * crosses a gap is the classic mega-menu failure. Escape closes and returns
 * focus to the trigger; an outside click closes; following any link closes.
 */
/**
 * Whether hover-to-open should apply at all. Asked of the device rather than
 * read off `event.pointerType`, which is inconsistent across browsers and
 * automation and silently disabled the whole interaction when it came back as
 * anything other than the literal string "mouse". A touch device answers false,
 * so a tap only ever fires the click toggle and never both.
 */
function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
}

export function SystemsMenu({ t, locale }: { t: Dict; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  // Clear any pending close when the component goes away mid-gesture.
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const hold = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const release = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 180);
  };

  const modules = t.services.modules;
  const p = t.home.products;

  const products = [
    {
      name: t.meta.siteName,
      where: p.platformWhere,
      badge: p.includedLabel,
      href: EXTERNAL.app,
      external: true,
      icon: "overview",
    },
    {
      name: t.appPage.eyebrow,
      where: p.portalWhere,
      badge: p.separateLabel,
      href: hrefFor(locale, "app"),
      external: false,
      icon: "portal",
    },
    {
      name: t.home.invoice.name,
      where: p.invoiceWhere,
      badge: p.freeLabel,
      href: EXTERNAL.invoice,
      external: true,
      icon: "invoice",
    },
  ] as const;

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerEnter={() => {
        if (!canHover()) return;
        hold();
        setOpen(true);
      }}
      onPointerLeave={() => {
        if (!canHover()) return;
        release();
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-9 items-center gap-1.5 rounded-[10px] px-3 text-[0.9375rem] transition-colors duration-200 ${
          open ? "bg-accent-soft text-ink" : "text-ink-muted hover:bg-accent-soft hover:text-ink"
        }`}
      >
        {t.nav.services}
        <span
          aria-hidden
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <Icon name="caretDown" size={14} />
        </span>
      </button>

      <div
        id={id}
        hidden={!open}
        className="absolute left-1/2 top-[calc(100%+0.75rem)] z-50 w-[62rem] max-w-[calc(100vw-3rem)] -translate-x-1/2"
      >
        <div className="overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_28px_70px_-24px_oklch(0.252_0.0592_151.76_/_0.3)]">
          <div className="grid lg:grid-cols-[1fr_20rem]">
            {/* The eight modules. Content, not a list of words. */}
            <div className="p-6">
              <p className="px-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                {t.services.pick}
              </p>
              <ul className="mt-3 grid gap-0.5 sm:grid-cols-2">
                {modules.map((m) => (
                  <li key={m.slug}>
                    <Link
                      href={`${hrefFor(locale, "services")}#${m.slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex gap-3 rounded-[12px] p-2.5 transition-colors duration-200 hover:bg-accent-soft"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-accent-soft text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-ink">
                        <Icon name={m.icon} size={17} />
                      </span>
                      {/* Two of the eight taglines are just the product name
                          again ("Noregna Rapportering" / "Rapportering"). Their
                          copy is not edited; the repetition is simply not
                          printed. */}
                      <span className="min-w-0">
                        <span className="block text-[0.9375rem] font-medium text-ink">
                          {m.name}
                        </span>
                        {m.name.toLowerCase().includes(m.tagline.toLowerCase()) ? null : (
                          <span className="mt-0.5 block text-[0.8125rem] leading-[1.45] text-ink-subtle">
                            {m.tagline}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* The three products. This rail is the reason the menu exists: it
                is the only place in the chrome that says Invoice is free and
                not part of the platform. */}
            <div className="border-t border-line bg-bg-sunken p-6 lg:border-l lg:border-t-0">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                {p.title}
              </p>
              <ul className="mt-3 grid gap-1">
                {products.map((pr) => (
                  <li key={pr.name}>
                    <Link
                      href={pr.href}
                      onClick={() => setOpen(false)}
                      {...(pr.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : null)}
                      className="group flex items-start gap-3 rounded-[12px] p-2.5 transition-colors duration-200 hover:bg-accent-soft"
                    >
                      <span className="mt-0.5 text-accent">
                        <Icon name={pr.icon} size={17} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink">
                          {pr.name}
                          {pr.external ? (
                            <span aria-hidden className="text-ink-subtle">
                              <Icon name="arrowUpRight" size={13} />
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.8125rem] text-ink-subtle">
                          {pr.where}
                        </span>
                        <span className="mt-1.5 inline-flex h-[1.375rem] items-center rounded-full border border-line-strong px-2 text-[0.6875rem] font-medium text-ink-muted">
                          {pr.badge}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
