import type { ReactNode } from "react";
import { HourglassIcon, SparkleIcon, SunIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Portrait, TeamMessage } from "@/features/greeting/types/greeting";
import { MotionReveal } from "@/features/motion/components/MotionReveal";
import { ColleagueGallery } from "./ColleagueGallery";
import { QualityCard } from "./QualityCard";
import { QuoteCard } from "./QuoteCard";
import { TeamMessages } from "./TeamMessages";

const QUALITIES: Array<{
  index: string;
  tag: string;
  title: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    index: "01",
    tag: "Tận tâm",
    title: "Sự tận tâm thầm lặng",
    description:
      "Luôn chăm chút từng chi tiết nhỏ, sẵn sàng hỗ trợ đồng đội và hoàn thành công việc bằng cả sự chỉn chu lẫn trách nhiệm.",
    icon: <HourglassIcon size={22} />,
  },
  {
    index: "02",
    tag: "Ấm áp",
    title: "Nụ cười giữa những ngày bận rộn",
    description:
      "Một lời hỏi han, một nụ cười đúng lúc đủ làm cuộc họp nhẹ nhàng hơn và khiến văn phòng luôn có cảm giác thân quen.",
    icon: <SunIcon size={22} />,
  },
  {
    index: "03",
    tag: "Bản lĩnh",
    title: "Vững vàng trước mọi deadline",
    description:
      "Bình tĩnh trước áp lực, linh hoạt trước thay đổi và luôn truyền cảm hứng để cả team cùng tiến lên.",
    icon: <SparkleIcon size={22} />,
  },
];

type AppreciationSceneProps = {
  portraits: Array<Portrait & { id: string }>;
  teamMessages: TeamMessage[];
  highlightId?: string;
};

export function AppreciationScene({
  portraits,
  teamMessages,
  highlightId,
}: AppreciationSceneProps) {
  return (
    <section
      id="tri-an"
      aria-labelledby="tri-an-title"
      className="relative bg-ivory py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <MotionReveal>
              <SectionHeading
                id="tri-an-title"
                eyebrow="Phần I · Tri Ân & Thấu Hiểu"
                title="Những điều đáng trân trọng phía sau nụ cười."
                description="Có những người đồng nghiệp bước vào mỗi ngày làm việc nhẹ nhàng như một buổi sớm mùa thu. Không cần ồn ào, sự tận tâm, chu đáo và tinh thần bền bỉ của họ vẫn lặng lẽ giữ cho cả team vững vàng qua mọi dự án."
              />
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <QuoteCard
                quote="Cảm ơn vì đã luôn dịu dàng với mọi người, ngay cả trong những ngày công việc chẳng mấy nhẹ nhàng."
                author="Gửi những người đồng nghiệp tuyệt vời"
              />
            </MotionReveal>
          </div>

          <ul className="flex flex-col gap-5 lg:col-span-6 lg:col-start-7 lg:pt-16">
            {QUALITIES.map((quality, index) => (
              <li
                key={quality.index}
                className={index === 1 ? "lg:translate-x-8" : undefined}
              >
                <MotionReveal delay={0.08 * index}>
                  <QualityCard {...quality} />
                </MotionReveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-28 md:mt-36">
          <MotionReveal>
            <SectionHeading
              eyebrow="Phần II · Những gương mặt"
              title="Những bông hoa của team"
              description="Mỗi người một vẻ, cùng nhau làm nên một tập thể ấm áp và đầy cảm hứng."
              align="center"
            />
          </MotionReveal>
          <div className="mt-14 pb-6">
            <ColleagueGallery portraits={portraits} highlightId={highlightId} />
          </div>
        </div>

        <TeamMessages messages={teamMessages} />
      </div>
    </section>
  );
}
