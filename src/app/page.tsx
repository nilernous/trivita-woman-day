import { GreetingExperience } from "@/features/greeting/components/GreetingExperience";
import { generalGreeting } from "@/features/greeting/data/greetings";

export default function Home() {
  return <GreetingExperience greeting={generalGreeting} personal={false} />;
}
