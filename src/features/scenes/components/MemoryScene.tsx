import { MotionReveal } from "@/features/motion/components/MotionReveal";
import { ParallaxImage } from "./ParallaxImage";

export function MemoryScene() {
  return (
    <section
      id="ky-niem"
      aria-labelledby="ky-niem-title"
      className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-dark-brown md:items-center"
    >
      <div className="absolute inset-0 -z-10">
        <ParallaxImage
          src="/happy-woman-day/scenes/scene-sunset.jpg"
          alt="Minh họa một cô gái mặc váy đỏ đứng trên vách đá, ngắm hoàng hôn trên biển"
          className="object-cover object-[30%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark-brown/90 via-dark-brown/45 to-transparent md:bg-linear-to-l md:from-dark-brown/80 md:via-dark-brown/35 md:to-transparent md:to-75%" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl px-5 py-20 md:grid-cols-12 lg:px-12">
        <MotionReveal className="flex flex-col gap-5 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
          <p className="inline-flex items-center gap-3 font-body text-label-sm font-semibold text-cream uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-cream/70" />
            Khung hình ký ức · 20/10
          </p>
          <h2
            id="ky-niem-title"
            className="font-display text-headline-lg-mobile text-balance text-ivory md:text-display"
          >
            Một khoảnh khắc để nhớ.
          </h2>
          <p className="text-body-lg text-pretty text-cream/90">
            Ngày tháng có thể trôi qua vội vã như những cơn gió ngoài bờ biển,
            nhưng những khoảnh khắc làm việc cùng nhau — những lần cùng vượt
            deadline, những tiếng cười giữa giờ nghỉ — sẽ luôn là phần ký ức đẹp
            nhất của cả team.
          </p>
          <p className="font-display text-headline-sm text-dusty-pink italic">
            Cảm ơn vì đã là một phần của hành trình này.
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
