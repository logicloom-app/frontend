import { trackPayment, trackButtonClick } from "@/lib/utils/gtag";
import { createPaypalOrder } from "@/services/paymentService";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";

export default function PaypalPayment({ formik, dict }) {
  const { toast } = useToast();
  const router = useRouter();

  const {
    isPending: isPendingCreatePaypalOrder,
    mutateAsync: mutateCreatePaypalOrder,
  } = useMutation({
    mutationFn: createPaypalOrder,
    onSuccess: (data) => {
      const amount = Number(formik.values.amount).toFixed(2);
      trackPayment("PayPal", parseFloat(amount));

      toast({
        description: (
          <div className="flex flex-col gap-2">
            <p>{dict.paypal_order_created_successfully}</p>
            <p className="font-bold">{dict.redirecting_to_payment}</p>
          </div>
        ),
        className: "rounded-2xl",
      });

      router.push(data?.approve_url);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Something went wrong",
        className: "rounded-2xl",
      });
    },
  });

  const createPaypalOrderHandler = async () => {
    trackButtonClick("PayPal Payment", "Loom Purchase");
    const amount = Number(formik.values.amount).toFixed(2);
    await mutateCreatePaypalOrder(amount);
  };

  return (
    <Button
      // disabled={!formik.isValid || isPendingCreatePaypalOrder}
      disabled
      className="w-full rounded-2xl font-bold text-lg text-blue-900 bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-600"
      onClick={createPaypalOrderHandler}
    >
      {isPendingCreatePaypalOrder ? (
        <Spinner className="w-6 h-6" />
      ) : (
        <>
          Pay<span className="text-blue-500">Pal</span>
        </>
      )}
    </Button>
  );
}
