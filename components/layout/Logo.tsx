import Image from "next/image";
import Link from "next/link";
import { logoIntrinsic } from "@/lib/brand";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Resolved at build time in app/layout.tsx. Null means no logo.png. */
  src: string | null;
  tone?: "light" | "dark";
  /** Tailwind height classes controlling the rendered lockup size. */
  className?: string;
  /** Wraps the mark in a link to the homepage. */
  asLink?: boolean;
  priority?: boolean;
}

/**
 * The college's primary brand mark.
 *
 * When logo.png is present it is rendered untouched at a fixed height with
 * automatic width, so its proportions and colour are always preserved.
 */
export function Logo({
  src,
  tone = "dark",
  className,
  asLink = true,
  priority = false,
}: LogoProps) {
  const mark = src ? (
    <Image
      src={src}
      alt={`${site.name} logo`}
      width={logoIntrinsic.width}
      height={logoIntrinsic.height}
      priority={priority}
      className={cn("w-auto object-contain", className)}
      sizes="220px"
    />
  ) : (
    <Wordmark tone={tone} className={className} />
  );

  if (!asLink) return mark;

  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center rounded-sm"
      aria-label={`${site.name} — home`}
    >
      {mark}
    </Link>
  );
}

/**
 * Typographic fallback lockup. This is intentionally NOT an emblem: it makes
 * no attempt to imitate the college's crest. It is set entirely in the brand
 * typefaces so it reads as considered rather than as a missing asset.
 */
function Wordmark({
  tone,
  className,
}: {
  tone: "light" | "dark";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <span
      className={cn(
        "flex flex-col justify-center leading-none select-none",
        className,
      )}
    >
      <span
        className={cn(
          "font-display text-[1.375rem] font-semibold tracking-[0.14em] sm:text-[1.5rem]",
          light ? "text-white" : "text-navy",
        )}
      >
        PRIME
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "my-[0.3rem] h-px w-full",
          light ? "bg-gold-light" : "bg-gold",
        )}
      />
      <span
        className={cn(
          "text-[0.4rem] font-semibold uppercase tracking-[0.2em] sm:text-[0.46rem] sm:tracking-[0.23em]",
          light ? "text-white/80" : "text-muted",
        )}
      >
        International College Australia
      </span>
    </span>
  );
}
