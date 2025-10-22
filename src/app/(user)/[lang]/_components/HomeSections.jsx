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
import { TbArrowNarrowRight, TbCheck } from "react-icons/tb";
import { IconCloud } from "@/components/ui/icon-cloud";
import GradualSpacing from "@/components/ui/gradual-spacing";

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
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-5xl lg:h-[55px] font-bold mb-4 bg-gradient-to-r from-pink-600 to-cyan-600 dark:from-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {dict.commonChallenges.title}
              </h3>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                {dict.commonChallenges.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <BlurFade delay={0.1} inView as="div">
                <div className="group bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 rounded-3xl p-8 border-2 border-pink-200 dark:border-pink-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
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
              </BlurFade>

              <BlurFade delay={0.2} inView as="div">
                <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-3xl p-8 border-2 border-cyan-200 dark:border-cyan-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
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
              </BlurFade>
            </div>
          </div>

          {/* Solution Section */}
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex flex-col sm:flex-row text-3xl md:text-5xl font-bold items-center justify-center gap-2 mb-4">
                <span>{dict.solution.title}</span>
                <GradualSpacing
                  text={dict.solution.title2}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                />
              </div>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {dict.solution.description}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-fr">
              <BlurFade delay={0.1} inView as="div" className="h-full">
                <div className="group bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Icon at top left, not spanning full row */}
                  <div className="mb-4 flex items-center">
                    <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mr-3">
                      <CodeXml size={24} className="text-white" />
                    </div>
                    {/* empty span for alignment (could add title if needed) */}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {dict.solution.professionalDevelopment[1]}
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} inView as="div" className="h-full">
                <div className="group bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-4 flex items-center">
                    <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl mr-3">
                      <MonitorCheck size={24} className="text-white" />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {dict.solution.professionalDevelopment[2]}
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView as="div" className="h-full">
                <div className="group bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-4 flex items-center">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mr-3">
                      <Grid2x2Check size={24} className="text-white" />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {dict.solution.professionalDevelopment[3]}
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.25} inView as="div" className="h-full">
                <div className="group bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-4 flex items-center">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl mr-3">
                      <FileSearch size={24} className="text-white" />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {dict.solution.professionalDevelopment[4]}
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.3} inView as="div" className="h-full">
                <div className="group bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-4 flex items-center">
                    <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl mr-3">
                      <Cable size={24} className="text-white" />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {dict.solution.professionalDevelopment[5]}
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.35} inView as="div" className="h-full">
                <div className="group bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex items-center justify-center">
                  <Link
                    href={`/${lang}/contact`}
                    className="pointer-events-auto flex flex-col items-center gap-3 text-white"
                  >
                    <Zap size={32} className="text-yellow-300" />
                    <span className="font-semibold text-center">
                      {dict?.getStartedToday}
                    </span>
                    <TbArrowNarrowRight
                      size={24}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="w-full max-w-7xl mx-auto mb-20">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 relative z-10">
                {theme === "dark" ? (
                  <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/7-dark.png')] bg-cover opacity-40" />
                ) : (
                  <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/8-dark.png')] bg-cover opacity-40" />
                )}

                <div className="text-center mb-8">
                  <BlurFade delay={0.1} inView>
                    <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4">
                      <Sparkles size={32} className="text-white" />
                    </div>
                    <h3 className="text-3xl md:text-5xl md:h-[55px] font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      Technologies We Master
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                      We use cutting-edge technologies to build fast, secure, and
                      scalable solutions
                    </p>
                  </BlurFade>
                </div>

                {/* Tech Icons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <BlurFade delay={0.15} inView>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="text-3xl mb-2">⚡</div>
                      <h4 className="font-semibold mb-1">Fast</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Lightning speed
                      </p>
                    </div>
                  </BlurFade>

                  <BlurFade delay={0.2} inView>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="text-3xl mb-2">🔒</div>
                      <h4 className="font-semibold mb-1">Secure</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Bank-level security
                      </p>
                    </div>
                  </BlurFade>

                  <BlurFade delay={0.25} inView>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center border border-green-200 dark:border-green-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="text-3xl mb-2">📈</div>
                      <h4 className="font-semibold mb-1">Scalable</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Grows with you
                      </p>
                    </div>
                  </BlurFade>

                  <BlurFade delay={0.3} inView>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 text-center border border-orange-200 dark:border-orange-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="text-3xl mb-2">🎨</div>
                      <h4 className="font-semibold mb-1">Modern</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Latest tech
                      </p>
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
                    <Link href={`/${lang}/request`} className="relative group">
                      <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-2xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                        <span className="relative z-10 block px-6 py-3 rounded-2xl bg-gray-950">
                          <div className="relative z-10 flex items-center space-x-2">
                            <span className="transition-all duration-500 group-hover:translate-x-1 text-nowrap">
                              {dict?.sendRequest}
                            </span>
                            <TbArrowNarrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" />
                          </div>
                        </span>
                      </button>
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
            <Link
              href={`/${lang}/request`}
              className="relative group pointer-events-auto"
            >
              <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-2xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10 block px-6 py-3 rounded-2xl bg-gray-950">
                  <div className="relative z-10 flex items-center space-x-2">
                    <span className="transition-all duration-500 group-hover:translate-x-1">
                      {dict?.sendRequest}
                    </span>
                    <TbArrowNarrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                </span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
