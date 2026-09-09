import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** `wide` relaxes the measure for full-bleed editorial rows. */
  size?: "default" | "wide" | "narrow";
}

/**
 * The single horizontal rhythm of the site.
 * Padding: 20px mobile → 40px tablet → 64px laptop → 96px desktop.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-10 lg:px-16 xl:px-24",
        size === "default" && "max-w-[80rem]",
        size === "wide" && "max-w-[96rem]",
        size === "narrow" && "max-w-[48rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
