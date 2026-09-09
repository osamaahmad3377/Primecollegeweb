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
 * When logo.png is present it is rendered untouched — same proportions, same
 * colour, per the brief ("do not recolour the logo"). But the supplied file
 * is flat artwork: its "PRIME" wordmark and crest linework are painted in a
 * navy essentially identical to this site's own navy (confirmed by sampling
 * the PNG — rgb(15,36,63) at full opacity against `--color-navy` #011E3E).
 * On a light background that's exactly right. Placed directly on a navy
 * footer or the navy mobile menu, that same artwork goes navy-on-navy and
 * most of it disappears.
 *
 * Recolouring the file is off the table, and no reversed/white variant was
 * supplied, so `tone="light"` (meaning: this instance sits on a dark surface)
 * gives the mark a small white plate behind it — the logo itself is still
 * untouched pixel-for-pixel, just placed on a background it can actually be
 * read against. `tone="dark"` (light surfaces, e.g. the header) renders it
 * plain, exactly as before.
 */
export function Logo({
  src,
  tone = "dark",
  className,
  asLink = true,
  priority = false,
}: LogoProps) {
  const onDarkSurface = tone === "light";

  const mark = src ? (
    onDarkSurface ? (
      // The plate carries the height class; the image simply fills it.
      <span
        className={cn(
          "inline-flex items-center bg-white p-1.5 sm:p-2",
          className,
        )}
      >
        <Image
          src={src}
          alt={`${site.name} logo`}
          width={logoIntrinsic.width}
          height={logoIntrinsic.height}
          priority={priority}
          className="h-full w-auto object-contain"
          sizes="220px"
        />
      </span>
    ) : (
      // No wrapper needed on a light surface — the height class goes
      // straight on the image, exactly as before this component changed.
      <Image
        src={src}
        alt={`${site.name} logo`}
        width={logoIntrinsic.width}
        height={logoIntrinsic.height}
        priority={priority}
        className={cn("w-auto object-contain", className)}
        sizes="220px"
      />
    )
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
