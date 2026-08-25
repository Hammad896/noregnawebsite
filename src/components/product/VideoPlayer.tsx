"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Play } from "@phosphor-icons/react/dist/ssr";

/**
 * Click-to-play facade for the product video.
 *
 * The file is 10.5 MB. The original markup autoplays it on load, which means
 * every visitor pays that download before deciding they want it, and mobile
 * visitors pay it on their data plan. So nothing is fetched until someone asks:
 * the poster is a normal optimised image, `preload="none"` keeps the browser
 * from touching the video, and the first click loads and plays it with controls.
 *
 * Once playing it behaves like a real player rather than looping wallpaper, so
 * a viewer can pause, scrub and mute.
 */
export function VideoPlayer({
  src,
  poster,
  label,
  playLabel,
}: {
  src: string;
  poster: string;
  label: string;
  playLabel: string;
}) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  function start() {
    setStarted(true);
    // The element exists already; kick it once React has flipped `controls`.
    requestAnimationFrame(() => void ref.current?.play());
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-sunken shadow-[var(--shadow-lg)]">
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={started}
        aria-label={label}
        className="block h-auto w-full"
      />

      {!started ? (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 flex items-center justify-center bg-[oklch(0.252_0.0592_151.76_/_0.28)] transition-colors duration-300 hover:bg-[oklch(0.252_0.0592_151.76_/_0.4)]"
        >
          <span className="sr-only">{playLabel}</span>
          <span className="press flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-ink shadow-[var(--shadow-lg)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <Play size={30} weight="fill" className="ml-1" />
          </span>
        </button>
      ) : null}
    </div>
  );
}

/** The two official store badges, sized to match and properly labelled. */
export function StoreBadges({
  appStore,
  playStore,
  appleLabel,
  googleLabel,
  className = "",
}: {
  appStore: string;
  playStore: string;
  appleLabel: string;
  googleLabel: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={appStore}
        target="_blank"
        rel="noopener noreferrer"
        className="press inline-flex rounded-[10px]"
      >
        <Image
          src="/brand/app-store-badge.avif"
          alt={appleLabel}
          width={160}
          height={54}
          className="h-[46px] w-auto"
        />
      </a>
      <a
        href={playStore}
        target="_blank"
        rel="noopener noreferrer"
        className="press inline-flex rounded-[10px]"
      >
        <Image
          src="/brand/google-play-badge.avif"
          alt={googleLabel}
          width={180}
          height={54}
          className="h-[46px] w-auto"
        />
      </a>
    </div>
  );
}
