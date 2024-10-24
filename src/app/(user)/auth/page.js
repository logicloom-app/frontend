"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MagicCard } from "@/components/ui/magic-card";
import LoginWithPassword from "./_components/LoginWithPassword";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { GridPattern } from "@/components/ui/animated-grid-pattern";
import Register from "./_components/Register";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(0);

  const cardSize =
    step === 0 ? "max-w-[500px] max-h-[600px]" : "max-w-[450px] max-h-[400px]";

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center">
        <NeonGradientCard
          className={`items-center justify-center text-center ${cardSize}`}
        >
          <MagicCard
            className="px-4 flex-col items-center h-full shadow-2xl rounded-[50px]"
            gradientColor="#262626"
          >
            {isLogin ? (
              <LoginWithPassword setIsLogin={setIsLogin} />
            ) : (
              <Register setIsLogin={setIsLogin} setStep={setStep} step={step} />
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
