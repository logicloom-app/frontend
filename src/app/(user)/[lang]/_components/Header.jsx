"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { logout } from "@/services/authService";
import { useGetUser } from "@/lib/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Code2, LayoutDashboard, Lightbulb, Mail } from "lucide-react";
import { TbArrowRight, TbUser, TbExclamationCircle } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Header({ dict, lang }) {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useGetUser();
  const { user } = data || {};
  const params = useParams();

  const logoutHandler = async () => {
    await logout();
    document.location.href = "/";
  };

  const handleMouseEnter = (e) => {
    const div = e.currentTarget.querySelector("div");
    div.style.transition = "transform 0.5s";
    div.style.transform = "translateX(70%)";
  };

  const handleMouseLeave = (e) => {
    const div = e.currentTarget.querySelector("div");
    div.style.transition = "transform 0.5s";
    div.style.transform = "translateX(0)";
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 flex justify-center items-center shadow-sm ${
        isLoading && "blur-sm"
      }`}
    >
      <nav className="container flex h-[70px] px-10 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            href={`/${params.lang}`}
            className="group flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <Image
                src="/images/logo.png"
                width={40}
                height={40}
                alt="LogicLoom logo"
                priority
                className="relative saturate-200 group-hover:rotate-12 transition-transform duration-300"
              />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              LogicLoom
            </h1>
          </Link>

          <div className="flex items-center max-md:hidden">
            {/* <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger asChild>
                <button className="px-5 py-2 rounded-l-3xl bg-gray-100 dark:bg-sky-600/20 hover:dark:bg-sky-700 hover:bg-sky-600/80 hover:text-white dark:shadow-md shadow-sky-600/20 transition-all duration-300">
                  {dict?.products}
                </button>
              </HoverCardTrigger>

              <HoverCardContent className="w-80" sideOffset={4}>
                <div className="flex flex-col gap-2">Comming soon...</div>
              </HoverCardContent>
            </HoverCard> */}

            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger asChild>
                <Link
                  href={`/${lang}/services`}
                  className="relative px-5 py-2 rounded-l-2xl font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative">{dict?.services}</span>
                </Link>
              </HoverCardTrigger>

              <HoverCardContent className="min-w-[500px]" sideOffset={4}>
                <div className="flex gap-4">
                  <Link
                    href={`/${lang}/services`}
                    className="flex flex-col gap-2 p-4 w-1/2 justify-end pb-10 py-4 bg-sky-100 dark:bg-sky-900/20 rounded-3xl"
                  >
                    <Lightbulb size={20} />
                    <div className="font-bold">{dict?.webServices}</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {dict?.webServicesDescription}
                    </p>
                  </Link>

                  <div className="flex flex-col gap-2 w-2/3 rounded-2xl">
                    <Link
                      href={`/${lang}/contact`}
                      className="flex flex-col gap-2 py-2 px-4 rounded-3xl hover:bg-sky-100 dark:hover:bg-sky-900/20 transition-all duration-300"
                    >
                      <div className="font-bold">{dict?.consulting}</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dict?.consultingDescription}
                      </p>
                    </Link>

                    <Link
                      href={`/${lang}/contact`}
                      className="flex flex-col gap-2 py-2 px-4 rounded-3xl hover:bg-sky-100 dark:hover:bg-sky-900/20 transition-all duration-300"
                    >
                      <div className="font-bold">{dict?.development}</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dict?.developmentDescription}
                      </p>
                    </Link>
                  </div>
                </div>

                <Link
                  href={`/${lang}/services`}
                  className="flex mt-4 gap-2 items-center p-4 rounded-3xl w-full hover:bg-sky-100 dark:hover:bg-sky-900/20 bg-gray-100 dark:bg-gray-900/20 transition-all duration-300 group"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center w-full mx-6 gap-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Find out more
                    </p>

                    <TbArrowRight size={20} className="" />
                  </div>
                </Link>
              </HoverCardContent>
            </HoverCard>

            <Link
              href={`/${lang}/contact`}
              className="relative px-5 py-2 rounded-r-2xl font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative">{dict?.contact}</span>
            </Link>
          </div>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="relative p-2 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 transition-all duration-300 border border-gray-200 dark:border-gray-700">
              <div className="space-y-2" dir="rtl">
                <span
                  className={`block h-[2.5px] w-7 origin-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-transform ease-in-out ${
                    open && "translate-y-1.5 rotate-45"
                  }`}
                ></span>

                <span
                  className={`block h-[2.5px] w-5 origin-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-transform ease-in-out ${
                    open && "w-[28px] -translate-y-1 -rotate-45"
                  }`}
                ></span>
              </div>
            </button>
          </SheetTrigger>

          <SheetContent className="border-gray-800" side="right">
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
                    className="group relative px-6 py-3 flex items-center gap-3 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/40 dark:hover:to-purple-950/40 focus:outline-none rounded-2xl transition-all duration-300 overflow-hidden"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></span>
                    <LayoutDashboard
                      size={20}
                      strokeWidth={2.5}
                      className="relative text-blue-600 dark:text-blue-400"
                    />
                    <span className="relative font-medium">{dict?.viewProfile}</span>
                  </Link>
                )}

                <Link
                  href={`/${lang}/services`}
                  className="group relative px-6 py-3 flex items-center gap-3 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950/40 dark:hover:to-pink-950/40 focus:outline-none rounded-2xl transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></span>
                  <Code2
                    size={20}
                    strokeWidth={2.5}
                    className="relative text-purple-600 dark:text-purple-400"
                  />
                  <span className="relative font-medium">{dict?.services}</span>
                </Link>

                <Link
                  href={`/${lang}/contact`}
                  className="group relative px-6 py-3 flex items-center gap-3 border-2 border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 bg-gradient-to-r from-pink-50/50 to-rose-50/50 dark:from-pink-950/20 dark:to-rose-950/20 hover:from-pink-50 hover:to-rose-50 dark:hover:from-pink-950/40 dark:hover:to-rose-950/40 focus:outline-none rounded-2xl transition-all duration-300 overflow-hidden"
                  onClick={() => setOpen(false)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-rose-500/0 group-hover:from-pink-500/10 group-hover:to-rose-500/10 transition-all duration-300"></span>
                  <Mail
                    size={20}
                    strokeWidth={2.5}
                    className="relative text-pink-600 dark:text-pink-400"
                  />
                  <span className="relative font-medium">{dict?.contact}</span>
                </Link>

                {/* <Link
                  href="#"
                  className="px-6 py-2 flex items-center gap-2 border border-gray-600/30 hover:bg-gray-500/20 dark:border-sky-200/30 hover:dark:bg-sky-200/10 focus:outline-none rounded-2xl transition-all duration-300"
                  onClick={() => setOpen(false)}
                >
                  {dict?.products}
                </Link> */}

                {user ? (
                  <GradientButton
                    onClick={logoutHandler}
                    variant="danger"
                    className="w-full mt-6"
                  >
                    {dict?.logout}
                  </GradientButton>
                ) : (
                  <Link
                    onClick={() => setOpen(false)}
                    href={`/${params.lang}/auth`}
                    className="mt-6 block"
                  >
                    <GradientButton variant="primary" className="w-full">
                      {dict?.login}
                    </GradientButton>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex justify-center items-center gap-3 max-md:hidden">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative p-2.5 flex gap-1 font-bold justify-center items-center cursor-pointer text-nowrap border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:dark:border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 hover:from-blue-500/20 hover:to-purple-500/20 rounded-full transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
                  <TbUser
                    size={20}
                    strokeWidth={3}
                    className="text-blue-600 dark:text-blue-400"
                  />
                  {!user?.phone_number && (
                    <span className="absolute top-0 left-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-5 rounded-3xl flex flex-col items-center gap-2 bg-white/50 dark:bg-transparent backdrop-blur-sm [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
                <div className="flex items-center gap-2 mb-4">
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

                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {dict?.joined}{" "}
                      {new Date(user?.created_at).toLocaleDateString("en-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                {!user?.phone_number && (
                  <Link
                    href={`/${lang}/dashboard/info`}
                    className="inline-flex h-11 w-full gap-2 text-sm text-nowrap items-center justify-center rounded-2xl px-8 py-2 font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors mb-4"
                  >
                    <TbExclamationCircle size={24} className="text-red-500" />
                    {dict?.addPhoneNumber}
                  </Link>
                )}

                <Link href={`/${lang}/loom`} className="w-full rounded-2xl">
                  <RainbowButton className="w-full rounded-2xl">
                    {dict?.buyLooms}
                  </RainbowButton>
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl px-8 py-2 font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors mb-4"
                >
                  {dict?.viewProfile}
                </Link>

                <button
                  onClick={logoutHandler}
                  className="px-3 py-2 w-full text-red-100 hover:text-red-500 bg-red-500 focus:outline-none font-bold rounded-2xl border border-red-500/50 hover:bg-red-500/20 transition-all duration-300"
                >
                  {dict?.logout}
                </button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href={`/${params.lang}/auth`}>
              <GradientButton variant="primary" rounded="full">
                {dict?.login}
              </GradientButton>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
