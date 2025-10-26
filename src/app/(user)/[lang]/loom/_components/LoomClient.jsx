"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  Clock,
  MessageCircle,
  LayoutDashboard,
  Zap,
  Rocket,
} from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import Meteors from "@/components/ui/meteors";

export default function LoomClient({ dict }) {
  const { lang } = useParams();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 md:p-10 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-5xl w-full">
        <BlurFade delay={0.1} inView>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-5 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl relative group">
                <Sparkles className="w-10 h-10 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl animate-pulse opacity-30" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent pb-1 leading-tight">
              {dict?.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
              {dict?.subtitle}
            </p>
          </div>
        </BlurFade>

        {/* Main Card */}
        <BlurFade delay={0.2} inView>
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 border-2 border-emerald-200 dark:border-emerald-900/50 shadow-2xl shadow-emerald-500/10 dark:shadow-emerald-500/5 relative overflow-hidden">
            <Meteors number={30} />

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Coming Soon Badge */}
              <div className="flex justify-center mb-10">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 border-2 border-amber-500/40 dark:border-amber-400/40 rounded-full shadow-lg shadow-amber-500/20 backdrop-blur-sm">
                  <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400 animate-pulse" />
                  <span className="text-base font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 dark:from-amber-400 dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent uppercase tracking-wider">
                    {dict?.comingSoon}
                  </span>
                  <Rocket className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>

              {/* Main Message */}
              <div className="text-center mb-10">
                <div className="mb-8 p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 rounded-3xl border-2 border-emerald-200/50 dark:border-emerald-900/50 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      <Sparkles className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                      <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
                      {dict?.futureFeature}
                    </p>
                    <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {dict?.futureFeatureDescription}
                    </p>
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-5 bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-cyan-900/30 rounded-2xl border-2 border-emerald-300/50 dark:border-emerald-700/50 shadow-md">
                  <div className="flex items-center justify-center gap-3 text-base font-semibold">
                    <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 dark:from-emerald-300 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
                      {dict?.one_euro_equals_five_looms}
                    </span>
                    <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <Link href={`/${lang}/contact`} className="w-full group">
                  <Button className="w-full rounded-full h-14 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-bold text-base shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <MessageCircle className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">{dict?.contactForInfo}</span>
                    <ArrowRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>

                <Link href={`/${lang}/dashboard`} className="w-full group">
                  <Button
                    variant="outline"
                    className="w-full rounded-full h-14 border-2 border-emerald-600 dark:border-emerald-500 font-bold text-base text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:border-emerald-700 dark:hover:border-emerald-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <LayoutDashboard className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    {dict?.goToDashboard}
                  </Button>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="pt-8 border-t-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl">
                  <span className="text-2xl">💡</span>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                    {dict?.payment_methods_unavailable}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
