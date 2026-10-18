import { FlowerIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { MusicToggle } from "@/features/music/components/MusicToggle";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rose/15 bg-ivory/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 lg:px-12">
        <a
          href="#mo-dau"
          className="flex items-center gap-2.5 rounded-sm text-muted-red"
        >
          <FlowerIcon size={26} />
          <span className="flex flex-col">
            <span className="font-display text-headline-sm leading-none tracking-tight">
              Dịu Dàng
            </span>
            <span className="font-body text-label-sm font-semibold text-warm-brown/75 uppercase">
              20 Tháng 10
            </span>
          </span>
        </a>

        <nav aria-label="Các phần của trang" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-sm px-3 py-2 font-body text-label-md text-warm-brown transition-colors duration-300 hover:bg-cream/70 hover:text-dark-brown"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-11 justify-end">
          {siteConfig.musicSrc ? (
            <MusicToggle src={siteConfig.musicSrc} />
          ) : null}
        </div>
      </div>
    </header>
  );
}
