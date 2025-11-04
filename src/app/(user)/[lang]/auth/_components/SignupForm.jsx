import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Spinner from "@/components/ui/Spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { generateOtp } from "@/services/authService";
import { trackButtonClick } from "@/lib/utils/gtag";

export default function SignupForm({ registerFormik, setStep, setIsLogin, dict }) {
  const { toast } = useToast();

  const { isPending, mutateAsync: mutateGenerateOtp } = useMutation({
    mutationFn: generateOtp,
    onSuccess: (data) => {
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

  const handleUserInfo = async (e) => {
    e.preventDefault();

    localStorage.setItem("email", registerFormik.values?.email);
    localStorage.setItem("name", registerFormik.values?.name);
    localStorage.setItem("password", registerFormik.values?.password);

    await mutateGenerateOtp({ email: registerFormik.values?.email });

    setStep(1);
  };

  return (
    <>
      <div className="flex flex-col px-10 pt-10 my-4">
        <h1 className="text-5xl font-bold mb-5 pb-1 leading-tight bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          {dict?.title}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">{dict?.welcome}</p>
      </div>

      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
        onClick={() => trackButtonClick("Google Sign Up", "Auth Page")}
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

      <form className="flex flex-col gap-5 md:p-10 py-4 my-4 md:my-0">
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className="rounded-2xl px-4 py-6"
          onBlur={registerFormik?.handleBlur}
          value={registerFormik?.values?.name}
          onChange={registerFormik?.handleChange}
        />
        {registerFormik?.touched?.name && registerFormik?.errors?.name ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {registerFormik.errors?.name}
          </div>
        ) : null}

        <Input
          type="email"
          id="email"
          name="email"
          placeholder={dict?.email}
          className="rounded-2xl px-4 py-6"
          onBlur={registerFormik?.handleBlur}
          value={registerFormik?.values?.email}
          onChange={registerFormik?.handleChange}
        />
        {registerFormik?.touched?.email && registerFormik?.errors?.email ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {registerFormik.errors?.email}
          </div>
        ) : null}

        <Input
          type="password"
          id="password"
          name="password"
          placeholder={dict?.password}
          className="rounded-2xl px-4 py-6"
          onBlur={registerFormik?.handleBlur}
          value={registerFormik?.values?.password}
          onChange={registerFormik?.handleChange}
        />
        {registerFormik?.touched?.password && registerFormik?.errors?.password ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {registerFormik.errors?.password}
          </div>
        ) : null}

        <Button
          disabled={!registerFormik.isValid || isPending}
          variant="custom"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
          onClick={handleUserInfo}
        >
          {isPending ? <Spinner className="w-4 h-4" /> : dict?.submit}
        </Button>

        <div className="flex flex-col gap-3 mt-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-gray-900 px-2 rounded-full text-gray-500 dark:text-gray-400">
                or
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className="text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
          >
            {dict?.hasAccount}{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              {dict?.login}
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
