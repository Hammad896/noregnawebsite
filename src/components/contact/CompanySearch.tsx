"use client";

import { useId, useRef, useState } from "react";
import { MagnifyingGlass, Buildings } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/content/site";

type Hit = { name: string; orgNr: string };

/**
 * Company lookup against the Broennoeysund register, as on the live contact
 * page. Picking a result fills the organisation name and captures the org
 * number alongside it, so the enquiry arrives already identified.
 *
 * The lookup is an assist, never a gate: if the register is slow or down, the
 * manual organisation field underneath still submits normally.
 *
 * Debounced with a timer ref rather than an effect, so no state is set
 * synchronously during render.
 */
export function CompanySearch({
  t,
  onPick,
}: {
  t: Dict;
  onPick: (name: string, orgNr: string) => void;
}) {
  const uid = useId();
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seq = useRef(0);

  const c = t.contact;

  function search(next: string) {
    setQuery(next);
    if (timer.current) clearTimeout(timer.current);

    if (next.trim().length < 2) {
      setHits([]);
      setOpen(false);
      return;
    }

    setBusy(true);
    timer.current = setTimeout(async () => {
      const mine = ++seq.current;
      try {
        const res = await fetch(`/api/brreg?q=${encodeURIComponent(next.trim())}`);
        const data = (await res.json()) as { results?: Hit[] };
        // Ignore a slow response that a newer keystroke has already replaced.
        if (mine !== seq.current) return;
        setHits(data.results ?? []);
        setOpen(true);
      } catch {
        if (mine === seq.current) setHits([]);
      } finally {
        if (mine === seq.current) setBusy(false);
      }
    }, 280);
  }

  function pick(h: Hit) {
    onPick(h.name, h.orgNr);
    setQuery(h.name);
    setOpen(false);
    setHits([]);
  }

  return (
    <div className="sm:col-span-2">
      <div className="grid gap-2">
        <label htmlFor={`${uid}-q`} className="text-[0.875rem] font-medium text-ink">
          {c.fields.searchLabel}
        </label>
        <p id={`${uid}-hint`} className="text-[0.8125rem] text-ink-subtle">
          {c.fields.selectHint}
        </p>

        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle">
            <MagnifyingGlass size={17} />
          </span>
          <input
            id={`${uid}-q`}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${uid}-list`}
            aria-describedby={`${uid}-hint`}
            autoComplete="off"
            value={query}
            placeholder={c.fields.searchPlaceholder}
            onChange={(e) => search(e.target.value)}
            className="w-full rounded-[10px] border border-line-strong bg-surface-raised py-2.5 pl-10 pr-3.5 text-[0.9375rem] text-ink placeholder:text-ink-subtle transition-[border-color] duration-200 focus:outline-none focus-visible:border-accent"
          />
          {busy ? (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[0.75rem] text-ink-subtle">
              …
            </span>
          ) : null}
        </div>

        {open && hits.length > 0 ? (
          <ul
            id={`${uid}-list`}
            className="mt-1 max-h-64 overflow-auto rounded-[10px] border border-line bg-surface-raised shadow-[var(--shadow-md)]"
          >
            {hits.map((h) => (
              <li key={h.orgNr}>
                <button
                  type="button"
                  onClick={() => pick(h)}
                  className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors duration-150 hover:bg-accent-soft"
                >
                  <span className="text-accent">
                    <Buildings size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.9375rem] text-ink">{h.name}</span>
                    <span className="tnum block text-[0.8125rem] text-ink-subtle">{h.orgNr}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
