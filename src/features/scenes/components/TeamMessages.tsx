import { FlowerIcon } from "@/components/ui/icons";
import type { TeamMessage } from "@/features/greeting/types/greeting";
import { MotionReveal } from "@/features/motion/components/MotionReveal";

/** Static messages written by the team. Renders nothing when empty. */
export function TeamMessages({ messages }: { messages: TeamMessage[] }) {
  if (messages.length === 0) return null;

  return (
    <div className="mt-20">
      <h3 className="text-center font-display text-headline-md text-dark-brown">
        Lời nhắn từ team
      </h3>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {messages.map((item, index) => (
          <li key={item.id}>
            <MotionReveal delay={(index % 3) * 0.08} className="h-full">
              <figure className="paper-grain flex h-full flex-col gap-4 rounded-md border border-rose/20 bg-cream p-6 shadow-paper">
                <FlowerIcon size={20} className="text-rose" />
                <blockquote className="text-body-md text-pretty text-dark-brown">
                  “{item.message}”
                </blockquote>
                <figcaption className="mt-auto text-body-sm text-warm-brown">
                  — {item.author}
                </figcaption>
              </figure>
            </MotionReveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
