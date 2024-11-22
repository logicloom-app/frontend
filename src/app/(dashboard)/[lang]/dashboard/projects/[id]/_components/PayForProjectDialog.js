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
import { payForProject } from "@/services/ProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PayForProjectDialog({ project, dict }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutatePayForProject } = useMutation({
    mutationFn: payForProject,
    onSuccess: (data) => {
      toast({
        description: "Project paid successfully",
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

  const payForProjectHandler = async () => {
    await mutatePayForProject(project?.id);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full dark:bg-white bg-black shadow-lg active:mt-[14px] active:bg-sky-500 mt-3 shadow-gray-700 hover:dark:shadow-sky-700 hover:dark:bg-sky-400 hover:bg-sky-600 hover:shadow-sky-800 p-3 rounded-2xl dark:text-black text-white transition-all duration-300">
        {dict?.pay_for_the_project}
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">{dict?.pay_for_the_project}</DialogTitle>
          <DialogDescription className="text-sm dark:text-white max-w-[600px]">
            {dict?.you_need} {project?.price * 5} {dict?.loom_to_pay_for_the_project}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="custom"
              className="w-full rounded-2xl"
              onClick={payForProjectHandler}
            >
              {isLoading ? <Spinner className="w-6 h-6" /> : dict?.pay}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
