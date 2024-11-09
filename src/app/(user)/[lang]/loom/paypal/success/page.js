"use client";

import { useEffect, Suspense } from "react";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { capturePaypalOrder } from "@/services/paymentService";
import Spinner from "@/components/ui/Spinner";

function PaypalSuccessContent() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const allParams = Object.fromEntries(searchParams.entries());

  const { isPending, mutateAsync: mutateCapturePaypalOrder } = useMutation({
    mutationFn: capturePaypalOrder,
    onSuccess: (data) => {
      toast({
        description: (
          <div className="flex flex-col gap-2">
            <p>{data?.message}</p>
            <p>LOOMs added: {data?.loom_added}</p>
          </div>
        ),
        className: "rounded-2xl",
      });

      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      router.push("/loom");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Something went wrong",
        className: "rounded-2xl",
      });
    },
  });

  useEffect(() => {
    mutateCapturePaypalOrder(allParams.token, allParams.PayerID);
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

export default function PaypalSuccess() {
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
      <PaypalSuccessContent />
    </Suspense>
  );
}
