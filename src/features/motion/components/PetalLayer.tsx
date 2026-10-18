import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type Petal = {
  id: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  sway: number;
  swayDuration: number;
  spin: number;
  opacity: number;
  color: string;
  shape: number;
};

const COLORS = ["#F4C7CC", "#EBB4B8", "#D9A6A0", "#F7DCDC", "#C98287"];

// Two cherry-blossom petal outlines (notched tip), drawn in a 20x20 box.
const SHAPES = [
  "M10 1.5C14.5 4 17 8.5 15.6 13.2 14.6 16.6 12.2 18.6 10 18.6 7.8 18.6 5.4 16.6 4.4 13.2 3 8.5 5.5 4 10 1.5Z",
  "M10 18.5C5.6 16 3 11.6 4.2 7 5 3.8 7.4 1.6 9.2 2.6L10 4.2 10.8 2.6C12.6 1.6 15 3.8 15.8 7 17 11.6 14.4 16 10 18.5Z",
];

/** Deterministic pseudo-random numbers so server and client markup match. */
function createRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createPetals(count: number, seed: number): Petal[] {
  const random = createRandom(seed);
  return Array.from({ length: count }, (_, index) => {
    const duration = 11 + random() * 10;
    return {
      id: `petal-${seed}-${index}`,
      left: random() * 100,
      size: 10 + random() * 12,
      duration,
      // Negative delay so petals are already mid-fall on first paint.
      delay: -random() * duration,
      drift: -60 + random() * 160,
      sway: 14 + random() * 30,
      swayDuration: 3 + random() * 3,
      spin: 80 + random() * 200,
      opacity: 0.55 + random() * 0.4,
      color: COLORS[Math.floor(random() * COLORS.length)],
      shape: Math.floor(random() * SHAPES.length),
    };
  });
}

type PetalLayerProps = {
  /** Total petals on desktop; mobile shows the first `mobileCount`. */
  count?: number;
  mobileCount?: number;
  seed?: number;
  className?: string;
};

/**
 * Decorative falling cherry-blossom petals, animated with CSS only.
 * Hidden from assistive technology and disabled for reduced motion.
 */
export function PetalLayer({
  count = 26,
  mobileCount = 10,
  seed = 2010,
  className,
}: PetalLayerProps) {
  const petals = createPetals(count, seed);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "petal-layer pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {petals.map((petal, index) => (
        <span
          key={petal.id}
          className={cn(
            "petal absolute top-0",
            index >= mobileCount && "max-md:hidden",
          )}
          style={
            {
              left: `${petal.left}%`,
              "--petal-duration": `${petal.duration}s`,
              "--petal-delay": `${petal.delay}s`,
              "--petal-drift": `${petal.drift}px`,
              "--petal-sway": `${petal.sway}px`,
              "--petal-sway-duration": `${petal.swayDuration}s`,
              "--petal-spin": `${petal.spin}deg`,
              "--petal-opacity": petal.opacity,
            } as CSSProperties
          }
        >
          <span>
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
            >
              <path d={SHAPES[petal.shape]} fill={petal.color} />
              <path
                d="M10 5.5V13"
                stroke="#fff9f2"
                strokeOpacity="0.55"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}
