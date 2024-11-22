import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUpdateProject } from "@/services/adminServices";
import CreatableSelect from "react-select/creatable";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  tech_stack: Yup.array().required("Tech stack is required"),
  comment: Yup.string().required("Comment is required"),
  demo_status: Yup.string().required("Demo status is required"),
  demo_link: Yup.string().required("Demo link is required"),
  demo_message: Yup.string().required("Demo message is required"),
  paid: Yup.boolean().required("Paid is required"),
});

const techOptions = [
  { value: "React.js", label: "React.js" },
  { value: "Next.js", label: "Next.js" },
  { value: "Golang", label: "Golang" },
  { value: "Gin", label: "Gin" },
  { value: "Node.js", label: "Node.js" },
  { value: "TailwindCSS", label: "TailwindCSS" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Python", label: "Python" },
  { value: "Django", label: "Django" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "Express.js", label: "Express.js" },
  { value: "Nest.js", label: "Nest.js" },
  { value: "Flutter", label: "Flutter" },
  { value: "HTMX", label: "HTMX" },
];

const customStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "1rem", // rounded-2xl
    borderColor: "hsl(var(--input))",
    backgroundColor: "hsl(var(--background))",
    "&:hover": {
      borderColor: "hsl(var(--input-hover))",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "1rem",
    backgroundColor: "hsl(var(--background))",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "hsl(var(--accent))"
      : "hsl(var(--background))",
    color: state.isFocused
      ? "hsl(var(--accent-foreground))"
      : "hsl(var(--foreground))",
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: "1rem",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "black",
    borderRadius: "0 1rem 1rem 0",
  }),
};

export default function AdminUpdateProject({ project }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutateUpdateProject } = useMutation({
    mutationFn: adminUpdateProject,
    onSuccess: (data) => {
      toast({
        description: "Project updated successfully",
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
      status: values?.status,
      title: values?.title,
      description: values?.description,
      price: values?.price,
      tech_stack: values?.tech_stack,
      comment: values?.comment,
      demo_status: values?.demo_status,
      demo_link: values?.demo_link,
      demo_message: values?.demo_message,
      paid: values?.paid,
    };

    await mutateUpdateProject({ data, projectId: project?.id });
  };

  const formik = useFormik({
    initialValues: {
      status: project?.status,
      title: project?.title,
      description: project?.description,
      price: project?.price,
      tech_stack: project?.tech_stack,
      comment: project?.comment,
      status: project?.status,
      demo_status: project?.demo_status,
      demo_link: project?.demo_link,
      demo_message: project?.demo_message,
      paid: project?.paid,
    },
    validationSchema: ProjectStatusSchema,
    onSubmit: updateHandler,
    validateOnMount: true,
  });

  return (
    <Dialog>
      <DialogTrigger className="w-full p-3 dark:bg-white bg-black shadow-lg active:mt-[14px] active:bg-sky-500 mt-3 shadow-gray-700 hover:dark:shadow-sky-700 hover:dark:bg-sky-400 hover:bg-sky-600 hover:shadow-sky-800 rounded-2xl dark:text-black text-white transition-all duration-300">
        Update project
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">
            Update project {project?.id} status
          </DialogTitle>
          <DialogDescription className="text-sm dark:text-white truncate max-w-[600px]">
            <span className="text-gray-500">Title:</span> {project?.title}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-10rem)] px-6 py-2"
        >
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Status
            </label>
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

          <div className="flex flex-col items-start gap-1">
            <label className="text-sm text-gray-500 dark:text-gray-400">Title</label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
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
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
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
            <label className="text-sm text-gray-500 dark:text-gray-400">Price</label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              className="rounded-2xl px-4 py-2"
              onBlur={formik.handleBlur}
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik?.touched?.price && formik?.errors?.price ? (
              <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
                {formik.errors?.price}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-2">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Tech stack
            </label>
            <CreatableSelect
              isMulti
              isClearable
              options={techOptions}
              className="w-full"
              classNamePrefix="select"
              placeholder="Select or create tech stack"
              onChange={(selectedOptions) => {
                const values = selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : [];
                formik.setFieldValue("tech_stack", values);
              }}
              value={formik.values.tech_stack?.map((tech) => ({
                value: tech,
                label: tech.charAt(0).toUpperCase() + tech.slice(1),
              }))}
              onBlur={formik.handleBlur("tech_stack")}
              styles={customStyles}
            />
            {formik?.touched?.tech_stack && formik?.errors?.tech_stack ? (
              <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
                {formik.errors?.tech_stack}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-2">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Comment
            </label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Comment"
              className="rounded-2xl px-4 py-2 mb-1 bg-background/90 max-h-[150px]"
              onBlur={formik.handleBlur}
              value={formik.values.comment}
              onChange={formik.handleChange}
              rows={4}
            />
            {formik?.touched?.comment && formik?.errors?.comment ? (
              <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
                {formik.errors?.comment}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-1">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Demo status
            </label>
            <Select
              name="demo_status"
              onValueChange={(value) => formik.setFieldValue("demo_status", value)}
              value={formik.values.demo_status}
            >
              <SelectTrigger className="w-full rounded-2xl bg-background/90 border">
                <SelectValue placeholder="Select demo status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="not_ready">Not ready</SelectItem>
              </SelectContent>
            </Select>
            {formik?.touched?.demo_status && formik?.errors?.demo_status ? (
              <div className="ml-2 text-rose-500 text-left text-xs">
                {formik.errors?.demo_status}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-1">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Demo link
            </label>
            <Input
              type="text"
              id="demo_link"
              name="demo_link"
              placeholder="Demo link"
              className="rounded-2xl px-4 py-2"
              onBlur={formik.handleBlur}
              value={formik.values.demo_link}
              onChange={formik.handleChange}
            />
            {formik?.touched?.demo_link && formik?.errors?.demo_link ? (
              <div className="ml-2 text-rose-500 text-left text-xs">
                {formik.errors?.demo_link}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-2">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Demo message
            </label>
            <Textarea
              id="demo_message"
              name="demo_message"
              placeholder="Demo message"
              className="rounded-2xl px-4 py-2 mb-1 bg-background/90 max-h-[150px]"
              onBlur={formik.handleBlur}
              value={formik.values.demo_message}
              onChange={formik.handleChange}
              rows={4}
            />
            {formik?.touched?.demo_message && formik?.errors?.demo_message ? (
              <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
                {formik.errors?.demo_message}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col items-start gap-2">
            <label className="text-sm text-gray-500 dark:text-gray-400">Paid</label>
            <Switch
              checked={formik.values.paid}
              onCheckedChange={(value) => formik.setFieldValue("paid", value)}
            />
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
