import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { greetingToPlainText } from "@/features/greeting/lib/get-greeting";
import type { Greeting } from "@/features/greeting/types/greeting";
import { MotionReveal } from "@/features/motion/components/MotionReveal";
import { cn } from "@/lib/cn";
import { GreetingEnvelope } from "./GreetingEnvelope";
import { GreetingLetter } from "./GreetingLetter";

export function LetterSection({ greeting }: { greeting: Greeting }) {
  const portrait = greeting.portrait;

  return (
    <section
      id="buc-thu"
      aria-labelledby="buc-thu-title"
      className="relative overflow-hidden bg-cream/60 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-12">
        <MotionReveal>
          <SectionHeading
            id="buc-thu-title"
            eyebrow="Tâm Thư Gửi Trao"
            title={`Một lời chúc dành riêng cho ${greeting.displayName}`}
            description="Một phong thư nhỏ cả team gửi đến. Mở ra để đọc những lời chúc trọn vẹn nhất ngày 20/10."
            align="center"
          />
        </MotionReveal>

        <div
          className={cn(
            "mx-auto mt-14 grid max-w-5xl items-start gap-12",
            portrait && "lg:grid-cols-12",
          )}
        >
          {portrait ? (
            <MotionReveal className="mx-auto w-full max-w-72 lg:sticky lg:top-28 lg:col-span-4">
              <figure className="flex flex-col items-center gap-4">
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-t-full rounded-b-sm border border-rose/30 bg-ivory p-2 shadow-paper-lg">
                  <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-sm">
                    <Image
                      src={portrait.src}
                      alt={portrait.alt}
                      fill
                      sizes="288px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <figcaption className="font-display text-headline-sm text-dark-brown italic">
                  Gửi {greeting.displayName}
                </figcaption>
              </figure>
            </MotionReveal>
          ) : null}

          <div
            className={cn(
              "mx-auto w-full",
              portrait ? "max-w-2xl lg:col-span-8" : "max-w-2xl",
            )}
          >
            <GreetingEnvelope
              recipientLabel={greeting.displayName}
              copyText={greetingToPlainText(greeting)}
            >
              <GreetingLetter greeting={greeting} />
            </GreetingEnvelope>
            <noscript>
              <div className="mt-10">
                <GreetingLetter greeting={greeting} />
              </div>
            </noscript>
          </div>
        </div>
      </div>
    </section>
  );
}
