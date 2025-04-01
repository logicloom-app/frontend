import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetUserPayments } from "@/lib/hooks/useAdmin";
import { formatDate } from "@/lib/utils/utils";
import { ReceiptEuro } from "lucide-react";
import { useMemo } from "react";
import { BsPaypal, BsStripe } from "react-icons/bs";

export default function UserPayments({ user }) {
  const { data } = useGetUserPayments(user?.id);
  const { payments } = data || {};

  const memoizedPayments = useMemo(() => payments, [payments]);

  return (
    <Dialog>
      <DialogTrigger className="rounded-full">
        <div className="p-2 rounded-full dark:text-green-400 hover:bg-gray-100 dark:hover:bg-green-400/20 transition duration-300">
          <ReceiptEuro />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">User Payments</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[600px]"></DialogDescription>

          {memoizedPayments?.length > 0 ? (
            <div className="flex flex-col gap-2 p-2 overflow-y-auto max-h-[calc(100vh-10rem)]">
              {memoizedPayments
                ?.slice()
                .reverse()
                ?.map((payment, index) => (
                  <div
                    key={payment?.id}
                    className="flex items-center justify-between gap-2 px-4 py-2 rounded-2xl bg-gray-100 dark:bg-gray-800"
                  >
                    <div className="text-sm font-medium">
                      {payment?.currency === "EUR" ? "€" : payment?.currency}{" "}
                      {payment?.amount}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {payment?.status}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(payment?.created_at)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {payment?.currency}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {payment?.payment_method === "paypal" && (
                        <BsPaypal className="text-xl text-blue-800" />
                      )}
                      {payment?.payment_method === "stripe" && (
                        <BsStripe className="text-xl text-indigo-500 bg-white rounded-[5px]" />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div>No payments found</div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
