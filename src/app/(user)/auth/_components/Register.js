import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import SignupForm from "./SignupForm";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import SignupCheckOtp from "./SignupCheckOtp";
import { register } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";

const initialRegisterValues = {
  name: "",
  email: "",
  password: "",
};

const registerValidationSchema = Yup.object({
  name: Yup.string().required("Enter your name"),
  email: Yup.string()
    .required("Enter your email")
    .matches(/^\S*$/, "Space is not allowed in email")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"),
  password: Yup.string()
    .required("Enter your password")
    .matches(/^\S*$/, "Space is not allowed in password")
    .min(6, "Enter at least six characters"),
});

export default function Register({ setIsLogin, setStep, step }) {
  const registerHandler = async ({ name, email, password }) => {};

  const registerFormik = useFormik({
    initialValues: initialRegisterValues,
    onSubmit: registerHandler,
    validationSchema: registerValidationSchema,
    validateOnMount: true,
  });

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <SignupForm
            registerFormik={registerFormik}
            setStep={setStep}
            setIsLogin={setIsLogin}
          />
        );
      case 1:
        return (
          <SignupCheckOtp
            registerFormik={registerFormik}
            setIsLogin={setIsLogin}
            setStep={setStep}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderSteps()}</>;
}
