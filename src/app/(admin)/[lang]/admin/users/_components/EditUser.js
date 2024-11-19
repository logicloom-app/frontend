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
import { Pencil } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { editUser } from "@/services/adminServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";

const EditUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone_number: Yup.string().required("Phone number is required"),
});

export default function EditUser({ user }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutateEditUser } = useMutation({
    mutationFn: editUser,
    onSuccess: (data) => {
      toast({
        description: "User updated successfully",
        className: "rounded-2xl",
      });
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Something went wrong",
        className: "rounded-2xl",
      });
    },
  });

  const editHandler = async (values) => {
    const data = {
      user_id: user?.id,
      name: values?.name,
      phone_number: values?.phone_number,
    };

    await mutateEditUser(data);
  };

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: user?.name || "",
        phone_number: user?.phone_number || "",
      },
      validationSchema: EditUserSchema,
      onSubmit: editHandler,
      validateOnMount: true,
    });

  return (
    <Dialog>
      <DialogTrigger className="rounded-full">
        <div className="p-2 rounded-full dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-yellow-400/20 transition duration-300">
          <Pencil />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">Edit User</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[600px]">
            {user?.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="rounded-2xl px-4 py-2"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name ? (
            <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
              {errors.name}
            </div>
          ) : null}

          <Input
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder="Phone number"
            className="rounded-2xl px-4 py-2"
            value={values.phone_number}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.phone_number && errors.phone_number ? (
            <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
              {errors.phone_number}
            </div>
          ) : null}

          <Button className="w-full rounded-2xl" type="submit">
            {isLoading ? <Spinner className="w-6 h-6" /> : "Edit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
