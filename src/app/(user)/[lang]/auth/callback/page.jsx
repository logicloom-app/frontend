"use client";

import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/lib/hooks/use-toast";
import { useEffect, useState, Suspense } from "react";
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
          showErrorToast(allParams.error);
          router.push("/auth");
          return;
        }

        await googleCallback(allParamsString);
        showSuccessToast("Login successful");
        router.push("/");
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      } catch (error) {
        showErrorToast(error?.response?.data?.error || error.message);
        router.push("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, []);

  const showErrorToast = (message) => {
    toast({
      variant: "destructive",
      description: message || "Something went wrong",
      className: "rounded-2xl",
    });
  };

  const showSuccessToast = (message) => {
    toast({
      description: message,
      className: "rounded-2xl",
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return null;
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-[50vh] h-[calc(100vh-110px)]">
      <Spinner className="w-10 h-10" />
      <div>Loading...</div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="h-[calc(100vh-100px)]">
        <AuthCallbackContent />
      </div>
    </Suspense>
  );
}
