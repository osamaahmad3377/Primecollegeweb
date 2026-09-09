"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export interface SectionNavItem {
  id: string;
  label: string;
}

/**
 * A sticky in-page jump bar for long pages.
 *
 * Sits directly beneath the header and tracks which section is in view, so a
 * visitor always knows where they are in a process as long as admissions.
 * Marked as a navigation landmark and reflects the current section with
 * aria-current, not colour alone.
 */
export function SectionNav({ items }: { items: SectionNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        /* Choose the entry nearest the top of the reading area. */
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      data-print-hide
      className="sticky top-[var(--header-h)] z-40 border-b border-ink/10 bg-white/97 backdrop-blur-lg supports-[backdrop-filter]:bg-white/92"
    >
      <Container>
        {/* Horizontal scroll on narrow screens rather than wrapping to two
            rows, which would double the sticky bar's height. */}
        <ul className="-mx-5 flex gap-1 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const current = active === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "relative inline-flex items-center gap-2 whitespace-nowrap px-3 py-4 text-[0.8125rem] font-medium transition-colors duration-300",
                    current ? "text-navy" : "text-muted hover:text-navy",
                  )}
                >
                  {/* A gold marker as well as the colour shift, so the current
                      section is never signalled by colour alone. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-1.5 rotate-45 transition-all duration-300",
                      current ? "bg-gold opacity-100" : "bg-transparent opacity-0",
                    )}
                  />
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 bottom-0 h-px origin-left bg-gold transition-transform duration-300",
                      current ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
