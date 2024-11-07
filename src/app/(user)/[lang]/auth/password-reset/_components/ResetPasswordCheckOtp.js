import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/authService";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function ResetPasswordCheckOtp({
  setStep,
  dict,
  email,
  password,
  otp,
  setOtp,
}) {
  const { toast } = useToast();
  const router = useRouter();

  const { isPending: isResetPasswordPending, mutateAsync: mutateResetPassword } =
    useMutation({
      mutationFn: resetPassword,
      onSuccess: (data) => {
        toast({
          description: data.message,
          className: "rounded-2xl",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          description: error?.response?.data?.error || dict?.verify?.error,
          className: "rounded-2xl",
        });
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateResetPassword({ email, new_password: password, otp });

    router.push("/auth");
  };

  return (
    <div className="p-4">
      <div
        onClick={() => setStep(0)}
        className="absolute top-4 right-2 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
      >
        <ArrowRight size={20} />
      </div>

      <div className="flex flex-col px-10 pt-10 my-6">
        <h1 className="text-3xl font-bold mb-5">{dict?.verify?.title}</h1>
        <p className="text-sm">{dict?.verify?.description}</p>
        <p className="text-sm dark:text-gray-300">
          {dict?.verify?.expiry}{" "}
          <span className="font-bold dark:text-gray-100">
            {dict?.verify?.minutes}
          </span>
          .
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5 md:p-10 py-4 my-6"
      >
        <InputOTP maxLength={6} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="border-zinc-500" />
          </InputOTPGroup>

          <InputOTPGroup>
            <InputOTPSlot index={1} className="border-zinc-500" />
          </InputOTPGroup>

          <InputOTPGroup>
            <InputOTPSlot index={2} className="border-zinc-500" />
          </InputOTPGroup>

          <InputOTPGroup>
            <InputOTPSlot index={3} className="border-zinc-500" />
          </InputOTPGroup>

          <InputOTPGroup>
            <InputOTPSlot index={4} className="border-zinc-500" />
          </InputOTPGroup>

          <InputOTPGroup>
            <InputOTPSlot index={5} className="border-zinc-500" />
          </InputOTPGroup>
        </InputOTP>

        <Button
          disabled={otp?.length !== 6}
          variant="custom"
          type="submit"
          className="w-full"
        >
          {!isResetPasswordPending ? dict?.verify?.submit : "Pending ..."}
        </Button>
      </form>
    </div>
  );
}
