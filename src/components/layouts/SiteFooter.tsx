import { FlowerIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-dark-brown text-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-14 text-center lg:px-12">
        <FlowerIcon size={28} className="text-dusty-pink" />
        <p className="max-w-xl font-display text-headline-sm text-balance text-ivory italic">
          20 Tháng 10 · Gửi những điều dịu dàng nhất đến các chị em trong team.
        </p>
        <p className="text-body-sm text-cream/70">
          Một món quà nhỏ từ {siteConfig.team} · {siteConfig.date}
        </p>
        <p className="text-label-sm text-cream/50 uppercase">
          © {siteConfig.year} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
