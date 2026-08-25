"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { EXTERNAL, type Dict, type Locale } from "@/content/site";
import { Icon } from "@/lib/icons";
import { ThemeToggle } from "./ThemeToggle";
import { LangSwitch } from "./LangSwitch";
import { SystemsMenu } from "./SystemsMenu";
import { hrefFor, PAGE_KEYS, pageFromPath, type PageKey } from "@/lib/routing";

const LABEL: Record<PageKey, keyof Dict["nav"]> = {
  home: "home",
  services: "services",
  app: "app",
  contact: "contact",
};

export function Header({ t, locale }: { t: Dict; locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const current = pageFromPath(pathname);
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  // A sentinel plus IntersectionObserver, rather than a scroll listener that
  // would run on every frame and re-render the tree with it.
  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      rootMargin: "0px",
      threshold: 1,
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Lock the page behind the mobile sheet while it is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const other: Locale = locale === "no" ? "en" : "no";

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-[10px] bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]"
      >
        {t.nav.skipToContent}
      </a>

      <div ref={sentinel} aria-hidden className="absolute top-0 h-px w-full" />

      <header
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          stuck
            ? "border-line bg-bg/85 shadow-[0_1px_0_0_var(--line)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-bg"
        }`}
      >
        <div className="container-page">
          <div className="flex h-[72px] items-center justify-between gap-6">
            <Link
              href={hrefFor(locale, "home")}
              className="press -m-1 shrink-0 rounded-[10px] p-1"
              aria-label={`Noregna, ${t.nav.home.toLowerCase()}`}
            >
              <Image
                src="/brand/noregna-wordmark.png"
                alt="Noregna"
                width={858}
                height={146}
                priority
                className="h-[26px] w-auto dark:brightness-[1.45] dark:saturate-[1.08]"
              />
            </Link>

            {/* "Våre systemer" opens the product panel rather than navigating.
                See SystemsMenu for why the header carries the breadth. */}
            <nav aria-label={t.meta.siteName} className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {PAGE_KEYS.map((key) => {
                  const active = current === key;
                  return (
                    <li key={key}>
                      {key === "services" ? (
                        <SystemsMenu t={t} locale={locale} />
                      ) : (
                        <Link
                          href={hrefFor(locale, key)}
                          aria-current={active ? "page" : undefined}
                          className={`inline-flex h-9 items-center rounded-[10px] px-3 text-[0.9375rem] transition-colors duration-200 ${
                            active
                              ? "bg-accent-soft font-medium text-accent"
                              : "text-ink-muted hover:bg-accent-soft hover:text-ink"
                          }`}
                        >
                          {t.nav[LABEL[key]]}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <LangSwitch pathname={pathname} locale={locale} other={other} label={t.nav.languageLabel} />
              <ThemeToggle label={t.nav.themeLabel} />
              <span aria-hidden className="mx-1 h-5 w-px bg-line" />
              <Link
                href={EXTERNAL.app}
                className="press inline-flex h-9 items-center rounded-[10px] px-3 text-[0.9375rem] text-ink-muted transition-colors duration-200 hover:bg-accent-soft hover:text-ink"
              >
                {t.nav.login}
              </Link>
              <Button href={EXTERNAL.app} external size="md">
                {t.nav.tryFree}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="press inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-surface text-ink lg:hidden"
            >
              <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile sheet. Single column, full width, nothing carried over from the
            desktop grid. */}
        <div
          id="mobile-nav"
          hidden={!open}
          className="border-t border-line bg-bg lg:hidden"
        >
          <div className="container-page py-5">
            <ul className="grid gap-1">
              {PAGE_KEYS.map((key) => {
                const active = current === key;

                // Systems expands in place. A phone gets the same eight modules
                // the desktop panel shows, rather than a word that hides them.
                if (key === "services") {
                  return (
                    <li key={key}>
                      <details className="group rounded-[10px]">
                        <summary className="flex h-12 list-none items-center justify-between rounded-[10px] px-3 text-base text-ink [&::-webkit-details-marker]:hidden">
                          {t.nav.services}
                          <span
                            aria-hidden
                            className="text-ink-subtle transition-transform duration-200 group-open:rotate-180"
                          >
                            <Icon name="caretDown" size={16} />
                          </span>
                        </summary>
                        <ul className="mb-1 grid gap-0.5 border-l-2 border-line pl-3">
                          {t.services.modules.map((m) => (
                            <li key={m.slug}>
                              <Link
                                href={`${hrefFor(locale, "services")}#${m.slug}`}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-[0.9375rem] text-ink-muted"
                              >
                                <span className="text-accent">
                                  <Icon name={m.icon} size={16} />
                                </span>
                                {m.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  );
                }

                return (
                  <li key={key}>
                    <Link
                      href={hrefFor(locale, key)}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex h-12 items-center justify-between rounded-[10px] px-3 text-base ${
                        active ? "bg-accent-soft font-medium text-accent" : "text-ink"
                      }`}
                    >
                      {t.nav[LABEL[key]]}
                      {active ? <Icon name="check" size={18} /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 grid gap-2">
              <Button href={EXTERNAL.app} external size="lg" className="w-full">
                {t.nav.tryFree}
              </Button>
              <Button href={EXTERNAL.app} external size="lg" variant="secondary" className="w-full">
                {t.nav.login}
              </Button>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
              <span className="text-sm text-ink-subtle">{t.nav.languageLabel}</span>
              <div className="flex items-center gap-2">
                <LangSwitch pathname={pathname} locale={locale} other={other} label={t.nav.languageLabel} />
                <ThemeToggle label={t.nav.themeLabel} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
