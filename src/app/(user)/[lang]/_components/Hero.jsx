"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import BlurFade from "@/components/ui/blur-fade";
import Particles from "@/components/ui/particles";
import { useAnalytics } from "@/lib/hooks/useAnalytics";
import { TbArrowNarrowRight, TbSparkles } from "react-icons/tb";
import { GradientButton } from "@/components/ui/gradient-button";

export default function Hero({ dict, lang }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { trackClick } = useAnalytics();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex min-h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background pointer-events-none">
      {/* Subtle gradient background effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* Floating badge */}
      <BlurFade delay={0.1} inView>
        <div className="mb-8 px-6 py-2 mt-6 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 dark:border-purple-500/20 backdrop-blur-sm pointer-events-auto">
          <div className="flex items-center gap-2">
            <TbSparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {dict?.welcomeToFuture}
            </span>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <h2
          className={`mb-6 px-4 md:px-0 whitespace-pre-wrap bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-center font-black leading-none text-transparent ${
            lang === "en"
              ? "lg:text-7xl md:text-6xl sm:text-6xl text-4xl lg:w-[900px] lg:min-h-[160px]"
              : "lg:text-7xl md:text-6xl sm:text-5xl text-4xl lg:w-[1000px] lg:min-h-[120px]"
          }`}
          style={{
            textShadow: "0 0 60px rgba(59, 130, 246, 0.3)",
          }}
        >
          {dict?.hero}
        </h2>
      </BlurFade>

      <BlurFade delay={0.3} inView>
        <p className="lg:w-[800px] md:w-[600px] px-10 md:px-0 mb-12 text-center text-xl font-light text-gray-700 dark:text-gray-300 leading-relaxed">
          {dict?.heroDescription}
        </p>
      </BlurFade>

      <BlurFade delay={0.4} inView>
        <div className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
          <Link
            href={`/${lang}/contact`}
            className="relative group"
            onClick={() => trackClick("Contact Us CTA", "Hero")}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <GradientButton variant="primary" size="lg" className="relative">
              {dict?.contactUs}
              <TbArrowNarrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </GradientButton>
          </Link>

          <Link
            href={`/${lang}/services`}
            onClick={() => trackClick("Our Services Button", "Hero")}
          >
            <button className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-purple-500 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
              {dict?.ourServices}
            </button>
          </Link>
        </div>
      </BlurFade>

      {/* Stats badges */}
      <BlurFade delay={0.5} inView>
        <div className="mt-16 grid grid-cols-3 gap-8 pointer-events-auto">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              100+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {dict?.projects}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              50+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {dict?.clients}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {dict?.support}
            </div>
          </div>
        </div>
      </BlurFade>

      {mounted && (
        <Particles
          className="absolute inset-0"
          quantity={150}
          ease={80}
          color={theme === "dark" ? "#ffffff" : "#000000"}
          refresh
        />
      )}
    </div>
  );
}
