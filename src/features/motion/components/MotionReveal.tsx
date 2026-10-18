"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset in px before the element enters the viewport. */
  offset?: number;
};

/**
 * Fades content in when it scrolls into view. Elements carry `data-reveal`
 * so the layout's <noscript> rule can show them when JavaScript is off.
 */
export function MotionReveal({
  children,
  className,
  delay = 0,
  offset = 18,
}: MotionRevealProps) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
