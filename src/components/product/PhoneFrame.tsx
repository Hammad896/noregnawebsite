import type { ReactNode } from "react";

/**
 * An iPhone 15 Pro, drawn in CSS around a plain screenshot.
 *
 * Proportions follow the device rather than a generic rounded rectangle: a thin
 * titanium band, a thin black border to the glass, concentric corners (screen
 * radius 55 pt on a 393 pt screen, and each ring outward adds its own
 * thickness), the Dynamic Island at 126 x 37 pt, and the Action, volume and side
 * buttons at their real heights. The app screenshots are 393:852 captures, the
 * same aspect as the real screen, so nothing is letterboxed or cropped.
 *
 * Every measure is in container-width units (cqw), so the phone keeps its
 * proportions at any rendered width, from the small tilted phones in the /app
 * fan to the carousel, without a size prop.
 *
 * Keeping the device out of the image means a screenshot can be swapped
 * without re-exporting a mockup, and the frame casts a real shadow.
 */

const TITANIUM =
  "bg-[linear-gradient(135deg,#6a696e_0%,#2b2b2e_20%,#7c7b80_46%,#2b2b2e_72%,#55545a_100%)]";

const BUTTON = `absolute w-[1cqw] ${TITANIUM}`;

export function PhoneFrame({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`@container ${className}`}>
      <div
        className={`relative rounded-[16.5cqw] p-[1cqw] ${TITANIUM} shadow-[0_28px_56px_-22px_rgba(8,40,26,0.45),0_10px_22px_-12px_rgba(0,0,0,0.35)]`}
      >
        {/* Action button and volume on the left, side button on the right. */}
        <span aria-hidden className={`${BUTTON} -left-[0.8cqw] top-[17.5%] h-[4.2%] rounded-l-[0.6cqw]`} />
        <span aria-hidden className={`${BUTTON} -left-[0.8cqw] top-[25.5%] h-[7%] rounded-l-[0.6cqw]`} />
        <span aria-hidden className={`${BUTTON} -left-[0.8cqw] top-[34%] h-[7%] rounded-l-[0.6cqw]`} />
        <span aria-hidden className={`${BUTTON} -right-[0.8cqw] top-[28%] h-[10.5%] rounded-r-[0.6cqw]`} />

        <div className="rounded-[15.5cqw] bg-black p-[2.4cqw] shadow-[inset_0_0_0_0.35cqw_rgba(255,255,255,0.06)]">
          <div className="relative isolate overflow-hidden rounded-[13cqw] bg-[#e8f1e9]">
            {children}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[2.6cqw] z-10 h-[8.7cqw] w-[29.5cqw] -translate-x-1/2 rounded-full bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
