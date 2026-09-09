import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MonitorSmartphone } from "lucide-react";
import type { Program } from "@/lib/types";

/**
 * The single program card used on the homepage, the programs listing and in
 * related-program rails.
 *
 * The whole card is one link (via a stretched overlay) so the hit target is
 * large on touch devices, while the accessible name stays on the title alone.
 */
export function ProgramCard({
  program,
  priority = false,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 45vw, 100vw",
}: {
  program: Program;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="card-lift media-zoom relative aspect-[3/2] overflow-hidden rounded-media bg-mist">
        <Image
          src={program.image.src}
          alt={program.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {/* Gold rule that draws in across the base of the image on hover. */}
        <span
          aria-hidden="true"
          className="rule-draw absolute inset-x-0 bottom-0 h-0.5 bg-gold"
        />
      </div>

      <p className="mt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-gold-deep">
        {program.category}
      </p>

      <h3 className="mt-3 headline text-[1.5rem] leading-snug text-navy">
        <Link href={`/programs/${program.slug}`} className="before:absolute before:inset-0 before:content-['']">
          {program.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {program.summary}
      </p>

      {/* Duration and mode read as a spec sheet — mono numerals/letters give
          them the precision of a data field rather than ordinary prose. */}
      <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-5 font-mono text-xs text-muted">
        <div className="flex items-center gap-2">
          <Clock aria-hidden="true" strokeWidth={1.5} className="size-3.5 text-gold-deep" />
          <dt className="sr-only">Duration</dt>
          <dd>{program.duration}</dd>
        </div>
        <div className="flex items-center gap-2">
          <MonitorSmartphone aria-hidden="true" strokeWidth={1.5} className="size-3.5 text-gold-deep" />
          <dt className="sr-only">Study mode</dt>
          <dd>{program.mode}</dd>
        </div>
      </dl>

      <p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors group-hover:text-gold-deep">
        Learn more
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.5}
          className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
      </p>
    </article>
  );
}
