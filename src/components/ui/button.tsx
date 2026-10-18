import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost" | "ghost-light";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 font-body text-label-md font-medium transition-colors duration-300 ease-gentle disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-muted-red text-ivory shadow-[inset_0_1px_0_rgb(255_255_255/0.2)] hover:bg-muted-red-hover",
  ghost:
    "border border-warm-brown/35 text-dark-brown hover:bg-cream/60 hover:border-warm-brown/55",
  "ghost-light":
    "border border-ivory/50 text-ivory hover:bg-ivory/10 hover:border-ivory/80",
};

/** Shared button styles for `<button>` and `<a>` elements. */
export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
) {
  return cn(base, variants[variant], className);
}
