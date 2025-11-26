"use client";

import {
  sendContactMessage,
  generateContactOTP,
  verifyContactOTP,
} from "@/services/userService";
import { yupTextQualityTest } from "@/lib/utils/textValidation";
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
  usePhoneInput,
  FlagImage,
} from "react-international-phone";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { trackFormSubmit } from "@/lib/utils/gtag";
import { useToast } from "@/lib/hooks/use-toast";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import "react-international-phone/style.css";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useFormik } from "formik";
import "@/styles/phone-input.css";
import * as Yup from "yup";
import {
  TbMail,
  TbPhone,
  TbUser,
  TbBuilding,
  TbMessageCircle,
  TbLock,
  TbCheck,
  TbClock,
} from "react-icons/tb";

// Enhanced email regex - RFC 5322 compliant
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Phone validation regex - accepts international format with + (minimum 10 digits total)
const phoneRegex = /^\+[1-9]\d{9,14}$/;

// Custom Phone Input Component with Search
function PhoneInputWithSearch({
  value,
  onChange,
  onBlur,
  hasError,
  disabled,
  dict,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const phoneInput = usePhoneInput({
    defaultCountry: "de",
    value,
    countries: defaultCountries,
    onChange: (data) => {
      onChange(data.phone);
    },
  });

  const filteredCountries = defaultCountries.filter((country) => {
    const searchLower = searchTerm.toLowerCase();
    const countryData = parseCountry(country);
    return (
      countryData?.name?.toLowerCase().includes(searchLower) ||
      countryData?.iso2?.toLowerCase().includes(searchLower) ||
      countryData?.dialCode?.includes(searchTerm)
    );
  });

  return (
    <div className="relative">
      <div
        className={`flex items-center h-12 rounded-xl border-2 transition-all duration-300 ${
          hasError
            ? "border-rose-500 dark:border-rose-500 focus-within:border-rose-500 dark:focus-within:border-rose-500 focus-within:ring-rose-500/10"
            : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 focus-within:border-emerald-500 dark:focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/10 dark:focus-within:ring-emerald-400/20"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 h-full hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 transition-colors rounded-l-xl"
          disabled={disabled}
        >
          <FlagImage iso2={phoneInput.country.iso2} />
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Phone Input */}
        <input
          ref={phoneInput.inputRef}
          type="tel"
          value={phoneInput.inputValue}
          onChange={phoneInput.handlePhoneValueChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={dict?.phonePlaceholder || "Phone number"}
          className="flex-1 h-full px-3 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden max-h-80">
            {/* Search Input */}
            <div className="sticky top-0 z-10 p-3 bg-gray-50 dark:bg-gray-900/50 backdrop-blur-xl border-b-2 border-gray-200 dark:border-gray-700">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={dict?.searchCountry || "Search country..."}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                autoFocus
              />
            </div>

            {/* Countries List */}
            <div className="overflow-y-auto max-h-64">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => {
                  const parsedCountry = parseCountry(country);
                  const isSelected = parsedCountry.iso2 === phoneInput.country.iso2;

                  return (
                    <button
                      key={parsedCountry.iso2}
                      type="button"
                      onClick={() => {
                        phoneInput.setCountry(parsedCountry.iso2);
                        setIsDropdownOpen(false);
                        setSearchTerm("");
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 transition-colors ${
                        isSelected ? "bg-emerald-500/15 dark:bg-emerald-500/25" : ""
                      }`}
                    >
                      <FlagImage iso2={parsedCountry.iso2} />
                      <span className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {parsedCountry.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        +{parsedCountry.dialCode}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {dict?.noCountryFound || "No country found"}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const createContactSchema = (dict) => {
  const validationMessages = {
    singleCharacters: dict?.validation?.singleCharacters,
    meaningfulContent: dict?.validation?.meaningfulContent,
    randomKeyboard: dict?.validation?.randomKeyboard,
    tooMuchRepetition: dict?.validation?.tooMuchRepetition,
    randomCharacters: dict?.validation?.randomCharacters,
    notNaturalLanguage: dict?.validation?.notNaturalLanguage,
    recognizableWords: dict?.validation?.recognizableWords,
  };

  return Yup.object().shape({
    name: Yup.string()
      .min(
        2,
        dict?.validation?.nameMinLength || "Name must be at least 2 characters"
      )
      .max(
        100,
        dict?.validation?.nameMaxLength || "Name must be less than 100 characters"
      )
      .required(dict?.validation?.nameRequired || "Name is required")
      .test(
        "quality",
        yupTextQualityTest(
          dict?.validation?.nameSpam || "Name appears to be spam or invalid",
          validationMessages
        )
      ),
    company: Yup.string().max(
      100,
      dict?.validation?.companyMaxLength ||
        "Company name must be less than 100 characters"
    ),
    email: Yup.string()
      .matches(
        emailRegex,
        dict?.validation?.emailInvalid || "Please enter a valid email address"
      )
      .required(dict?.validation?.emailRequired || "Email is required"),
    phone: Yup.string()
      .matches(
        phoneRegex,
        dict?.validation?.phoneInvalid ||
          "Please enter a valid phone number with country code"
      )
      .required(dict?.validation?.phoneRequired || "Phone number is required"),
    description: Yup.string()
      .min(
        10,
        dict?.validation?.descriptionMinLength ||
          "Description must be at least 10 characters"
      )
      .max(
        1000,
        dict?.validation?.descriptionMaxLength ||
          "Description must be less than 1000 characters"
      )
      .required(dict?.validation?.descriptionRequired || "Description is required")
      .test(
        "quality",
        yupTextQualityTest(
          dict?.validation?.descriptionSpam ||
            "Description appears to be spam or meaningless text",
          validationMessages
        )
      ),
    otp: Yup.string()
      .matches(/^\d{6}$/, dict?.otp?.otpMustBe6Digits || "OTP must be 6 digits")
      .required(dict?.otp?.otpRequired || "OTP is required"),
  });
};

export default function ContactClient({ dict }) {
  const [isClient, setIsClient] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // OTP Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && otpSent) {
      setOtpSent(false);
    }
  }, [countdown, otpSent]);

  // Generate OTP mutation
  const { isPending: isGeneratingOTP, mutateAsync: mutateGenerateOTP } = useMutation(
    {
      mutationFn: generateContactOTP,
      onSuccess: () => {
        setOtpSent(true);
        setCountdown(300); // 5 minutes
        toast({
          description:
            dict?.otp?.otpSent || "OTP sent to your email. Valid for 5 minutes.",
          className: "rounded-2xl",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          description:
            error?.response?.data?.error ||
            dict?.otp?.failedToSend ||
            "Failed to send OTP",
          className: "rounded-2xl",
        });
      },
    }
  );

  // Verify OTP mutation (optional)
  const { isPending: isVerifyingOTP, mutateAsync: mutateVerifyOTP } = useMutation({
    mutationFn: ({ email, otp }) => verifyContactOTP(email, otp),
    onSuccess: () => {
      setOtpVerified(true);
      toast({
        description: dict?.otp?.otpVerified || "OTP verified successfully!",
        className: "rounded-2xl",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description:
          error?.response?.data?.error || dict?.otp?.invalidOTP || "Invalid OTP",
        className: "rounded-2xl",
      });
    },
  });

  // Submit contact form mutation
  const { isPending: isLoading, mutateAsync: mutateSendContact } = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: (data) => {
      toast({
        description: dict?.messageSentSuccessfully || "Message sent successfully",
        className: "rounded-2xl",
      });
      trackFormSubmit("Contact Form", true);
      formik.resetForm();
      setOtpSent(false);
      setOtpVerified(false);
      setCountdown(0);
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

  const handleGenerateOTP = async () => {
    if (!formik.values.email || formik.errors.email) {
      formik.setFieldTouched("email", true);
      toast({
        variant: "destructive",
        description:
          dict?.otp?.pleaseEnterValidEmail ||
          "Please enter a valid email address first",
        className: "rounded-2xl",
      });
      return;
    }
    await mutateGenerateOTP(formik.values.email);
  };

  const handleVerifyOTP = async () => {
    if (!formik.values.otp || formik.errors.otp) {
      formik.setFieldTouched("otp", true);
      return;
    }
    await mutateVerifyOTP({
      email: formik.values.email,
      otp: formik.values.otp,
    });
  };

  const submitHandler = async (values) => {
    if (!otpSent) {
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
              onClick={() => trackFormSubmit("Contact Form", true)}
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
                  className={`h-12 rounded-xl px-4 border-2 transition-all duration-300 ${
                    formik?.touched?.name && formik?.errors?.name
                      ? "border-rose-500 dark:border-rose-500 focus:border-rose-500 dark:focus:border-rose-500 focus:ring-rose-500/10"
                      : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/20"
                  }`}
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
                  className="h-12 rounded-xl px-4 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/20 transition-all duration-300"
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
                    className={`h-12 rounded-xl px-4 border-2 transition-all duration-300 ${
                      formik?.touched?.email && formik?.errors?.email
                        ? "border-rose-500 dark:border-rose-500 focus:border-rose-500 dark:focus:border-rose-500 focus:ring-rose-500/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/20"
                    }`}
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
                <div className="space-y-2 relative">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <TbPhone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
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
                    hasError={formik?.touched?.phone && formik?.errors?.phone}
                    disabled={false}
                    dict={dict}
                  />
                  {formik?.touched?.phone && formik?.errors?.phone ? (
                    <div className="text-rose-500 text-sm">
                      {formik.errors?.phone}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* OTP Section - Only show when email is valid */}
              {formik.values.email && !formik.errors.email && (
                <div className="space-y-4 p-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl border-2 border-emerald-200/50 dark:border-emerald-900/50 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <TbLock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {dict?.otp?.emailVerification || "Email Verification"}{" "}
                      {otpVerified && (
                        <TbCheck className="inline w-5 h-5 text-green-500 ml-2" />
                      )}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {dict?.otp?.verificationDescription ||
                      "We'll send a verification code to your email address to ensure its validity."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Generate OTP Button */}
                    <div>
                      <button
                        type="button"
                        onClick={handleGenerateOTP}
                        disabled={isGeneratingOTP || countdown > 0}
                        className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg disabled:hover:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isGeneratingOTP ? (
                          <>
                            <Spinner className="w-4 h-4" />
                            <span>{dict?.otp?.sending || "Sending..."}</span>
                          </>
                        ) : countdown > 0 ? (
                          <>
                            <TbClock className="w-5 h-5" />
                            <span>
                              {dict?.otp?.resendIn || "Resend in"}{" "}
                              {Math.floor(countdown / 60)}:
                              {String(countdown % 60).padStart(2, "0")}
                            </span>
                          </>
                        ) : (
                          <span>
                            {otpSent
                              ? dict?.otp?.resendOTP || "Resend OTP"
                              : dict?.otp?.sendOTP || "Send OTP"}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* OTP Input */}
                    <div className="space-y-2">
                      <Input
                        type="text"
                        id="otp"
                        name="otp"
                        placeholder={dict?.otp?.enterOTP || "Enter 6-digit OTP"}
                        maxLength={6}
                        disabled={!otpSent}
                        noBorder={true}
                        className={`h-12 rounded-xl px-4 border-2 transition-all duration-300 text-center text-lg font-mono tracking-wider ${
                          formik?.touched?.otp && formik?.errors?.otp
                            ? "border-rose-500 dark:border-rose-500 focus:border-rose-500 dark:focus:border-rose-500 focus:ring-rose-500/10"
                            : !otpSent
                            ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                            : otpVerified
                            ? "border-green-500 dark:border-green-500 bg-green-50 dark:bg-green-950/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/20"
                        }`}
                        onBlur={formik.handleBlur}
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                      />
                      {formik?.touched?.otp && formik?.errors?.otp ? (
                        <div className="text-rose-500 text-sm text-center">
                          {formik.errors?.otp}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Optional Verify Button */}
                  {otpSent && formik.values.otp && !otpVerified && (
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={isVerifyingOTP || formik.errors.otp}
                      className="w-full h-10 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      {isVerifyingOTP ? (
                        <>
                          <Spinner className="w-4 h-4" />
                          <span>{dict?.otp?.verifying || "Verifying..."}</span>
                        </>
                      ) : (
                        <>
                          <TbCheck className="w-4 h-4" />
                          <span>
                            {dict?.otp?.verifyOTP || "Verify OTP (Optional)"}
                          </span>
                        </>
                      )}
                    </button>
                  )}

                  {otpVerified && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium bg-green-50 dark:bg-green-950/20 px-4 py-2 rounded-lg">
                      <TbCheck className="w-5 h-5" />
                      <span>
                        {dict?.otp?.verified || "Email verified successfully!"}
                      </span>
                    </div>
                  )}
                </div>
              )}

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
                  className={`rounded-xl px-4 py-3 border-2 transition-all duration-300 min-h-[150px] ${
                    formik?.touched?.description && formik?.errors?.description
                      ? "border-rose-500 dark:border-rose-500 focus:border-rose-500 dark:focus:border-rose-500 focus:ring-rose-500/10"
                      : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/20"
                  }`}
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
