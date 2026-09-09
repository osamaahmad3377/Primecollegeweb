import Image from "next/image";
import Link from "next/link";
import { logoIntrinsic, logoLightIntrinsic } from "@/lib/brand";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Resolved at build time in app/layout.tsx. Null means no logo.png. */
  src: string | null;
  /**
   * Resolved at build time. A reversed variant supplied for placement on dark
   * surfaces (the footer, the mobile menu) — optional, since the site must
   * still degrade gracefully if it's ever removed.
   */
  lightSrc?: string | null;
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
 * Neither file is ever recoloured, redrawn or re-proportioned — per the
 * brief. `tone="dark"` (light surfaces, e.g. the header) always renders
 * `src` plain.
 *
 * `tone="light"` (this instance sits on a dark surface) prefers `lightSrc` —
 * the supplied reversed variant — rendered plain, exactly like the primary
 * mark on a light surface. Its "PRIME" wordmark and linework are painted
 * white/gold rather than the primary file's navy, so it reads correctly
 * against navy without needing anything else done to it.
 *
 * If `lightSrc` is absent, this falls back to placing the primary `src` on a
 * small white plate instead: the primary logo.png's wordmark and crest
 * linework are painted in a navy essentially identical to this site's own
 * navy (confirmed by sampling the PNG — rgb(15,36,63) at full opacity against
 * `--color-navy` #011E3E), so placed directly on a navy field it goes
 * navy-on-navy and mostly disappears. The plate keeps the file untouched
 * pixel-for-pixel while making it legible — a safety net, not the primary
 * path, now that a proper reversed asset exists.
 */
export function Logo({
  src,
  lightSrc,
  tone = "dark",
  className,
  asLink = true,
  priority = false,
}: LogoProps) {
  const onDarkSurface = tone === "light";

  let mark;
  if (onDarkSurface && lightSrc) {
    mark = (
      <Image
        src={lightSrc}
        alt={`${site.name} logo`}
        width={logoLightIntrinsic.width}
        height={logoLightIntrinsic.height}
        priority={priority}
        className={cn("w-auto object-contain", className)}
        sizes="220px"
      />
    );
  } else if (onDarkSurface && src) {
    // Fallback: no reversed variant supplied. The plate carries the height
    // class; the image simply fills it.
    mark = (
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
    );
  } else if (src) {
    mark = (
      <Image
        src={src}
        alt={`${site.name} logo`}
        width={logoIntrinsic.width}
        height={logoIntrinsic.height}
        priority={priority}
        className={cn("w-auto object-contain", className)}
        sizes="220px"
      />
    );
  } else {
    mark = <Wordmark tone={tone} className={className} />;
  }

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
