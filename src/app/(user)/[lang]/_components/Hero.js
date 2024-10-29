"use client";

import { useTheme } from "next-themes";
import Particles from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { TbArrowNarrowRight } from "react-icons/tb";

export default function Hero({ dict, lang }) {
  const { theme } = useTheme();

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl pointer-events-none">
      <h2
        className={`mb-4 px-4 md:px-0 whitespace-pre-wrap bg-gradient-to-b from-black to-cyan-500/80 bg-clip-text text-center font-semibold leading-none text-transparent dark:from-white dark:to-cyan-600/60 ${
          lang === "en"
            ? "lg:text-8xl md:text-7xl sm:text-6xl text-4xl lg:w-[900px] lg:min-h-[195px]"
            : "lg:text-7xl md:text-6xl sm:text-5xl text-4xl lg:w-[1000px] lg:min-h-[195px]"
        }`}
      >
        {dict?.hero}
      </h2>

      <p className="lg:w-[800px] md:w-[600px] px-10 md:px-0 mb-10 text-center font-light text-lg dark:text-gray-300">
        {dict?.heroDescription}
      </p>

      <div className="flex items-center gap-4 pointer-events-auto">
        <Button className="rounded-3xl transition-all duration-300 flex items-center gap-2 px-5 hover:bg-cyan-700 dark:hover:bg-cyan-400">
          {dict?.getStarted}
          <TbArrowNarrowRight size={20} />
        </Button>
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
