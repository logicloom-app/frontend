"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "@/services/ProjectService";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import { useGetUser } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import { useTheme } from "next-themes";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

const RequestSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  file: Yup.mixed()
    .required("File is required")
    .test(
      "fileType",
      "File must be a PDF",
      (value) => value && value.type === "application/pdf"
    ),
});

export default function RequestClient({ dict }) {
  const [isClient, setIsClient] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { lang } = useParams();
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: userData, isPending: isLoadingUser } = useGetUser();
  const { user } = userData || {};

  const { isPending: isLoading, mutateAsync: mutateSendRequest } = useMutation({
    mutationFn: sendRequest,
    onSuccess: (data) => {
      toast({
        description: "Request sent successfully",
        className: "rounded-2xl",
      });

      queryClient.invalidateQueries({ queryKey: ["get-requests"] });
      router.push(`/${lang}/dashboard/requests`);
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
    const updatedValues = { ...values, budget: 0 };
    await mutateSendRequest(updatedValues);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      file: null,
    },
    validationSchema: RequestSchema,
    onSubmit: submitHandler,
    validateOnMount: true,
  });

  if (!user?.phone_number) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-110px)] px-6">
        {isClient &&
          (theme === "dark" ? (
            <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/7-dark.png')] bg-cover opacity-40" />
          ) : (
            <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/8-dark.png')] bg-cover opacity-40" />
          ))}

        <p className="text-sm text-center">{dict?.addContactInfo}</p>
        <Link
          href={`/${lang}/dashboard/info`}
          className="mt-4 text-center z-10 underline hover:text-blue-500 transition-colors duration-300"
        >
          {dict?.accountInfo}
        </Link>
      </div>
    );
  }

  return (
    <div className="container min-h-[calc(100vh-110px)] max-w-[700px] mx-auto p-6 mt-10">
      {isClient &&
        (theme === "dark" ? (
          <div className="absolute inset-0 bg-bottom bg-no-repeat  bg-[url('/images/7-dark.png')] bg-cover opacity-30" />
        ) : (
          <div className="absolute inset-0 bg-bottom bg-no-repeat  bg-[url('/images/8-dark.png')] bg-cover opacity-30" />
        ))}

      <div className="space-y-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">{dict?.sendRequest}</h1>
          <p className="text-gray-500">{dict?.sendRequestDescription}</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6 z-10 relative">
          <div className="flex flex-col items-start gap-1">
            <Input
              type="text"
              id="title"
              name="title"
              placeholder={dict?.title}
              className="rounded-2xl px-4 py-2 z-10"
              onBlur={formik.handleBlur}
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik?.touched?.title && formik?.errors?.title ? (
              <div className="ml-2 text-rose-500 text-left text-xs">
                {formik.errors?.title}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <CircleAlert className="w-4 h-4 text-rose-500" />
              <p className="text-sm text-gray-500">{dict?.summaryDescription}</p>
            </div>

            <Textarea
              id="description"
              name="description"
              placeholder={dict?.description}
              className="rounded-2xl px-4 py-2 mb-1 bg-background/90 max-h-[150px] z-10"
              onBlur={formik.handleBlur}
              value={formik.values.description}
              onChange={formik.handleChange}
              rows={4}
            />
            {formik?.touched?.description && formik?.errors?.description ? (
              <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
                {formik.errors?.description}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <CircleAlert className="w-4 h-4 text-rose-500" />
              <p className="text-sm dark:text-gray-200">{dict?.fileDescription}</p>
            </div>

            <Input
              type="file"
              id="file"
              name="file"
              placeholder={dict?.file}
              className="rounded-2xl px-4 py-2 mb-1 z-10"
              onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.setFieldValue("file", e.currentTarget.files[0]);
              }}
            />
            {formik?.touched?.file && formik?.errors?.file ? (
              <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
                {formik.errors?.file}
              </div>
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={!formik.isValid || isLoading}
            variant="custom"
            className="w-full z-10"
          >
            {isLoading ? <Spinner className="w-5 h-5" /> : dict?.send}
          </Button>
        </form>
      </div>
    </div>
  );
}
