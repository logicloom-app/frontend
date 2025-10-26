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
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {isClient &&
        (theme === "dark" ? (
          <div className="fixed inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/7-dark.png')] bg-cover opacity-20" />
        ) : (
          <div className="fixed inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/8-dark.png')] bg-cover opacity-20" />
        ))}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl relative group">
              <TbMessageCircle className="w-8 h-8 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl animate-pulse opacity-30" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent pb-1 leading-tight">
            {dict?.sendContactRequest}
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium">
            {dict?.sendContactDescription}
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-[2rem] shadow-2xl shadow-emerald-500/10 dark:shadow-emerald-500/5 border-2 border-emerald-200 dark:border-emerald-900/50 overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 rounded-full blur-3xl" />

            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white relative z-10">
              <h2 className="text-3xl font-bold mb-2 md:ml-4">{dict?.getInTouch}</h2>
              <p className="text-emerald-100 md:ml-4">
                {dict?.sendContactDescription2}
              </p>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="p-8 space-y-6 relative z-10"
            >
              {/* Name Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <TbUser className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  {dict?.name}
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={dict?.namePlaceholder}
                  noBorder={true}
                  className="rounded-2xl px-4 py-3 border-2 focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors"
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
                  <TbBuilding className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  {dict?.company} <span className="text-gray-400">(Optional)</span>
                </label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  placeholder={dict?.companyPlaceholder}
                  noBorder={true}
                  className="rounded-2xl px-4 py-3 border-2 focus:border-teal-500 dark:focus:border-teal-400 transition-colors"
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
                    <TbMail className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    {dict?.email}
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={dict?.emailPlaceholder}
                    noBorder={true}
                    className="rounded-2xl px-4 py-3 border-2 focus:border-cyan-500 dark:focus:border-cyan-400 transition-colors"
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
                    <TbPhone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    {dict?.phone}
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder={dict?.phonePlaceholder}
                    noBorder={true}
                    className="rounded-2xl px-4 py-3 border-2 focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors"
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
                  <TbMessageCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  {dict?.contactDescription}
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder={dict?.sendContactDescription2}
                  className="rounded-2xl px-4 py-3 bg-background/90 border-2 focus:border-teal-500 dark:focus:border-teal-400 transition-colors min-h-[150px]"
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
                className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 disabled:hover:shadow-none disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <Spinner className="w-5 h-5" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <span className="relative z-10">{dict?.send}</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg border-2 border-emerald-200 dark:border-emerald-900/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <TbMail className="w-7 h-7 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            </div>
            <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Email</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              hi@logicloom.de
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg border-2 border-teal-200 dark:border-teal-900/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <TbPhone className="w-7 h-7 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            </div>
            <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Phone</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              not available
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg border-2 border-cyan-200 dark:border-cyan-900/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <TbMessageCircle className="w-7 h-7 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-emerald-400 to-teal-400 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            </div>
            <h3 className="font-bold mb-2 text-gray-800 dark:text-white">
              Response Time
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
