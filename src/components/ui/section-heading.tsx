import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

/** Editorial heading: uppercase folio label above a large serif title. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p
        className={cn(
          "inline-flex items-center gap-3 font-body text-label-sm font-semibold uppercase",
          light ? "text-cream" : "text-muted-red",
        )}
      >
        <span
          aria-hidden="true"
          className={cn("h-px w-8", light ? "bg-cream/70" : "bg-rose/70")}
        />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "font-display text-headline-lg-mobile text-balance md:text-headline-lg",
          light ? "text-ivory" : "text-dark-brown",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-[38rem] text-body-lg text-pretty",
            light ? "text-cream/90" : "text-warm-brown",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
