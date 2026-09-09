"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

/**
 * A persistent conversion bar for small screens.
 *
 * On mobile the header's Apply button is behind the hamburger, so once a
 * visitor scrolls past the hero there is no route to an application. This
 * restores one without stealing space above the fold: it appears only after
 * the first screenful and hides again at the top of the page.
 *
 * Hidden on the pages where it would duplicate the primary action already
 * on screen.
 */
const SUPPRESS_ON = ["/contact"];

export function StickyActions() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.85);
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

  if (SUPPRESS_ON.includes(pathname)) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          data-print-hide
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-dark/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
        >
          <div className="flex items-stretch gap-px">
            <Link
              href="/contact"
              className="flex flex-1 items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white"
            >
              <MessageCircle aria-hidden="true" strokeWidth={1.5} className="size-4 text-gold-light" />
              Enquire
            </Link>
            <Link
              href="/admissions#apply"
              className="flex flex-[1.2] items-center justify-center gap-2 bg-gold py-4 text-xs font-semibold uppercase tracking-[0.12em] text-navy"
            >
              Apply Now
              <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
