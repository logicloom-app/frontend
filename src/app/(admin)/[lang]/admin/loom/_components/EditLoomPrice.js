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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { editLoomPrice } from "@/services/adminServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditLoomSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
});

export default function EditLoomPrice({ price }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading: isEditing, mutateAsync: mutateEditLoom } = useMutation({
    mutationFn: editLoomPrice,
    onSuccess: (data) => {
      toast({
        description: "Loom price updated successfully",
        className: "rounded-2xl",
      });
      queryClient.invalidateQueries({ queryKey: ["get-loom-pricing"] });
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
      id: price?.id,
      amount: values?.amount,
    };

    await mutateEditLoom(data);
  };

  const loomFormik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: EditLoomSchema,
    validateOnMount: true,
    onSubmit: editHandler,
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
          <DialogTitle className="mb-1">Edit Loom Price</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[600px]">
            {price?.amount}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={loomFormik.handleSubmit} className="flex flex-col gap-5">
          <Input
            type="number"
            id="amount"
            name="amount"
            placeholder="Amount"
            className="rounded-2xl px-4 py-2"
            value={loomFormik.values.amount}
            onChange={loomFormik.handleChange}
            onBlur={loomFormik.handleBlur}
          />
          {loomFormik.touched.amount && loomFormik.errors.amount ? (
            <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
              {loomFormik.errors.amount}
            </div>
          ) : null}

          <Button className="w-full rounded-2xl" type="submit">
            {isEditing ? <Spinner className="w-6 h-6" /> : "Edit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
