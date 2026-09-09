import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
  /** Adds a screen-reader-only suffix so repeated links stay distinguishable. */
  srSuffix?: string;
}

/**
 * The site's standard forward link: label, animated rule, travelling arrow.
 * The arrow only moves on hover of the parent `group`.
 */
export function ArrowLink({
  href,
  children,
  tone = "light",
  className,
  srSuffix,
}: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em]",
        "transition-colors duration-300",
        tone === "dark"
          ? "text-gold-light hover:text-white"
          : "text-navy hover:text-gold-deep",
        className,
      )}
    >
      <span className="link-rule">{children}</span>
      {srSuffix ? <span className="sr-only">{srSuffix}</span> : null}
      <ArrowRight
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0"
        strokeWidth={1.5}
      />
    </Link>
  );
}
