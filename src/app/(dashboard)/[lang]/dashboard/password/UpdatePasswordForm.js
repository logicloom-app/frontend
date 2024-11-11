"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/services/userService";

const PasswordSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("Current password is required")
    .matches(/^\S*$/, "Password must not contain spaces")
    .min(6, "Password must be at least 6 characters"),
  new_password: Yup.string()
    .required("New password is required")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
    .matches(/^\S*$/, "Password must not contain spaces")
    .min(6, "Password must be at least 6 characters"),

  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("new_password")], "Passwords must match"),
});

export default function UpdatePasswordForm({ dict }) {
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutateUpdatePassword } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast({
        description: "Password updated successfully",
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

  const submitHandler = async (values) => {
    await mutateUpdatePassword(values);
  };

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: PasswordSchema,
    onSubmit: submitHandler,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-5 max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-bold">{dict?.title}</h3>

      <Input
        type="password"
        id="current_password"
        name="current_password"
        placeholder={dict?.currentPassword || "Current Password"}
        className="rounded-2xl px-4 py-2"
        onBlur={formik.handleBlur}
        value={formik.values.current_password}
        onChange={formik.handleChange}
      />
      {formik.touched.current_password && formik.errors.current_password ? (
        <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
          {formik.errors.current_password}
        </div>
      ) : null}

      <Input
        type="password"
        id="new_password"
        name="new_password"
        placeholder={dict?.newPassword || "New Password"}
        className="rounded-2xl px-4 py-2"
        onBlur={formik.handleBlur}
        value={formik.values.new_password}
        onChange={formik.handleChange}
      />
      {formik.touched.new_password && formik.errors.new_password ? (
        <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
          {formik.errors.new_password}
        </div>
      ) : null}

      <Input
        type="password"
        id="confirm_password"
        name="confirm_password"
        placeholder={dict?.confirmPassword || "Confirm Password"}
        className="rounded-2xl px-4 py-2"
        onBlur={formik.handleBlur}
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
      />
      {formik.touched.confirm_password && formik.errors.confirm_password ? (
        <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
          {formik.errors.confirm_password}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={!formik.isValid || isLoading}
        variant="custom"
        className="w-full"
      >
        {isLoading ? (
          <Spinner className="w-5 h-5" />
        ) : (
          dict?.update || "Update Password"
        )}
      </Button>
    </form>
  );
}
