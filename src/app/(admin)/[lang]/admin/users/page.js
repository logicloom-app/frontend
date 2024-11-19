"use client";

import { useMemo } from "react";
import EditUser from "./_components/EditUser";
import { formatDate } from "@/lib/utils/utils";
import { useGetUsers } from "@/lib/hooks/useAdmin";
import AddRemoveLoom from "./_components/AddRemoveLoom";

export default function Users() {
  const { data, isLoading } = useGetUsers();
  const { users } = data || {};

  const memoizedUsers = useMemo(() => users, [users]);

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
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Loom Balance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Joined
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y dark:divide-gray-200/20 divide-gray-600/20">
          {memoizedUsers
            ?.slice()
            .reverse()
            ?.map((user) => (
              <tr key={user?.id}>
                <td className="px-10 md:pl-16 py-4 whitespace-nowrap text-sm font-medium">
                  {user?.id}
                </td>
                <td>
                  <span className="font-bold text-base">{user?.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user?.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {user?.loom_balance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{user?.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {formatDate(user?.created_at)}
                </td>
                <td className="flex items-center gap-2 px-4 py-2">
                  <EditUser user={user} />
                  <AddRemoveLoom user={user} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
