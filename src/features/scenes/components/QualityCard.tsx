import type { ReactNode } from "react";

type QualityCardProps = {
  index: string;
  tag: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export function QualityCard({
  index,
  tag,
  title,
  description,
  icon,
}: QualityCardProps) {
  return (
    <article className="group flex gap-5 rounded-md border border-warm-brown/15 bg-ivory p-6 shadow-paper transition-[transform,box-shadow] duration-500 ease-gentle hover:-translate-y-1 hover:shadow-paper-lg">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-dusty-pink/20 text-muted-red transition-colors duration-500 group-hover:bg-dusty-pink/35">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-body text-label-sm font-semibold text-rose uppercase">
          {index} · {tag}
        </p>
        <h3 className="font-display text-headline-sm text-dark-brown">
          {title}
        </h3>
        <p className="text-body-md text-warm-brown">{description}</p>
      </div>
    </article>
  );
}
