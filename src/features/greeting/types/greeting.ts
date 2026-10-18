export type Portrait = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Greeting = {
  recipientId: string;
  /** How the letter addresses her, e.g. "chị Lan", "em Mai". */
  displayName: string;
  title: string;
  message: string;
  closingMessage?: string;
  /** Sender shown under the letter, e.g. "Team Trivita AI". */
  signature: string;
  portrait?: Portrait;
};

export type TeamMessage = {
  id: string;
  author: string;
  message: string;
};
