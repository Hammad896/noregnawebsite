import { Icon } from "@/lib/icons";

/**
 * The icon badge Noregna already uses: a solid green circle with the glyph
 * knocked out in white. On the live site these sit on the "Utforsk Noregna"
 * cards, and the circle is what makes the set read as one family rather than a
 * pile of loose icons.
 *
 * `soft` is the quieter variant for places where a solid circle would be too
 * many competing dots, such as a list of eight modules.
 */
const SIZES = {
  sm: { box: "h-9 w-9", icon: 17 },
  md: { box: "h-11 w-11", icon: 20 },
  lg: { box: "h-14 w-14", icon: 25 },
} as const;

export function IconBadge({
  name,
  size = "md",
  tone = "solid",
  className = "",
}: {
  name: string;
  size?: keyof typeof SIZES;
  tone?: "solid" | "soft" | "onTint";
  className?: string;
}) {
  const s = SIZES[size];
  const tones = {
    solid: "bg-accent text-accent-ink",
    soft: "bg-accent-soft text-accent",
    /* For cards that are already tinted: invert so the badge still separates */
    onTint: "bg-surface text-accent",
  } as const;

  return (
    <span
      className={`inline-flex ${s.box} shrink-0 items-center justify-center rounded-full ${tones[tone]} ${className}`}
    >
      <Icon name={name} size={s.icon} />
    </span>
  );
}
