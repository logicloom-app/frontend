"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Atom,
  Euro,
  Folder,
  FolderInput,
  LayoutDashboard,
  UserCog,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UserCircle } from "lucide-react";
import { logout } from "@/services/authService";
import { useGetUser } from "@/lib/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useGetUser();
  const { user } = data || {};

  const logoutHandler = async () => {
    await logout();
    document.location.href = "/";
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full flex justify-end items-center ${
        isLoading && "blur-sm"
      }`}
    >
      {/* Glassmorphism Header Card */}
      <div className="w-full mx-4 mt-4 bg-gray-50 dark:bg-gray-900/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-3xl shadow-xl">
        <nav className="container flex h-[70px] px-6 max-w-screen-2xl items-center justify-between md:justify-end">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden flex justify-end w-full">
            <button className="p-2">
              <div className="space-y-2" dir="rtl">
                <span
                  className={`block h-[2px] w-8 origin-center rounded-full dark:bg-white bg-gray-900 transition-transform ease-in-out ${
                    open && "translate-y-1.5 rotate-45"
                  }`}
                ></span>

                <span
                  className={`block h-[2px] w-6 origin-center rounded-full dark:bg-white bg-gray-900 transition-transform ease-in-out ${
                    open && "w-[32px] -translate-y-1 -rotate-45"
                  }`}
                ></span>
              </div>
            </button>
          </SheetTrigger>

          <SheetContent className="border-gray-800 overflow-y-auto" side="right">
            <div className="">
              <div className="flex items-center gap-3 mb-4">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>

              {user && <hr className="m-4 border-t border-dashed border-gray-600" />}

              <SheetTitle className="">
                {user && (
                  <div className="sm:flex sm:flex-row flex-col items-center justify-center gap-2 mb-4">
                    <div className="flex flex-col gap-1 p-2">
                      <div className="truncate text-sm">{user?.email}</div>

                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">ID:</span>
                        <span className="text-sm">{user?.id}</span>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Joined{" "}
                        {new Date(user?.created_at).toLocaleDateString("en-DE", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </SheetTitle>

              <SheetDescription className="sr-only">
                Mobile navigation menu with user actions
              </SheetDescription>

              {user && <hr className="mt-4 mb-10 border-t border-gray-600" />}

              <div className="flex flex-col gap-2">
                {user && (
                  <Link
                    href={`/dashboard`}
                    className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                    onClick={() => setOpen(false)}
                  >
                    <UserCircle size={20} strokeWidth={2} />
                    User Dashboard
                  </Link>
                )}

                {user && (
                  <Link
                    href={`/admin`}
                    className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                    onClick={() => setOpen(false)}
                  >
                    <LayoutDashboard size={20} strokeWidth={2} />
                    Admin Dashboard
                  </Link>
                )}

                <Link
                  href={`/admin/projects`}
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <Folder size={20} strokeWidth={2} />
                  Projects
                </Link>

                <Link
                  href={`/admin/requests`}
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <FolderInput size={20} strokeWidth={2} />
                  Requests
                </Link>

                <Link
                  href={`/admin/payments`}
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <Euro size={20} strokeWidth={2} />
                  Payments
                </Link>

                <Link
                  href={`/admin/loom`}
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <Atom size={20} strokeWidth={2} />
                  Loom
                </Link>

                <Link
                  href={`/admin/users`}
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <UserCog size={20} strokeWidth={2} />
                  Users
                </Link>

                <Link
                  href={`/admin/send-file`}
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <Mail size={20} strokeWidth={2} />
                  Send File
                </Link>

                {user ? (
                  <button
                    onClick={logoutHandler}
                    className="px-3 mt-6 py-2 text-red-500 focus:outline-none font-bold rounded-2xl border border-red-500/50 hover:bg-red-500/10 transition-all duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    onClick={() => setOpen(false)}
                    href={`/auth`}
                    className="px-6 mt-6 py-2 font-bold flex gap-1 justify-center items-center cursor-pointer border-[1px] dark:border-gray-600 hover:bg-sky-500/80 hover:text-white shadow-md shadow-sky-500/20 dark:shadow-sky-500/10 rounded-2xl transition-all duration-300"
                  >
                    Login
                  </Link>
                )}
              </div>

              <button
                onClick={logoutHandler}
                className="px-3 mt-6 py-2 w-full text-red-500 focus:outline-none font-bold rounded-2xl border border-red-500/50 hover:bg-red-500/10 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex justify-center items-center gap-3 max-md:hidden">
          <div className="flex items-center gap-4">
            {/* Theme Toggle with hover effect */}
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <ThemeToggle />
            </div>

            {/* User Dashboard Link with gradient hover */}
            <Link 
              href="/dashboard"
              className="group relative p-2 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 rounded-xl transition-all duration-300"
            >
              <UserCircle className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                User Dashboard
              </span>
            </Link>
          </div>
        </div>
        </nav>
      </div>
    </header>
  );
}
