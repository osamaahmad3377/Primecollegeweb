"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Mail, Menu, Phone } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { primaryNav, utilityNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Distance scrolled before the bar becomes opaque and the utility strip folds. */
const SOLID_AT = 24;
/** Grace period so the panel survives the gap between trigger and panel. */
const CLOSE_DELAY = 140;

export function Header({ logoSrc }: { logoSrc: string | null }) {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const pathname = usePathname();
  const triggerId = useId();
  const panelBase = useId();
  const closeTimer = useRef<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  /* Set when Escape closes a panel. Without this the cursor — still sitting on
     the trigger — re-fires mouseenter as the panel unmounts and reopens it. */
  const suppressedKey = useRef<string | null>(null);

  /* Thin gold reading-progress line along the bottom of the bar. */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMobileOpen(false);
    setOpenKey(null);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setSolid(window.scrollY > SOLID_AT);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Escape closes an open panel and returns focus to its trigger. */
  useEffect(() => {
    if (!openKey) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      suppressedKey.current = openKey;
      document.getElementById(`${panelBase}-trigger-${openKey}`)?.focus();
      setOpenKey(null);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openKey, panelBase]);

  /* A click anywhere outside the nav closes the panel. */
  useEffect(() => {
    if (!openKey) return;
    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenKey(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openKey]);

  const clearClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = window.setTimeout(() => setOpenKey(null), CLOSE_DELAY);
  };

  useEffect(() => clearClose, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  /* Before the first scroll the bar sits over a dark hero. An open panel is
     white, so the bar must go solid with it. */
  /*
   * The header used to start transparent over a dark full-bleed hero. The hero
   * is now split colour blocks whose top-left half is a photograph of
   * unpredictable brightness — white nav over a pale photo was unreadable — so
   * the bar is always opaque. `overlay` is kept as a named constant rather than
   * deleted throughout, so a future dark-banner page can switch it back on.
   */
  const overlay = false;

  return (
    <>
      <header
        data-print-hide
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-[background-color,box-shadow,border-color] duration-500",
          "ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          overlay && "bg-transparent",
          !overlay && openKey && "bg-white shadow-[0_1px_28px_-14px_rgba(1,30,62,0.4)]",
          !overlay &&
            !openKey &&
            "bg-white/97 shadow-[0_1px_28px_-14px_rgba(1,30,62,0.4)] backdrop-blur-lg supports-[backdrop-filter]:bg-white/92",
        )}
        onMouseLeave={scheduleClose}
      >
        {/* ---- Utility strip: a solid navy band above the white nav bar.
             It carries its own background rather than borrowing the header's,
             so its contrast no longer depends on what sits behind the header
             (white text here was previously white-on-white once the bar became
             permanently opaque). White on navy is 16.7:1. ------------------ */}
        <div
          className={cn(
            "hidden overflow-hidden bg-navy transition-[height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:block",
            solid ? "h-0 opacity-0" : "h-[var(--utility-h)] opacity-100",
          )}
        >
          <div className="mx-auto flex h-[var(--utility-h)] w-full max-w-[96rem] items-center justify-between px-5 sm:px-10 lg:px-16 xl:px-20">
            <ul className="flex items-center gap-6 font-mono text-[0.75rem] text-white/80">
              <li className="flex items-center gap-2">
                <Phone
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-3.5 text-gold-light"
                />
                {site.contact.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-3.5 text-gold-light"
                />
                {site.contact.email}
              </li>
            </ul>

            <nav aria-label="Utility">
              <ul className="flex items-center gap-6 text-[0.75rem]">
                {utilityNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="link-rule text-white/80 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* ---- Main bar --------------------------------------------------- */}
        <div
          ref={navRef}
          className={cn(
            "border-b transition-colors duration-500 motion-reduce:transition-none",
            overlay ? "border-white/15" : "border-ink/10",
          )}
        >
          <div className="mx-auto flex h-[var(--header-h)] w-full max-w-[96rem] items-center gap-4 px-5 sm:px-10 lg:px-16 xl:px-20">
            <Logo
              src={logoSrc}
              tone={overlay ? "light" : "dark"}
              priority
              className={cn(
                "transition-[height] duration-500 motion-reduce:transition-none",
                solid ? "h-10 lg:h-12" : "h-14 lg:h-16",
              )}
            />

            <nav aria-label="Primary" className="ml-auto hidden items-center lg:flex">
              <ul className="flex items-center">
                {primaryNav.map((item) => {
                  const active = pathname.startsWith(item.href.split("?")[0]);
                  const panelId = `${panelBase}-panel-${item.key}`;
                  const isOpen = openKey === item.key;

                  const shared = cn(
                    "relative inline-flex items-center gap-1 px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-300 xl:px-3.5",
                    overlay
                      ? "text-white/85 hover:text-white"
                      : "text-navy/75 hover:text-navy",
                    (active || isOpen) && (overlay ? "text-white" : "text-navy"),
                  );

                  const indicator = (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 bottom-0.5 h-px origin-left transition-transform duration-300 xl:inset-x-3.5",
                        overlay ? "bg-gold-light" : "bg-gold",
                        active || isOpen ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  );

                  return (
                    <li
                      key={item.key}
                      onMouseEnter={() => {
                        if (suppressedKey.current === item.key) return;
                        clearClose();
                        setOpenKey(item.panel ? item.key : null);
                      }}
                      onMouseLeave={() => {
                        if (suppressedKey.current === item.key) {
                          suppressedKey.current = null;
                        }
                      }}
                    >
                      {item.panel ? (
                        <button
                          type="button"
                          id={`${panelBase}-trigger-${item.key}`}
                          aria-expanded={isOpen}
                          aria-controls={isOpen ? panelId : undefined}
                          onClick={() => {
                            suppressedKey.current = null;
                            setOpenKey(isOpen ? null : item.key);
                          }}
                          className={shared}
                        >
                          {item.label}
                          <ChevronDown
                            aria-hidden="true"
                            strokeWidth={1.75}
                            className={cn(
                              "size-3.5 transition-transform duration-300 motion-reduce:transition-none",
                              isOpen && "rotate-180",
                            )}
                          />
                          {indicator}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={shared}
                        >
                          {item.label}
                          {indicator}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="ml-auto hidden items-center gap-3 lg:ml-6 lg:flex">
              <Button
                href="/contact"
                size="sm"
                variant={overlay ? "secondaryLight" : "secondary"}
              >
                Enquire
              </Button>
              <Button href="/admissions#apply" size="sm">
                Apply Now
              </Button>
            </div>

            <button
              type="button"
              id={triggerId}
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls={mobileOpen ? "mobile-menu" : undefined}
              className={cn(
                "-mr-2 ml-auto inline-flex size-11 items-center justify-center rounded-sm transition-colors lg:hidden",
                overlay ? "text-white" : "text-navy",
              )}
            >
              <Menu aria-hidden="true" strokeWidth={1.5} className="size-6" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>

          {/* Reading progress — a hairline that only reads once you are moving. */}
          <motion.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className={cn(
              "absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-opacity duration-500",
              solid ? "opacity-100" : "opacity-0",
            )}
          />

          {primaryNav
            .filter((item) => item.panel)
            .map((item) => (
              <MegaMenu
                key={item.key}
                item={item}
                open={openKey === item.key}
                panelId={`${panelBase}-panel-${item.key}`}
                onClose={() => setOpenKey(null)}
              />
            ))}
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={closeMobile}
        logoSrc={logoSrc}
        triggerId={triggerId}
      />
    </>
  );
}
