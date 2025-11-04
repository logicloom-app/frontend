"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { PiWhatsappLogo } from "react-icons/pi";
import { useGetUser } from "@/lib/hooks/useAuth";
import { useToast } from "@/lib/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Building2, Linkedin, Phone, UserRound, UserCog } from "lucide-react";

export default function UpdateProfileForm({ dict }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data } = useGetUser();
  const { user } = data || {};

  const ProfileSchema = Yup.object().shape({
    name: Yup.string(),
    phone_number: Yup.string().matches(
      /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
      dict?.validation?.invalidPhoneNumber ||
        "Invalid phone number. Example: +49 9876543210"
    ),
    linkedin_url: Yup.string().url(
      dict?.validation?.invalidUrl || "Must be a valid URL with https://"
    ),
    whatsapp_link: Yup.string().url(
      dict?.validation?.invalidUrl || "Must be a valid URL with https://"
    ),
    company_name: Yup.string(),
    bio: Yup.string(),
  });

  const { isLoading, mutateAsync: mutateUpdateProfile } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast({
        description: dict?.success || "Profile updated successfully",
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
    const changedValues = Object.keys(values).reduce((acc, key) => {
      if (values[key] !== user[key] && values[key] !== "") {
        acc[key] = values[key];
      }
      return acc;
    }, {});

    if (Object.keys(changedValues).length === 0) {
      toast({
        description: dict?.noChanges || "No changes detected",
        className: "rounded-2xl",
      });
      return;
    }

    const updatedData = {
      ...user,
      ...changedValues,
    };

    await mutateUpdateProfile(updatedData);
    queryClient.invalidateQueries({ queryKey: ["get-user"] });
  };

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      phone_number: user?.phone_number || "",
      linkedin_url: user?.linkedin_url || "",
      whatsapp_link: user?.whatsapp_link || "",
      company_name: user?.company_name || "",
      bio: user?.bio || "",
    },
    validationSchema: ProfileSchema,
    onSubmit: submitHandler,
    validateOnMount: true,
  });

  return (
    <div className="w-full h-full p-6 overflow-y-scroll max-h-[calc(100vh-6rem)]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl">
              <UserCog className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                {dict?.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dict?.subtitle}
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
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium mb-2"
              >
                <UserRound className="w-4 h-4 text-gray-500" />
                {dict?.name}
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder={user?.name || dict?.name}
                className="rounded-2xl"
                onBlur={formik.handleBlur}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="mt-2 text-rose-500 text-xs flex items-center gap-1">
                  <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                  {formik.errors.name}
                </div>
              ) : null}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone_number"
                className="flex items-center gap-2 text-sm font-medium mb-2"
              >
                <Phone className="w-4 h-4 text-gray-500" />
                {dict?.phoneNumber}
              </label>
              <Input
                type="tel"
                id="phone_number"
                name="phone_number"
                placeholder={user?.phone_number || dict?.phoneNumber}
                className="rounded-2xl"
                onBlur={formik.handleBlur}
                value={formik.values.phone_number}
                onChange={formik.handleChange}
              />
              {formik?.touched?.phone_number && formik?.errors?.phone_number ? (
                <div className="mt-2 text-rose-500 text-xs flex items-center gap-1">
                  <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                  {formik.errors?.phone_number}
                </div>
              ) : null}
            </div>

            {/* LinkedIn URL */}
            <div>
              <label
                htmlFor="linkedin_url"
                className="flex items-center gap-2 text-sm font-medium mb-2"
              >
                <Linkedin className="w-4 h-4 text-gray-500" />
                {dict?.linkedinUrl}
              </label>
              <Input
                type="url"
                id="linkedin_url"
                name="linkedin_url"
                placeholder={user?.linkedin_url || dict?.linkedinUrl}
                className="rounded-2xl"
                onBlur={formik.handleBlur}
                value={formik.values.linkedin_url}
                onChange={formik.handleChange}
              />
              {formik?.touched?.linkedin_url && formik?.errors?.linkedin_url ? (
                <div className="mt-2 text-rose-500 text-xs flex items-center gap-1">
                  <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                  {formik.errors?.linkedin_url}
                </div>
              ) : null}
            </div>

            {/* WhatsApp Link */}
            <div>
              <label
                htmlFor="whatsapp_link"
                className="flex items-center gap-2 text-sm font-medium mb-2"
              >
                <PiWhatsappLogo className="w-4 h-4 text-gray-500" />
                {dict?.whatsappLink}
              </label>
              <Input
                type="url"
                id="whatsapp_link"
                name="whatsapp_link"
                placeholder={user?.whatsapp_link || dict?.whatsappLink}
                className="rounded-2xl"
                onBlur={formik.handleBlur}
                value={formik.values.whatsapp_link}
                onChange={formik.handleChange}
              />
              {formik?.touched?.whatsapp_link && formik?.errors?.whatsapp_link ? (
                <div className="mt-2 text-rose-500 text-xs flex items-center gap-1">
                  <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                  {formik.errors?.whatsapp_link}
                </div>
              ) : null}
            </div>

            {/* Company Name */}
            <div>
              <label
                htmlFor="company_name"
                className="flex items-center gap-2 text-sm font-medium mb-2"
              >
                <Building2 className="w-4 h-4 text-gray-500" />
                {dict?.companyName}
              </label>
              <Input
                type="text"
                id="company_name"
                name="company_name"
                placeholder={user?.company_name || dict?.companyName}
                className="rounded-2xl"
                onBlur={formik.handleBlur}
                value={formik.values.company_name}
                onChange={formik.handleChange}
              />
              {formik?.touched?.company_name && formik?.errors?.company_name ? (
                <div className="mt-2 text-rose-500 text-xs flex items-center gap-1">
                  <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                  {formik.errors?.company_name}
                </div>
              ) : null}
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="text-sm font-medium mb-2 block">
                {dict?.bio}
              </label>
              <Textarea
                id="bio"
                name="bio"
                placeholder={user?.bio || dict?.bio}
                className="rounded-2xl max-h-[150px] bg-background/90"
                onBlur={formik.handleBlur}
                value={formik.values.bio}
                onChange={formik.handleChange}
                rows={4}
              />
              {formik?.touched?.bio && formik?.errors?.bio ? (
                <div className="mt-2 text-rose-500 text-xs flex items-center gap-1">
                  <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                  {formik.errors?.bio}
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
                dict?.update || "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
