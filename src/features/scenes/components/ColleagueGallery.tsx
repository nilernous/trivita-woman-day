import Image from "next/image";
import type { Portrait } from "@/features/greeting/types/greeting";
import { MotionReveal } from "@/features/motion/components/MotionReveal";
import { cn } from "@/lib/cn";

/** Arched portrait frames of every colleague; alternate columns sit lower. */
export function ColleagueGallery({
  portraits,
  highlightId,
}: {
  portraits: Array<Portrait & { id: string }>;
  highlightId?: string;
}) {
  if (portraits.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
      {portraits.map((portrait, index) => (
        <li
          key={portrait.id}
          className={cn(index % 2 === 1 && "translate-y-6")}
        >
          <MotionReveal delay={(index % 4) * 0.06}>
            <div
              className={cn(
                "group relative aspect-4/5 overflow-hidden rounded-t-full rounded-b-sm border bg-cream p-1.5 shadow-paper transition-[transform,box-shadow] duration-700 ease-gentle hover:-translate-y-2 hover:shadow-paper-lg",
                portrait.id === highlightId
                  ? "border-muted-red/60 ring-2 ring-muted-red/30 ring-offset-4 ring-offset-ivory"
                  : "border-rose/25",
              )}
            >
              <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-sm">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 30vw, 45vw"
                  className="object-cover object-top transition-transform duration-1000 ease-gentle group-hover:scale-105"
                />
              </div>
            </div>
          </MotionReveal>
        </li>
      ))}
    </ul>
  );
}
