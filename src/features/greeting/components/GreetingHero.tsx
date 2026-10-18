import Image from "next/image";
import type { CSSProperties } from "react";
import { buttonClassName } from "@/components/ui/button";
import { ArrowDownIcon, MailIcon, SparkleIcon } from "@/components/ui/icons";
import { BloomingRose } from "@/features/motion/components/BloomingRose";
import { PetalLayer } from "@/features/motion/components/PetalLayer";
import type { Greeting } from "../types/greeting";

function delay(ms: number) {
  return { "--delay": `${ms}ms` } as CSSProperties;
}

export function GreetingHero({
  greeting,
  personal,
}: {
  greeting: Greeting;
  personal: boolean;
}) {
  return (
    <section
      id="mo-dau"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-end overflow-hidden md:items-center"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/happy-woman-day/scenes/hero-window.jpg"
          alt="Minh họa một cô gái ngồi bên khung cửa sổ ngập nắng, ôm bó hoa nhỏ"
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[72%_center]"
        />
        {/* Readability plates: strong on mobile, a left-side wash on desktop. */}
        <div className="absolute inset-0 bg-linear-to-t from-ivory via-ivory/85 to-ivory/25 md:bg-linear-to-r md:from-ivory md:via-ivory/70 md:to-transparent md:to-70%" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-ivory to-transparent" />
      </div>

      <PetalLayer />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 pt-28 pb-14 md:grid-cols-12 md:items-center md:pb-24 lg:px-12">
        <div className="flex flex-col gap-6 md:col-span-7 lg:col-span-5">
          <p
            className="fade-up inline-flex w-fit items-center gap-2 rounded-sm bg-cream/85 px-3 py-1.5 font-body text-label-sm font-semibold text-muted-red uppercase shadow-paper backdrop-blur-md"
            style={delay(100)}
          >
            <SparkleIcon size={14} />
            20 Tháng 10 · Ngày Phụ Nữ Việt Nam
          </p>

          <h1
            id="hero-title"
            className="fade-up font-display text-display-mobile text-balance text-dark-brown md:text-display"
            style={delay(250)}
          >
            Dành cho những điều <em className="text-muted-red">dịu dàng</em>{" "}
            nhất.
          </h1>

          <p
            className="fade-up max-w-md text-body-lg text-pretty text-warm-brown"
            style={delay(450)}
          >
            {personal
              ? `Gửi ${greeting.displayName} — một chút trân trọng từ cả team, cảm ơn vì đã khiến mỗi ngày làm việc trở nên ấm áp hơn.`
              : "Một chút trân trọng gửi đến những đồng nghiệp đã khiến mỗi ngày làm việc trở nên ấm áp hơn."}
          </p>

          <div
            className="fade-up flex flex-col gap-3 sm:flex-row"
            style={delay(650)}
          >
            <a href="#tri-an" className={buttonClassName("primary")}>
              Bắt đầu hành trình
              <ArrowDownIcon size={18} />
            </a>
            <a
              href="#buc-thu"
              className={buttonClassName("ghost", "bg-ivory/60 backdrop-blur")}
            >
              <MailIcon size={18} />
              Mở bức thư gửi riêng
            </a>
          </div>
        </div>

        <BloomingRose className="mx-auto w-40 sm:w-48 md:col-span-5 md:w-60 lg:col-span-3 lg:w-full lg:max-w-72" />
      </div>
    </section>
  );
}
