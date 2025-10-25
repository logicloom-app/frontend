import * as React from "react";
import { cn } from "@/lib/utils/utils";
import { cva } from "class-variance-authority";

const gradientButtonVariants = cva(
  "relative inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
        danger:
          "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white",
        success:
          "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white",
        warning:
          "bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white",
      },
      size: {
        default: "px-6 py-2.5",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl",
      },
      rounded: {
        default: "rounded-2xl",
        full: "rounded-full",
        lg: "rounded-xl",
      },
      shine: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      rounded: "default",
      shine: true,
    },
  }
);

const GradientButton = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      rounded,
      shine = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(gradientButtonVariants({ variant, size, rounded }), className)}
        {...props}
      >
        {/* Shine effect overlay */}
        {shine && (
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
        )}

        {/* Content */}
        <span className="relative flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export { GradientButton, gradientButtonVariants };
