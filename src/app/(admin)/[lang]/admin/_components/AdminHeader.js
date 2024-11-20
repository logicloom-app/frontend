"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";
import { UserCircle } from "lucide-react";
import { useGetUser } from "@/lib/hooks/useAuth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { deleteCookies } from "@/lib/utils/deleteCookies";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useGetUser();
  const { user } = data || {};

  const logoutHandler = async () => {
    await deleteCookies("access_token", "refresh_token");
    window.location.reload();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-end items-center ${
        isLoading && "blur-sm"
      }`}
    >
      <nav className="container flex h-[70px] px-10 max-w-screen-2xl items-center justify-between md:justify-end">
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

              <SheetTitle className=""></SheetTitle>

              <SheetDescription className="sr-only">
                Mobile navigation menu with user actions
              </SheetDescription>

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
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <ThemeToggle />

              <Link href="/dashboard">
                <UserCircle />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
