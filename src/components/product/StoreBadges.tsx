import Image from "next/image";

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
      <a href={appStore} target="_blank" rel="noopener noreferrer" className="press inline-flex rounded-[10px]">
        <Image src="/brand/app-store-badge.avif" alt={appleLabel} width={160} height={54} className="h-[46px] w-auto" />
      </a>
      <a href={playStore} target="_blank" rel="noopener noreferrer" className="press inline-flex rounded-[10px]">
        <Image src="/brand/google-play-badge.avif" alt={googleLabel} width={180} height={54} className="h-[46px] w-auto" />
      </a>
    </div>
  );
}
