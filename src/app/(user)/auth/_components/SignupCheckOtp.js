import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { register } from "@/services/authService";

export default function SignupCheckOtp({ setStep, setIsLogin }) {
  const { toast } = useToast();
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const { isLoading, mutateAsync: mutateRegister } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setIsLogin(true);
      setStep(0);

      toast({
        description: data.message,
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
      <div className="flex flex-col px-10 pt-10 my-6">
        <h1 className="text-3xl font-bold mb-5">Verify your account</h1>
        <p className="text-sm">Please enter the OTP sent to your email.</p>
        <p className="text-sm text-gray-300">
          The OTP will expire in{" "}
          <span className="font-bold text-gray-100">10 minutes</span>.
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
          disabled={otp.length !== 6}
          variant="custom"
          type="submit"
          className="w-full"
        >
          Verify
        </Button>
      </form>
    </>
  );
}
