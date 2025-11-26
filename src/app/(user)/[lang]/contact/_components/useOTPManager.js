import { generateContactOTP, verifyContactOTP } from "@/services/userService";
import { OTP_COUNTDOWN_SECONDS } from "./contactConstants";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/lib/hooks/use-toast";
import { useState, useEffect } from "react";

/**
 * Custom Hook for OTP Management
 * @param {Object} dict - Translation dictionary
 * @returns {Object} OTP state and handlers
 */
export function useOTPManager(dict) {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  // OTP Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && otpSent) {
      setOtpSent(false);
    }
  }, [countdown, otpSent]);

  // Generate OTP mutation
  const { isPending: isGeneratingOTP, mutateAsync: mutateGenerateOTP } = useMutation(
    {
      mutationFn: generateContactOTP,
      onSuccess: () => {
        setOtpSent(true);
        setCountdown(OTP_COUNTDOWN_SECONDS);
        toast({
          description:
            dict?.otp?.otpSent || "OTP sent to your email. Valid for 5 minutes.",
          className: "rounded-2xl",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          description:
            error?.response?.data?.error ||
            dict?.otp?.failedToSend ||
            "Failed to send OTP",
          className: "rounded-2xl",
        });
      },
    }
  );

  // Verify OTP mutation
  const { isPending: isVerifyingOTP, mutateAsync: mutateVerifyOTP } = useMutation({
    mutationFn: ({ email, otp }) => verifyContactOTP(email, otp),
    onSuccess: () => {
      setOtpVerified(true);
      toast({
        description: dict?.otp?.otpVerified || "OTP verified successfully!",
        className: "rounded-2xl",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description:
          error?.response?.data?.error || dict?.otp?.invalidOTP || "Invalid OTP",
        className: "rounded-2xl",
      });
    },
  });

  const handleGenerateOTP = async (formik) => {
    if (!formik.values.email || formik.errors.email) {
      formik.setFieldTouched("email", true);
      toast({
        variant: "destructive",
        description:
          dict?.otp?.pleaseEnterValidEmail ||
          "Please enter a valid email address first",
        className: "rounded-2xl",
      });
      return;
    }
    await mutateGenerateOTP(formik.values.email);
  };

  const handleVerifyOTP = async (formik) => {
    if (!formik.values.otp || formik.errors.otp) {
      formik.setFieldTouched("otp", true);
      return;
    }
    await mutateVerifyOTP({
      email: formik.values.email,
      otp: formik.values.otp,
    });
  };

  const resetOTP = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setCountdown(0);
  };

  return {
    otpSent,
    otpVerified,
    countdown,
    isGeneratingOTP,
    isVerifyingOTP,
    handleGenerateOTP,
    handleVerifyOTP,
    resetOTP,
  };
}
