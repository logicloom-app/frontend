import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { login } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: mutateLogin } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast({
        description: data.message,
        className: "rounded-2xl",
      });

      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
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
      <div className="flex flex-col px-10 pt-10 mt-6 mb-5">
        <h1 className="text-5xl font-bold mb-5">{dict?.title}</h1>
        <p className="text-base">{dict?.welcome}</p>
      </div>

      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
        className="inline-flex justify-center items-center gap-3 rounded-2xl px-6 py-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-700/80 transition-colors duration-300"
      >
        <FcGoogle size={30} />
        <p className="text-base">{dict?.google}</p>
      </Link>

      <div className="flex items-center mx-10 mt-10">
        <div className="flex-grow border-t border-zinc-700"></div>
        <span className="mx-4 text-sm text-zinc-400">
          {dict?.or || "or"} {dict?.email}
        </span>
        <div className="flex-grow border-t border-zinc-700"></div>
      </div>

      <form
        onSubmit={loginFormik.handleSubmit}
        className="flex flex-col gap-5 md:p-10 py-4 mb-6"
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
            className="mb-2"
          >
            {dict?.submit}
          </Button>

          <div>
            <Link
              href="/auth/password-reset"
              className="underline-offset-4 hover:underline"
            >
              <p className="text-sm">{dict?.forgotPassword}</p>
            </Link>

            <div className="text-sm">
              {dict?.noAccount}{" "}
              <Button variant="link" onClick={() => setIsLogin(false)}>
                {dict?.register}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
