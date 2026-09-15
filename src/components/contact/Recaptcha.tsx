"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/content/site";

/**
 * Google reCAPTCHA v2 checkbox, the same guard the Laravel site used on its
 * contact form (and the one the cookie declaration names).
 *
 * Rendered only when NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set, so a build without
 * keys still has a working form protected by the honeypot and rate limit. The
 * server side mirrors this: with RECAPTCHA_SECRET_KEY set it insists on a valid
 * token, without it the check is skipped.
 *
 * Google's script is loaded on demand here rather than in the layout, so it
 * only ever runs on the contact page.
 */

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type Grecaptcha = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => number;
  reset: (id?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    __noregnaRecaptchaReady?: () => void;
  }
}

const SCRIPT_ID = "noregna-recaptcha";
const pendingRenders: (() => void)[] = [];

function whenReady(fn: () => void) {
  if (window.grecaptcha?.render) {
    fn();
    return;
  }
  pendingRenders.push(fn);
  if (document.getElementById(SCRIPT_ID)) return;

  window.__noregnaRecaptchaReady = () => {
    while (pendingRenders.length) pendingRenders.shift()?.();
  };
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.async = true;
  s.defer = true;
  s.src = `https://www.google.com/recaptcha/api.js?onload=__noregnaRecaptchaReady&render=explicit&hl=${
    document.documentElement.lang || "no"
  }`;
  document.head.appendChild(s);
}

export function Recaptcha({
  locale,
  onToken,
  resetKey,
}: {
  locale: Locale;
  onToken: (token: string) => void;
  /** Bump to clear the widget after a failed submit. */
  resetKey: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const widget = useRef<number | null>(null);
  // Google calls back into whatever closure it was given at render time; keep
  // the newest handler in a ref (updated after each render, never during it).
  const latestOnToken = useRef(onToken);
  useEffect(() => {
    latestOnToken.current = onToken;
  });

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || !host.current) return;
    const el = host.current;
    let cancelled = false;

    whenReady(() => {
      if (cancelled || widget.current !== null || !window.grecaptcha) return;
      // The widget lives inside a wrapper we own, so a re-render never fights
      // Google's DOM: React only touches `el`, Google only touches its child.
      const mount = document.createElement("div");
      el.replaceChildren(mount);
      widget.current = window.grecaptcha.render(mount, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (token) => latestOnToken.current(token),
        "expired-callback": () => latestOnToken.current(""),
        "error-callback": () => latestOnToken.current(""),
      });
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  useEffect(() => {
    if (resetKey > 0 && widget.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widget.current);
      latestOnToken.current("");
    }
  }, [resetKey]);

  if (!RECAPTCHA_SITE_KEY) return null;

  return <div ref={host} className="min-h-[78px]" />;
}
