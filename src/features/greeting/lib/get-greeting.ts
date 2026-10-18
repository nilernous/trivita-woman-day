import { greetings } from "../data/greetings";
import type { Greeting, Portrait } from "../types/greeting";

/** Personal greeting for a slug, or `undefined` when the slug is unknown. */
export function getGreeting(recipientId: string): Greeting | undefined {
  return Object.hasOwn(greetings, recipientId)
    ? greetings[recipientId]
    : undefined;
}

export function getRecipientIds(): string[] {
  return Object.keys(greetings);
}

export function getTeamPortraits(): Array<Portrait & { id: string }> {
  return Object.values(greetings).flatMap((greeting) =>
    greeting.portrait
      ? [{ id: greeting.recipientId, ...greeting.portrait }]
      : [],
  );
}

/** Plain-text version of the letter for the copy button. */
export function greetingToPlainText(greeting: Greeting): string {
  return [
    `Gửi ${greeting.displayName},`,
    greeting.message,
    greeting.closingMessage,
    `— ${greeting.signature}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}
