"use client";

import { useMemo, useState } from "react";
import { formatDate } from "@/lib/utils/utils";
import { BsPaypal, BsStripe } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPayments } from "@/lib/hooks/usePayments";
import { Check, CircleChevronDown, X } from "lucide-react";

export default function PaymentsList({ dict }) {
  const { data, isLoading } = useGetPayments();
  const { payments } = data || {};
  const [showScrollHint, setShowScrollHint] = useState(true);

  const memoizedPayments = useMemo(() => payments, [payments]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-10rem)] overflow-y-auto relative">
        <table className="min-w-full divide-y dark:divide-gray-200/30 divide-gray-600/30">
          <thead>
            <tr>
              <th className="px-10 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {dict?.amount}
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
                {dict?.currency}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {dict?.payment}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-200/20 divide-gray-600/20">
            {[...Array(6)].map((_, index) => (
              <tr key={index}>
                <td className="px-10 py-4 whitespace-nowrap text-sm font-medium">
                  <Skeleton className="h-6 w-24" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Skeleton className="h-6 w-16" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Skeleton className="h-6 w-32" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Skeleton className="h-6 w-32" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Skeleton className="h-6 w-16" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Skeleton className="h-6 w-16" />
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
    setShowScrollHint(scrollTop + clientHeight < scrollHeight - 200);
  };

  const isContentOverflowing = () => {
    const containerHeight = window.innerHeight - 10 * 16;
    const contentHeight = payments?.length * 48;
    return contentHeight > containerHeight;
  };

  return (
    <div
      className="w-full h-[calc(100vh-7rem)] overflow-y-auto relative"
      onScroll={handleScroll}
    >
      <table className="min-w-full divide-y dark:divide-gray-200/30 divide-gray-600/30">
        <thead>
          <tr>
            <th className="px-10 md:pl-16 py-3 text-left text-xs font-medium uppercase tracking-wider">
              {dict?.amount}
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
              {dict?.currency}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              {dict?.payment}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y dark:divide-gray-200/20 divide-gray-600/20">
          {memoizedPayments?.map((payment) => (
            <tr key={payment?.id}>
              <td className="px-10 md:pl-16 py-4 whitespace-nowrap text-sm font-medium">
                {payment?.currency === "EUR" ? "€" : payment?.currency}{" "}
                <span className="font-bold text-base">{payment?.amount}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {payment?.status === "completed" ? (
                  <span className="text-green-500">
                    <Check />
                  </span>
                ) : (
                  <span className="text-red-500">
                    <X />
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {formatDate(payment?.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {formatDate(payment?.updated_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {payment?.currency}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {payment?.payment_method === "paypal" && (
                  <BsPaypal className="text-xl text-blue-800" />
                )}
                {payment?.payment_method === "stripe" && (
                  <BsStripe className="text-xl text-indigo-500 bg-white rounded-[5px]" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showScrollHint &&
        isContentOverflowing() && ( // Check if content is overflowing
          <div className="text-gray-500 absolute bottom-0 md:right-2 max-md:left-4">
            <CircleChevronDown />
          </div>
        )}
    </div>
  );
}
