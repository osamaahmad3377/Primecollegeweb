import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A deliberate, visible marker that a page carries placeholder content.
 *
 * This is not decorative. Program details, dates, fees and requirements on
 * this site have not been verified, and the notice must remain until the
 * college's official content replaces them. Delete the component usage —
 * not the placeholders — once real content is in place.
 */
export function ContentNotice({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex gap-3.5 border-l-2 border-gold py-3 pl-4 pr-4 sm:pl-5",
        dark ? "bg-white/[0.04]" : "bg-cream",
        className,
      )}
    >
      <Info
        aria-hidden="true"
        strokeWidth={1.5}
        className={cn("mt-0.5 size-4 shrink-0", dark ? "text-gold-light" : "text-gold-deep")}
      />
      <p className={cn("text-sm leading-relaxed", dark ? "text-navy-muted" : "text-muted")}>
        {children}
      </p>
    </div>
  );
}
