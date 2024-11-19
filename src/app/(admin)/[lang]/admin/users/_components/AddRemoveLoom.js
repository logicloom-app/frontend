import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, Atom, Pencil } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { addLoomBalance, removeLoomBalance } from "@/services/adminServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AddLoomSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
});
const RemoveLoomSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required"),
});

export default function AddRemoveLoom({ user }) {
  const [step, setStep] = useState(0);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutateAddLoom } = useMutation({
    mutationFn: addLoomBalance,
    onSuccess: (data) => {
      toast({
        description: "Loom balance added successfully",
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

  const { isLoading: isRemoving, mutateAsync: mutateRemoveLoom } = useMutation({
    mutationFn: removeLoomBalance,
    onSuccess: (data) => {
      toast({
        description: "Loom balance removed successfully",
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

  const addHandler = async (values) => {
    const data = {
      user_id: user?.id,
      amount: values?.amount,
    };

    if (values?.amount <= 0) {
      toast({
        variant: "destructive",
        description: "Amount must be greater than 0",
        className: "rounded-2xl",
      });
    }

    await mutateAddLoom(data);
  };

  const removeHandler = async (values) => {
    const data = {
      user_id: user?.id,
      amount: values?.amount,
    };

    if (values?.amount <= 0) {
      toast({
        variant: "destructive",
        description: "Amount must be greater than 0",
        className: "rounded-2xl",
      });
    }

    await mutateRemoveLoom(data);
  };

  const addFormik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: AddLoomSchema,
    validateOnMount: true,
    onSubmit: addHandler,
  });

  const removeFormik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: RemoveLoomSchema,
    validateOnMount: true,
    onSubmit: removeHandler,
  });
  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <Dialog>
            <DialogTrigger className="rounded-full">
              <div className="p-2 rounded-full text-cyan-500 hover:bg-cyan-100 dark:hover:bg-cyan-400/20 transition duration-300">
                <Atom />
              </div>
            </DialogTrigger>

            <DialogContent className="sm:rounded-3xl max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="mb-1">Add/Remove Loom Balance</DialogTitle>
                <DialogDescription className="text-sm dark:text-white truncate max-w-[600px]">
                  {user?.name}
                </DialogDescription>
              </DialogHeader>

              <div className="flex gap-5">
                <Button onClick={() => setStep(1)} className="rounded-2xl w-full">
                  Add
                </Button>
                <Button onClick={() => setStep(2)} className="rounded-2xl w-full">
                  Remove
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        );
      case 1:
        return (
          <Dialog>
            <DialogTrigger className="rounded-full">
              <div className="p-2 rounded-full text-cyan-500 hover:bg-cyan-100 dark:hover:bg-cyan-400/20 transition duration-300">
                <Atom />
              </div>
            </DialogTrigger>

            <DialogContent className="sm:rounded-3xl max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="mb-1">Add Loom Balance</DialogTitle>
                <DialogDescription className="text-sm dark:text-white truncate max-w-[600px]">
                  {user?.name}
                </DialogDescription>
              </DialogHeader>

              <div
                onClick={() => setStep(0)}
                className="absolute top-4 right-10 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
              >
                <ArrowRight size={20} />
              </div>

              <form
                className="flex flex-col gap-5"
                onSubmit={addFormik.handleSubmit}
              >
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  className="rounded-2xl px-4 py-2"
                  value={addFormik.values.amount}
                  onChange={addFormik.handleChange}
                  onBlur={addFormik.handleBlur}
                />
                {addFormik.touched.amount && addFormik.errors.amount ? (
                  <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
                    {addFormik.errors.amount}
                  </div>
                ) : null}

                <Button className="w-full rounded-2xl" type="submit">
                  {isLoading ? <Spinner className="w-6 h-6" /> : "Add"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        );
      case 2:
        return (
          <Dialog>
            <DialogTrigger className="rounded-full">
              <div className="p-2 rounded-full text-cyan-500 hover:bg-cyan-100 dark:hover:bg-cyan-400/20 transition duration-300">
                <Atom />
              </div>
            </DialogTrigger>

            <DialogContent className="sm:rounded-3xl max-w-[700px]">
              <DialogHeader>
                <DialogTitle className="mb-1">Remove Loom Balance</DialogTitle>
                <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[600px]">
                  <div>{user?.email}</div>
                  <div>
                    {user?.name} #{user?.id}
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div
                onClick={() => setStep(0)}
                className="absolute top-4 right-10 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
              >
                <ArrowRight size={20} />
              </div>

              <form
                className="flex flex-col gap-5"
                onSubmit={removeFormik.handleSubmit}
              >
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  className="rounded-2xl px-4 py-2"
                  value={removeFormik.values.amount}
                  onChange={removeFormik.handleChange}
                  onBlur={removeFormik.handleBlur}
                />
                {removeFormik.touched.amount && removeFormik.errors.amount ? (
                  <div className="ml-2 -mt-2 text-rose-500 text-left text-xs">
                    {removeFormik.errors.amount}
                  </div>
                ) : null}

                <Button className="w-full rounded-2xl" type="submit">
                  {isRemoving ? <Spinner className="w-6 h-6" /> : "Remove"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        );
    }
  };

  return renderSteps();
}
