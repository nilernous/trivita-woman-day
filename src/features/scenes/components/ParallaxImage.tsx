"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useMediaQuery } from "@/features/motion/hooks/use-media-query";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/** Background image with a small scroll-linked offset on desktop only. */
export function ParallaxImage({ src, alt, className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const enabled = desktop && !reduceMotion;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -inset-y-[8%] inset-x-0"
        style={enabled ? { y } : undefined}
      >
        <Image src={src} alt={alt} fill sizes="100vw" className={className} />
      </motion.div>
    </div>
  );
}
