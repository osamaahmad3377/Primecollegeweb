import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

interface SectionIntroProps {
  /** id for the rendered title, so an enclosing Section can label itself. */
  id?: string;
  /** Small uppercase label opening the block. */
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /**
   * A short mono figure set opposite the eyebrow — a count of what follows
   * ("06" commitments). Omit where there is nothing true to count.
   */
  index?: string;
  /**
   * `h2` for a real section heading; `p` where the text is a statement rather
   * than a heading, so the document outline stays honest.
   */
  as?: "h2" | "p";
  /** `display` for the largest statements, `title` for section openings. */
  size?: "title" | "display";
  link?: { label: string; href: string };
  tone?: "light" | "dark";
  className?: string;
}

/**
 * The standard opening for a section: a full-width hairline, an eyebrow row
 * with an optional count set opposite it, then a large lowercase statement
 * with its supporting sentence held in a second column behind a gold rule.
 *
 * The hairline and the column rule are the point. Two columns of text alone
 * read as unstructured; the rules give the block an architecture and tie it to
 * the grid of whatever follows.
 */
export function SectionIntro({
  id,
  eyebrow,
  title,
  lead,
  index,
  as: Tag = "h2",
  size = "title",
  link,
  tone = "light",
  className,
}: SectionIntroProps) {
  const dark = tone === "dark";

  return (
    <div className={cn("w-full", className)}>
      <Reveal>
        <div
          className={cn(
            "border-t pt-5",
            dark ? "border-white/20" : "border-ink/15",
          )}
        >
          {(eyebrow || index) && (
            <div className="flex items-baseline justify-between gap-6">
              {eyebrow ? (
                <p className="flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block h-px w-8 shrink-0",
                      dark ? "bg-gold-light" : "bg-gold",
                    )}
                  />
                  <span
                    className={cn(
                      "eyebrow",
                      dark ? "text-gold-light" : "text-gold-deep",
                    )}
                  >
                    {eyebrow}
                  </span>
                </p>
              ) : (
                <span />
              )}

              {index ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-mono text-xs",
                    dark ? "text-white/45" : "text-ink/40",
                  )}
                >
                  {index}
                </span>
              ) : null}
            </div>
          )}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-x-12 gap-y-8 lg:mt-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Tag
            id={id}
            className={cn(
              "headline",
              size === "display" ? "text-display" : "text-title",
              dark ? "text-white" : "text-navy",
            )}
          >
            {title}
          </Tag>
        </Reveal>

        {lead || link ? (
          <Reveal
            delay={0.1}
            className={cn(
              "lg:col-span-5 lg:border-l lg:pl-8 xl:pl-10",
              dark ? "lg:border-white/20" : "lg:border-gold/70",
            )}
          >
            {lead ? (
              <p
                className={cn(
                  "max-w-[44ch] text-lead",
                  dark ? "text-navy-muted" : "text-muted",
                )}
              >
                {lead}
              </p>
            ) : null}

            {link ? (
              <Link
                href={link.href}
                className={cn(
                  "group mt-7 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                  dark
                    ? "text-gold-light hover:text-white"
                    : "text-navy hover:text-gold-deep",
                )}
              >
                <span className="link-rule">{link.label}</span>
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </Link>
            ) : null}
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
