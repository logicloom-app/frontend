import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { trackSignUp } from "@/lib/utils/gtag";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { register } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function SignupCheckOtp({ setStep, setIsLogin, dict }) {
  const { toast } = useToast();
  const [otp, setOtp] = useState("");

  const { isPending, mutateAsync: mutateRegister } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      trackSignUp("email");

      setIsLogin(true);
      setStep(0);

      toast({
        description: dict?.verify?.success,
        className: "rounded-2xl",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Something went wrong",
        className: "rounded-2xl",
      });

      if (error?.response?.data?.error === "email already exists") {
        setIsLogin(true);
        setStep(0);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const password = localStorage.getItem("password");

    await mutateRegister({ name, email, password, otp });
  };

  return (
    <>
      <div
        onClick={() => setStep(0)}
        className="absolute top-4 right-2 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
      >
        <ArrowRight size={20} />
      </div>

      <div className="flex flex-col px-10 pt-10 my-6">
        <h1 className="text-3xl font-bold mb-5 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          {dict?.verify?.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {dict?.verify?.description}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {dict?.verify?.expiry}{" "}
          <span className="font-bold text-gray-800 dark:text-gray-100">
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
            <InputOTPSlot
              index={0}
              className="border-2 border-purple-300 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-500"
            />
          </InputOTPGroup>

          <InputOTPGroup>
            <InputOTPSlot
              index={1}
              className="border-2 border-purple-300 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-500"
            />
          </InputOTPGroup>

          <InputOTPGroup>
            <InputOTPSlot
              index={2}
              className="border-2 border-purple-300 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-500"
            />
          </InputOTPGroup>

          <InputOTPGroup>
            <InputOTPSlot
              index={3}
              className="border-2 border-purple-300 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-500"
            />
          </InputOTPGroup>

          <InputOTPGroup>
            <InputOTPSlot
              index={4}
              className="border-2 border-purple-300 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-500"
            />
          </InputOTPGroup>

          <InputOTPGroup>
            <InputOTPSlot
              index={5}
              className="border-2 border-purple-300 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-500"
            />
          </InputOTPGroup>
        </InputOTP>

        <Button
          disabled={otp.length !== 6 || isPending}
          variant="custom"
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
        >
          {isPending ? <Spinner className="w-4 h-4" /> : dict?.verify?.submit}
        </Button>
      </form>
    </>
  );
}
