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
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { acceptProject } from "@/services/ProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AcceptDialog({ project, dict }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutateAcceptProject } = useMutation({
    mutationFn: acceptProject,
    onSuccess: (data) => {
      toast({
        description: "Project accepted successfully",
        className: "rounded-2xl",
      });
      queryClient.invalidateQueries({ queryKey: ["get-project-by-id"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Something went wrong",
        className: "rounded-2xl",
      });
    },
  });

  const acceptHandler = async () => {
    await mutateAcceptProject(project?.id);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full dark:bg-white bg-black shadow-lg active:mt-[14px] active:bg-sky-500 mt-3 shadow-gray-700 hover:dark:shadow-sky-700 hover:dark:bg-sky-400 hover:bg-sky-600 hover:shadow-sky-800 p-3 rounded-2xl dark:text-black text-white transition-all duration-300">
        {dict?.accept_project}
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">{dict?.accept_the_project}</DialogTitle>
          <DialogDescription className="text-sm dark:text-white max-w-[600px]">
            {dict?.the_project_will_be_unlocked_for_payment_and_other_actions}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="custom"
              className="w-full rounded-2xl"
              onClick={acceptHandler}
            >
              {isLoading ? <Spinner className="w-6 h-6" /> : dict?.accept}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
