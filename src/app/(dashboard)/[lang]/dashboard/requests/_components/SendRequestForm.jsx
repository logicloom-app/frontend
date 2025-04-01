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

export default function SendRequestForm({ dict }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { lang } = useParams();

  const { data: userData, isLoading: isLoadingUser } = useGetUser();
  const { user } = userData || {};

  const { isLoading, mutateAsync: mutateSendRequest } = useMutation({
    mutationFn: sendRequest,
    onSuccess: (data) => {
      toast({
        description: "Request sent successfully",
        className: "rounded-2xl",
      });
      queryClient.invalidateQueries({ queryKey: ["get-requests"] });
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
      <DialogTrigger className="rounded-2xl px-10 py-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">
        {isLoading ? "Pending..." : dict?.sendRequest}
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{dict?.sendRequest}</DialogTitle>
          <DialogDescription>
            Send a request to the admin to get a project.
          </DialogDescription>
        </DialogHeader>

        {user?.whatsapp_link || user?.phone_number ? (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex flex-col items-start gap-1">
              <Input
                type="text"
                id="title"
                name="title"
                placeholder={dict?.title}
                className="rounded-2xl px-4 py-2"
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
                className="rounded-2xl px-4 py-2 mb-1 bg-background/90 max-h-[150px]"
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
                <p className="text-sm text-gray-500">{dict?.fileDescription}</p>
              </div>

              <Input
                type="file"
                id="file"
                name="file"
                placeholder={dict?.file}
                className="rounded-2xl px-4 py-2 mb-1"
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

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={!formik.isValid || isLoading}
                  variant="custom"
                  className="w-full"
                >
                  {isLoading ? <Spinner className="w-5 h-5" /> : dict?.send}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] px-6">
            <p className="text-sm">
              Please add your contact information in your profile to send a request
            </p>

            <Link
              href={`/${lang}/dashboard/info`}
              className="w-full text-center underline hover:text-blue-500 transition-colors duration-300"
            >
              Account info
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
