"use client";

import { useMutation } from "@tanstack/react-query";
import { sendContactMessage } from "@/services/userService";
import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useFormik } from "formik";
import Meteors from "@/components/ui/meteors";
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  company: Yup.string(),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  description: Yup.string().required("Description is required"),
});

export default function ContactClient({ dict }) {
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const { lang } = useParams();
  const { theme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isPending: isLoading, mutateAsync: mutateSendContact } = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: (data) => {
      toast({
        description: "Message sent successfully",
        className: "rounded-2xl",
      });
      formik.resetForm();
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
    await mutateSendContact(values);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      description: "",
    },
    validationSchema: ContactSchema,
    onSubmit: submitHandler,
    validateOnMount: true,
  });

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-50px)] relative overflow-hidden w-full px-4 py-6">
      {isClient &&
        (theme === "dark" ? (
          <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/1-dark.png')] bg-cover opacity-50" />
        ) : (
          <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/7-dark.png')] bg-cover opacity-40" />
        ))}

      <div className="z-10 w-full max-w-[700px] rounded-[30px] px-4 py-6 sm:px-6 sm:py-10 transition-shadow">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold mb-2">{dict?.sendContactRequest}</h1>
          <p className="text-gray-700">{dict?.sendContactDescription}</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col items-start gap-1">
            <Input
              type="text"
              id="name"
              name="name"
              placeholder={dict?.name}
              className="rounded-2xl px-4 py-2"
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik?.touched?.name && formik?.errors?.name ? (
              <div className="ml-2 text-rose-500 text-left text-xs">
                {formik.errors?.name}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-1">
            <Input
              type="text"
              id="company"
              name="company"
              placeholder={dict?.company}
              className="rounded-2xl px-4 py-2"
              onBlur={formik.handleBlur}
              value={formik.values.company}
              onChange={formik.handleChange}
            />
            {formik?.touched?.company && formik?.errors?.company ? (
              <div className="ml-2 text-rose-500 text-left text-xs">
                {formik.errors?.company}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-1">
            <Input
              type="email"
              id="email"
              name="email"
              placeholder={dict?.email}
              className="rounded-2xl px-4 py-2"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik?.touched?.email && formik?.errors?.email ? (
              <div className="ml-2 text-rose-500 text-left text-xs">
                {formik.errors?.email}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-1">
            <Input
              type="tel"
              id="phone"
              name="phone"
              placeholder={dict?.phone}
              className="rounded-2xl px-4 py-2"
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik?.touched?.phone && formik?.errors?.phone ? (
              <div className="ml-2 text-rose-500 text-left text-xs">
                {formik.errors?.phone}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-1">
            <Textarea
              id="description"
              name="description"
              placeholder={dict?.contactDescription}
              className="rounded-2xl px-4 py-2 mb-1 bg-background/90 max-h-[150px]"
              onBlur={formik.handleBlur}
              value={formik.values.description}
              onChange={formik.handleChange}
              rows={4}
            />
            {formik?.touched?.description && formik?.errors?.description ? (
              <div className="ml-2 text-rose-500 text-left text-xs">
                {formik.errors?.description}
              </div>
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={!formik.isValid || isLoading}
            variant="custom"
            className="w-full"
          >
            {isLoading ? <Spinner className="w-5 h-5" /> : dict?.send}
          </Button>
        </form>
      </div>

      <Meteors number={15} />
    </div>
  );
}
