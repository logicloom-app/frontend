import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils/utils";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        autoComplete="off"
        className={cn(
          "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
          className
        )}
        ref={ref}
        {...props}
      />
      {isPasswordType && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm"
        >
          {showPassword ? <PiEyeClosedBold size={20} /> : <PiEyeBold size={20} />}
        </button>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
