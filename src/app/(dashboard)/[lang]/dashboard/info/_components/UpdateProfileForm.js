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
import { Building2, Linkedin, Phone, UserRound } from "lucide-react";

const ProfileSchema = Yup.object().shape({
  name: Yup.string(),
  phone_number: Yup.string().matches(
    /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
    "Invalid phone number. Example: +49 9876543210"
  ),
  linkedin_url: Yup.string().url("Must be a valid URL with https://"),
  whatsapp_link: Yup.string().url("Must be a valid URL with https://"),
  company_name: Yup.string(),
  bio: Yup.string(),
});

export default function UpdateProfileForm({ dict }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data } = useGetUser();
  const { user } = data || {};

  const { isLoading, mutateAsync: mutateUpdateProfile } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast({
        description: "Profile updated successfully",
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
    const changedValues = Object.keys(values).reduce((acc, key) => {
      if (values[key] !== user[key] && values[key] !== "") {
        acc[key] = values[key];
      }
      return acc;
    }, {});

    if (Object.keys(changedValues).length === 0) {
      toast({
        description: "No changes detected",
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
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-5 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3">
        <UserRound className="w-4 h-4" />

        <Input
          type="text"
          id="name"
          name="name"
          placeholder={user?.name || dict?.name}
          className="rounded-2xl px-4 py-2"
          onBlur={formik.handleBlur}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {formik.errors.name}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <Phone className="w-4 h-4" />

        <Input
          type="tel"
          id="phone_number"
          name="phone_number"
          placeholder={user?.phone_number || dict?.phoneNumber}
          className="rounded-2xl px-4 py-2"
          onBlur={formik.handleBlur}
          value={formik.values.phone_number}
          onChange={formik.handleChange}
        />
        {formik?.touched?.phone_number && formik?.errors?.phone_number ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {formik.errors?.phone_number}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <Linkedin className="w-4 h-4" />
        <Input
          type="url"
          id="linkedin_url"
          name="linkedin_url"
          placeholder={user?.linkedin_url || dict?.linkedinUrl}
          className="rounded-2xl px-4 py-2"
          onBlur={formik.handleBlur}
          value={formik.values.linkedin_url}
          onChange={formik.handleChange}
        />
        {formik?.touched?.linkedin_url && formik?.errors?.linkedin_url ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {formik.errors?.linkedin_url}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <PiWhatsappLogo size={20} />
        <Input
          type="url"
          id="whatsapp_link"
          name="whatsapp_link"
          placeholder={user?.whatsapp_link || dict?.whatsappLink}
          className="rounded-2xl px-4 py-2"
          onBlur={formik.handleBlur}
          value={formik.values.whatsapp_link}
          onChange={formik.handleChange}
        />
        {formik?.touched?.whatsapp_link && formik?.errors?.whatsapp_link ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {formik.errors?.whatsapp_link}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <Building2 className="w-4 h-4" />
        <Input
          type="text"
          id="company_name"
          name="company_name"
          placeholder={user?.company_name || dict?.companyName}
          className="rounded-2xl px-4 py-2"
          onBlur={formik.handleBlur}
          value={formik.values.company_name}
          onChange={formik.handleChange}
        />
        {formik?.touched?.company_name && formik?.errors?.company_name ? (
          <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
            {formik.errors?.company_name}
          </div>
        ) : null}
      </div>

      <Textarea
        id="bio"
        name="bio"
        placeholder={user?.bio || dict?.bio}
        className="rounded-2xl px-4 py-2 bg-background/90 max-h-[150px]"
        onBlur={formik.handleBlur}
        value={formik.values.bio}
        onChange={formik.handleChange}
        rows={4}
      />
      {formik?.touched?.bio && formik?.errors?.bio ? (
        <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
          {formik.errors?.bio}
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
          dict?.update || "Update Profile"
        )}
      </Button>
    </form>
  );
}
