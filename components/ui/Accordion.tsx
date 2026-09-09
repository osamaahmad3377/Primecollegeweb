"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/lib/types";

/**
 * FAQ list built on native buttons with aria-expanded and a controlled panel.
 *
 * Uses a grid-rows transition rather than max-height so the panel animates to
 * its true content height, and collapses instantly under reduced motion.
 */
export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="w-full">
      {items.map((item, index) => {
        const expanded = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question} className="border-t border-ink/12 last:border-b">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="headline text-[1.3rem] leading-snug text-navy sm:text-[1.45rem]">
                  {item.question}
                </span>
                <Plus
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={`mt-1 size-5 shrink-0 text-gold-deep transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    expanded ? "rotate-45" : "rotate-0"
                  }`}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="grid grid-rows-[1fr] pb-7"
            >
              <p className="max-w-[68ch] overflow-hidden text-base leading-relaxed text-muted">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
