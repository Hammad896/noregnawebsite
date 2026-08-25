"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";

const KEY = "noregna-theme";

/**
 * Dark mode is opt-in, never imposed by the operating system.
 *
 * noregna.no is a light site and that is the version signed off, so a visitor
 * whose laptop happens to be in dark mode still lands on the approved look.
 * Anyone who wants dark can choose it, and the choice sticks.
 *
 * The <html data-theme> attribute is the single source of truth. The button
 * subscribes to it rather than keeping a parallel copy in state, so the two can
 * never disagree and nothing has to be synced inside an effect.
 */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

/** The server always renders the light default. */
function getServerSnapshot() {
  return false;
}

export function ThemeToggle({ label }: { label: string }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const root = document.documentElement;
    const next = !dark;
    if (next) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      /* private mode: the choice simply does not persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      title={label}
      className="press inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition-colors duration-200 hover:text-ink"
    >
      <span className="sr-only">{label}</span>
      {dark ? <Sun size={16} weight="bold" /> : <Moon size={16} weight="bold" />}
    </button>
  );
}

/**
 * Applies the saved choice before first paint, so a returning dark-mode visitor
 * never sees a white flash.
 */
export const THEME_INIT = `try{if(localStorage.getItem("${KEY}")==="dark"){document.documentElement.setAttribute("data-theme","dark")}}catch(e){}`;
