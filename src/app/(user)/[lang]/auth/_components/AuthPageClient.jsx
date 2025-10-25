"use client";

import { useState } from "react";
import Register from "./Register";
import { cn } from "@/lib/utils/utils";
import { useTheme } from "next-themes";
import LoginWithPassword from "./LoginWithPassword";
import { MagicCard } from "@/components/ui/magic-card";
import { GridPattern } from "@/components/ui/animated-grid-pattern";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

export default function AuthPageClient({ dict }) {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(0);
  const { theme } = useTheme();
  const cardSize =
    step === 0 ? "max-w-[500px] max-h-[600px]" : "max-w-[450px] max-h-[400px]";

  return (
    <div className="flex justify-center items-center h-[110vh] 2xl:h-[110vh]">
      <div className="flex justify-center items-center mb-10">
        <NeonGradientCard
          className={`items-center justify-center text-center ${cardSize}`}
        >
          <MagicCard
            className="px-4 flex-col items-center h-full shadow-2xl rounded-[50px]"
            gradientColor={theme === "dark" ? "#262626" : "#e9e9e9"}
            gradientOpacity={0.8}
          >
            {isLogin ? (
              <LoginWithPassword dict={dict.login} setIsLogin={setIsLogin} />
            ) : (
              <Register
                dict={dict.register}
                setIsLogin={setIsLogin}
                setStep={setStep}
                step={step}
              />
            )}
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
