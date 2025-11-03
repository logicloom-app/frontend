"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Euro,
  Folder,
  FolderInput,
  KeyRound,
  LayoutDashboard,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TbUser } from "react-icons/tb";
import { logout } from "@/services/authService";
import { useGetUser } from "@/lib/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function DashboardHeader({ dict, lang }) {
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
      <div className="w-full mx-4 mt-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl">
        <nav className="container flex h-[70px] px-6 max-w-screen-2xl items-center justify-between md:justify-end">
        <Link
          href={`/${lang}`}
          className="flex items-center justify-center md:hidden"
        >
          <Image
            src="/images/logo.png"
            width={40}
            height={40}
            alt="LogicLoom logo"
            priority
            className="saturate-200"
          />
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
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
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="font-bold text-xl text-gray-500 dark:text-gray-400">
                        {user?.name?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-1 p-2">
                      <div className="truncate text-sm">{user?.email}</div>

                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {dict?.yourBalance}
                        </span>
                        <div className="font-bold flex items-center gap-1">
                          {user?.loom_balance} <span className="text-xs">LOOM</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-5">
                        {dict?.joined}{" "}
                        {new Date(user?.created_at).toLocaleDateString("en-DE", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>

                      <Link href="/loom" className="w-full rounded-2xl">
                        <RainbowButton className="w-full rounded-2xl">
                          {dict?.buyLooms}
                        </RainbowButton>
                      </Link>
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
                    href={`/${lang}/dashboard`}
                    className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                    onClick={() => setOpen(false)}
                  >
                    <LayoutDashboard size={20} strokeWidth={2} />
                    {dict?.viewProfile}
                  </Link>
                )}

                <Link
                  href={`/${lang}/dashboard/projects`}
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <Folder size={20} strokeWidth={2} />
                  {dict?.projects}
                </Link>

                <Link
                  href={`/${lang}/dashboard/requests`}
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <FolderInput size={20} strokeWidth={2} />
                  {dict?.requests}
                </Link>

                <Link
                  href={`/${lang}/dashboard/payments`}
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <Euro size={20} strokeWidth={2} />
                  {dict?.payments}
                </Link>

                <Link
                  href={`/${lang}/dashboard/password`}
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <KeyRound size={20} strokeWidth={2} />
                  {dict?.password}
                </Link>

                <Link
                  href={`/${lang}/dashboard/info`}
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  <UserCog size={20} strokeWidth={2} />
                  {dict?.info}
                </Link>

                {user ? (
                  <button
                    onClick={logoutHandler}
                    className="px-3 mt-6 py-2 text-red-500 focus:outline-none font-bold rounded-2xl border border-red-500/50 hover:bg-red-500/10 transition-all duration-200"
                  >
                    {dict?.logout}
                  </button>
                ) : (
                  <Link
                    onClick={() => setOpen(false)}
                    href={`/${lang}/auth`}
                    className="px-6 mt-6 py-2 font-bold flex gap-1 justify-center items-center cursor-pointer border-[1px] dark:border-gray-600 hover:bg-sky-500/80 hover:text-white shadow-md shadow-sky-500/20 dark:shadow-sky-500/10 rounded-2xl transition-all duration-300"
                  >
                    {dict?.login}
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex justify-center items-center gap-3 max-md:hidden">
          <div className="flex items-center gap-6">
            <div>
              {user?.role === "admin" && (
                <Link href="/admin" className="rounded-full p-2">
                  <UserCog size={20} />
                </Link>
              )}
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative flex items-center gap-2 py-2.5 px-5 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 dark:border-blue-500/30 rounded-full text-nowrap backdrop-blur-sm">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {dict?.yourBalance}:
                </span>
                <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 flex items-center gap-1">
                  {user?.loom_balance}
                  <span className="text-xs">
                    {user?.loom_balance > 1 ? "LOOMs" : "LOOM"}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/loom"
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-nowrap transition-colors duration-300"
            >
              {dict?.buyLooms}
            </Link>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="xl:hidden relative group p-3 flex gap-1 font-bold justify-center items-center cursor-pointer text-nowrap rounded-full transition-all duration-300 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/20 dark:border-blue-500/30">
                    <TbUser
                      size={20}
                      strokeWidth={3}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-80 p-5 rounded-3xl flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-30" />
                    <Avatar className="relative w-16 h-16 border-2 border-blue-500/30">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="font-bold text-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {user?.name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex flex-col gap-1 p-2">
                    <div className="truncate text-sm font-medium">{user?.email}</div>

                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {dict?.joined}{" "}
                      {new Date(user?.created_at).toLocaleDateString("en-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link
                className="relative group px-6 py-2.5 font-semibold flex gap-1 justify-center items-center cursor-pointer rounded-full overflow-hidden text-white"
                href={`/${lang}/auth`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300" />
                <span className="relative z-10">{dict?.login}</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
      </div>
    </header>
  );
}
