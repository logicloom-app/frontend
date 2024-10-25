import { useToast } from "@/lib/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { generateOtp } from "@/services/authService";

export default function SignupForm({ registerFormik, setStep, setIsLogin, dict }) {
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutateGenerateOtp } = useMutation({
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
        <h1 className="text-5xl font-bold mb-5">{dict?.title}</h1>
        <p className="text-base">{dict?.welcome}</p>
      </div>

      <form className="flex flex-col gap-5 md:p-10 py-4 my-4">
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
          disabled={!registerFormik.isValid}
          variant="custom"
          className=""
          onClick={handleUserInfo}
        >
          {dict?.submit}
        </Button>

        <p className="text-sm">
          {dict?.hasAccount}
          <Button variant="link" onClick={() => setIsLogin(true)}>
            {dict?.login}
          </Button>
        </p>
      </form>
    </>
  );
}
