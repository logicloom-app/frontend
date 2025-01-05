"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/lib/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

function StripeSuccessContent() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  // const searchParams = useSearchParams();
  // const allParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    toast({
      description: "Stripe order captured successfully.",
      className: "rounded-2xl",
    });

    router.push("/loom");
    queryClient.invalidateQueries({ queryKey: ["get-user"] });
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 items-center justify-center min-h-[50vh] h-[calc(100vh-300px)]">
        <Spinner className="w-10 h-10" />
        <div>Processing...</div>
      </div>
    </div>
  );
}

export default function StripeSuccess() {
  return (
    <Suspense
      fallback={
        <div>
          <div className="flex flex-col gap-2 items-center justify-center min-h-[50vh] h-[calc(100vh-300px)]">
            <Spinner className="w-10 h-10" />
            <div>Processing...</div>
          </div>
        </div>
      }
    >
      <div className="h-[calc(100vh-300px)]">
        <StripeSuccessContent />
      </div>
    </Suspense>
  );
}
