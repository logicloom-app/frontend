"use client";

import { sendContactMessage } from "@/services/userService";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TbMail,
  TbPhone,
  TbUser,
  TbBuilding,
  TbMessageCircle,
} from "react-icons/tb";

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
    <div className="min-h-screen relative">
      {isClient &&
        (theme === "dark" ? (
          <div className="fixed inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/7-dark.png')] bg-cover opacity-40" />
        ) : (
          <div className="fixed inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/8-dark.png')] bg-cover opacity-40" />
        ))}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {dict?.sendContactRequest}
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            {dict?.sendContactDescription}
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-[35px] shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2 md:ml-4">{dict?.getInTouch}</h2>
              <p className="text-blue-100 md:ml-4">
                {dict?.sendContactDescription2}
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="p-8 space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <TbUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  {dict?.name}
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={dict?.namePlaceholder}
                  noBorder={true}
                  className="rounded-2xl px-4 py-3 border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.name && formik?.errors?.name ? (
                  <div className="text-rose-500 text-sm flex items-center gap-1">
                    {formik.errors?.name}
                  </div>
                ) : null}
              </div>

              {/* Company Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <TbBuilding className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  {dict?.company} <span className="text-gray-400">(Optional)</span>
                </label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  placeholder={dict?.companyPlaceholder}
                  noBorder={true}
                  className="rounded-2xl px-4 py-3 border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                  onBlur={formik.handleBlur}
                  value={formik.values.company}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <TbMail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    {dict?.email}
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={dict?.emailPlaceholder}
                    noBorder={true}
                    className="rounded-2xl px-4 py-3 border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik?.touched?.email && formik?.errors?.email ? (
                    <div className="text-rose-500 text-sm">
                      {formik.errors?.email}
                    </div>
                  ) : null}
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <TbPhone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    {dict?.phone}
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder={dict?.phonePlaceholder}
                    noBorder={true}
                    className="rounded-xl px-4 py-3 border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik?.touched?.phone && formik?.errors?.phone ? (
                    <div className="text-rose-500 text-sm">
                      {formik.errors?.phone}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Description Textarea */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <TbMessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  {dict?.contactDescription}
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder={dict?.sendContactDescription2}
                  className="rounded-2xl px-4 py-3 border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-colors min-h-[150px]"
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  rows={6}
                />
                {formik?.touched?.description && formik?.errors?.description ? (
                  <div className="text-rose-500 text-sm">
                    {formik.errors?.description}
                  </div>
                ) : null}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formik.isValid || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold px-8 py-4 rounded-3xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner className="w-5 h-5" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  dict?.send
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-[35px] p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TbMail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 dark:text-white">Email</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              hi@logicloom.de
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-[35px] p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TbPhone className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 dark:text-white">Phone</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">not available</p>
          </div>

          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-[35px] p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TbMessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 dark:text-white">Response Time</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
