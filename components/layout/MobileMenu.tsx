"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Mail, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { GoldDiamond } from "@/components/ui/GoldLine";
import { mobileNav } from "@/data/navigation";
import { site } from "@/data/site";
import { pad } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  logoSrc: string | null;
  /** id of the toggle button, so focus can be returned to it on close. */
  triggerId: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MobileMenu({
  open,
  onClose,
  logoSrc,
  triggerId,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);

  /* Lock background scrolling without the layout shift a plain overflow
     hidden causes on desktop. */
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  /* Escape to close, Tab cycles within the panel. */
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  /* Move focus into the panel on open, and return it to the trigger on close.
     `wasOpen` guards the close branch so that the very first render — when the
     menu has never been opened — does not pull focus to the hamburger button. */
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const id = window.setTimeout(() => {
        panelRef.current
          ?.querySelector<HTMLElement>(FOCUSABLE)
          ?.focus({ preventScroll: true });
      }, 60);
      return () => window.clearTimeout(id);
    }

    if (wasOpen.current) {
      wasOpen.current = false;
      setExpanded(null);
      document.getElementById(triggerId)?.focus({ preventScroll: true });
    }
  }, [open, triggerId]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[70] flex flex-col bg-navy-dark lg:hidden"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-white/10 px-5 sm:px-10">
            <Logo src={logoSrc} tone="light" className="h-9" asLink={false} />
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm text-white transition-colors hover:text-gold-light"
            >
              <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="flex-1 overflow-y-auto overscroll-contain px-5 py-7 sm:px-10"
          >
            <ul className="flex flex-col">
              {mobileNav.map((item, index) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const hasChildren = Boolean(item.children?.length);
                const isExpanded = expanded === item.href;

                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.06 + index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-white/10"
                  >
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className="group flex flex-1 items-baseline gap-4 py-4"
                      >
                        <span className="w-6 shrink-0 pt-1 text-[0.625rem] font-medium tabular-nums tracking-[0.12em] text-gold-light/70">
                          {pad(index + 1)}
                        </span>
                        <span
                          className={`headline-cased text-[1.6rem] leading-tight transition-colors ${
                            active
                              ? "text-gold-light"
                              : "text-white group-hover:text-gold-light"
                          }`}
                        >
                          {item.label}
                        </span>
                        {active ? (
                          <GoldDiamond className="mt-3 shrink-0 bg-gold-light" />
                        ) : null}
                      </Link>

                      {hasChildren ? (
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          onClick={() =>
                            setExpanded(isExpanded ? null : item.href)
                          }
                          className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-gold-light"
                        >
                          <ChevronDown
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className={`size-5 transition-transform duration-300 motion-reduce:transition-none ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                          <span className="sr-only">
                            {isExpanded ? "Collapse" : "Expand"} {item.label}
                          </span>
                        </button>
                      ) : null}
                    </div>

                    {hasChildren && isExpanded ? (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden pb-4 pl-10"
                      >
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="flex items-center gap-3 py-2.5 text-[0.9375rem] text-navy-muted transition-colors hover:text-white"
                            >
                              <span
                                aria-hidden="true"
                                className="block h-px w-4 bg-gold/60"
                              />
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    ) : null}
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <Button href="/admissions#apply" onClick={onClose} block size="lg">
                Apply Now
              </Button>
              <Button
                href="/contact"
                onClick={onClose}
                variant="secondaryLight"
                block
                size="lg"
              >
                Enquire
              </Button>
            </div>

            <div className="mt-9 border-t border-white/10 pt-6">
              <p className="eyebrow text-gold-light">Contact</p>
              <address className="mt-4 space-y-2.5 text-sm not-italic text-navy-muted">
                <p className="flex items-center gap-3">
                  <Phone aria-hidden="true" strokeWidth={1.5} className="size-4 shrink-0 text-gold-light" />
                  {site.contact.phone}
                </p>
                <p className="flex items-center gap-3">
                  <Mail aria-hidden="true" strokeWidth={1.5} className="size-4 shrink-0 text-gold-light" />
                  <span className="break-words">{site.contact.email}</span>
                </p>
              </address>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
