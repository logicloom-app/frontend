"use client";

import {
  Euro,
  Folder,
  FolderInput,
  KeyRound,
  LayoutDashboard,
  LogOut,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/services/authService";
import { useGetUser } from "@/lib/hooks/useAuth";
import { useParams, usePathname } from "next/navigation";

export default function DashboardSidebar({ dict, lang }) {
  const { id } = useParams();
  const pathname = usePathname();
  const { data, error, isLoading } = useGetUser();
  const { user } = data || {};

  const isActive = (path) => {
    return pathname === `/${lang}${path}` || pathname === `/${lang}${path}/${id}`;
  };

  const logoutHandler = async () => {
    await logout();
    document.location.href = "/";
  };

  return (
    <div className="hidden md:flex flex-col px-4 xl:w-1/6 border-gray-200 dark:border-gray-800">
      <Link
        href={`/${lang}`}
        className="flex items-center ml-4 mt-6 mb-12 gap-3 group"
      >
        <div className="relative">
          <Image
            src="/images/logo.png"
            width={40}
            height={40}
            alt="LogicLoom logo"
            priority
            className="saturate-200 group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <h1 className="text-xl font-bold hidden xl:block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          LogicLoom
        </h1>
      </Link>

      <div className="flex flex-col justify-between h-full pb-6">
        <div className="flex flex-col gap-2">
          <Link
            href={`/${lang}/dashboard`}
            className={`flex items-center gap-4 py-3 px-4 w-full rounded-2xl transition-all duration-300 relative group ${
              isActive("/dashboard")
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-md"
                : "hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:translate-x-1"
            }`}
          >
            {isActive("/dashboard") && (
              <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" />
            )}
            <LayoutDashboard
              className={isActive("/dashboard") ? "w-5 h-5" : "w-5 h-5"}
            />
            <span className="hidden xl:block font-medium">Dashboard</span>
          </Link>

          <Link
            href={`/${lang}/dashboard/projects`}
            className={`flex items-center gap-4 py-3 px-4 w-full rounded-2xl transition-all duration-300 relative group ${
              isActive("/dashboard/projects") || isActive("/dashboard/projects/[id]")
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-md"
                : "hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:translate-x-1"
            }`}
          >
            {(isActive("/dashboard/projects") ||
              isActive("/dashboard/projects/[id]")) && (
              <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" />
            )}
            <Folder className="w-5 h-5" />
            <span className="hidden xl:block font-medium">{dict?.projects}</span>
          </Link>

          <Link
            href={`/${lang}/dashboard/requests`}
            className={`flex items-center gap-4 py-3 px-4 w-full rounded-2xl transition-all duration-300 relative group ${
              isActive("/dashboard/requests")
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-md"
                : "hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:translate-x-1"
            }`}
          >
            {isActive("/dashboard/requests") && (
              <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" />
            )}
            <FolderInput className="w-5 h-5" />
            <span className="hidden xl:block font-medium">{dict?.requests}</span>
          </Link>

          <Link
            href={`/${lang}/dashboard/payments`}
            className={`flex items-center gap-4 py-3 px-4 w-full rounded-2xl transition-all duration-300 relative group ${
              isActive("/dashboard/payments")
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-md"
                : "hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:translate-x-1"
            }`}
          >
            {isActive("/dashboard/payments") && (
              <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" />
            )}
            <Euro className="w-5 h-5" />
            <span className="hidden xl:block font-medium">{dict?.payments}</span>
          </Link>

          <div className="my-2 border-t border-gray-200 dark:border-gray-800" />

          <Link
            href={`/${lang}/dashboard/password`}
            className={`flex items-center gap-4 py-3 px-4 w-full rounded-2xl transition-all duration-300 relative group ${
              isActive("/dashboard/password")
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-md"
                : "hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:translate-x-1"
            }`}
          >
            {isActive("/dashboard/password") && (
              <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" />
            )}
            <KeyRound className="w-5 h-5" />
            <span className="hidden xl:block font-medium">{dict?.password}</span>
          </Link>

          <Link
            href={`/${lang}/dashboard/info`}
            className={`relative flex items-center gap-4 py-3 px-4 w-full rounded-2xl transition-all duration-300 group ${
              isActive("/dashboard/info")
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-md"
                : "hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:translate-x-1"
            }`}
          >
            {isActive("/dashboard/info") && (
              <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" />
            )}
            <UserPen className="w-5 h-5" />
            <span className="hidden xl:block text-nowrap font-medium">
              {dict?.info}
            </span>

            {!user?.phone_number && (
              <span className="absolute right-4 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </Link>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <div className="hidden xl:flex flex-col gap-2 p-4 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="truncate text-sm font-medium">{user?.email}</div>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <span>ID:</span>
              <span className="font-mono">{user?.id}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {dict?.joined}{" "}
              {new Date(user?.created_at).toLocaleDateString("en-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>

          <button
            onClick={logoutHandler}
            className="flex items-center justify-center gap-2 px-4 py-3 w-full text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <LogOut className="w-4 h-4 xl:w-5 xl:h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="hidden xl:block">{dict?.logout}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
