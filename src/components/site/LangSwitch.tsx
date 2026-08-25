"use client";

import Link from "next/link";
import type { Locale } from "@/content/site";
import { swapLocale } from "@/lib/routing";

/** The NO/EN toggle. Shared by every header variant. */
export function LangSwitch({
  pathname,
  locale,
  other,
  label,
  onNavigate,
}: {
  pathname: string;
  locale: Locale;
  other: Locale;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <div
      className="flex items-center rounded-full border border-line bg-surface p-0.5"
      role="group"
      aria-label={label}
    >
      <span className="inline-flex h-7 min-w-[2.25rem] items-center justify-center rounded-full bg-accent-soft px-2 text-xs font-semibold uppercase tracking-wide text-accent">
        {locale}
      </span>
      <Link
        href={swapLocale(pathname, other)}
        hrefLang={other}
        onClick={onNavigate}
        className="press inline-flex h-7 min-w-[2.25rem] items-center justify-center rounded-full px-2 text-xs font-semibold uppercase tracking-wide text-ink-subtle transition-colors duration-200 hover:text-ink"
      >
        {other}
      </Link>
    </div>
  );
}
