"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  CalendarDays,
  CircleQuestionMark,
  ClipboardList,
  Compass,
  Cpu,
  HeartHandshake,
  HeartPulse,
  Landmark,
  ListChecks,
  Newspaper,
  Send,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { PrimaryNavItem } from "@/data/navigation";

/** Maps the icon names in data/navigation.ts to their components. */
const icons: Record<string, LucideIcon> = {
  Landmark,
  Award,
  Building2,
  Newspaper,
  Briefcase,
  Cpu,
  HeartPulse,
  HeartHandshake,
  UtensilsCrossed,
  Compass,
  ClipboardList,
  ListChecks,
  CalendarDays,
  Send,
  CircleQuestionMark,
};

const EASE = [0.22, 1, 0.36, 1] as const;

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.04 } },
};

const row = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
};

/**
 * The desktop dropdown panel.
 *
 * Rendered inside the header's positioning context and anchored to the full
 * bar width, so panels line up with the site grid rather than floating under
 * their trigger. A backdrop scrim dims the page behind it — the panel is
 * meant to feel like the thing you're looking at, not a layer floating over
 * business as usual.
 */
export function MegaMenu({
  item,
  open,
  panelId,
  onClose,
  currentPath,
}: {
  item: PrimaryNavItem;
  open: boolean;
  panelId: string;
  onClose: () => void;
  /** Marks the matching link as the current page — never by colour alone. */
  currentPath: string;
}) {
  if (!item.panel) return null;
  const { heading, links, feature } = item.panel;

  return (
    <AnimatePresence>
      {open ? (
        <>
          {/*
            Backdrop — separates the panel from the page beneath it rather
            than leaving it floating over business as usual.

            Positioned with `top: 100%` of the header's own (fixed) box
            rather than a `--header-h`/`--utility-h` calc: the header's real
            height changes between its "top of page" and scrolled/"solid"
            states (the utility strip collapses to 0 height without
            --utility-h itself changing), and a calc here previously left a
            ~40px gap of undimmed page between the header and the scrim
            whenever the menu opened after scrolling. A percentage against
            the actual box has no such gap, in either state, with no JS
            needed to track it.

            z-10, below the panel's z-20 — inverted from a first pass that
            had the backdrop on top, dimming the panel's own content along
            with the page. And it needs its own onClick: it is a DOM
            descendant of navRef (rendered inside the same "Main bar" div),
            so Header.tsx's outside-pointerdown-closes-the-menu handler
            (which checks `!navRef.current?.contains(target)`) never fires
            for a click here — without this handler the scrim would just
            sit there inertly on click.
          */}
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute inset-x-0 top-full z-10 h-[100vh] cursor-default bg-navy-dark/25 backdrop-blur-[2px]"
          />

          <motion.div
            id={panelId}
            key={panelId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="absolute inset-x-0 top-full z-20 origin-top border-b border-ink/10 bg-white shadow-[0_32px_64px_-28px_rgba(1,30,62,0.4)]"
          >
            {/* A hairline gold rule at the very top ties the panel visually
                back to the active tab's underline in the bar above it. */}
            <span aria-hidden="true" className="block h-px bg-gold" />

            <div className="mx-auto grid w-full max-w-[96rem] gap-10 px-5 py-10 sm:px-10 lg:grid-cols-12 lg:gap-14 lg:px-16 xl:px-20">
              <div className={feature ? "lg:col-span-8" : "lg:col-span-12"}>
                <p className="eyebrow text-gold-deep">{heading}</p>

                <motion.ul
                  variants={list}
                  initial="hidden"
                  animate="visible"
                  className="mt-7 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {links.map((link) => {
                    const Icon = icons[link.icon] ?? Compass;
                    /*
                     * Exact match only, and only for links with no hash.
                     * Comparing against the base path (stripping "#...")
                     * marked every same-page anchor as "current" at once —
                     * on /admissions, all five links share that base path,
                     * so all five lit up together, which said nothing useful
                     * about where the visitor actually is. Without a
                     * scroll-spy there's no reliable way to know which
                     * anchored section is in view, so an anchor link simply
                     * never claims to be "current" — better to correctly
                     * mark zero items than to incorrectly mark five.
                     */
                    const current =
                      !link.href.includes("#") && currentPath === link.href;

                    return (
                      <motion.li key={link.href} variants={row}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          aria-current={current ? "page" : undefined}
                          className="group/item flex items-start gap-3.5 rounded-sm p-3 transition-colors duration-200 hover:bg-cream"
                        >
                          <span
                            className={`mt-0.5 flex size-9 shrink-0 items-center justify-center border transition-colors duration-200 ${
                              current
                                ? "border-gold bg-navy"
                                : "border-ink/12 bg-mist group-hover/item:border-gold/60 group-hover/item:bg-white"
                            }`}
                          >
                            <Icon
                              aria-hidden="true"
                              strokeWidth={1.5}
                              className={`size-4 transition-colors duration-200 ${
                                current
                                  ? "text-gold-light"
                                  : "text-navy/70 group-hover/item:text-gold-deep"
                              }`}
                            />
                          </span>

                          <span className="min-w-0 pt-0.5">
                            <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-navy transition-colors group-hover/item:text-gold-deep">
                              {link.label}
                              {current ? (
                                <span
                                  aria-hidden="true"
                                  className="size-1.5 shrink-0 rotate-45 bg-gold"
                                />
                              ) : (
                                <ArrowRight
                                  aria-hidden="true"
                                  strokeWidth={1.75}
                                  className="size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100 motion-reduce:transition-none"
                                />
                              )}
                            </span>
                            {link.description ? (
                              <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">
                                {link.description}
                              </span>
                            ) : null}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>

              {feature ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1, ease: EASE }}
                  className="lg:col-span-4"
                >
                  {/* A navy field rather than a cream one — the same
                      "considered card" language as the Why Prime grid, and
                      enough contrast to read as the panel's one clear next
                      step, not a fourth link in the list. */}
                  <div className="relative h-full overflow-hidden bg-navy p-7">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-8 -top-8 size-32 rotate-45 border border-white/10"
                    />
                    <p className="eyebrow relative text-gold-light">
                      {feature.eyebrow}
                    </p>
                    <p className="relative mt-4 headline text-[1.5rem] leading-snug text-white">
                      {feature.title}
                    </p>
                    <p className="relative mt-3 text-sm leading-relaxed text-navy-muted">
                      {feature.body}
                    </p>
                    <Link
                      href={feature.href}
                      onClick={onClose}
                      className="group/cta relative mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-light transition-colors hover:text-white"
                    >
                      <span className="link-rule">{feature.cta}</span>
                      <ArrowRight
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none"
                      />
                    </Link>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
