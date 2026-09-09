import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GoldLine } from "@/components/ui/GoldLine";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  /**
   * id applied to the rendered heading element. Required whenever the
   * enclosing <Section> uses aria-labelledby, or that reference dangles and
   * the section is left without an accessible name.
   */
  id?: string;
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  title: ReactNode;
  /** Supporting paragraph beneath the heading. */
  lead?: ReactNode;
  /** Which heading level to render — keeps the document outline correct. */
  as?: "h1" | "h2" | "h3";
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  size?: "display" | "title";
}

/**
 * The standard editorial section opening: gold rule, tracked-out eyebrow,
 * serif headline, optional lead paragraph.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  tone = "light",
  align = "left",
  className,
  size = "title",
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <div
            className={cn(
              "flex items-center gap-3.5",
              align === "center" && "justify-center",
            )}
          >
            <GoldLine width="w-8" className={dark ? "bg-gold-light" : ""} />
            <p
              className={cn(
                "eyebrow",
                dark ? "text-gold-light" : "text-gold-deep",
              )}
            >
              {eyebrow}
            </p>
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={eyebrow ? 0.08 : 0}>
        <Tag
          id={id}
          className={cn(
            "headline",
            size === "display" ? "text-display" : "text-title",
            eyebrow ? "mt-5" : "",
            dark ? "text-white" : "text-navy",
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {lead ? (
        <Reveal delay={0.14}>
          <div
            className={cn(
              "mt-6 max-w-[46ch] text-lead",
              align === "center" && "mx-auto",
              dark ? "text-navy-muted" : "text-muted",
            )}
          >
            {lead}
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
