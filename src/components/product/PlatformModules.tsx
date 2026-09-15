import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/components/ui/IconBadge";
import type { Dict, Locale } from "@/content/site";
import { shortName } from "@/lib/modules";
import { hrefFor } from "@/lib/routing";

/**
 * The platform shown as what it contains, rather than as a second copy of the
 * dashboard the hero already carries. Seven modules in one card, each with the
 * product word and its one-line tagline from the dictionary, and each a link
 * to its own card on the systems page.
 *
 * Invoice is left out on purpose: it is the standalone product and has its own
 * row directly below.
 */
export function PlatformModules({ t, locale }: { t: Dict; locale: Locale }) {
  const modules = t.services.modules.filter((m) => !m.external);
  const services = hrefFor(locale, "services");

  return (
    <div className="w-full max-w-[40rem] rounded-[18px] border border-line bg-surface p-5 shadow-[0_30px_70px_-40px_oklch(0.252_0.0592_151.76_/_0.5)] sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <Image
          src="/brand/noregna-wordmark.png"
          alt=""
          width={858}
          height={146}
          sizes="160px"
          className="h-[18px] w-auto dark:brightness-[1.45] dark:saturate-[1.08]"
        />
        <span className="inline-flex h-6 items-center rounded-full border border-line-strong px-2.5 text-[0.75rem] font-medium text-ink-muted">
          {t.home.products.platformWhere}
        </span>
      </div>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {modules.map((m) => (
          <li key={m.slug} className="sm:last:col-span-2">
            <Link
              href={`${services}#${m.slug}`}
              className="press flex items-center gap-3 rounded-[12px] border border-line bg-bg px-3 py-2.5 transition-colors duration-200 hover:border-accent-soft-line hover:bg-accent-soft active:bg-accent-soft"
            >
              <IconBadge name={m.icon} size="sm" tone="soft" />
              <span className="min-w-0">
                <span className="block truncate text-[0.9375rem] font-medium text-ink">
                  {shortName(m.name)}
                </span>
                <span className="block truncate text-[0.8125rem] text-ink-subtle">{m.tagline}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
