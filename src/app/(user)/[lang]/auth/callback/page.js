"use client";

import { useEffect, useState, Suspense } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { googleCallback } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

function AuthCallbackContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const allParamsString = searchParams.toString();
  const allParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (allParams.error) {
          toast({
            variant: "destructive",
            description: allParams.error || "Something went wrong",
            className: "rounded-2xl",
          });

          router.push("/auth");
        }

        await googleCallback(allParamsString);

        toast({
          description: "Login successful",
          className: "rounded-2xl",
        });

        router.push("/");
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      } catch (error) {
        const errorMessage =
          error?.response?.data?.error || error.message || "Something went wrong";

        toast({
          variant: "destructive",
          description: errorMessage,
          className: "rounded-2xl",
        });

        router.push("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center min-h-[50vh] h-[calc(100vh-300px)]">
        <Spinner className="w-10 h-10" />
        <div>Loading...</div>
      </div>
    );
  }

  return null;
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-2 items-center justify-center min-h-[50vh] h-[calc(100vh-300px)]">
          <Spinner className="w-10 h-10" />
          <div>Loading...</div>
        </div>
      }
    >
      <div className="h-[calc(100vh-300px)]">
        <AuthCallbackContent />
      </div>
    </Suspense>
  );
}
