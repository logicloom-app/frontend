"use client";

import { useEffect, Suspense } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

function StripeCancelContent() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  // const searchParams = useSearchParams();
  // const allParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    toast({
      variant: "destructive",
      description: "Payment cancelled.",
      className: "rounded-2xl",
    });

    router.push("/loom");
    queryClient.invalidateQueries({ queryKey: ["get-user"] });
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 items-center justify-center min-h-[50vh]">
        <Spinner className="w-10 h-10" />
        <div>Processing...</div>
      </div>
    </div>
  );
}

export default function StripeCancel() {
  return (
    <Suspense
      fallback={
        <div>
          <div className="flex flex-col gap-2 items-center justify-center min-h-[50vh]">
            <Spinner className="w-10 h-10" />
            <div>Processing...</div>
          </div>
        </div>
      }
    >
      <StripeCancelContent />
    </Suspense>
  );
}
