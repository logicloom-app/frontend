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
import { Check } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { priorityTicket } from "@/services/ProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PriorityTicketDialog({ project, dict }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutatePriorityTicket } = useMutation({
    mutationFn: priorityTicket,
    onSuccess: (data) => {
      toast({
        description: "Priority ticket added successfully",
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

  const priorityTicketHandler = async () => {
    await mutatePriorityTicket(project?.id);
  };

  return (
    <Dialog>
      <DialogTrigger
        className={`w-full flex items-center justify-center gap-2 text-nowrap dark:bg-white bg-black shadow-lg active:mt-[14px] active:bg-sky-500 mt-3 shadow-gray-700 hover:dark:shadow-sky-700 hover:dark:bg-sky-400 hover:bg-sky-600 hover:shadow-sky-800 p-3 rounded-2xl dark:text-black text-white transition-all duration-300 ${
          project?.priority_ticket ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {dict?.priority_ticket}
        {project?.priority_ticket && <Check className="text-green-700" />}
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">{dict?.priority_ticket}</DialogTitle>
          <DialogDescription className="text-sm dark:text-white truncate max-w-[600px]">
            {dict?.you_need_loom_to_add_priority_ticket}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="custom"
              className="w-full rounded-2xl"
              onClick={priorityTicketHandler}
            >
              {isLoading ? <Spinner className="w-6 h-6" /> : dict?.add}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
