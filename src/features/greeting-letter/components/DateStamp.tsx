import { cn } from "@/lib/cn";

/** Vintage "20.10" seal with a dashed rose border. */
export function DateStamp({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex size-20 rotate-[-8deg] flex-col items-center justify-center rounded-full border-2 border-dashed border-rose/70 bg-ivory/70 text-muted-red sm:size-24",
        className,
      )}
    >
      <span className="font-body text-[0.5rem] font-semibold tracking-[0.2em] uppercase sm:text-[0.5625rem]">
        Việt Nam
      </span>
      <span className="font-display text-xl leading-tight sm:text-2xl">
        20.10
      </span>
      <span className="font-body text-[0.5rem] font-semibold tracking-[0.2em] uppercase sm:text-[0.5625rem]">
        Dịu dàng
      </span>
    </div>
  );
}
