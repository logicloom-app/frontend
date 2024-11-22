import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUpdateProjectStatus } from "@/services/adminServices";
import { useToast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectStatusSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
});

export default function AdminUpdateProjectStatus({ project }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutateUpdateProjectStatus } = useMutation({
    mutationFn: adminUpdateProjectStatus,
    onSuccess: (data) => {
      toast({
        description: "Project status updated successfully",
        className: "rounded-2xl",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-get-project-by-id"] });
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
      project_id: project?.id,
      status: values?.status,
    };
    await mutateUpdateProjectStatus(data);
  };

  const formik = useFormik({
    initialValues: {
      status: "",
    },
    validationSchema: ProjectStatusSchema,
    onSubmit: updateHandler,
    validateOnMount: true,
  });

  return (
    <Dialog>
      <DialogTrigger className="w-full p-3 dark:bg-white bg-black shadow-lg active:mt-[14px] active:bg-sky-500 mt-3 shadow-gray-700 hover:dark:shadow-sky-700 hover:dark:bg-sky-400 hover:bg-sky-600 hover:shadow-sky-800 rounded-2xl dark:text-black text-white transition-all duration-300">
        Update status
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">
            Update project {project?.id} status
          </DialogTitle>
          <DialogDescription className="text-sm dark:text-white truncate md:max-w-[600px] max-w-[400px]">
            <span className="text-gray-500">Title:</span> {project?.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="">
          <div className="flex flex-col items-start gap-1 mb-4">
            <Select
              name="status"
              onValueChange={(value) => formik.setFieldValue("status", value)}
              value={formik.values.status}
            >
              <SelectTrigger className="w-full rounded-2xl bg-background/90 border">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="demo_ready">Demo ready</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
            {formik?.touched?.status && formik?.errors?.status ? (
              <div className="ml-2 text-rose-500 text-left text-xs">
                {formik.errors?.status}
              </div>
            ) : null}
          </div>

          <DialogClose asChild>
            <Button
              className="w-full rounded-2xl"
              type="submit"
              disabled={!formik?.isValid}
            >
              {isLoading ? <Spinner className="w-6 h-6" /> : "Update"}
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
