import { siteConfig } from "@/config/site";
import type { Greeting, Portrait } from "../types/greeting";

const TITLE = "Chúc mừng ngày Phụ nữ Việt Nam 20/10";

/** Shown on `/` and for any unknown recipient link. */
export const generalGreeting: Greeting = {
  recipientId: "general",
  displayName: "các chị em đồng nghiệp",
  title: TITLE,
  message: [
    "Nhân ngày Phụ nữ Việt Nam 20/10, cả team xin gửi lời cảm ơn chân thành đến các chị em — những người luôn tận tâm với công việc, chu đáo với mọi người và mang đến cho văn phòng thật nhiều năng lượng tích cực.",
    "Cảm ơn vì những buổi họp nhẹ nhàng hơn nhờ một nụ cười, những deadline trôi qua êm hơn nhờ một lời động viên, và những ngày bận rộn trở nên ấm áp hơn nhờ sự hiện diện của mọi người.",
    "Chúc các chị em luôn khỏe mạnh, vui vẻ, tự tin tỏa sáng và gặt hái thật nhiều thành công trong công việc lẫn cuộc sống.",
  ].join("\n\n"),
  closingMessage: "Chúc một ngày 20/10 thật nhiều hoa và niềm vui!",
  signature: siteConfig.team,
};

/**
 * Placeholder copy for personal letters. Replace `message` per colleague with
 * a reviewed, workplace-appropriate greeting.
 */
const defaultPersonalCopy = {
  title: TITLE,
  message: [
    "Nhân ngày Phụ nữ Việt Nam 20/10, cả team xin gửi đến bạn lời cảm ơn chân thành vì sự tận tâm, chu đáo và những năng lượng tích cực bạn mang đến mỗi ngày.",
    "Chúc bạn luôn khỏe mạnh, vui vẻ, tự tin tỏa sáng và có thật nhiều niềm vui trong công việc lẫn cuộc sống.",
  ].join("\n\n"),
  closingMessage: "Chúc bạn một ngày 20/10 thật trọn vẹn!",
  signature: siteConfig.team,
} satisfies Omit<Greeting, "recipientId" | "displayName">;

function portrait(
  index: number,
  width: number,
  height: number,
  name: string,
): Portrait {
  const file = String(index).padStart(2, "0");
  return {
    src: `/happy-woman-day/colleagues/colleague-${file}.png`,
    width,
    height,
    alt: `Chân dung minh họa ${name}`,
  };
}

/**
 * One entry per colleague. The key is the link slug: `/dong-nghiep-01`.
 *
 * TODO: replace each `recipientId` with a friendly slug (e.g. "chi-lan"),
 * `displayName` with how the letter addresses her (e.g. "chị Lan"), and
 * personalize `message` before sending the links.
 */
const colleagues: Greeting[] = [
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-01",
    displayName: "bạn",
    portrait: portrait(1, 1254, 1254, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-02",
    displayName: "bạn",
    portrait: portrait(2, 1254, 1254, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-03",
    displayName: "bạn",
    portrait: portrait(3, 1356, 1159, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-04",
    displayName: "bạn",
    portrait: portrait(4, 1254, 1254, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-05",
    displayName: "bạn",
    portrait: portrait(5, 1254, 1254, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-06",
    displayName: "bạn",
    portrait: portrait(6, 1254, 1254, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-07",
    displayName: "bạn",
    portrait: portrait(7, 1122, 1402, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-08",
    displayName: "bạn",
    portrait: portrait(8, 1254, 1254, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-09",
    displayName: "bạn",
    portrait: portrait(9, 1274, 1235, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-10",
    displayName: "bạn",
    portrait: portrait(10, 1323, 1189, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-11",
    displayName: "bạn",
    portrait: portrait(11, 1254, 1254, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-12",
    displayName: "bạn",
    portrait: portrait(12, 1254, 1254, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-13",
    displayName: "bạn",
    portrait: portrait(13, 1254, 1254, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-14",
    displayName: "bạn",
    portrait: portrait(14, 1254, 1254, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-15",
    displayName: "bạn",
    portrait: portrait(15, 1254, 1254, "đồng nghiệp"),
  },
  {
    ...defaultPersonalCopy,
    recipientId: "dong-nghiep-16",
    displayName: "bạn",
    portrait: portrait(16, 1254, 1254, "đồng nghiệp"),
  },
];

export const greetings: Record<string, Greeting> = Object.fromEntries(
  colleagues.map((greeting) => [greeting.recipientId, greeting]),
);
