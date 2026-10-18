import { QuoteIcon } from "@/components/ui/icons";

export function QuoteCard({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  return (
    <figure className="paper-grain relative rounded-md border border-rose/20 bg-cream p-7 shadow-paper">
      <div
        aria-hidden="true"
        className="absolute inset-y-7 left-0 w-px bg-linear-to-b from-transparent via-muted-red/60 to-transparent"
      />
      <QuoteIcon size={28} className="text-rose" />
      <blockquote className="mt-4 font-display text-headline-sm text-pretty text-dark-brown italic">
        “{quote}”
      </blockquote>
      <figcaption className="mt-5 text-body-sm text-warm-brown">
        — {author}
      </figcaption>
    </figure>
  );
}
