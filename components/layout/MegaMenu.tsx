"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PrimaryNavItem } from "@/data/navigation";

/**
 * The desktop dropdown panel.
 *
 * Rendered inside the header's positioning context and anchored to the full
 * bar width, so panels line up with the site grid rather than floating under
 * their trigger.
 */
export function MegaMenu({
  item,
  open,
  panelId,
  onClose,
}: {
  item: PrimaryNavItem;
  open: boolean;
  panelId: string;
  onClose: () => void;
}) {
  if (!item.panel) return null;
  const { heading, links, feature } = item.panel;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={panelId}
          key={panelId}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-full origin-top border-b border-ink/10 bg-white shadow-[0_28px_60px_-30px_rgba(1,30,62,0.35)]"
        >
          <div className="mx-auto grid w-full max-w-[96rem] gap-10 px-5 py-10 sm:px-10 lg:grid-cols-12 lg:gap-14 lg:px-16 xl:px-20">
            <div className={feature ? "lg:col-span-8" : "lg:col-span-12"}>
              <p className="eyebrow text-gold-deep">{heading}</p>

              <ul className="mt-7 grid gap-x-10 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group/item block rounded-sm border-b border-ink/8 py-3.5 transition-colors last:border-0"
                    >
                      <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-navy transition-colors group-hover/item:text-gold-deep">
                        {link.label}
                        <ArrowRight
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100 motion-reduce:transition-none"
                        />
                      </span>
                      {link.description ? (
                        <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">
                          {link.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {feature ? (
              <div className="lg:col-span-4">
                <div className="h-full rounded-card border border-ink/10 bg-cream p-7">
                  <p className="eyebrow text-gold-deep">{feature.eyebrow}</p>
                  <p className="mt-4 headline text-[1.5rem] leading-snug text-navy">
                    {feature.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {feature.body}
                  </p>
                  <Link
                    href={feature.href}
                    onClick={onClose}
                    className="group/cta mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:text-gold-deep"
                  >
                    <span className="link-rule">{feature.cta}</span>
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none"
                    />
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
