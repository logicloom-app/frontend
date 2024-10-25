import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { login } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const initialLoginWithPassValues = {
  email: "",
  password: "",
};

const loginWithPassValidationSchema = Yup.object({
  email: Yup.string()
    .required("Enter your email")
    .matches(/^\S*$/, "Space is not allowed in email")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"),
  password: Yup.string()
    .required("Enter your password")
    .matches(/^\S*$/, "Space is not allowed in password")
    .min(6, "Enter at least six characters"),
});

export default function LoginWithPassword({ setIsLogin, dict }) {
  const { toast } = useToast();
  const router = useRouter();

  const { isLoading, mutateAsync: mutateLogin } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      router.refresh();

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
    },
  });

  const loginHandler = async ({ email, password }) => {
    await mutateLogin({ email, password });
  };

  const loginFormik = useFormik({
    initialValues: initialLoginWithPassValues,
    onSubmit: loginHandler,
    validationSchema: loginWithPassValidationSchema,
    validateOnMount: true,
  });

  return (
    <>
      <div className="flex flex-col px-10 pt-10 my-6">
        <h1 className="text-5xl font-bold mb-5">{dict?.title}</h1>
        <p className="text-base">{dict?.welcome}</p>
      </div>

      <form
        onSubmit={loginFormik.handleSubmit}
        className="flex flex-col gap-5 md:p-10 py-4 my-6"
      >
        <Input
          type="email"
          id="email"
          name="email"
          placeholder={dict?.email}
          className="rounded-2xl px-4 py-6"
          onBlur={loginFormik?.handleBlur}
          value={loginFormik?.values?.email}
          onChange={loginFormik?.handleChange}
        />
        {loginFormik?.touched?.email && loginFormik?.errors?.email ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {loginFormik.errors?.email}
          </div>
        ) : null}

        <Input
          type="password"
          id="password"
          name="password"
          placeholder={dict?.password}
          className="rounded-2xl px-4 py-6"
          onBlur={loginFormik?.handleBlur}
          value={loginFormik?.values?.password}
          onChange={loginFormik?.handleChange}
        />
        {loginFormik?.touched?.password && loginFormik?.errors?.password ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {loginFormik.errors?.password}
          </div>
        ) : null}

        <div className="flex flex-col gap-4">
          <Button
            disabled={!loginFormik.isValid}
            type="submit"
            variant="custom"
            className=""
          >
            {dict?.submit}
          </Button>

          <p className="text-sm">
            {dict?.noAccount}{" "}
            <Button variant="link" onClick={() => setIsLogin(false)}>
              {dict?.register}
            </Button>
          </p>
        </div>
      </form>
    </>
  );
}
