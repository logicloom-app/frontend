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
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { supportSub } from "@/services/ProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { CalendarCheck } from "lucide-react";

export default function SupportSubDialog({ project, dict }) {
  const [monthsInput, setMonthsInput] = useState(0);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutateSupportSub } = useMutation({
    mutationFn: supportSub,
    onSuccess: (data) => {
      toast({
        description: "Support subscription added successfully",
        className: "rounded-2xl",
      });
      queryClient.invalidateQueries({ queryKey: ["get-project-by-id"] });
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Something went wrong",
        className: "rounded-2xl",
      });
    },
  });

  const supportSubHandler = async () => {
    const months = monthsInput;
    await mutateSupportSub({ id: project?.id, months });
  };

  const handleMonthsChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value, 10));
    if (value < monthsInput) {
      setMonthsInput(monthsInput - 1);
    } else {
      setMonthsInput(value);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full dark:bg-white bg-black shadow-lg active:mt-[14px] text-nowrap active:bg-sky-500 mt-3 shadow-gray-700 hover:dark:shadow-sky-700 hover:dark:bg-sky-400 hover:bg-sky-600 hover:shadow-sky-800 p-3 rounded-2xl dark:text-black text-white transition-all duration-300">
        {dict?.support_subscription}
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">{dict?.support_subscription}</DialogTitle>
          <DialogDescription className="text-sm dark:text-white max-w-[600px]">
            {monthsInput > 0 &&
              `${dict?.you_need} ${monthsInput * 150} ${
                dict?.loom_to_add
              } ${monthsInput} ${dict?.months_of_support_subscription}`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <CalendarCheck />
          <p className="text-sm">
            The subscription will be added to the current expiry date and the date
            will expand.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm dark:text-white">
            {dict?.please_enter_the_number_of_months}
          </label>
          <Input
            type="number"
            placeholder={dict?.months}
            value={monthsInput}
            onChange={handleMonthsChange}
            onKeyDown={(e) => {
              if (e.key === "Backspace" || e.key === "Delete") {
                e.preventDefault();
              }
            }}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="custom"
              className="w-full rounded-2xl"
              onClick={supportSubHandler}
              disabled={monthsInput === 0 || monthsInput === null}
            >
              {isLoading ? <Spinner className="w-6 h-6" /> : dict?.add}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
