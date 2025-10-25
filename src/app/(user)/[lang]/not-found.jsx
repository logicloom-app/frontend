"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { TbArrowLeft, TbHome, TbMoodSad } from "react-icons/tb";
import Particles from "@/components/ui/particles";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { lang } = useParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  const messages = {
    en: {
      title: "Page Not Found",
      description:
        "Oops! The page you're looking for doesn't exist. It might have been moved or deleted.",
      home: "Back to Home",
      back: "Go Back",
      errorCode: "Error Code:",
    },
    de: {
      title: "Seite nicht gefunden",
      description:
        "Hoppla! Die gesuchte Seite existiert nicht. Sie wurde möglicherweise verschoben oder gelöscht.",
      home: "Zurück zur Startseite",
      back: "Zurück",
      errorCode: "Fehlercode:",
    },
  };

  const dict = messages[lang] || messages.en;

  return (
    <div className="relative flex min-h-[calc(100vh-400px)] flex-col items-center justify-center overflow-hidden">
      {/* Background Particles */}
      {mounted && (
        <Particles
          className="absolute inset-0"
          quantity={80}
          ease={80}
          color={theme === "dark" ? "#ffffff" : "#000000"}
          refresh
        />
      )}

      {/* Decorative Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center py-16">
        {/* 404 Number with Gradient */}
        <div className="mb-8 relative">
          <h1 className="text-[180px] md:text-[250px] font-black leading-none bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
            404
          </h1>
          <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        </div>

        {/* Sad Icon */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-full p-6 border-4 border-blue-500/20 dark:border-purple-500/20">
            <TbMoodSad className="w-16 h-16 text-gray-600 dark:text-gray-400" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{dict.title}</h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          {dict.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/${lang}`}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <TbHome className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            {dict.home}
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-purple-500 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <TbArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {dict.back}
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-500">
          {dict.errorCode} <span className="font-mono font-bold">404</span>
        </div>
      </div>

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
