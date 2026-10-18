"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useRef } from "react";
import { buttonClassName } from "@/components/ui/button";
import { CloseLetterIcon, MailIcon } from "@/components/ui/icons";
import { useLetterState } from "../hooks/use-letter-state";
import { CopyGreetingButton } from "./CopyGreetingButton";
import { DateStamp } from "./DateStamp";

const LETTER_ID = "greeting-letter";
const EASE = [0.22, 1, 0.36, 1] as const;

type GreetingEnvelopeProps = {
  recipientLabel: string;
  copyText: string;
  /** The letter, rendered on the server. */
  children: ReactNode;
};

export function GreetingEnvelope({
  recipientLabel,
  copyText,
  children,
}: GreetingEnvelopeProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const { phase, open, finishOpening, close } = useLetterState(reduceMotion);
  const interacted = useRef(false);

  // AnimatePresence mounts the next view after the exit animation, so focus
  // is moved from a ref callback — but never on the first render.
  const focusOnMount = (node: HTMLElement | null) => {
    if (node && interacted.current) node.focus({ preventScroll: true });
  };

  const opening = phase === "opening";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {phase === "open" ? (
        <motion.div
          key="letter"
          className="flex flex-col gap-8"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
        >
          <section
            id={LETTER_ID}
            ref={focusOnMount}
            tabIndex={-1}
            aria-label={`Bức thư gửi ${recipientLabel}`}
            className="rounded-md outline-offset-4"
          >
            {children}
          </section>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-start">
            <CopyGreetingButton text={copyText} fallbackTargetId={LETTER_ID} />
            <button
              type="button"
              onClick={() => {
                interacted.current = true;
                close();
              }}
              className={buttonClassName("ghost")}
            >
              <CloseLetterIcon size={18} />
              Gấp thư lại
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="envelope"
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
        >
          <motion.button
            ref={focusOnMount}
            type="button"
            aria-expanded={false}
            aria-label={`Mở phong thư gửi ${recipientLabel}`}
            disabled={opening}
            onClick={() => {
              interacted.current = true;
              open();
            }}
            className="group relative aspect-3/2 w-full max-w-md cursor-pointer rounded-md outline-offset-8 disabled:cursor-default"
            style={{ perspective: 1200 }}
            whileHover={opening ? undefined : { y: -6, rotate: -0.6 }}
            whileTap={opening ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* Envelope back */}
            <span className="paper-grain absolute inset-0 rounded-md border border-warm-brown/15 bg-cream shadow-paper-lg" />

            {/* Letter paper rising out of the envelope */}
            <motion.span
              className="absolute inset-x-[7%] top-[6%] bottom-[8%] z-10 rounded-sm border border-rose/20 bg-ivory shadow-paper"
              initial={false}
              animate={opening ? { y: "-52%" } : { y: "0%" }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              onAnimationComplete={() => {
                if (opening) finishOpening();
              }}
            >
              <span className="absolute inset-x-[12%] top-[16%] flex flex-col gap-2">
                <span className="h-1 w-2/3 rounded-full bg-rose/30" />
                <span className="h-1 w-full rounded-full bg-warm-brown/15" />
                <span className="h-1 w-5/6 rounded-full bg-warm-brown/15" />
              </span>
            </motion.span>

            {/* Front pocket */}
            <span
              className="absolute inset-0 z-20 rounded-md bg-[#efdcc8]"
              style={{
                clipPath: "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)",
              }}
            />
            <span className="absolute inset-x-0 bottom-[6%] z-20 text-center">
              <span className="font-body text-label-sm font-semibold text-warm-brown/80 uppercase">
                Gửi tới
              </span>
              <span className="mt-1 block font-display text-headline-sm text-dark-brown italic">
                {recipientLabel}
              </span>
            </span>

            {/* Flap: flips open, then drops behind the rising letter */}
            <motion.span
              className="absolute inset-x-0 top-0 h-[58%] origin-top rounded-t-md bg-[#e8cfb8]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transformStyle: "preserve-3d",
              }}
              initial={false}
              animate={
                opening
                  ? { rotateX: 180, zIndex: 0 }
                  : { rotateX: 0, zIndex: 30 }
              }
              transition={{ duration: 0.6, ease: EASE }}
            />

            {/* Wax seal */}
            <motion.span
              className="absolute top-[54%] left-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
              initial={false}
              animate={
                opening ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.3 }}
            >
              <DateStamp className="size-14 bg-cream shadow-paper transition-transform duration-500 group-hover:rotate-0 sm:size-18" />
            </motion.span>
          </motion.button>

          <p className="inline-flex items-center gap-2 text-body-md text-warm-brown">
            <MailIcon size={18} />
            Nhấp vào phong thư để mở
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
