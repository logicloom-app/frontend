"use client";

import { useGetLoomPricing } from "@/lib/hooks/useAdmin";
import EditLoomPrice from "./_components/EditLoomPrice";
import { formatDate } from "@/lib/utils/utils";

export default function LoomPricing() {
  const { data, isLoading } = useGetLoomPricing();
  const { prices } = data || {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-[calc(100vh-7rem)] overflow-y-auto relative">
      <table className="min-w-full divide-y dark:divide-gray-200/30 divide-gray-600/30">
        <thead>
          <tr>
            <th className="px-10 md:pl-16 py-3 text-left text-xs font-medium uppercase tracking-wider">
              ID
            </th>
            <th className="px-10 md:pl-16 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              created_at
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              updated_at
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y dark:divide-gray-200/20 divide-gray-600/20">
          {prices
            ?.slice()
            .reverse()
            ?.map((price) => (
              <tr key={price?.id}>
                <td className="px-10 md:pl-16 py-4 whitespace-nowrap text-sm font-medium">
                  {price?.id}
                </td>
                <td className="px-10 md:pl-16 py-4 whitespace-nowrap text-sm font-medium">
                  {price?.name}
                </td>
                <td>
                  <span className="font-bold text-base">{price?.amount}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatDate(price?.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatDate(price?.updated_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <EditLoomPrice price={price} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
