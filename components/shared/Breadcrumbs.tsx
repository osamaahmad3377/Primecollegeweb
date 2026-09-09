import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * Breadcrumb trail. "Home" is prepended here so callers only describe their
 * own position, and the final crumb is marked aria-current rather than linked.
 */
export function Breadcrumbs({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  const crumbs = [{ name: "Home", path: "/" }, ...trail];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/70">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-3.5 text-white/40"
                />
              ) : null}
              {last ? (
                <span aria-current="page" className="text-gold-light">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="link-rule transition-colors hover:text-white"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
