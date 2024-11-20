import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCreateProject } from "@/services/adminServices";
import CreatableSelect from "react-select/creatable";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { FolderPlus } from "lucide-react";
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

const RequestSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  tech_stack: Yup.array().of(Yup.string()).required("Tech stack is required"),
  comment: Yup.string().required("Comment is required"),
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

export default function AdminCreateProject({ request }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutateCreateProject } = useMutation({
    mutationFn: adminCreateProject,
    onSuccess: (data) => {
      toast({
        description: "Request created successfully",
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

  const createHandler = async (values) => {
    const data = {
      request_id: request?.id,
      title: values?.title,
      description: values?.description,
      price: values?.price,
      tech_stack: values?.tech_stack,
      comment: values?.comment,
    };

    await mutateCreateProject(data);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      tech_stack: [],
      comment: "",
    },
    validationSchema: RequestSchema,
    onSubmit: createHandler,
    validateOnMount: true,
  });

  return (
    <Dialog>
      <DialogTrigger className="rounded-full">
        <div className="p-2 rounded-full text-green-500 hover:bg-green-100 dark:hover:bg-green-400/20 transition duration-300">
          <FolderPlus />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">Create project</DialogTitle>
          <DialogDescription className="text-sm dark:text-white truncate max-w-[600px]">
            <span className="text-gray-500">Title:</span> {request?.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col items-start gap-1">
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

          <DialogClose asChild>
            <Button className="w-full rounded-2xl" type="submit">
              {isLoading ? <Spinner className="w-6 h-6" /> : "Create"}
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
