"use client";

import { useEffect, Suspense } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { capturePaypalOrder } from "@/services/paymentService";
import Spinner from "@/components/ui/Spinner";

function PaypalCancelContent() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  // const searchParams = useSearchParams();
  // const allParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    toast({
      variant: "destructive",
      description: "Paypal payment cancelled.",
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

export default function PaypalCancel() {
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
      <PaypalCancelContent />
    </Suspense>
  );
}
