"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (locale) => {
    const newPath = pathname.replace(/^\/[^\/]+/, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        onClick={() => switchLanguage("en")}
        className="text-sm"
      >
        EN
      </Button>
      <Button
        variant="ghost"
        onClick={() => switchLanguage("de")}
        className="text-sm"
      >
        DE
      </Button>
    </div>
  );
}
