"use client";

import {
  Cable,
  ChartLine,
  CodeXml,
  FileSearch,
  Grid2x2Check,
  MonitorCheck,
  ShieldAlert,
  TrendingUpDown,
} from "lucide-react";
import { useTheme } from "next-themes";
import BlurFade from "@/components/ui/blur-fade";
import GradualSpacing from "@/components/ui/gradual-spacing";

export default function HomeSections({ dict, lang }) {
  const theme = useTheme();
  return (
    <div className="relative mt-10 flex gap-10 w-full flex-col items-center overflow-hidden rounded-lg bg-background pointer-events-none">
      <div>
        <h3 className="text-center text-4xl">{dict.commonChallenges.title}</h3>
        <h4 className="text-center text-2xl text-gray-400">
          {dict.commonChallenges.description}
        </h4>

        <div className="flex items-center justify-center gap-12 p-4 my-4">
          <BlurFade delay={0.1} inView>
            <div className="p-3 bg-pink-500/20 text-pink-500 rounded-full inline-block">
              <TrendingUpDown size={24} />
            </div>

            <h5 className="font-bold text-lg">
              {dict.commonChallenges.revenueGrowth.title}
            </h5>

            <ul
              className={`dark:text-gray-300 text-gray-600 ${
                lang === "de" && "text-sm"
              }`}
            >
              <li>- {dict.commonChallenges.revenueGrowth[1]}</li>
              <li>- {dict.commonChallenges.revenueGrowth[2]}</li>
              <li>- {dict.commonChallenges.revenueGrowth[3]}</li>
              <li>- {dict.commonChallenges.revenueGrowth[4]}</li>
              <li>- {dict.commonChallenges.revenueGrowth[5]}</li>
              <li>- {dict.commonChallenges.revenueGrowth[6]}</li>
              <li>- {dict.commonChallenges.revenueGrowth[7]}</li>
            </ul>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="p-3 bg-cyan-500/20 text-cyan-500 rounded-full inline-block">
              <ShieldAlert size={24} />
            </div>

            <h5 className="font-bold text-lg">
              {dict.commonChallenges.technicalSecurity.title}
            </h5>

            <ul
              className={`dark:text-gray-300 text-gray-600 ${
                lang === "de" && "text-sm"
              }`}
            >
              <li>- {dict.commonChallenges.technicalSecurity[1]}</li>
              <li>- {dict.commonChallenges.technicalSecurity[2]}</li>
              <li>- {dict.commonChallenges.technicalSecurity[3]}</li>
              <li>- {dict.commonChallenges.technicalSecurity[4]}</li>
              <li>- {dict.commonChallenges.technicalSecurity[5]}</li>
              <li>- {dict.commonChallenges.technicalSecurity[6]}</li>
              <li>- {dict.commonChallenges.technicalSecurity[7]}</li>
            </ul>
          </BlurFade>
        </div>
      </div>

      <div className="relative z-10">
        <div className="absolute -inset-14 bg-sky-500/10 blur-3xl -z-10 rounded-[200px]" />
        <div className="flex text-4xl items-center justify-center gap-2">
          {dict.solution.title} <GradualSpacing text={dict.solution.title2} />
        </div>

        <h4 className="text-center text-xl dark:text-gray-300 text-gray-600">
          {dict.solution.description}
        </h4>

        <div className="flex flex-col justify-center p-4 my-4">
          <div>
            <h5 className="font-bold text-lg mb-4">
              {dict.solution.professionalDevelopment.title}
            </h5>

            <ul className="dark:text-gray-300 text-gray-600 flex flex-col gap-2 mb-10">
              <BlurFade
                className="px-3 py-2 rounded-2xl flex items-center gap-2 bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                as="li"
                delay={0.2}
                inView
              >
                <div className="p-2 bg-yellow-500 rounded-full text-white">
                  <CodeXml size={16} />
                </div>

                {dict.solution.professionalDevelopment[1]}
              </BlurFade>

              <BlurFade
                className="px-3 py-2 rounded-2xl flex items-center gap-2 bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                as="li"
                delay={0.24}
                inView
              >
                <div className="p-2 bg-rose-500 rounded-full text-white">
                  <MonitorCheck size={16} />
                </div>

                {dict.solution.professionalDevelopment[2]}
              </BlurFade>

              <BlurFade
                className="px-3 py-2 rounded-2xl flex items-center gap-2 bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                as="li"
                delay={0.28}
                inView
              >
                <div className="p-2 bg-blue-500 rounded-full text-white">
                  <Grid2x2Check size={16} />
                </div>

                {dict.solution.professionalDevelopment[3]}
              </BlurFade>

              <BlurFade
                className="px-3 py-2 rounded-2xl flex items-center gap-2 bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                as="li"
                delay={0.32}
                inView
              >
                <div className="p-2 bg-emerald-500 rounded-full text-white">
                  <FileSearch size={16} />
                </div>

                {dict.solution.professionalDevelopment[4]}
              </BlurFade>

              <BlurFade
                className="px-3 py-2 rounded-2xl flex items-center gap-2 bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                as="li"
                delay={0.36}
                inView
              >
                <div className="p-2 bg-violet-600 rounded-full text-white">
                  <Cable size={16} />
                </div>

                {dict.solution.professionalDevelopment[5]}
              </BlurFade>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
