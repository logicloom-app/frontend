"use client";

import { cn } from "@/lib/utils/utils";
import { useTheme } from "next-themes";
import ResetPassword from "./ResetPassword";
import { useEffect, useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import GridPattern from "@/components/ui/animated-grid-pattern";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

export default function ResetPasswordClient({ dict }) {
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center">
        <NeonGradientCard
          className={`items-center justify-center text-center`}
          borderSize={theme === "dark" ? 0 : 2}
        >
          <MagicCard
            className="px-4 flex-col items-center h-full shadow-2xl rounded-[50px] max-w-[500px]"
            gradientColor={theme === "dark" ? "#262626" : "#e9e9e9"}
            gradientOpacity={0.8}
          >
            <ResetPassword dict={dict} step={step} setStep={setStep} />
          </MagicCard>
        </NeonGradientCard>

        <GridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 skew-y-12"
          )}
        />
      </div>
    </div>
  );
}
