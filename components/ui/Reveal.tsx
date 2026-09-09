"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-reveal primitives.
 *
 * Keeping the "use client" boundary here means the section components that use
 * these can stay server components — only this wrapper ships JavaScript.
 *
 * REDUCED MOTION: these components deliberately do NOT read
 * useReducedMotion() to decide what to render. Doing so produces a hydration
 * mismatch, because the server cannot know the visitor's motion preference and
 * would emit a different initial style than the client. Instead every animated
 * element carries `data-reveal`, and globals.css forces those elements to their
 * final state under `prefers-reduced-motion: reduce` using !important — which
 * overrides Framer Motion's inline styles. The result is identical markup on
 * both sides and no motion at all for visitors who ask for none.
 */

type MotionTagName =
  | "div"
  | "section"
  | "article"
  | "li"
  | "ul"
  | "ol"
  | "span"
  | "figure";

/**
 * `motion` is a caching proxy, so indexing it returns a stable component per
 * tag. Calling motion.create() during render would instead produce a new
 * component type on every pass and remount the subtree.
 */
function tagOf(name: MotionTagName = "div") {
  return motion[name];
}

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "none" | "left" | "right";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  none: { x: 0, y: 0 },
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use small values — this is emphasis, not choreography. */
  delay?: number;
  direction?: Direction;
  as?: MotionTagName;
  /** How much of the element must be visible before it animates in. */
  amount?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as,
  amount = 0.25,
}: RevealProps) {
  const MotionTag = tagOf(as);
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, delay, ease: EASE },
    },
  };

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: "0px 0px -80px 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct children of a list or grid. Children must be wrapped in
 * <RevealItem>.
 */
export function RevealGroup({
  children,
  className,
  as,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTagName;
  stagger?: number;
}) {
  const MotionTag = tagOf(as);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as,
}: {
  children: ReactNode;
  className?: string;
  as?: MotionTagName;
}) {
  const MotionTag = tagOf(as);

  return (
    <MotionTag
      data-reveal=""
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: EASE },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
