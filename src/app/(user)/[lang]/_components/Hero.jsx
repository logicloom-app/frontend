"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { TbArrowNarrowRight } from "react-icons/tb";
import Link from "next/link";

export default function Hero({ dict, lang }) {
  const { theme } = useTheme();

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background pointer-events-none">
      <h2
        className={`mb-4 px-4 md:px-0 whitespace-pre-wrap bg-gradient-to-b from-black to-cyan-500/80 bg-clip-text text-center font-semibold leading-none text-transparent dark:from-white dark:to-cyan-600/60 ${
          lang === "en"
            ? "lg:text-8xl md:text-6xl sm:text-6xl text-4xl lg:w-[900px] lg:min-h-[204px]"
            : "lg:text-7xl md:text-6xl sm:text-5xl text-4xl lg:w-[1000px] lg:min-h-[120px]"
        }`}
      >
        {dict?.hero}
      </h2>

      <p className="lg:w-[800px] md:w-[600px] px-10 md:px-0 mb-10 text-center font-light text-lg dark:text-gray-300">
        {dict?.heroDescription}
      </p>

      <div className="flex items-center gap-4 pointer-events-auto">
        <Link href={`/${lang}/request`} className="relative group">
          <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-2xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10 block px-6 py-3 rounded-2xl bg-gray-950">
              <div className="relative z-10 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1">
                  {dict?.getStarted}
                </span>
                <TbArrowNarrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" />
              </div>
            </span>
          </button>
        </Link>
      </div>

      <Particles
        className="absolute inset-0"
        quantity={120}
        ease={80}
        color={theme === "dark" ? "#ffffff" : "#000000"}
        refresh
      />
    </div>
  );
}
