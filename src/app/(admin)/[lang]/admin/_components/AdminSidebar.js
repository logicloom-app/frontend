"use client";

import {
  Atom,
  Euro,
  Folder,
  FolderInput,
  KeyRound,
  LayoutDashboard,
  LogOut,
  User,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGetUser } from "@/lib/hooks/useAuth";
import { useParams, usePathname } from "next/navigation";
import { deleteCookies } from "@/lib/utils/deleteCookies";

export default function AdminSidebar() {
  const { data, error, isLoading } = useGetUser();
  const { lang, id } = useParams();
  const pathname = usePathname();
  const { user } = data || {};

  const isActive = (path) => {
    return (
      pathname === `/${lang}/admin${path}` ||
      pathname === `/${lang}/admin${path}/${id}`
    );
  };

  const logoutHandler = async () => {
    await deleteCookies("access_token", "refresh_token");
    window.location.reload();
  };

  return (
    <div className="hidden md:flex flex-col px-4 xl:w-1/6">
      <Link href={`/${lang}`} className="flex items-center ml-4 mt-4 mb-10 gap-3">
        <Image
          src="/images/logo.png"
          width={40}
          height={40}
          alt="LogicLoom logo"
          priority
          className="saturate-200"
        />
        <h1 className="text-xl hidden xl:block">LogicLoom</h1>
      </Link>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2">
          <Link
            href={`/${lang}/admin`}
            className={`flex items-center gap-4 py-3 px-6 w-full rounded-2xl transition-colors ${
              isActive("")
                ? "bg-gray-500/20 dark:text-sky-500 text-sky-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-400/20"
            }`}
          >
            <LayoutDashboard />
            <span className="hidden xl:block">Dashboard</span>
          </Link>

          <Link
            href={`/${lang}/admin/projects`}
            className={`flex items-center gap-4 py-3 px-6 w-full rounded-2xl transition-colors ${
              isActive("/projects") || isActive("/projects/[id]")
                ? "bg-gray-500/20 dark:text-sky-500 text-sky-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-400/20"
            }`}
          >
            <Folder />
            <span className="hidden xl:block">Projects</span>
          </Link>

          <Link
            href={`/${lang}/admin/requests`}
            className={`flex items-center gap-4 py-3 px-6 w-full rounded-2xl transition-colors ${
              isActive("/requests")
                ? "bg-gray-500/20 dark:text-sky-500 text-sky-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-400/20"
            }`}
          >
            <FolderInput />
            <span className="hidden xl:block">Requests</span>
          </Link>

          <Link
            href={`/${lang}/admin/payments`}
            className={`flex items-center gap-4 py-3 px-6 w-full rounded-2xl transition-colors ${
              isActive("/payments")
                ? "bg-gray-500/20 dark:text-sky-500 text-sky-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-400/20"
            }`}
          >
            <Euro />
            <span className="hidden xl:block">Payments</span>
          </Link>

          <Link
            href={`/${lang}/admin/loom`}
            className={`flex gap-4 py-3 px-6 w-full rounded-2xl transition-colors ${
              isActive("/loom")
                ? "bg-gray-500/20 dark:text-sky-500 text-sky-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-400/20"
            }`}
          >
            <Atom />
            <span className="hidden xl:block">Loom</span>
          </Link>

          <Link
            href={`/${lang}/admin/users`}
            className={`flex gap-4 py-3 px-6 w-full rounded-2xl transition-colors ${
              isActive("/users")
                ? "bg-gray-500/20 dark:text-sky-500 text-sky-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-400/20"
            }`}
          >
            <User />
            <span className="hidden xl:block text-nowrap">Users</span>
          </Link>
        </div>

        <div className="flex flex-col gap-2 xl:p-3 xl:bg-black/5 dark:xl:bg-gray-500/10 rounded-3xl relative">
          <div className="flex-col gap-1 p-2 hidden xl:flex">
            <div className="truncate text-sm">{user?.email}</div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              Joined
              {new Date(user?.created_at).toLocaleDateString("en-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>

          <button
            onClick={logoutHandler}
            className="flex items-center justify-center gap-2 px-3 py-2 xl:w-full text-red-100 hover:text-red-500 bg-red-500 focus:outline-none font-bold rounded-2xl border border-red-500/50 hover:bg-red-500/20 transition-all duration-300"
          >
            <div className="flex items-center justify-center xl:hidden">
              <LogOut />
            </div>
            <span className="hidden xl:block">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
