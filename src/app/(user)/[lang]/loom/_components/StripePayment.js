import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PaypalPayment from "./PaypalPayment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createStripeOrder } from "@/services/paymentService";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function StripePayment({ formik, dict }) {
  const { toast } = useToast();
  const router = useRouter();

  const {
    isPending: isPendingCreateStripeOrder,
    mutateAsync: mutateCreateStripeOrder,
  } = useMutation({
    mutationFn: createStripeOrder,
    onSuccess: (data) => {
      toast({
        description: (
          <div className="flex flex-col gap-2">
            <p>{dict.stripe_order_created_successfully}</p>
            <div>
              {dict.amount_total}: {(data?.session?.amount_total / 100).toFixed(2)}€
            </div>
            <p className="font-bold">{dict.redirecting_to_payment}</p>
          </div>
        ),
        className: "rounded-2xl",
      });

      router.push(data?.url);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Something went wrong",
        className: "rounded-2xl",
      });
    },
  });

  const createStripeOrderHandler = async () => {
    const amount = Number(formik.values.amount) * 100;
    await mutateCreateStripeOrder(amount);
  };

  return (
    <Button
      onClick={createStripeOrderHandler}
      disabled={!formik.isValid}
      className="w-full rounded-2xl font-bold text-lg"
    >
      {dict.credit_or_debit_card}
    </Button>
  );
}
