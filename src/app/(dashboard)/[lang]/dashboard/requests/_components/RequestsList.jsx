"use client";

import { useMemo } from "react";
import DeleteRequest from "./DeleteRequest";
import RequestDetails from "./RequestDetails";
import { formatDate } from "@/lib/utils/utils";
import SendRequestForm from "./SendRequestForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRequests } from "@/lib/hooks/useProjects";
import RequestRejectedDialog from "./RequestRejectedDialog";
import { Check, Hourglass, Calendar, Plus } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

export default function RequestsList({ dict, lang }) {
  const { data, isLoading } = useGetRequests();
  const { requests } = data || {};

  const memoizedRequests = useMemo(() => requests, [requests]);

  if (isLoading) {
    return (
      <div className="w-full h-full p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-48 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 md:p-6 overflow-auto">
      <div className="max-w-7xl md:px-4 mx-auto scrollarea overflow-y-scroll max-h-[calc(100vh-10rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent pb-1">
              {dict?.title || "Requests"}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {memoizedRequests?.length || 0} {dict?.total || "total requests"}
            </p>
          </div>
          <SendRequestForm dict={dict} />
        </div>

        {/* Requests Grid */}
        {memoizedRequests?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {memoizedRequests
              ?.slice()
              .reverse()
              ?.map((request, index) => (
                <BlurFade key={request?.id} delay={0.1 + index * 0.05} inView>
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 relative group">
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {request?.status === "accepted" ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            {dict?.accepted || "Accepted"}
                          </span>
                        </div>
                      ) : request?.status === "rejected" ? (
                        <RequestRejectedDialog dict={dict} request={request} />
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                          <Hourglass className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                          <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                            {dict?.pending || "Pending"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Request ID */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      #{request?.id}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 min-h-[56px]">
                      {request?.title}
                    </h3>

                    {/* Dates */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">
                          {dict?.createdAt || "Created"}:{" "}
                          {formatDate(request?.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">
                          {dict?.updatedAt || "Updated"}:{" "}
                          {formatDate(request?.updated_at)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <RequestDetails request={request} dict={dict} />
                      <DeleteRequest request={request} dict={dict} />
                    </div>
                  </div>
                </BlurFade>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-4">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
              {dict?.no_requests || "No requests yet"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
              {dict?.create_first_request ||
                "Create your first request to get started"}
            </p>
            <SendRequestForm dict={dict} />
          </div>
        )}
      </div>
    </div>
  );
}
