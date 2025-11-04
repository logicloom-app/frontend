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
  Monitor,
  Server,
  Smartphone,
  GitBranch,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import BlurFade from "@/components/ui/blur-fade";
import { IconCloud } from "@/components/ui/icon-cloud";
import { TbArrowNarrowRight, TbCheck } from "react-icons/tb";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { GradientButton } from "@/components/ui/gradient-button";
import Meteors from "@/components/ui/meteors";

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
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-sky-500/10 to-cyan-500/10 border border-sky-500/20 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-300 mb-4 shadow-md">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-bold">
                    {dict.commonChallenges.titleBadge}
                  </span>
                </div>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <h3 className="text-3xl md:text-5xl lg:h-[55px] font-black mb-6 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-cyan-400 dark:to-rose-500 bg-clip-text text-transparent">
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
                <div className="group relative bg-white dark:bg-gray-800/50 rounded-[2rem] p-8 border-2 border-pink-200 dark:border-pink-800/50 hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-[0_20px_60px_-15px_rgba(236,72,153,0.3)] hover:-translate-y-3 transition-all duration-500 overflow-hidden backdrop-blur-sm">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-rose-500/0 to-pink-500/0 group-hover:from-pink-500/5 group-hover:via-rose-500/10 group-hover:to-pink-500/5 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <div className="relative p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
                          <TrendingUpDown
                            size={32}
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                      <h5 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
                        {dict.commonChallenges.revenueGrowth.title}
                      </h5>
                    </div>

                    <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <li
                          key={num}
                          className="flex items-start gap-3 group/item hover:translate-x-2 transition-transform duration-200"
                        >
                          <div className="relative mt-1">
                            <div className="absolute inset-0 bg-pink-500/30 rounded-full blur group-hover/item:blur-md transition-all"></div>
                            <TbCheck className="relative w-5 h-5 text-pink-500 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                          </div>
                          <span className="text-base">
                            {dict.commonChallenges.revenueGrowth[num]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView as="div">
                <div className="group relative bg-white dark:bg-gray-800/50 rounded-[2rem] p-8 border-2 border-cyan-200 dark:border-cyan-800/50 hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] hover:-translate-y-3 transition-all duration-500 overflow-hidden backdrop-blur-sm">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/10 group-hover:to-cyan-500/5 transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <div className="relative p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
                          <ShieldAlert
                            size={32}
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                      <h5 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                        {dict.commonChallenges.technicalSecurity.title}
                      </h5>
                    </div>

                    <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <li
                          key={num}
                          className="flex items-start gap-3 group/item hover:translate-x-2 transition-transform duration-200"
                        >
                          <div className="relative mt-1">
                            <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur group-hover/item:blur-md transition-all"></div>
                            <TbCheck className="relative w-5 h-5 text-cyan-500 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                          </div>
                          <span className="text-base">
                            {dict.commonChallenges.technicalSecurity[num]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Solution Section */}
          <div className="relative w-full max-w-7xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent dark:via-purple-950/10 rounded-3xl blur-2xl"></div>

            <div className="relative z-10 text-center mb-16">
              <BlurFade delay={0.1} inView>
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 mb-4 shadow-md">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-bold">
                    {dict.solution.titleBadge}
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
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: CodeXml,
                  color: "from-yellow-500 to-orange-500",
                  delay: 0.1,
                  index: 1,
                },
                {
                  icon: MonitorCheck,
                  color: "from-rose-500 to-pink-500",
                  delay: 0.15,
                  index: 2,
                },
                {
                  icon: Grid2x2Check,
                  color: "from-blue-500 to-cyan-500",
                  delay: 0.2,
                  index: 3,
                },
                {
                  icon: FileSearch,
                  color: "from-emerald-500 to-green-500",
                  delay: 0.25,
                  index: 4,
                },
                {
                  icon: Cable,
                  color: "from-violet-500 to-purple-500",
                  delay: 0.3,
                  index: 5,
                },
              ].map(({ icon: Icon, color, delay, index }) => (
                <BlurFade key={index} delay={delay} inView as="div">
                  <div className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 h-full overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    <div className="relative z-10">
                      <div className="mb-6">
                        <div className="relative inline-block">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity`}
                          ></div>
                          <div
                            className={`relative p-4 bg-gradient-to-br ${color} rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}
                          >
                            <Icon size={28} className="text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                        {dict.solution.professionalDevelopment[index]}
                      </p>
                    </div>

                    {/* Shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </BlurFade>
              ))}

              <BlurFade delay={0.35} inView as="div">
                <Link
                  href={`/${lang}/contact`}
                  className="group relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 h-full flex items-center justify-center overflow-hidden"
                >
                  <Meteors number={15} />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative z-10 flex flex-col items-center gap-4 text-white">
                    <div className="relative">
                      <div className="absolute inset-0 bg-yellow-300 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                      <Zap
                        size={40}
                        className="relative text-yellow-300 group-hover:scale-125 transition-transform"
                      />
                    </div>
                    <span className="font-black text-center text-2xl">
                      {dict?.getStartedToday}
                    </span>
                    <TbArrowNarrowRight
                      size={28}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </div>
                </Link>
              </BlurFade>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="relative w-full max-w-7xl mx-auto mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-purple-50/20 to-pink-50/20 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10 rounded-3xl blur-3xl"></div>

            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-[3px] shadow-2xl">
              <div className="bg-white dark:bg-gray-900 rounded-[2.4rem] p-10 md:p-14 relative">
                {theme === "dark" ? (
                  <div className="absolute inset-0 bg-bottom bg-no-repeat bg-[url('/images/7-dark.png')] bg-cover opacity-30 rounded-[2.4rem]" />
                ) : (
                  <div className="absolute inset-0 bg-bottom bg-no-repeat bg-[url('/images/8-dark.png')] bg-cover opacity-30 rounded-[2.4rem]" />
                )}

                <div className="relative z-10 text-center mb-14">
                  <BlurFade delay={0.1} inView>
                    <div className="inline-block mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
                          <Sparkles
                            size={36}
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </BlurFade>
                  <BlurFade delay={0.2} inView>
                    <h3 className="text-3xl md:text-5xl md:h-[55px] font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      {dict?.techStack?.title}
                    </h3>
                  </BlurFade>
                  <BlurFade delay={0.3} inView>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                      {dict?.techStack?.description}
                    </p>
                  </BlurFade>
                </div>

                {/* Tech Icons Grid */}
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  {[
                    {
                      emoji: "⚡",
                      color: "blue",
                      title: dict?.techStack?.fast?.title,
                      desc: dict?.techStack?.fast?.description,
                      delay: 0.15,
                    },
                    {
                      emoji: "🔒",
                      color: "purple",
                      title: dict?.techStack?.secure?.title,
                      desc: dict?.techStack?.secure?.description,
                      delay: 0.2,
                    },
                    {
                      emoji: "📈",
                      color: "green",
                      title: dict?.techStack?.scalable?.title,
                      desc: dict?.techStack?.scalable?.description,
                      delay: 0.25,
                    },
                    {
                      emoji: "🎨",
                      color: "orange",
                      title: dict?.techStack?.modern?.title,
                      desc: dict?.techStack?.modern?.description,
                      delay: 0.3,
                    },
                  ].map(({ emoji, color, title, desc, delay }, i) => (
                    <BlurFade key={i} delay={delay} inView>
                      <div
                        className={`group relative bg-gradient-to-br from-${color}-50 to-${color}-100 dark:from-${color}-900/20 dark:to-${color}-800/20 rounded-3xl p-6 text-center border-2 border-${color}-200 dark:border-${color}-800 hover:border-${color}-500 dark:hover:border-${color}-500 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br from-${color}-500/0 to-${color}-600/0 group-hover:from-${color}-500/10 group-hover:to-${color}-600/10 transition-all duration-500`}
                        ></div>
                        <div className="relative z-10">
                          <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                            {emoji}
                          </div>
                          <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
                            {title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {desc}
                          </p>
                        </div>
                      </div>
                    </BlurFade>
                  ))}
                </div>

                {/* Tech Stack Categories */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
                  <BlurFade delay={0.35} inView>
                    <div className="flex justify-center items-center pointer-events-auto min-h-[400px]">
                      <IconCloud images={images} />
                    </div>
                  </BlurFade>

                  {/* Right Side - Tech Stack Categories */}
                  <div className="space-y-6">
                    {/* Frontend */}
                    <BlurFade delay={0.4} inView>
                      <div className="group cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Monitor className="text-white w-5 h-5 drop-shadow-lg" />
                          </div>
                          <h4 className="font-bold text-xl text-gray-800 dark:text-gray-200">
                            Frontend Development
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-13">
                          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            React
                          </span>
                          <span className="px-3 py-1 bg-gray-700/10 border border-gray-600/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            Next.js
                          </span>
                          <span className="px-3 py-1 bg-blue-600/10 border border-blue-600/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            TypeScript
                          </span>
                          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            Tailwind CSS
                          </span>
                        </div>
                      </div>
                    </BlurFade>

                    {/* Backend */}
                    <BlurFade delay={0.45} inView>
                      <div className="group cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Server className="text-white w-5 h-5 drop-shadow-lg" />
                          </div>
                          <h4 className="font-bold text-xl text-gray-800 dark:text-gray-200">
                            Backend Development
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-13">
                          <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            Node.js
                          </span>
                          <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            Golang
                          </span>
                          <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            Python
                          </span>
                          <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            PostgreSQL
                          </span>
                          <span className="px-3 py-1 bg-green-600/10 border border-green-600/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            Microservices
                          </span>
                        </div>
                      </div>
                    </BlurFade>

                    {/* Mobile */}
                    <BlurFade delay={0.5} inView>
                      <div className="group cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Smartphone className="text-white w-5 h-5 drop-shadow-lg" />
                          </div>
                          <h4 className="font-bold text-xl text-gray-800 dark:text-gray-200">
                            Mobile Development
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-13">
                          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            React Native
                          </span>
                          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            Flutter
                          </span>
                          <span className="px-3 py-1 bg-gray-700/10 border border-gray-600/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            Swift
                          </span>
                          <span className="px-3 py-1 bg-green-600/10 border border-green-600/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            Kotlin
                          </span>
                        </div>
                      </div>
                    </BlurFade>

                    {/* CI/CD & DevOps */}
                    <BlurFade delay={0.55} inView>
                      <div className="group cursor-pointer">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <GitBranch className="text-white w-5 h-5 drop-shadow-lg" />
                          </div>
                          <h4 className="font-bold text-xl text-gray-800 dark:text-gray-200">
                            CI/CD & DevOps
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-13">
                          <span className="px-3 py-1 bg-blue-400/10 border border-blue-400/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            Docker
                          </span>
                          <span className="px-3 py-1 bg-blue-600/10 border border-blue-600/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            Kubernetes
                          </span>
                          <span className="px-3 py-1 bg-gray-700/10 border border-gray-600/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            GitHub Actions
                          </span>
                          <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            GitLab CI
                          </span>
                        </div>
                      </div>
                    </BlurFade>
                  </div>
                </div>

                <BlurFade delay={0.5} inView>
                  <div className="flex items-center justify-center pointer-events-auto mt-4">
                    <Link href={`/${lang}/contact`}>
                      <div className="group relative inline-flex items-center justify-center gap-3 px-6 py-4 text-md font-bold text-white rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 shadow-xl shadow-sky-500/20 dark:shadow-teal-500/20 hover:shadow-[0_20px_80px_-15px_rgba(59,130,246,0.6)] dark:hover:shadow-[0_20px_80px_-15px_rgba(147,51,234,0.6)]">
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-indigo-600 to-teal-600 transition-all duration-500 group-hover:scale-110"></div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                        {/* Glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-indigo-400 to-teal-400 blur-2xl"></div>
                        </div>

                        {/* Content */}
                        <span className="relative z-10 drop-shadow-lg">
                          {dict?.sendRequest}
                        </span>
                        <TbArrowNarrowRight className="relative z-10 w-6 h-6 transition-transform duration-500 group-hover:translate-x-2 drop-shadow-lg" />
                      </div>
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
                  <TrendingUpDown size={32} className="text-white drop-shadow-lg" />
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
                  <ShieldAlert size={32} className="text-white drop-shadow-lg" />
                </div>
                <h5 className="text-2xl font-bold">
                  {dict.commonChallenges.technicalSecurity.title}
                </h5>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
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

          <div className="text-center">
            <Link href={`/${lang}/contact`}>
              <div className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-white rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_80px_-15px_rgba(59,130,246,0.6)] dark:hover:shadow-[0_20px_80px_-15px_rgba(147,51,234,0.6)]">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 transition-all duration-500 group-hover:scale-110"></div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 blur-2xl"></div>
                </div>

                {/* Content */}
                <span className="relative z-10 drop-shadow-lg">
                  {dict?.sendRequest}
                </span>
                <TbArrowNarrowRight className="relative z-10 w-6 h-6 transition-transform duration-500 group-hover:translate-x-2 drop-shadow-lg" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
