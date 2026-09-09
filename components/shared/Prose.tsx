import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Long-form text styling for the legal and policy pages. Deliberately narrow
 * measure — roughly 70 characters — for comfortable reading.
 */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[68ch] text-base leading-[1.75] text-muted",
        "[&_h2]:mt-14 [&_h2]:headline [&_h2]:text-subtitle [&_h2]:text-navy",
        "[&_h3]:mt-10 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-navy",
        "[&_p]:mt-5",
        "[&_ul]:mt-5 [&_ul]:space-y-2.5 [&_ul]:pl-0",
        "[&_li]:relative [&_li]:pl-6",
        "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.65em] [&_li]:before:size-1.5 [&_li]:before:rotate-45 [&_li]:before:bg-gold [&_li]:before:content-['']",
        "[&_a]:text-navy [&_a]:underline [&_a]:decoration-gold [&_a]:underline-offset-4 hover:[&_a]:text-gold-deep",
        "[&_strong]:font-semibold [&_strong]:text-navy",
        "[&_>_*:first-child]:mt-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
