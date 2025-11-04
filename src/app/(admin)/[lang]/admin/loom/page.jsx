"use client";

import { useGetLoomPricing } from "@/lib/hooks/useAdmin";
import EditLoomPrice from "./_components/EditLoomPrice";
import { formatDate } from "@/lib/utils/utils";
import BlurFade from "@/components/ui/blur-fade";
import { Atom, TrendingUp, Sparkles, Calendar } from "lucide-react";

export default function LoomPricing() {
  const { data, isLoading } = useGetLoomPricing();
  const { prices } = data || {};

  if (isLoading) {
    return (
      <div className="w-full h-full px-4 py-6 overflow-y-scroll max-h-[calc(100vh-6rem)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-4 py-6 overflow-y-scroll max-h-[calc(100vh-6rem)]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Gradient */}
        <BlurFade delay={0.1}>
          <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  Loom Token Pricing
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Atom className="w-4 h-4" />
                  Configure Loom token prices and packages
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-xl">
                <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span className="font-semibold text-sm">
                  {prices?.length || 0} Package{prices?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prices
            ?.slice()
            .reverse()
            ?.map((price, index) => (
              <BlurFade key={price?.id} delay={0.2 + index * 0.1}>
                <div className="group bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-1">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-teal-500/0 to-emerald-500/0 group-hover:from-cyan-500/5 group-hover:via-teal-500/5 group-hover:to-emerald-500/5 rounded-2xl transition-all duration-500"></div>

                  {/* Header */}
                  <div className="relative flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Atom className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-400">
                      ID: {price?.id}
                    </span>
                  </div>

                  {/* Package Name */}
                  <h3 className="relative text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {price?.name}
                  </h3>

                  {/* Amount */}
                  <div className="relative flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                      {price?.amount}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Loom Tokens
                    </span>
                  </div>

                  {/* Timestamps */}
                  <div className="relative space-y-2 mb-4 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>Created: {formatDate(price?.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>Updated: {formatDate(price?.updated_at)}</span>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="relative">
                    <EditLoomPrice price={price} />
                  </div>
                </div>
              </BlurFade>
            ))}
        </div>

        {/* Empty State */}
        {prices?.length === 0 && (
          <BlurFade delay={0.2}>
            <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-12 text-center">
              <Atom className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No pricing packages yet. Create your first package!
              </p>
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
