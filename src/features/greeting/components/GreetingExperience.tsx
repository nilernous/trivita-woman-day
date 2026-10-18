import { SiteFooter } from "@/components/layouts/SiteFooter";
import { SiteHeader } from "@/components/layouts/SiteHeader";
import { LetterSection } from "@/features/greeting-letter/components/LetterSection";
import { AppreciationScene } from "@/features/scenes/components/AppreciationScene";
import { MemoryScene } from "@/features/scenes/components/MemoryScene";
import { teamMessages } from "../data/team-messages";
import { getTeamPortraits } from "../lib/get-greeting";
import type { Greeting } from "../types/greeting";
import { GreetingHero } from "./GreetingHero";

/** The full single-page experience: Mở đầu → Tri ân → Kỷ niệm → Bức thư. */
export function GreetingExperience({
  greeting,
  personal,
}: {
  greeting: Greeting;
  personal: boolean;
}) {
  return (
    <>
      <SiteHeader />
      <main>
        <GreetingHero greeting={greeting} personal={personal} />
        <AppreciationScene
          portraits={getTeamPortraits()}
          teamMessages={teamMessages}
          highlightId={personal ? greeting.recipientId : undefined}
        />
        <MemoryScene />
        <LetterSection greeting={greeting} />
      </main>
      <SiteFooter />
    </>
  );
}
