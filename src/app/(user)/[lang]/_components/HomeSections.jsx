"use client";

import {
  Cable,
  CodeXml,
  FileSearch,
  Grid2x2Check,
  MonitorCheck,
  ShieldAlert,
  TrendingUpDown,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import BlurFade from "@/components/ui/blur-fade";
import { IconCloud } from "@/components/ui/icon-cloud";
import { TbArrowNarrowRight, TbCheck } from "react-icons/tb";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { GradientButton } from "@/components/ui/gradient-button";

const slugs = [
  "typescript",
  "javascript",
  "rust",
  "react",
  "go",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "expo",
  "docker",
  "git",
  "django",
  "github",
  "gitlab",
  "androidstudio",
  "python",
  "figma",
];

export default function HomeSections({ dict, lang }) {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative md:mt-10 px-5 flex flex-col gap-20 w-full items-center overflow-hidden rounded-lg bg-background">
      {isMounted ? (
        <>
          {/* Challenges Section */}
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-16 mt-4">
              <BlurFade delay={0.1} inView>
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 rounded-full  border border-pink-500/20 dark:border-cyan-500/20 text-sm font-semibold bg-gradient-to-r from-pink-600 to-cyan-600 dark:from-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    Common Challenges
                  </span>
                </div>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <h3 className="text-3xl md:text-5xl lg:h-[55px] font-black mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-cyan-600 dark:from-pink-400 dark:via-rose-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {dict.commonChallenges.title}
                </h3>
              </BlurFade>
              <BlurFade delay={0.3} inView>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  {dict.commonChallenges.description}
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <BlurFade delay={0.1} inView as="div">
                <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 rounded-3xl p-8 border-2 border-pink-200 dark:border-pink-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-rose-500/0 group-hover:from-pink-500/5 group-hover:to-rose-500/5 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <div className="relative p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <TrendingUpDown size={32} className="text-white" />
                        </div>
                      </div>
                      <h5 className="text-2xl font-bold">
                        {dict.commonChallenges.revenueGrowth.title}
                      </h5>
                    </div>

                    <ul className="space-y-3 dark:text-gray-300 text-gray-700">
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <li
                          key={num}
                          className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-200"
                        >
                          <TbCheck className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                          <span className="text-sm md:text-base">
                            {dict.commonChallenges.revenueGrowth[num]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView as="div">
                <div className="group relative bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-3xl p-8 border-2 border-cyan-200 dark:border-cyan-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <div className="relative p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <ShieldAlert size={32} className="text-white" />
                        </div>
                      </div>
                      <h5 className="text-2xl font-bold">
                        {dict.commonChallenges.technicalSecurity.title}
                      </h5>
                    </div>

                    <ul className="space-y-3 dark:text-gray-300 text-gray-700">
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <li
                          key={num}
                          className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform duration-200"
                        >
                          <TbCheck className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                          <span className="text-sm md:text-base">
                            {dict.commonChallenges.technicalSecurity[num]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Solution Section */}
          <div className="relative w-full max-w-7xl mx-auto">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10"></div>

            <div className="relative z-10 text-center mb-16">
              <BlurFade delay={0.1} inView>
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-purple-500/20 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Our Solution
                  </span>
                </div>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <div className="flex flex-col sm:flex-row text-3xl md:text-5xl font-black items-center justify-center gap-2 mb-6">
                  <span>{dict.solution.title}</span>
                  <GradualSpacing
                    text={dict.solution.title2}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                  />
                </div>
              </BlurFade>
              <BlurFade delay={0.3} inView>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  {dict.solution.description}
                </p>
              </BlurFade>
            </div>

            {/* Features Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-fr">
              <BlurFade delay={0.1} inView as="div" className="h-full">
                <div className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-yellow-500/50 dark:hover:border-orange-500/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col overflow-hidden">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/5 group-hover:to-orange-500/5 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <CodeXml size={24} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {dict.solution.professionalDevelopment[1]}
                    </p>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} inView as="div" className="h-full">
                <div className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-rose-500/50 dark:hover:border-pink-500/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 to-pink-500/0 group-hover:from-rose-500/5 group-hover:to-pink-500/5 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <MonitorCheck size={24} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {dict.solution.professionalDevelopment[2]}
                    </p>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView as="div" className="h-full">
                <div className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-cyan-500/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <Grid2x2Check size={24} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {dict.solution.professionalDevelopment[3]}
                    </p>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.25} inView as="div" className="h-full">
                <div className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-500/50 dark:hover:border-green-500/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/5 group-hover:to-green-500/5 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <FileSearch size={24} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {dict.solution.professionalDevelopment[4]}
                    </p>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.3} inView as="div" className="h-full">
                <div className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-violet-500/50 dark:hover:border-purple-500/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <Cable size={24} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {dict.solution.professionalDevelopment[5]}
                    </p>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.35} inView as="div" className="h-full">
                <div className="group relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex items-center justify-center overflow-hidden">
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <Link
                    href={`/${lang}/contact`}
                    className="pointer-events-auto flex flex-col items-center gap-3 text-white relative z-10"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl opacity-50 animate-pulse"></div>
                      <Zap
                        size={32}
                        className="relative text-yellow-300 group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="font-bold text-center text-lg">
                      {dict?.getStartedToday}
                    </span>
                    <TbArrowNarrowRight
                      size={24}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="relative w-full max-w-7xl mx-auto mb-20">
            {/* Subtle background accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-purple-50/20 to-pink-50/20 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10 rounded-3xl blur-2xl"></div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-[2px] shadow-2xl">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 relative z-10">
                {theme === "dark" ? (
                  <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/7-dark.png')] bg-cover opacity-40" />
                ) : (
                  <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/8-dark.png')] bg-cover opacity-40" />
                )}

                <div className="relative z-10 text-center mb-12">
                  <BlurFade delay={0.1} inView>
                    <div className="inline-block mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
                          <Sparkles size={36} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </BlurFade>
                  <BlurFade delay={0.2} inView>
                    <h3 className="text-3xl md:text-5xl md:h-[55px] font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      Technologies We Master
                    </h3>
                  </BlurFade>
                  <BlurFade delay={0.3} inView>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                      We use cutting-edge technologies to build fast, secure, and
                      scalable solutions
                    </p>
                  </BlurFade>
                </div>

                {/* Tech Icons Grid */}
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <BlurFade delay={0.15} inView>
                    <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 text-center border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                      <div className="relative z-10">
                        <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                          ⚡
                        </div>
                        <h4 className="font-bold mb-1 text-lg">Fast</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Lightning speed
                        </p>
                      </div>
                    </div>
                  </BlurFade>

                  <BlurFade delay={0.2} inView>
                    <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 text-center border-2 border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                      <div className="relative z-10">
                        <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                          🔒
                        </div>
                        <h4 className="font-bold mb-1 text-lg">Secure</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Bank-level security
                        </p>
                      </div>
                    </div>
                  </BlurFade>

                  <BlurFade delay={0.25} inView>
                    <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center border-2 border-green-200 dark:border-green-800 hover:border-green-500 dark:hover:border-green-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-500"></div>
                      <div className="relative z-10">
                        <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                          📈
                        </div>
                        <h4 className="font-bold mb-1 text-lg">Scalable</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Grows with you
                        </p>
                      </div>
                    </div>
                  </BlurFade>

                  <BlurFade delay={0.3} inView>
                    <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 text-center border-2 border-orange-200 dark:border-orange-800 hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-500"></div>
                      <div className="relative z-10">
                        <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                          🎨
                        </div>
                        <h4 className="font-bold mb-1 text-lg">Modern</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Latest tech
                        </p>
                      </div>
                    </div>
                  </BlurFade>
                </div>

                <BlurFade delay={0.35} inView>
                  <div className="flex justify-center items-center pointer-events-auto">
                    <IconCloud images={images} />
                  </div>
                </BlurFade>

                <BlurFade delay={0.4} inView>
                  <div className="flex items-center justify-center pointer-events-auto">
                    <Link href={`/${lang}/contact`}>
                      <GradientButton variant="primary" size="lg">
                        {dict?.sendRequest}
                        <TbArrowNarrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" />
                      </GradientButton>
                    </Link>
                  </div>
                </BlurFade>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-5xl font-bold mb-4">
              {dict.commonChallenges.title}
            </h3>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              {dict.commonChallenges.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
            <div className="bg-white dark:bg-gray-800/50 rounded-3xl p-8 border-2 border-pink-200 dark:border-pink-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl">
                  <TrendingUpDown size={32} className="text-white" />
                </div>
                <h5 className="text-2xl font-bold">
                  {dict.commonChallenges.revenueGrowth.title}
                </h5>
              </div>

              <ul className="space-y-3 dark:text-gray-300 text-gray-700">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <li key={num} className="flex items-start gap-3">
                    <TbCheck className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">
                      {dict.commonChallenges.revenueGrowth[num]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800/50 rounded-3xl p-8 border-2 border-cyan-200 dark:border-cyan-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl">
                  <ShieldAlert size={32} className="text-white" />
                </div>
                <h5 className="text-2xl font-bold">
                  {dict.commonChallenges.technicalSecurity.title}
                </h5>
              </div>

              <ul className="space-y-3 dark:text-gray-300 text-gray-700">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <li key={num} className="flex items-start gap-3">
                    <TbCheck className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">
                      {dict.commonChallenges.technicalSecurity[num]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mb-20">
            <Link href={`/${lang}/contact`}>
              <GradientButton variant="primary" size="lg">
                {dict?.sendRequest}
                <TbArrowNarrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" />
              </GradientButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
