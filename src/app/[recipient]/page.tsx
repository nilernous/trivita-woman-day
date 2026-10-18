import type { Metadata } from "next";
import { GreetingExperience } from "@/features/greeting/components/GreetingExperience";
import { generalGreeting } from "@/features/greeting/data/greetings";
import {
  getGreeting,
  getRecipientIds,
} from "@/features/greeting/lib/get-greeting";

// Colleagues open their own link directly; nothing in the app navigates
// between recipient pages, so this route may block on `params`.
export const instant = false;

export function generateStaticParams() {
  return getRecipientIds().map((recipient) => ({ recipient }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[recipient]">): Promise<Metadata> {
  const { recipient } = await params;
  const greeting = getGreeting(recipient);
  return {
    title: greeting ? `Gửi ${greeting.displayName}` : undefined,
  };
}

export default async function RecipientPage({
  params,
}: PageProps<"/[recipient]">) {
  const { recipient } = await params;
  const greeting = getGreeting(recipient);

  // Unknown links fall back to the general greeting instead of a 404.
  return (
    <GreetingExperience
      greeting={greeting ?? generalGreeting}
      personal={Boolean(greeting)}
    />
  );
}
