export const siteConfig = {
  name: "Dịu Dàng 20 Tháng 10",
  description:
    "Một chút trân trọng gửi đến các chị em đồng nghiệp nhân ngày Phụ nữ Việt Nam 20/10.",
  team: "Team Trivita AI",
  date: "20/10/2026",
  year: 2026,
  /**
   * Optional background music. Put a file in `public/audio/` and set its path
   * here (e.g. "/audio/autumn.mp3"). The toggle is hidden while this is null.
   */
  musicSrc: null as string | null,
  nav: [
    { href: "#mo-dau", label: "Mở đầu" },
    { href: "#tri-an", label: "Tri ân" },
    { href: "#ky-niem", label: "Kỷ niệm" },
    { href: "#buc-thu", label: "Bức thư" },
  ],
} as const;
