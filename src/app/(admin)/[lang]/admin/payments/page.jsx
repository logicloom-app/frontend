"use client";

import { useMemo } from "react";
import { formatDate } from "@/lib/utils/utils";
import { BsPaypal, BsStripe } from "react-icons/bs";
import { useGetPayments } from "@/lib/hooks/useAdmin";
import { CheckCircle2, XCircle, Euro, Calendar, User, Sparkles } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

export default function AdminPayments() {
  const { data, isLoading } = useGetPayments();
  const { payments } = data || {};

  const memoizedPayments = useMemo(() => payments, [payments]);

  if (isLoading) {
    return (
      <div className="w-full h-full px-4 py-6 overflow-y-scroll max-h-[calc(100vh-6rem)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
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
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">
                  Payments
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Euro className="w-4 h-4" />
                  Track and manage all payment transactions
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl">
                <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <span className="font-semibold text-sm">
                  {memoizedPayments?.length || 0} Payment{memoizedPayments?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Payments Table */}
        <BlurFade delay={0.2}>
          <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Updated At
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Payment Method
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {memoizedPayments
                    ?.slice()
                    .reverse()
                    ?.map((payment, index) => (
                      <tr
                        key={payment?.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {payment?.user_id}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {payment?.currency === "EUR" ? "€" : payment?.currency}
                              {payment?.amount}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment?.status === "completed" ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                Completed
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                              <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                                Failed
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {formatDate(payment?.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {formatDate(payment?.updated_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {payment?.payment_method === "paypal" && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg w-fit">
                              <BsPaypal className="text-xl text-blue-600 dark:text-blue-400" />
                              <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                                PayPal
                              </span>
                            </div>
                          )}
                          {payment?.payment_method === "stripe" && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg w-fit">
                              <BsStripe className="text-xl text-indigo-600 dark:text-indigo-400" />
                              <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">
                                Stripe
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </BlurFade>

        {/* Empty State */}
        {memoizedPayments?.length === 0 && (
          <BlurFade delay={0.2}>
            <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-12 text-center">
              <Euro className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No payments yet. Waiting for transactions!
              </p>
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
