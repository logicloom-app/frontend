"use client";

import { useMemo, useState } from "react";
import { formatDate } from "@/lib/utils/utils";
import { BsPaypal, BsStripe } from "react-icons/bs";
import { useGetPayments } from "@/lib/hooks/useAdmin";
import { Check, X } from "lucide-react";

export default function AdminPayments() {
  const { data, isLoading } = useGetPayments();
  const { payments } = data || {};

  const memoizedPayments = useMemo(() => payments, [payments]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-[calc(100vh-7rem)] overflow-y-auto relative">
      <table className="min-w-full divide-y dark:divide-gray-200/30 divide-gray-600/30">
        <thead>
          <tr>
            <th className="px-10 md:pl-16 py-3 text-left text-xs font-medium uppercase tracking-wider">
              #
            </th>
            <th className="px-10 md:pl-16 py-3 text-left text-xs font-medium uppercase tracking-wider">
              User ID
            </th>
            <th className="px-10 md:pl-16 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Updated At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Currency
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Payment Method
            </th>
          </tr>
        </thead>

        <tbody className="divide-y dark:divide-gray-200/20 divide-gray-600/20">
          {memoizedPayments
            ?.slice()
            .reverse()
            ?.map((payment, index) => (
              <tr key={payment?.id}>
                <td className="px-10 md:pl-16 py-4 whitespace-nowrap text-sm font-medium">
                  {index + 1}
                </td>
                <td className="px-10 md:pl-16 py-4 whitespace-nowrap text-sm font-medium">
                  {payment?.user_id}
                </td>
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
    </div>
  );
}
