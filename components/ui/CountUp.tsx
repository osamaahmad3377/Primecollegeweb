"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Animates the numeric part of a statistic when it scrolls into view.
 *
 * The statistics on this site are currently placeholders such as "[XX]+", which
 * contain no digits. In that case the value is simply rendered as-is — the
 * component degrades cleanly and will start counting automatically once real
 * figures replace the placeholders, with no code change required.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : null;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (target === null || !inView || reduceMotion) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      /* easeOutQuint — fast start, gentle settle. */
      const eased = 1 - Math.pow(1 - progress, 5);
      setCurrent(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, reduceMotion]);

  if (target === null) {
    return <span ref={ref}>{value}</span>;
  }

  const shown = reduceMotion || !inView ? target : current;

  return (
    <span ref={ref}>
      {/* The full value is always available to assistive technology, so a
          screen reader never announces a mid-animation number. */}
      <span aria-hidden="true" className="tabular-nums">
        {match![1]}
        {shown}
        {match![3]}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
