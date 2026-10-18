"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  type MouseEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "../hooks/use-media-query";

/** Line-art strokes in drawing order: spiral → petals → sepals → stem → leaves. */
const LINE_PATHS = [
  "M120 84C128 82 132 90 126 96C120 102 108 98 110 88C112 78 128 74 136 82C146 92 140 108 124 112C106 116 96 104 98 90",
  "M98 90C92 76 100 64 114 64C124 64 132 70 134 78",
  "M136 82C150 82 160 96 156 112C152 128 138 136 122 136",
  "M98 90C84 96 80 114 90 126C98 136 110 138 122 136",
  "M90 126C74 124 64 110 66 96C68 84 78 76 90 74",
  "M156 112C170 108 178 94 172 82C166 70 150 64 136 68",
  "M66 102C62 122 70 138 84 140",
  "M172 96C178 116 172 134 158 140",
  "M84 140C96 164 144 166 158 140",
  "M98 150C106 166 116 170 120 168C124 170 134 166 142 150",
  "M120 168C117 198 124 228 119 262C117 280 119 296 122 312",
  "M118 214C100 196 76 194 60 206C74 222 100 226 118 214Z",
  "M118 214C100 208 80 206 60 206",
  "M121 252C138 232 164 230 180 242C166 260 140 264 121 252Z",
  "M121 252C140 246 160 244 180 242",
  "M119 282L112 276",
];

const BLOOM_FILL =
  "M84 140C70 138 62 122 66 102C68 84 78 76 90 74C96 66 104 62 114 64C122 62 130 64 136 68C150 64 166 70 172 82C176 90 176 92 172 96C178 116 172 134 158 140C144 166 96 164 84 140Z";
const BLOOM_HIGHLIGHT =
  "M90 126C80 114 84 96 98 90C96 104 106 116 122 112C138 108 142 92 136 82C150 82 160 96 156 112C152 128 138 136 122 136C110 138 98 136 90 126Z";
const LEAF_FILLS = [
  "M118 214C100 196 76 194 60 206C74 222 100 226 118 214Z",
  "M121 252C138 232 164 230 180 242C166 260 140 264 121 252Z",
  "M98 150C106 166 116 170 120 168C124 170 134 166 142 150C132 156 126 156 120 158C114 156 108 156 98 150Z",
];

const DRAW_START = 0.4;
const DRAW_STAGGER = 0.09;
const DRAW_DURATION = 1.1;
/** Color washes in once the bloom outline (first 10 strokes) is nearly drawn. */
const FILL_AT = DRAW_START + 9 * DRAW_STAGGER + DRAW_DURATION * 0.8;
const FLOAT_AT = FILL_AT + 1.2;

const PETAL_COLORS = ["#F4C7CC", "#EBB4B8", "#D9A6A0", "#C98287"];

type BurstPetal = {
  id: string;
  x: number;
  y: number;
  rotate: number;
  size: number;
  color: string;
  delay: number;
};

type Burst = { id: number; petals: BurstPetal[] };

function createBurst(id: number): Burst {
  return {
    id,
    petals: Array.from({ length: 16 }, (_, index) => {
      const angle = (index / 16) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 70 + Math.random() * 110;
      return {
        id: `${id}-${index}`,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance * 0.7,
        rotate: -180 + Math.random() * 360,
        size: 14 + Math.random() * 12,
        color: PETAL_COLORS[index % PETAL_COLORS.length],
        delay: Math.random() * 0.12,
      };
    }),
  };
}

/**
 * Hero ornament: a rose that draws itself stroke by stroke, fills with color,
 * lifts off the page and floats. It tilts toward the pointer, can be dragged
 * (snaps back), and scatters petals when clicked, tapped, or activated by key.
 */
export function BloomingRose({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion() ?? false;
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [bursts, setBursts] = useState<Burst[]>([]);
  const burstId = useRef(0);
  const dragged = useRef(false);
  const timers = useRef<number[]>([]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 140, damping: 16, mass: 0.6 };
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-16, 16]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [12, -12]),
    springConfig,
  );

  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const timer of pending) window.clearTimeout(timer);
    };
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function handleClick(_event: MouseEvent<HTMLButtonElement>) {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    if (reduceMotion) return;
    burstId.current += 1;
    const burst = createBurst(burstId.current);
    setBursts((current) => [...current.slice(-2), burst]);
    const timer = window.setTimeout(() => {
      setBursts((current) => current.filter((item) => item.id !== burst.id));
    }, 1900);
    timers.current.push(timer);
  }

  const drawTransition = (index: number) =>
    reduceMotion
      ? { duration: 0 }
      : {
          pathLength: {
            duration: DRAW_DURATION,
            delay: DRAW_START + index * DRAW_STAGGER,
            ease: [0.45, 0, 0.25, 1] as const,
          },
          opacity: { duration: 0.2, delay: DRAW_START + index * DRAW_STAGGER },
        };

  const revealTransition = (delay: number, duration = 1) =>
    reduceMotion
      ? { duration: 0 }
      : { duration, delay, ease: "easeOut" as const };

  return (
    <div
      className={cn("relative flex flex-col items-center", className)}
      style={{ perspective: 900 }}
    >
      <motion.button
        type="button"
        aria-label="Bông hồng 20/10 — nhấn để rắc cánh hoa"
        className="group relative block aspect-3/4 w-full cursor-pointer rounded-[40%] outline-offset-8 md:cursor-grab"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        drag={finePointer}
        dragSnapToOrigin
        dragElastic={0.35}
        dragTransition={{ bounceStiffness: 260, bounceDamping: 14 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        whileDrag={{ scale: 1.06, cursor: "grabbing" }}
        onDragStart={() => {
          dragged.current = true;
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onClick={handleClick}
      >
        {/* Ground shadow: shrinks as the rose lifts and floats. */}
        <motion.span
          aria-hidden="true"
          className="absolute bottom-[1%] left-1/2 h-4 w-2/5 -translate-x-1/2 rounded-[50%] bg-dark-brown/15 blur-md"
          initial={{ opacity: 0, scaleX: 1 }}
          animate={
            reduceMotion
              ? { opacity: 0.6, scaleX: 0.9 }
              : { opacity: [0, 0.7, 0.45, 0.7], scaleX: [1, 0.9, 0.75, 0.9] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 6,
                  delay: FILL_AT,
                  times: [0, 0.2, 0.6, 1],
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
        />

        <motion.span
          aria-hidden="true"
          className="absolute inset-0 block"
          initial={{ y: 0 }}
          animate={reduceMotion ? { y: 0 } : { y: [0, -10, -18, -10, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 7,
                  delay: FLOAT_AT,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }
          }
        >
          {/* Soft halo that appears as the rose "lifts". */}
          <motion.span
            className="absolute top-[8%] left-1/2 block aspect-square w-[78%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_249_242/0.95)_0%,rgb(245_232_216/0.7)_45%,transparent_70%)]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={revealTransition(FILL_AT, 1.4)}
          />

          <svg
            viewBox="0 0 240 320"
            className="relative h-full w-full overflow-visible drop-shadow-[0_14px_18px_rgb(118_83_67/0.18)]"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <radialGradient id="rose-bloom" cx="50%" cy="38%" r="62%">
                <stop offset="0" stopColor="#B9686C" />
                <stop offset="0.45" stopColor="#C98287" />
                <stop offset="1" stopColor="#E6BDB5" />
              </radialGradient>
              <linearGradient id="rose-leaf" x1="0" x2="1">
                <stop offset="0" stopColor="#8E9A72" />
                <stop offset="1" stopColor="#B5BC93" />
              </linearGradient>
            </defs>

            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={revealTransition(FILL_AT + 0.2)}
              fill="url(#rose-leaf)"
            >
              {LEAF_FILLS.map((d) => (
                <path key={d} d={d} />
              ))}
            </motion.g>

            <motion.g
              style={{ transformOrigin: "120px 110px" }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={revealTransition(FILL_AT, 1.1)}
            >
              <path d={BLOOM_FILL} fill="url(#rose-bloom)" />
              <path d={BLOOM_HIGHLIGHT} fill="#FFF9F2" opacity="0.22" />
            </motion.g>

            <g
              fill="none"
              stroke="#765343"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {LINE_PATHS.map((d, index) => (
                <motion.path
                  key={d}
                  d={d}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={drawTransition(index)}
                />
              ))}
            </g>
          </svg>
        </motion.span>

        {/* Petals scattered on click/tap. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[34%] left-1/2"
        >
          {bursts.flatMap((burst) =>
            burst.petals.map((petal) => (
              <motion.svg
                key={petal.id}
                width={petal.size}
                height={petal.size}
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="absolute -translate-x-1/2 -translate-y-1/2"
                initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0.4 }}
                animate={{
                  x: [0, petal.x * 0.7, petal.x],
                  y: [0, petal.y - 30, petal.y + 60],
                  opacity: [0, 1, 0],
                  rotate: petal.rotate,
                  scale: 1,
                }}
                transition={{
                  duration: 1.7,
                  delay: petal.delay,
                  ease: "easeOut",
                }}
              >
                <path
                  d="M10 1.5C14.5 4 17 8.5 15.6 13.2 14.6 16.6 12.2 18.6 10 18.6 7.8 18.6 5.4 16.6 4.4 13.2 3 8.5 5.5 4 10 1.5Z"
                  fill={petal.color}
                />
              </motion.svg>
            )),
          )}
        </span>
      </motion.button>

      <motion.p
        className="mt-3 rounded-sm bg-ivory/75 px-3 py-1 text-center whitespace-nowrap font-body text-label-sm font-semibold text-warm-brown uppercase backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={revealTransition(FLOAT_AT)}
      >
        {finePointer ? "Rê chuột, kéo hoặc nhấn vào hoa" : "Chạm vào bông hoa"}
      </motion.p>
    </div>
  );
}
