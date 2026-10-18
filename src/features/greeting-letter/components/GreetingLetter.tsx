import { siteConfig } from "@/config/site";
import type { Greeting } from "@/features/greeting/types/greeting";
import { DateStamp } from "./DateStamp";

export function GreetingLetter({ greeting }: { greeting: Greeting }) {
  const paragraphs = greeting.message.split(/\n{2,}/);

  return (
    <article className="paper-grain relative rounded-md border border-rose/25 bg-cream px-6 pt-10 pb-12 shadow-paper-lg sm:px-12 sm:pt-14 sm:pb-14">
      <DateStamp className="absolute top-5 right-5 sm:top-8 sm:right-8" />

      <p className="pr-24 font-body text-label-sm font-semibold text-rose uppercase sm:pr-28">
        {greeting.title}
      </p>
      <h3 className="mt-5 pr-20 font-display text-headline-md text-dark-brown italic sm:pr-0">
        Gửi {greeting.displayName},
      </h3>

      <div className="mt-6 flex flex-col gap-4 text-body-lg text-pretty text-dark-brown/90">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {greeting.closingMessage ? (
        <p className="mt-8 font-display text-headline-sm text-muted-red italic">
          {greeting.closingMessage}
        </p>
      ) : null}

      <div className="mt-10 flex flex-col items-end gap-1 text-right">
        <span className="text-body-sm text-warm-brown">
          Thân gửi với trọn vẹn chân thành,
        </span>
        <span className="font-display text-headline-sm text-dark-brown">
          {greeting.signature}
        </span>
        <span className="text-label-sm text-warm-brown/70 uppercase">
          {siteConfig.date}
        </span>
      </div>
    </article>
  );
}
