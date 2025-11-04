"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import DeleteRequest from "./DeleteRequest";
import RequestDetails from "./RequestDetails";
import { formatDate } from "@/lib/utils/utils";
import SendRequestForm from "./SendRequestForm";
import BlurFade from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { useGetRequests } from "@/lib/hooks/useProjects";
import RequestRejectedDialog from "./RequestRejectedDialog";
import { usePageTracking } from "@/lib/hooks/useAnalytics";
import {
  Check,
  Hourglass,
  Calendar,
  Plus,
  Sparkles,
  FolderInput,
} from "lucide-react";

export default function RequestsList({ dict, lang }) {
  const { data, isLoading } = useGetRequests();
  const { requests } = data || {};
  const { theme } = useTheme();

  usePageTracking("Requests List");

  const memoizedRequests = useMemo(() => requests, [requests]);

  if (isLoading) {
    return (
      <div className="w-full h-full px-4 py-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
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
          <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 dark:shadow-2xl dark:shadow-transparent">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {dict?.title || "Requests"}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <FolderInput className="w-4 h-4" />
                  {dict?.subtitle || "Manage your project requests"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl">
                  <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold text-sm">
                    {memoizedRequests?.length || 0} Request
                    {memoizedRequests?.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <SendRequestForm dict={dict} />
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Requests Grid */}
        {memoizedRequests?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {memoizedRequests
              ?.slice()
              .reverse()
              ?.map((request, index) => (
                <BlurFade key={request?.id} delay={0.2 + index * 0.1}>
                  <MagicCard
                    gradientOpacity={0.8}
                    gradientColor={theme === "dark" ? "#262626" : "#e9e9e9"}
                    className="rounded-3xl flex flex-col justify-between p-6 h-full bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-300 dark:border-gray-700/50 shadow-xl shadow-gray-300/60 dark:shadow-none hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-1"
                    additionalClassName="flex flex-col justify-between h-full"
                  >
                    <div className="space-y-4 flex-1">
                      {/* Header: ID + Status */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 rounded-xl">
                          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                            #{request?.id}
                          </span>
                        </div>
                        <div>
                          {request?.status === "accepted" ? (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/20">
                              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                              <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                {dict?.accepted || "Accepted"}
                              </span>
                            </div>
                          ) : request?.status === "rejected" ? (
                            <RequestRejectedDialog dict={dict} request={request} />
                          ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                              <Hourglass className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                              <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                                {dict?.pending || "Pending"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold line-clamp-2 min-h-[56px]">
                        {request?.title}
                      </h3>

                      {/* Dates */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                          <div className="p-1.5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-lg">
                            <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {dict?.createdAt || "Created"}
                            </span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {formatDate(request?.created_at)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                          <div className="p-1.5 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-lg">
                            <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {dict?.updatedAt || "Updated"}
                            </span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {formatDate(request?.updated_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <RequestDetails request={request} dict={dict} />
                      <DeleteRequest request={request} dict={dict} />
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
          </div>
        ) : (
          <BlurFade delay={0.2}>
            <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-12 text-center shadow-xl shadow-gray-200/50 dark:shadow-2xl dark:shadow-transparent">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center mb-6 mx-auto">
                <Plus className="w-12 h-12 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {dict?.no_requests || "No requests yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {dict?.create_first_request ||
                  "Create your first request to get started"}
              </p>
              <SendRequestForm dict={dict} />
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
