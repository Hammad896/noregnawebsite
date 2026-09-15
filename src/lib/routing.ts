import type { Locale } from "@/content/site";

/**
 * Norwegian sits at the root and keeps the exact slugs the live site already
 * uses (/, /ourservices, /app, /contact-us, /privacy, /cookies,
 * /kjopsbetingelser), so existing links and rankings survive. English mirrors
 * the same slugs under /en.
 */
export const PAGE_KEYS = ["home", "services", "app", "contact"] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

const SLUGS: Record<PageKey, string> = {
  home: "",
  services: "ourservices",
  app: "app",
  contact: "contact-us",
};

/** Legal routes are addressed by slug rather than by PageKey. */
export type LegalSlug = "privacy" | "cookies" | "kjopsbetingelser";

export function hrefFor(locale: Locale, page: PageKey): string {
  const slug = SLUGS[page];
  const prefix = locale === "no" ? "" : "/en";
  if (!slug) return prefix || "/";
  return `${prefix}/${slug}`;
}

export function legalHref(locale: Locale, slug: LegalSlug): string {
  return locale === "no" ? `/${slug}` : `/en/${slug}`;
}

/** Which page a pathname refers to, so the nav can mark the current one. */
export function pageFromPath(pathname: string): PageKey {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, "").replace(/\/+$/, "");
  const found = PAGE_KEYS.find((key) => SLUGS[key] && stripped === `/${SLUGS[key]}`);
  return found ?? "home";
}

/**
 * The same page in the other language. Every route, legal pages included, is
 * mirrored under /en, so swapping the prefix is enough; resolving through
 * PAGE_KEYS sent the legal pages to the homepage.
 */
export function swapLocale(pathname: string, to: Locale): string {
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  if (to === "no") return bare;
  return bare === "/" ? "/en" : `/en${bare}`;
}
