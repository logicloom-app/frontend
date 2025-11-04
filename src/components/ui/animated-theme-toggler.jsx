"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export const AnimatedThemeToggler = ({ className, duration = 400, ...props }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current || !mounted) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(isDark ? "light" : "dark");
      });
    }).ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [isDark, duration, setTheme, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      {...props}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
