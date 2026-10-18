"use client";

import { useState } from "react";

export type LetterPhase = "closed" | "opening" | "open";

/**
 * Envelope state: `closed` → `opening` (flap animation) → `open`.
 * With reduced motion the envelope goes straight to `open`.
 */
export function useLetterState(skipAnimation: boolean) {
  const [phase, setPhase] = useState<LetterPhase>("closed");

  return {
    phase,
    open: () =>
      setPhase((current) =>
        current === "closed" ? (skipAnimation ? "open" : "opening") : current,
      ),
    finishOpening: () =>
      setPhase((current) => (current === "opening" ? "open" : current)),
    close: () => setPhase("closed"),
  };
}
