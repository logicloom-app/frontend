"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TbUser } from "react-icons/tb";
import { useParams } from "next/navigation";

import { useGetUser } from "@/lib/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { deleteCookies } from "@/lib/utils/deleteCookies";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Header({ dict }) {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useGetUser();
  const { user } = data || {};
  const params = useParams();

  const logoutHandler = async () => {
    await deleteCookies("access_token", "refresh_token");
    window.location.reload();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center items-center ${
        isLoading && "blur-sm"
      }`}
    >
      <nav className="container flex h-[70px] px-10 max-w-screen-2xl items-center justify-between">
        <Link
          href={`/${params.lang}`}
          className="flex items-center justify-center gap-3"
        >
          <Image
            src="/images/logo.png"
            width={40}
            height={40}
            alt="LogicLoom logo"
            priority
            className="saturate-200"
          />
          <h1 className="text-xl">LogicLoom</h1>
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button>
              <div className="space-y-2" dir="rtl">
                <span
                  className={`block h-[2px] w-8 origin-center rounded-full bg-white transition-transform ease-in-out ${
                    open && "translate-y-1.5 rotate-45"
                  }`}
                ></span>

                <span
                  className={`block h-[2px] w-6 origin-center rounded-full bg-white transition-transform ease-in-out ${
                    open && "w-[32px] -translate-y-1 -rotate-45"
                  }`}
                ></span>
              </div>
            </button>
          </SheetTrigger>

          <SheetContent className="border-gray-800">
            <div className="">
              {/*  */}

              <hr className="my-4 border-t border-gray-600" />

              <div className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="px-3 py-2 hover:text-white hover:bg-slate-100/10 rounded-md transition-all duration-200"
                  onClick={() => setOpen(false)}
                ></Link>

                <Link
                  href="#"
                  className="px-3 py-2 hover:text-white hover:bg-slate-100/10 rounded-md transition-all duration-200"
                  onClick={() => setOpen(false)}
                ></Link>

                <Link
                  href="#"
                  className="px-3 py-2 hover:text-white hover:bg-slate-100/10 rounded-md transition-all duration-200"
                  onClick={() => setOpen(false)}
                ></Link>

                <button
                  onClick={() => {
                    logoutHandler();
                    setOpen(false);
                  }}
                  className="px-3 mx-2 mt-3 py-1 text-red-500 focus:outline-none font-bold rounded-xl border border-red-500/50 hover:bg-red-500/10 transition-all duration-200"
                >
                  Logout
                </button>
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
                <div className="p-2 flex gap-1 font-bold justify-center items-center cursor-pointer text-nowrap border-[1px] border-gray-600 dark:border-gray-400 hover:border-sky-500 hover:dark:border-sky-500 hover:text-white hover:dark:bg-sky-500/80 hover:bg-sky-500/90 rounded-full transition-all duration-300">
                  <TbUser size={20} strokeWidth={3} />
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-80 rounded-[30px] dark:bg-gray-950/90 mt-1 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="font-bold text-xl text-gray-500 dark:text-gray-400">
                      {user?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-1 p-2">
                    <div>{user?.email}</div>

                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Your Balance
                      </span>
                      <div className="font-bold">
                        {user?.loom_balance} <span className="text-xs">LOOM</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      joined{" "}
                      {new Date(user?.created_at).toLocaleDateString("en-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <Link
                  href="/profile"
                  className="p-3 mb-4 text-center w-full focus:outline-none font-bold rounded-xl hover:dark:bg-sky-500/40 hover:bg-sky-600 bg-sky-600/70 text-white transition-all duration-300"
                >
                  {dict?.viewProfile}
                </Link>

                <button
                  onClick={logoutHandler}
                  className="px-3 py-1 w-full text-red-500 focus:outline-none font-bold rounded-xl border border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
                >
                  {dict?.logout}
                </button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              className="px-6 py-2 font-bold flex gap-1 justify-center items-center cursor-pointer border-[1px] dark:border-gray-600 hover:bg-sky-500/80 hover:text-white rounded-3xl transition-all duration-300"
              href={`/${params.lang}/auth`}
            >
              {dict?.login}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
