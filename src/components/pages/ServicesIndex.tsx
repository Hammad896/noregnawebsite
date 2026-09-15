"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/lib/icons";
import { shortName } from "@/lib/modules";

export type IndexModule = {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  external?: string;
};

/**
 * The services index. It tracks which module card is under the reading line
 * and marks that one as current, so arriving at #fremdrift from anywhere on
 * the site shows Fremdrift highlighted, not whatever happened to be styled.
 *
 * Invoice, the one module outside the platform, is marked with an outward
 * arrow rather than a tint, so the tint keeps its single meaning: current.
 */
export function ServicesIndex({ modules, label }: { modules: IndexModule[]; label: string }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const ids = modules.map((m) => m.slug);
    const fromHash = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (ids.includes(h)) setCurrent(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);

    // A band a third of the way down the viewport: whichever card crosses it
    // is the one being read. Cards are taller than the band, so at most two
    // ever intersect, and the upper one wins.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setCurrent(hit.target.id);
      },
      { rootMargin: "-32% 0px -58% 0px", threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => {
      io.disconnect();
      window.removeEventListener("hashchange", fromHash);
    };
  }, [modules]);

  return (
    <nav aria-label={label} className="min-w-0 lg:col-span-3">
      <div className="lg:sticky lg:top-28">
        <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
          {label}
        </h2>
        <ul className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-2 lg:mt-5 lg:grid lg:gap-1 lg:overflow-visible lg:pb-0">
          {modules.map((m) => {
            const active = current === m.slug;
            return (
              <li key={m.slug} className="shrink-0">
                <a
                  href={`#${m.slug}`}
                  aria-current={active ? "true" : undefined}
                  className={`inline-flex min-h-9 items-center gap-2.5 whitespace-nowrap rounded-[10px] px-3 py-1.5 transition-colors duration-200 hover:bg-accent-soft hover:text-accent active:bg-accent-soft lg:w-full ${
                    active ? "bg-accent-soft text-accent" : "text-ink-muted"
                  }`}
                >
                  <span className={active ? "text-accent" : "text-ink-subtle"}>
                    <Icon name={m.icon} size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[0.9375rem] ${active ? "font-medium" : ""}`}>
                      {shortName(m.name)}
                    </span>
                    <span className="hidden text-[0.75rem] leading-tight text-ink-subtle lg:block">
                      {m.tagline}
                    </span>
                  </span>
                  {m.external ? (
                    <span aria-hidden className="ml-auto text-ink-subtle">
                      <Icon name="arrowUpRight" size={13} />
                    </span>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
