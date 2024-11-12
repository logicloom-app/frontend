"use client";

import { useMemo, useState } from "react";
import RequestDetails from "./RequestDetails";
import { formatDate } from "@/lib/utils/utils";
import SendRequestForm from "./SendRequestForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRequests } from "@/lib/hooks/useProjects";
import RequestRejectedDualog from "./RequestRejectedDualog";
import { Check, CircleChevronDown, Hourglass, MailQuestion } from "lucide-react";

export default function RequestsList({ dict }) {
  const { data, isLoading } = useGetRequests();
  const { requests } = data || {};
  const [showScrollHint, setShowScrollHint] = useState(true);

  const memoizedRequests = useMemo(() => requests, [requests]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-10rem)] overflow-y-auto relative">
        <div className="w-full flex p-10 pointer-events-none">
          <SendRequestForm dict={dict} />
        </div>

        <table className="min-w-full divide-y dark:divide-gray-200/30 divide-gray-600/30">
          <thead>
            <tr>
              <th className="px-10 py-3 text-left text-xs font-medium uppercase tracking-wider">
                #
              </th>
              <th className="px-10 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {dict?.id}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {dict?.title}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {dict?.status}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {dict?.createdAt}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {dict?.updatedAt}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {dict?.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-200/20 divide-gray-600/20">
            {[...Array(6)].map((_, index) => (
              <tr key={index}>
                <td className="px-10 py-4 whitespace-nowrap text-sm font-medium">
                  <Skeleton className="h-6 w-10" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Skeleton className="h-6 w-10" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Skeleton className="h-6 w-20" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Skeleton className="h-6 w-10" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Skeleton className="h-6 w-16" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Skeleton className="h-6 w-16" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Skeleton className="h-6 w-10" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    setShowScrollHint(scrollTop + clientHeight < scrollHeight - 250);
  };

  const isContentOverflowing = () => {
    const containerHeight = window.innerHeight - 10 * 16;
    const contentHeight = memoizedRequests?.length * 50;
    return contentHeight > containerHeight;
  };

  console.log(showScrollHint);

  return (
    <div className="w-full h-full">
      <div className="w-full flex p-10">
        <SendRequestForm dict={dict} />
      </div>

      <div
        className="w-full h-[calc(100vh-17rem)] relative border-t overflow-y-auto border-gray-600/50"
        onScroll={handleScroll}
      >
        {showScrollHint &&
          isContentOverflowing() && ( // Check if content is overflowing
            <div className="text-gray-500 absolute bottom-0 md:right-2 max-md:left-4">
              <CircleChevronDown />
            </div>
          )}
        {memoizedRequests?.length > 0 ? (
          <table className="min-w-full divide-y dark:divide-gray-200/30 divide-gray-600/30">
            <thead>
              <tr>
                <th className="px-10 md:pl-16 py-4 text-left text-xs font-medium uppercase tracking-wider">
                  #
                </th>
                <th className="px-10 md:pl-16 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  {dict?.id}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  {dict?.title}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  {dict?.status}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  {dict?.createdAt}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  {dict?.updatedAt}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  {dict?.actions}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y dark:divide-gray-200/20 divide-gray-600/20">
              {memoizedRequests?.map((request, index) => (
                <tr key={request?.id}>
                  <td className="px-10 md:pl-16 pr-0 py-4 whitespace-nowrap text-sm font-medium">
                    {index + 1}
                  </td>
                  <td className="px-10 md:pl-16 pr-0 py-4 whitespace-nowrap text-sm font-medium">
                    {request?.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm truncate max-w-[200px]">
                    {request?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {request?.status === "accepted" ? (
                      <span className="text-green-500">
                        <Check />
                      </span>
                    ) : request?.status === "rejected" ? (
                      <RequestRejectedDualog dict={dict} request={request} />
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-500">
                        <Hourglass />
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatDate(request?.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatDate(request?.updated_at)}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm">
                    <RequestDetails request={request} dict={dict} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full p-10 flex items-center justify-center">
            <p className="text-gray-500">{dict?.no_requests}</p>
          </div>
        )}
      </div>
    </div>
  );
}
