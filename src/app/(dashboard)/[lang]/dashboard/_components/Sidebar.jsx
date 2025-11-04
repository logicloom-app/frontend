"use client";

import {
  Euro,
  Folder,
  FolderInput,
  KeyRound,
  LayoutDashboard,
  LogOut,
  UserPen,
  Sparkles,
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

  const navItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: dict?.dashboard || "Dashboard",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      href: "/dashboard/projects",
      icon: Folder,
      label: dict?.projects || "Projects",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      href: "/dashboard/requests",
      icon: FolderInput,
      label: dict?.requests || "Requests",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      href: "/dashboard/payments",
      icon: Euro,
      label: dict?.payments || "Payments",
      gradient: "from-orange-500 to-yellow-500",
    },
  ];

  const settingsItems = [
    {
      href: "/dashboard/password",
      icon: KeyRound,
      label: dict?.password || "Password",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      href: "/dashboard/info",
      icon: UserPen,
      label: dict?.info || "Info",
      hasNotification: !user?.phone_number,
      gradient: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <div className="hidden md:flex flex-col w-80 p-4 relative">
      {/* Glassmorphism Sidebar */}
      <div className="bg-gray-50 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-6 shadow-2xl h-full flex flex-col">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-3 mb-8 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-white dark:bg-gray-800 p-2 rounded-xl">
              <Image
                src="/images/logo.png"
                width={32}
                height={32}
                alt="LogicLoom logo"
                priority
                className="saturate-200"
              />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LogicLoom
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r " +
                      item.gradient +
                      " text-white shadow-lg shadow-purple-500/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                }`}
              >
                {/* Active Indicator */}
                {active && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                )}

                <item.icon
                  className={`w-5 h-5 relative z-10 ${
                    active
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  }`}
                />
                <span
                  className={`font-medium relative z-10 ${
                    active ? "text-white" : ""
                  }`}
                >
                  {item.label}
                </span>

                {active && (
                  <Sparkles className="w-4 h-4 ml-auto text-white/80 animate-pulse relative z-10" />
                )}
              </Link>
            );
          })}

          <div className="my-3 border-t border-gray-200 dark:border-gray-700"></div>

          {settingsItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r " +
                      item.gradient +
                      " text-white shadow-lg shadow-purple-500/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                }`}
              >
                {/* Active Indicator */}
                {active && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                )}

                <item.icon
                  className={`w-5 h-5 relative z-10 ${
                    active
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  }`}
                />
                <span
                  className={`font-medium relative z-10 ${
                    active ? "text-white" : ""
                  }`}
                >
                  {item.label}
                </span>

                {item.hasNotification && !active && (
                  <span className="ml-auto flex h-3 w-3 relative z-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}

                {active && (
                  <Sparkles className="w-4 h-4 ml-auto text-white/80 animate-pulse relative z-10" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="mt-6 space-y-3">
          {/* User Info Card */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-500/20 dark:border-purple-500/30 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {user?.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ID: {user?.id}
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span>{dict?.joined || "Joined"}</span>
              <span>
                {user?.created_at &&
                  new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logoutHandler}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span>{dict?.logout || "Logout"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
