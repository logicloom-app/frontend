"use client";

import {
  TbBulbFilled,
  TbCode,
  TbFileTextSpark,
  TbRocket,
  TbTool,
  TbUserFilled,
} from "react-icons/tb";
import { cn } from "@/lib/utils/utils";
import React, { forwardRef, useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

const Circle = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white dark:bg-slate-900 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamComponent({ className }) {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);
  const div6Ref = useRef(null);
  const div7Ref = useRef(null);

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden p-10",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref} className="p-0">
            <div className="text-slate-900 dark:text-slate-50">
              <TbUserFilled size={24} className="text-blue-500" />
            </div>
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16 p-0">
            <img
              src="/images/logo.png"
              alt="LogicLoom Logo"
              className="w-full h-full object-contain saturate-200 p-2 hover:animate-spin"
            />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref} className="p-0">
            <TbBulbFilled size={24} className="text-yellow-500" />
          </Circle>
          <Circle ref={div2Ref} className="p-0">
            <TbFileTextSpark size={24} className="text-green-500" />
          </Circle>
          <Circle ref={div3Ref} className="p-0">
            <TbCode size={24} className="text-red-500" />
          </Circle>
          <Circle ref={div4Ref} className="p-0">
            <TbRocket size={24} className="text-purple-500" />
          </Circle>
          <Circle ref={div5Ref} className="p-0">
            <TbTool size={24} className="text-orange-500" />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
      />
    </div>
  );
}
