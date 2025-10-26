import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest } from "@/services/ProjectService";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import { useGetUser } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { useParams } from "next/navigation";
import { CircleAlert } from "lucide-react";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SendRequestForm({ dict }) {
  const RequestSchema = Yup.object().shape({
    title: Yup.string().required(
      dict?.validation?.titleRequired || "Title is required"
    ),
    description: Yup.string().required(
      dict?.validation?.descriptionRequired || "Description is required"
    ),
    file: Yup.mixed()
      .required(dict?.validation?.fileRequired || "File is required")
      .test(
        "fileType",
        dict?.validation?.fileMustBePDF || "File must be a PDF",
        (value) => value && value.type === "application/pdf"
      ),
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { lang } = useParams();

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          {isLoading ? "Pending..." : dict?.sendRequest}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {dict?.sendRequest}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            {dict?.sendRequestDescription}
          </DialogDescription>
        </DialogHeader>

        {user?.whatsapp_link || user?.phone_number ? (
          <form onSubmit={formik.handleSubmit} className="space-y-5 mt-4">
            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {dict?.title}
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder={dict?.title}
                className="rounded-2xl px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
                onBlur={formik.handleBlur}
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {formik?.touched?.title && formik?.errors?.title ? (
                <div className="text-rose-500 text-xs font-medium">
                  {formik.errors?.title}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {dict?.description}
              </label>
              <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 w-full">
                <CircleAlert className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  {dict?.summaryDescription}
                </p>
              </div>

              <Textarea
                id="description"
                name="description"
                placeholder={dict?.description}
                className="rounded-2xl px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 transition-colors max-h-[150px] min-h-[120px]"
                onBlur={formik.handleBlur}
                value={formik.values.description}
                onChange={formik.handleChange}
                rows={5}
              />
              {formik?.touched?.description && formik?.errors?.description ? (
                <div className="text-rose-500 text-xs font-medium">
                  {formik.errors?.description}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col items-start gap-2">
              <label
                htmlFor="file"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {dict?.file}
              </label>
              <div className="flex items-start gap-2 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-900/30 w-full">
                <CircleAlert className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  {dict?.fileDescription}
                </p>
              </div>

              <Input
                type="file"
                id="file"
                name="file"
                accept=".pdf"
                className="rounded-2xl px-4 py-1.5 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-950 dark:file:text-blue-300"
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.setFieldValue("file", e.currentTarget.files[0]);
                }}
              />
              {formik?.touched?.file && formik?.errors?.file ? (
                <div className="text-rose-500 text-xs font-medium">
                  {formik.errors?.file}
                </div>
              ) : null}
            </div>

            <DialogFooter className="gap-2 pt-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="rounded-2xl">
                  {dict?.cancel}
                </Button>
              </DialogClose>
              <DialogClose asChild disabled={!formik.isValid || isLoading}>
                <Button
                  type="submit"
                  disabled={!formik.isValid || isLoading}
                  className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8"
                >
                  {isLoading ? <Spinner className="w-5 h-5" /> : dict?.send}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 h-[300px] px-6">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-2xl border border-yellow-200 dark:border-yellow-900/30 text-center">
              <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                Please add your contact information in your profile to send a request
              </p>
            </div>

            <Link
              href={`/${lang}/dashboard/info`}
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-300"
            >
              Go to Account Info
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
