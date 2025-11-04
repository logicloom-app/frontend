"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { logout } from "@/services/authService";
import { useGetUser } from "@/lib/hooks/useAuth";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { GradientButton } from "@/components/ui/gradient-button";
import {
  TbArrowRight,
  TbUser,
  TbExclamationCircle,
  TbArticle,
} from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Code2,
  LayoutDashboard,
  Lightbulb,
  Mail,
  Monitor,
  Server,
  Smartphone,
  GitBranch,
  ArrowRight,
} from "lucide-react";
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
      className={`sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/0 dark:bg-gray-900/0 backdrop-blur-[10px] flex justify-center items-center shadow-sm ${
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
                  className="relative px-5 py-2 rounded-l-2xl font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 group overflow-hidden border border-transparent hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:left-0 group-hover:w-full transition-all duration-300"></span>
                  <span className="relative">{dict?.services}</span>
                </Link>
              </HoverCardTrigger>

              <HoverCardContent className="min-w-[600px] p-6" sideOffset={8}>
                {/* Header Section */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {dict?.webServices}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {dict?.webServicesDescription}
                  </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Frontend */}
                  <Link
                    href={`/${lang}/services`}
                    className="group relative p-4 rounded-2xl border border-blue-200 dark:border-blue-800/50 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Monitor className="text-white w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                        Frontend
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Modern web interfaces
                    </p>
                  </Link>

                  {/* Backend */}
                  <Link
                    href={`/${lang}/services`}
                    className="group relative p-4 rounded-2xl border border-green-200 dark:border-green-800/50 hover:border-green-400 dark:hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <Server className="text-white w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                        Backend
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Scalable server solutions
                    </p>
                  </Link>

                  {/* Mobile */}
                  <Link
                    href={`/${lang}/services`}
                    className="group relative p-4 rounded-2xl border border-purple-200 dark:border-purple-800/50 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Smartphone className="text-white w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                        Mobile
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Native & cross-platform apps
                    </p>
                  </Link>

                  {/* DevOps */}
                  <Link
                    href={`/${lang}/services`}
                    className="group relative p-4 rounded-2xl border border-blue-200 dark:border-blue-800/50 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <GitBranch className="text-white w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                        DevOps
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      CI/CD & infrastructure
                    </p>
                  </Link>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/${lang}/services`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-gray-200 dark:border-gray-700 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-950/40 dark:hover:to-purple-950/40 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                      View All Services
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Discover our full range of solutions
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </HoverCardContent>
            </HoverCard>

            <Link
              href={`/${lang}/pricing`}
              className="relative px-5 py-2 font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 group overflow-hidden border border-transparent hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-yellow-500 group-hover:left-0 group-hover:w-full transition-all duration-300"></span>
              <span className="relative">{dict?.pricing?.title || "Pricing"}</span>
            </Link>

            <Link
              href={`/${lang}/blog`}
              className="relative px-5 py-2 font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 group overflow-hidden border border-transparent hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:left-0 group-hover:w-full transition-all duration-300"></span>
              <span className="relative">{dict?.blog || "Blog"}</span>
            </Link>

            <Link
              href={`/${lang}/contact`}
              className="relative px-5 py-2 rounded-r-2xl font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 group overflow-hidden border border-transparent hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:left-0 group-hover:w-full transition-all duration-300"></span>
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
                <AnimatedThemeToggler className="p-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 text-gray-700 dark:text-gray-300" />
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
                  onClick={() => setOpen(false)}
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
                  href={`/${lang}/pricing`}
                  className="group relative px-6 py-3 flex items-center gap-3 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 bg-gradient-to-r from-orange-50/50 to-yellow-50/50 dark:from-orange-950/20 dark:to-yellow-950/20 hover:from-orange-50 hover:to-yellow-50 dark:hover:from-orange-950/40 dark:hover:to-yellow-950/40 focus:outline-none rounded-2xl transition-all duration-300 overflow-hidden"
                  onClick={() => setOpen(false)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-yellow-500/0 group-hover:from-orange-500/10 group-hover:to-yellow-500/10 transition-all duration-300"></span>
                  <Lightbulb
                    size={20}
                    strokeWidth={2.5}
                    className="relative text-orange-600 dark:text-orange-400"
                  />
                  <span className="relative font-medium">
                    {dict?.pricing?.title || "Pricing"}
                  </span>
                </Link>

                <Link
                  href={`/${lang}/blog`}
                  className="group relative px-6 py-3 flex items-center gap-3 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-950/40 dark:hover:to-teal-950/40 focus:outline-none rounded-2xl transition-all duration-300 overflow-hidden"
                  onClick={() => setOpen(false)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-300"></span>
                  <TbArticle
                    size={20}
                    strokeWidth={2.5}
                    className="relative text-emerald-600 dark:text-emerald-400"
                  />
                  <span className="relative font-medium">
                    {dict?.blog || "Blog"}
                  </span>
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
            <LanguageSwitcher />
            <AnimatedThemeToggler className="p-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 text-gray-700 dark:text-gray-300" />
          </div>

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <div className="group relative p-2.5 flex gap-1.5 font-bold justify-center items-center cursor-pointer text-nowrap border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-400 hover:dark:border-blue-400 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-violet-950/40 hover:from-blue-100 hover:via-indigo-100 hover:to-violet-100 dark:hover:from-blue-900/50 dark:hover:via-indigo-900/50 dark:hover:to-violet-900/50 rounded-full transition-all duration-500 hover:scale-110 hover:rotate-2 shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/20 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-violet-500/0 group-hover:from-blue-500/10 group-hover:via-indigo-500/10 group-hover:to-violet-500/10 rounded-2xl transition-all duration-500"></div>
                  <TbUser
                    size={22}
                    strokeWidth={2.5}
                    className="relative text-sky-900 dark:text-sky-100 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors duration-300"
                  />
                  {!user?.phone_number && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full animate-pulse shadow-lg shadow-orange-500/50 ring-2 ring-white dark:ring-gray-900"></span>
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
                  href={`/${lang}/dashboard`}
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
