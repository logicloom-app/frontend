"use client";

import { usePathname, useRouter } from "next/navigation";
import { US, DE } from "country-flag-icons/react/3x2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.split("/")[1] || "en";

  const switchLanguage = (locale) => {
    const newPath = pathname.replace(/^\/[^\/]+/, `/${locale}`);
    router.push(newPath);
  };

  const FlagIcon = ({ code, className = "" }) => {
    const Flag = code === "en" ? US : DE;
    return (
      <Flag className={className} title={code === "en" ? "English" : "Deutsch"} />
    );
  };

  return (
    <Select onValueChange={switchLanguage} defaultValue="en" value={currentLang}>
      <SelectTrigger className="w-[37px] h-[37px] p-2 rounded-xl shadow-none bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 text-gray-700 dark:text-gray-300 flex items-center justify-center">
        <FlagIcon code={currentLang} className="w-5 h-3.5 rounded-sm shadow-sm" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <FlagIcon code="en" className="w-5 h-3.5 rounded-sm shadow-sm" />
            <span>EN</span>
          </div>
        </SelectItem>
        <SelectItem value="de" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <FlagIcon code="de" className="w-5 h-3.5 rounded-sm shadow-sm" />
            <span>DE</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
