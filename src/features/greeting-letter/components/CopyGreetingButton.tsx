"use client";

import { useEffect, useRef, useState } from "react";
import { buttonClassName } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

type CopyStatus = "idle" | "copied" | "selected";

const STATUS_TEXT: Record<CopyStatus, string> = {
  idle: "",
  copied: "Đã sao chép lời chúc.",
  selected: "Đã chọn sẵn lời chúc, bạn có thể sao chép thủ công.",
};

/**
 * Copies the greeting text. When the Clipboard API is unavailable, it
 * selects the letter on the page so the user can copy it manually.
 */
export function CopyGreetingButton({
  text,
  fallbackTargetId,
}: {
  text: string;
  fallbackTargetId: string;
}) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function selectLetter() {
    const target = document.getElementById(fallbackTargetId);
    const selection = window.getSelection();
    if (!target || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(target);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  async function copy() {
    let next: CopyStatus = "copied";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      selectLetter();
      next = "selected";
    }
    setStatus(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className={buttonClassName("primary")}
      >
        {status === "copied" ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
        {status === "copied" ? "Đã sao chép" : "Sao chép lời chúc"}
      </button>
      <p aria-live="polite" className="min-h-5 text-body-sm text-warm-brown">
        {STATUS_TEXT[status]}
      </p>
    </div>
  );
}
