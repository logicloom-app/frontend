import * as Yup from "yup";
import { useFormik } from "formik";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordSendOtp } from "@/services/authService";

const initialResetPasswordValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function ResetPasswordForm({ setStep, dict, setEmail, setPassword }) {
  const { toast } = useToast();
  const router = useRouter();

  const resetPasswordValidationSchema = Yup.object({
    email: Yup.string()
      .required(dict?.emailRequired)
      .matches(/^\S*$/, dict?.spaceNotAllowedInEmail)
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, dict?.validEmailAddress),
    password: Yup.string()
      .required(dict?.passwordRequired)
      .matches(/^\S*$/, dict?.spaceNotAllowedInPassword)
      .min(6, dict?.atLeastSixCharacters),
    confirmPassword: Yup.string()
      .required(dict?.confirmPasswordRequired)
      .oneOf([Yup.ref("password")], dict?.passwordsDoNotMatch),
  });

  const { isPending, mutateAsync: mutateResetPasswordSendOtp } = useMutation({
    mutationFn: resetPasswordSendOtp,
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

  const resetPasswordHandler = async ({ email, password, confirmPassword }) => {
    await mutateResetPasswordSendOtp({ email });

    setEmail(email);
    setPassword(confirmPassword);
    setStep(1);
  };

  const resetPasswordFormik = useFormik({
    initialValues: initialResetPasswordValues,
    onSubmit: resetPasswordHandler,
    validationSchema: resetPasswordValidationSchema,
    validateOnMount: true,
  });

  return (
    <div>
      <div
        onClick={() => router.back()}
        className="absolute top-4 right-2 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
      >
        <ArrowRight size={20} />
      </div>

      <div className="flex flex-col px-10 pt-10 mt-6 mb-5">
        <h1 className="text-2xl font-bold mb-5">{dict?.title}</h1>
        <p className="text-base">{dict?.description}</p>
      </div>

      <form
        onSubmit={resetPasswordFormik.handleSubmit}
        className="flex flex-col gap-5 md:p-10 py-4 mb-6"
      >
        <Input
          type="email"
          id="email"
          name="email"
          placeholder={dict?.email}
          className="rounded-2xl px-4 py-6"
          onBlur={resetPasswordFormik?.handleBlur}
          value={resetPasswordFormik?.values?.email}
          onChange={resetPasswordFormik?.handleChange}
        />
        {resetPasswordFormik?.touched?.email &&
        resetPasswordFormik?.errors?.email ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {resetPasswordFormik.errors?.email}
          </div>
        ) : null}

        <Input
          type="password"
          id="password"
          name="password"
          placeholder={dict?.password}
          className="rounded-2xl px-4 py-6"
          onBlur={resetPasswordFormik?.handleBlur}
          value={resetPasswordFormik?.values?.password}
          onChange={resetPasswordFormik?.handleChange}
        />
        {resetPasswordFormik?.touched?.password &&
        resetPasswordFormik?.errors?.password ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {resetPasswordFormik.errors?.password}
          </div>
        ) : null}

        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder={dict?.confirmPassword}
          className="rounded-2xl px-4 py-6"
          onBlur={resetPasswordFormik?.handleBlur}
          value={resetPasswordFormik?.values?.confirmPassword}
          onChange={resetPasswordFormik?.handleChange}
        />
        {resetPasswordFormik?.touched?.confirmPassword &&
        resetPasswordFormik?.errors?.confirmPassword ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {resetPasswordFormik.errors?.confirmPassword}
          </div>
        ) : null}

        <Button
          disabled={!resetPasswordFormik.isValid}
          type="submit"
          variant="custom"
          className="mb-2 flex items-center justify-center"
        >
          {!isPending ? dict?.submit : "Pending ..."}
        </Button>
      </form>
    </div>
  );
}
