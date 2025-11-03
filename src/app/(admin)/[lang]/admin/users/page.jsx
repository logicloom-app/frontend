"use client";

import { useMemo } from "react";
import EditUser from "./_components/EditUser";
import { formatDate } from "@/lib/utils/utils";
import { useGetUsers } from "@/lib/hooks/useAdmin";
import UserPayments from "./_components/UserPayments";
import AddRemoveLoom from "./_components/AddRemoveLoom";
import BlurFade from "@/components/ui/blur-fade";
import { User, Users as UsersIcon, Mail, Calendar, Shield, Sparkles, Atom } from "lucide-react";

export default function Users() {
  const { data, isLoading } = useGetUsers();
  const { users } = data || {};

  const memoizedUsers = useMemo(() => users, [users]);

  if (isLoading) {
    return (
      <div className="w-full h-full p-4 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 md:p-8 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Gradient */}
        <BlurFade delay={0.1}>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Users Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <UsersIcon className="w-4 h-4" />
                  Manage users, roles, and Loom balances
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-semibold text-sm">
                  {memoizedUsers?.length || 0} User{memoizedUsers?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Users Table */}
        <BlurFade delay={0.2}>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Loom Balance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {memoizedUsers
                    ?.slice()
                    .reverse()
                    ?.map((user) => (
                      <tr
                        key={user?.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold">
                            #{user?.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-base font-bold text-gray-900 dark:text-white">
                              {user?.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Mail className="w-3 h-3" />
                            {user?.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-lg w-fit">
                            <Atom className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {user?.loom_balance}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Shield className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                user?.role === "admin"
                                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              }`}
                            >
                              {user?.role}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {formatDate(user?.created_at)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <EditUser user={user} />
                            <UserPayments user={user} />
                            <AddRemoveLoom user={user} />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </BlurFade>

        {/* Empty State */}
        {memoizedUsers?.length === 0 && (
          <BlurFade delay={0.2}>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-12 text-center">
              <UsersIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No users found in the system.
              </p>
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
