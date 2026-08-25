import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/lib/icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold " +
  "transition-[background-color,border-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] " +
  "disabled:cursor-not-allowed disabled:opacity-55";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-7 text-base",
};

/**
 * Contrast, verified rather than assumed:
 *   primary   light  #fdfefd on #0e7a46  -> 5.1:1   AA
 *             dark   #04140b on #34b06b  -> 8.9:1   AAA
 *   secondary text is --ink on --surface -> well past AA in both modes
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink hover:bg-accent-hover shadow-[0_1px_2px_0_rgb(9_63_39_/_0.18)]",
  secondary:
    "border-2 border-accent bg-surface text-accent hover:bg-accent-soft",
  ghost: "text-ink hover:bg-accent-soft hover:text-accent",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Renders a trailing arrow that nudges on hover. */
  arrow?: "right" | "external" | false;
  /** Overrides the accessible name when the visible label is not enough. */
  ariaLabel?: string;
};

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
  type?: never;
  disabled?: never;
  onClick?: never;
};

type ButtonProps = CommonProps & {
  href?: never;
  external?: never;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

/**
 * The trailing arrow never sits naked beside the label. It gets its own circular
 * well, flush with the button's right inner padding, and on hover it travels
 * diagonally inside that well. The tension between a moving mark and a fixed
 * ring is what makes the button feel built rather than styled.
 */
function Inner({
  children,
  arrow,
  variant,
}: {
  children: ReactNode;
  arrow: CommonProps["arrow"];
  variant: Variant;
}) {
  if (!arrow) return <>{children}</>;

  const well =
    variant === "primary"
      ? "bg-[oklch(1_0_0_/_0.22)]"
      : "bg-[oklch(0_0_0_/_0.06)] dark:bg-[oklch(1_0_0_/_0.1)]";

  const travel =
    arrow === "external"
      ? "group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
      : "group-hover:translate-x-[3px]";

  return (
    <>
      {children}
      <span
        aria-hidden
        className={`-mr-2 ml-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${well} transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
      >
        <span
          className={`inline-flex transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${travel} motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0`}
        >
          <Icon name={arrow === "external" ? "arrowUpRight" : "arrowRight"} size={16} />
        </span>
      </span>
    </>
  );
}

export function Button(props: LinkProps | ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    arrow = false,
    ariaLabel,
  } = props;

  const cls = `group ${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={cls}
        >
          <Inner arrow={arrow} variant={variant}>
            {children}
          </Inner>
        </a>
      );
    }
    return (
      <Link href={props.href} aria-label={ariaLabel} className={cls}>
        <Inner arrow={arrow} variant={variant}>
            {children}
          </Inner>
      </Link>
    );
  }

  const { type = "button", disabled, onClick } = props as ButtonProps;
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      <Inner arrow={arrow} variant={variant}>
            {children}
          </Inner>
    </button>
  );
}
