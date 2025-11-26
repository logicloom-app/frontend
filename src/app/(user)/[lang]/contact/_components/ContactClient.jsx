"use client";

import { PRIMARY_BUTTON_CLASSES, ICON_COLORS } from "./contactConstants";
import { sendContactMessage } from "@/services/userService";
import { createContactSchema } from "./contactValidation";
import PhoneInputWithSearch from "./PhoneInputWithSearch";
import { useMutation } from "@tanstack/react-query";
import { trackFormSubmit } from "@/lib/utils/gtag";
import { useToast } from "@/lib/hooks/use-toast";
import { useOTPManager } from "./useOTPManager";
import Spinner from "@/components/ui/Spinner";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import OTPSection from "./OTPSection";
import FormField from "./FormField";
import { useFormik } from "formik";
import {
  TbMail,
  TbPhone,
  TbUser,
  TbBuilding,
  TbMessageCircle,
} from "react-icons/tb";

export default function ContactClient({ dict }) {
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // OTP Management
  const otpManager = useOTPManager(dict);

  // Submit contact form mutation
  const { isPending: isLoading, mutateAsync: mutateSendContact } = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      toast({
        description: dict?.messageSentSuccessfully || "Message sent successfully",
        className: "rounded-2xl",
      });
      trackFormSubmit("Contact Form", true);
      formik.resetForm();
      otpManager.resetOTP();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description:
          error?.response?.data?.error ||
          dict?.somethingWentWrong ||
          "Something went wrong",
        className: "rounded-2xl",
      });
      trackFormSubmit("Contact Form", false);
    },
  });

  const submitHandler = async (values) => {
    if (!otpManager.otpSent) {
      toast({
        variant: "destructive",
        description:
          dict?.otp?.pleaseGenerateOTP || "Please generate and enter OTP first",
        className: "rounded-2xl",
      });
      return;
    }
    await mutateSendContact(values);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      description: "",
      otp: "",
    },
    validationSchema: createContactSchema(dict),
    onSubmit: submitHandler,
  });

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background */}
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

            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white relative z-10">
              <h2 className="text-3xl font-bold mb-2 md:ml-4">{dict?.getInTouch}</h2>
              <p className="text-emerald-100 md:ml-4">
                {dict?.sendContactDescription2}
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={formik.handleSubmit}
              onClick={() => trackFormSubmit("Contact Form", true)}
              className="p-8 space-y-6 relative z-10"
            >
              {/* Name Field */}
              <FormField
                label={dict?.name}
                icon={TbUser}
                iconColor={ICON_COLORS.emerald}
                name="name"
                type="text"
                placeholder={dict?.namePlaceholder}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.name}
                error={formik.errors.name}
              />

              {/* Company Field */}
              <FormField
                label={dict?.company}
                icon={TbBuilding}
                iconColor={ICON_COLORS.teal}
                name="company"
                type="text"
                placeholder={dict?.companyPlaceholder}
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.company}
                error={formik.errors.company}
                optional
              />

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Field */}
                <FormField
                  label={dict?.email}
                  icon={TbMail}
                  iconColor={ICON_COLORS.cyan}
                  name="email"
                  type="email"
                  placeholder={dict?.emailPlaceholder}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.email}
                  error={formik.errors.email}
                />

                {/* Phone Field */}
                <div className="space-y-2 relative">
                  <label
                    className={`flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300`}
                  >
                    <TbPhone className={`w-5 h-5 ${ICON_COLORS.emerald}`} />
                    {dict?.phone}
                  </label>
                  <PhoneInputWithSearch
                    value={formik.values.phone}
                    onChange={(phone) => {
                      formik.setFieldValue("phone", phone, true);
                    }}
                    onBlur={() => {
                      formik.setFieldTouched("phone", true, true);
                    }}
                    hasError={formik.touched.phone && formik.errors.phone}
                    disabled={false}
                    dict={dict}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-rose-500 text-sm">
                      {formik.errors.phone}
                    </div>
                  )}
                </div>
              </div>

              {/* OTP Section - Only show when email is valid */}
              {formik.values.email && !formik.errors.email && (
                <OTPSection
                  dict={dict}
                  otpSent={otpManager.otpSent}
                  otpVerified={otpManager.otpVerified}
                  countdown={otpManager.countdown}
                  isGeneratingOTP={otpManager.isGeneratingOTP}
                  isVerifyingOTP={otpManager.isVerifyingOTP}
                  onGenerateOTP={() => otpManager.handleGenerateOTP(formik)}
                  onVerifyOTP={() => otpManager.handleVerifyOTP(formik)}
                  formik={formik}
                />
              )}

              {/* Description Field */}
              <FormField
                label={dict?.contactDescription}
                icon={TbMessageCircle}
                iconColor={ICON_COLORS.teal}
                name="description"
                type="textarea"
                placeholder={dict?.sendContactDescription2}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.description}
                error={formik.errors.description}
                rows={6}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formik.isValid || isLoading}
                className={PRIMARY_BUTTON_CLASSES}
                onClick={() => trackFormSubmit("Contact Form", true)}
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
          <InfoCard
            icon={TbMail}
            title="Email"
            content="hi@logicloom.de"
            gradientFrom="emerald"
            gradientVia="teal"
            gradientTo="cyan"
          />
          <InfoCard
            icon={TbPhone}
            title="Phone"
            content="not available"
            gradientFrom="teal"
            gradientVia="cyan"
            gradientTo="blue"
          />
          <InfoCard
            icon={TbMessageCircle}
            title="Response Time"
            content="Within 24 hours"
            gradientFrom="cyan"
            gradientVia="emerald"
            gradientTo="teal"
          />
        </div>
      </div>
    </div>
  );
}

// Info Card Component
function InfoCard({
  icon: Icon,
  title,
  content,
  gradientFrom,
  gradientVia,
  gradientTo,
}) {
  return (
    <div
      className={`bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg border-2 border-${gradientFrom}-200 dark:border-${gradientFrom}-900/50 hover:shadow-2xl hover:shadow-${gradientFrom}-500/10 transition-all duration-300 group`}
    >
      <div
        className={`w-14 h-14 bg-gradient-to-br from-${gradientFrom}-500 via-${gradientVia}-500 to-${gradientTo}-500 rounded-full flex items-center justify-center mx-auto mb-4 relative`}
      >
        <Icon className="w-7 h-7 text-white relative z-10" />
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${gradientFrom}-400 via-${gradientVia}-400 to-${gradientTo}-400 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
        />
      </div>
      <h3 className="font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        {content}
      </p>
    </div>
  );
}
