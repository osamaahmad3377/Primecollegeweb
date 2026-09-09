import { GoldDiamond } from "@/components/ui/GoldLine";
import { cn } from "@/lib/utils";

/**
 * Shown wherever a collection renders zero items. Keeps the page composed
 * rather than collapsing to an empty grid.
 */
export function EmptyState({
  title,
  description,
  tone = "light",
  className,
}: {
  title: string;
  description: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col items-center border px-6 py-20 text-center sm:py-24",
        dark ? "rule-dark" : "rule-light",
        className,
      )}
    >
      <GoldDiamond />
      <p
        className={cn(
          "mt-6 headline text-subtitle",
          dark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "mt-3 max-w-[42ch] text-sm leading-relaxed",
          dark ? "text-navy-muted" : "text-muted",
        )}
      >
        {description}
      </p>
    </div>
  );
}
