import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, EB_Garamond } from "next/font/google";
import { siteConfig } from "@/config/site";
import { MotionProvider } from "@/features/motion/components/MotionProvider";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // A private gift for colleagues — keep it out of search engines.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#fff9f2",
};

// Shows reveal-on-scroll content when JavaScript is disabled.
const noScriptCss =
  "[data-reveal]{opacity:1!important;transform:none!important}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${ebGaramond.variable} ${beVietnamPro.variable} antialiased`}
    >
      <body className="min-h-svh bg-ivory font-body text-dark-brown">
        <noscript>
          <style>{noScriptCss}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
