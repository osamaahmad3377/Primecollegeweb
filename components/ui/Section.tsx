import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "white" | "cream" | "mist" | "navy" | "navyDark";

const tones: Record<Tone, string> = {
  white: "bg-white text-ink on-light",
  cream: "bg-cream text-ink on-light",
  mist: "bg-mist text-ink on-light",
  navy: "bg-navy text-white",
  navyDark: "bg-navy-dark text-white",
};

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  /** Vertical rhythm. `tight` for supporting bands, `loose` for statements. */
  spacing?: "tight" | "default" | "loose" | "none";
  "aria-labelledby"?: string;
  as?: "section" | "div";
}

/**
 * Every band on the site is a Section. Centralising the vertical rhythm here
 * is what produces the consistent alternating cadence down each page.
 */
export function Section({
  children,
  tone = "white",
  className,
  id,
  spacing = "default",
  as: Tag = "section",
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative",
        tones[tone],
        spacing === "tight" && "py-16 sm:py-20 lg:py-24",
        spacing === "default" && "py-20 sm:py-28 lg:py-36",
        spacing === "loose" && "py-24 sm:py-32 lg:py-44",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
