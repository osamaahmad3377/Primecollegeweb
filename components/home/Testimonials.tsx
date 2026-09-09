"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";
import { pad } from "@/lib/utils";

/**
 * Testimonial carousel.
 *
 * No autoplay: motion that moves without being asked is a WCAG 2.2 problem and
 * an annoyance besides. The visitor drives it with the buttons or arrow keys.
 *
 * The live region announces each change, and the full set is also rendered
 * (visually hidden) so assistive technology and search engines see every quote
 * rather than only the active one.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const count = testimonials.length;

  const go = useCallback(
    (next: number) => {
      setDirection(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [index, count],
  );

  const active = testimonials[index];

  return (
    <Section tone="navy" aria-labelledby="testimonials-heading">
      <Container>
        <h2 id="testimonials-heading" className="sr-only">
          What our students say
        </h2>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Student testimonials"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") { event.preventDefault(); go(index + 1); }
            if (event.key === "ArrowLeft") { event.preventDefault(); go(index - 1); }
          }}
        >
          <div className="flex items-center gap-3.5">
            <span aria-hidden="true" className="block h-px w-10 bg-gold" />
            <p className="eyebrow text-gold-light">In their words</p>
          </div>

          {/* Reserve height so the section does not jump between quotes. */}
          <div className="relative mt-10 min-h-[19rem] sm:min-h-[17rem] lg:min-h-[15rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-[54rem]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-2 -top-16 select-none font-display text-[10rem] leading-none text-gold/20 sm:-left-5 sm:-top-24 sm:text-[16rem]"
                >
                  &ldquo;
                </span>

                <blockquote className="relative headline-cased text-[clamp(1.5rem,1.05rem+1.9vw,2.5rem)] leading-[1.3] text-white">
                  <p>{active.quote}</p>
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-4">
                  <span aria-hidden="true" className="block h-px w-8 bg-gold" />
                  <span>
                    <span className="block text-sm font-semibold uppercase tracking-[0.13em] text-gold-light">
                      {active.attribution}
                    </span>
                    <span className="mt-1 block text-sm text-navy-muted">
                      {active.detail}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-between gap-6 border-t border-white/15 pt-7">
            <p className="font-display text-sm tabular-nums text-navy-muted">
              <span className="text-gold-light">{pad(index + 1)}</span>
              <span aria-hidden="true"> / {pad(count)}</span>
              <span className="sr-only"> of {count}</span>
            </p>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="inline-flex size-11 items-center justify-center rounded-sm border border-white/25 text-white transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy"
              >
                <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="size-4" />
                <span className="sr-only">Previous testimonial</span>
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="inline-flex size-11 items-center justify-center rounded-sm border border-white/25 text-white transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy"
              >
                <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
                <span className="sr-only">Next testimonial</span>
              </button>
            </div>
          </div>

          {/* Announces the change without moving focus. */}
          <p aria-live="polite" className="sr-only">
            Testimonial {index + 1} of {count}. {active.quote} — {active.attribution}, {active.detail}
          </p>
        </div>

        {/* Every quote stays in the document for assistive technology and
            indexing, not just the one currently shown. */}
        <ul className="sr-only">
          {testimonials.map((item) => (
            <li key={item.quote}>
              <blockquote>{item.quote}</blockquote>
              <p>
                {item.attribution}, {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
