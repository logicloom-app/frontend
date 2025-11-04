"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/services/userService";
import { Lock, KeyRound, ShieldCheck } from "lucide-react";

export default function UpdatePasswordForm({ dict }) {
  const { toast } = useToast();

  const PasswordSchema = Yup.object().shape({
    current_password: Yup.string()
      .required(
        dict?.validation?.currentPasswordRequired || "Current password is required"
      )
      .matches(
        /^\S*$/,
        dict?.validation?.passwordNoSpaces || "Password must not contain spaces"
      )
      .min(
        6,
        dict?.validation?.passwordMinLength ||
          "Password must be at least 6 characters"
      ),
    new_password: Yup.string()
      .required(dict?.validation?.newPasswordRequired || "New password is required")
      .matches(
        /[0-9]/,
        dict?.validation?.passwordNumber ||
          "Password must contain at least one number"
      )
      .matches(
        /[a-z]/,
        dict?.validation?.passwordLowercase ||
          "Password must contain at least one lowercase letter"
      )
      .matches(
        /[A-Z]/,
        dict?.validation?.passwordUppercase ||
          "Password must contain at least one uppercase letter"
      )
      .matches(
        /[!@#$%^&*]/,
        dict?.validation?.passwordSpecialChar ||
          "Password must contain at least one special character"
      )
      .matches(
        /^\S*$/,
        dict?.validation?.passwordNoSpaces || "Password must not contain spaces"
      )
      .min(
        6,
        dict?.validation?.passwordMinLength ||
          "Password must be at least 6 characters"
      ),

    confirm_password: Yup.string()
      .required(
        dict?.validation?.confirmPasswordRequired || "Confirm password is required"
      )
      .oneOf(
        [Yup.ref("new_password")],
        dict?.validation?.passwordsMustMatch || "Passwords must match"
      ),
  });

  const { isLoading, mutateAsync: mutateUpdatePassword } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      formik.resetForm();
      toast({
        description: dict?.success || "Password updated successfully",
        className: "rounded-2xl",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description:
          error?.response?.data?.error || dict?.error || "Something went wrong",
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
    validateOnMount: true,
  });

  return (
    <div className="w-full h-full p-4 md:p-6 overflow-auto">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                {dict?.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dict?.subtitle || "Keep your account secure with a strong password"}
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-gray-100 max-w-3xl dark:bg-gray-800 rounded-3xl p-6 border-2 border-gray-200 dark:border-gray-700"
        >
          <div className="space-y-6">
            {/* Current Password */}
            <div>
              <label
                htmlFor="current_password"
                className="flex items-center gap-2 text-sm font-medium mb-2"
              >
                <KeyRound className="w-4 h-4 text-gray-500" />
                {dict?.currentPassword}
              </label>
              <Input
                type="password"
                id="current_password"
                name="current_password"
                placeholder={dict?.currentPassword || "Current Password"}
                className="rounded-2xl"
                onBlur={formik.handleBlur}
                value={formik.values.current_password}
                onChange={formik.handleChange}
              />
              {formik.touched.current_password && formik.errors.current_password ? (
                <div className="mt-2 text-rose-500 text-xs flex items-center gap-1">
                  <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                  {formik.errors.current_password}
                </div>
              ) : null}
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="new_password"
                className="flex items-center gap-2 text-sm font-medium mb-2"
              >
                <ShieldCheck className="w-4 h-4 text-gray-500" />
                {dict?.newPassword}
              </label>
              <Input
                type="password"
                id="new_password"
                name="new_password"
                placeholder={dict?.newPassword || "New Password"}
                className="rounded-2xl"
                onBlur={formik.handleBlur}
                value={formik.values.new_password}
                onChange={formik.handleChange}
              />
              {formik.touched.new_password && formik.errors.new_password ? (
                <div className="mt-2 text-rose-500 text-xs flex items-center gap-1">
                  <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                  {formik.errors.new_password}
                </div>
              ) : null}

              {/* Password Requirements */}
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900">
                <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-2">
                  {dict?.requirements?.title || "Password Requirements:"}
                </p>
                <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    {dict?.requirements?.minLength || "At least 6 characters"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    {dict?.requirements?.case || "One uppercase & lowercase letter"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    {dict?.requirements?.special ||
                      "One number & special character (!@#$%^&*)"}
                  </li>
                </ul>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm_password"
                className="flex items-center gap-2 text-sm font-medium mb-2"
              >
                <ShieldCheck className="w-4 h-4 text-gray-500" />
                {dict?.confirmPassword}
              </label>
              <Input
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder={dict?.confirmPassword || "Confirm Password"}
                className="rounded-2xl"
                onBlur={formik.handleBlur}
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
              />
              {formik.touched.confirm_password && formik.errors.confirm_password ? (
                <div className="mt-2 text-rose-500 text-xs flex items-center gap-1">
                  <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                  {formik.errors.confirm_password}
                </div>
              ) : null}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!formik.isValid || isLoading}
              className="w-full rounded-full"
            >
              {isLoading ? (
                <Spinner className="w-5 h-5" />
              ) : (
                dict?.update || "Update Password"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
