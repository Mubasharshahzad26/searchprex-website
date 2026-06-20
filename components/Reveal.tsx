"use client";
 
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
 
type Direction = "up" | "down" | "left" | "right" | "none";
 
const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};
 
/**
 * Reveal — wrap any element/section to animate it in as it scrolls into view.
 *
 *   <Reveal><Services /></Reveal>
 *   <Reveal delay={0.1} direction="up"><h2>…</h2></Reveal>
 *
 * Use small, consistent delays (0.05–0.15) on sibling items for a staggered feel.
 * Don't wrap the above-the-fold hero — start from the second section down.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  once = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  once?: boolean;
  className?: string;
}) {
  const o = OFFSET[direction];
  const variants: Variants = {
    hidden: { opacity: 0, x: o.x, y: o.y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay,
      },
    },
  };
 
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
 