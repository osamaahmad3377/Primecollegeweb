import { cn } from "@/lib/utils";

/**
 * A short gold rule used to open a section. Purely decorative, so it is
 * hidden from assistive technology.
 */
export function GoldLine({
  className,
  width = "w-14",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("block h-px bg-gold", width, className)}
    />
  );
}

/**
 * A small rotated square drawn from the emblem's geometry. Used sparingly as
 * a separator between editorial elements.
 */
export function GoldDiamond({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block size-1.5 rotate-45 bg-gold", className)}
    />
  );
}

/**
 * The shield arch derived from the emblem: a squared frame whose top corners
 * are drawn in. Used as a subtle framing device for portrait media.
 */
export function ShieldFrame({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 120"
      preserveAspectRatio="none"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M0 24C0 10.745 10.745 0 24 0h52c13.255 0 24 10.745 24 24v96H0V24Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
