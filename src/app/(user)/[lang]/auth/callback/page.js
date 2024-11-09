"use client";

import { useEffect, useState, Suspense } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { googleCallback } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";

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
  }, [allParams, allParamsString, queryClient, router, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
        <div className="flex items-center justify-center min-h-screen">
          <div>Loading...</div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
