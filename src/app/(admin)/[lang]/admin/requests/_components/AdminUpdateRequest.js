import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUpdateRequest } from "@/services/adminServices";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { Pencil } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const RequestSchema = Yup.object().shape({
  status: Yup.string()
    .oneOf(["accepted", "rejected"], "Status must be 'accepted' or 'rejected'")
    .required("Status is required"),
  message: Yup.string().required("Message is required"),
});

export default function AdminUpdateRequest({ request }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutateUpdateRequest } = useMutation({
    mutationFn: adminUpdateRequest,
    onSuccess: (data) => {
      toast({
        description: "Request updated successfully",
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

  const updateHandler = async (values) => {
    const data = {
      request_id: request?.id,
      status: values?.status,
      message: values?.message,
    };
    await mutateUpdateRequest(data);
  };

  const formik = useFormik({
    initialValues: {
      status: "",
      message: "",
    },
    validationSchema: RequestSchema,
    onSubmit: updateHandler,
    validateOnMount: true,
  });

  return (
    <Dialog>
      <DialogTrigger className="rounded-full">
        <div className="p-2 rounded-full text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-400/20 transition duration-300">
          <Pencil />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">Update request {request?.id} ?</DialogTitle>
          <DialogDescription className="text-sm dark:text-white truncate max-w-[600px]">
            <span className="text-gray-500">Title:</span> {request?.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col items-start gap-1">
            <Select
              name="status"
              onValueChange={(value) => formik.setFieldValue("status", value)}
              value={formik.values.status}
            >
              <SelectTrigger className="w-full rounded-2xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            {formik?.touched?.status && formik?.errors?.status ? (
              <div className="ml-2 text-rose-500 text-left text-xs">
                {formik.errors?.status}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-2">
            <Textarea
              id="message"
              name="message"
              placeholder="Message"
              className="rounded-2xl px-4 py-2 mb-1 bg-background/90 max-h-[150px]"
              onBlur={formik.handleBlur}
              value={formik.values.message}
              onChange={formik.handleChange}
              rows={4}
            />
            {formik?.touched?.message && formik?.errors?.message ? (
              <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
                {formik.errors?.message}
              </div>
            ) : null}
          </div>

          <Button className="w-full rounded-2xl" type="submit">
            {isLoading ? <Spinner className="w-6 h-6" /> : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
