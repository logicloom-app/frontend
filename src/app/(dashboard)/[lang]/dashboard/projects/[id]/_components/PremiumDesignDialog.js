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
import Meteors from "@/components/ui/meteors";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { premiumDesign } from "@/services/ProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";

export default function PremiumDesignDialog({ project, dict }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutatePremiumDesign } = useMutation({
    mutationFn: premiumDesign,
    onSuccess: (data) => {
      toast({
        description: "Premium design added successfully",
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
    await mutatePremiumDesign(project?.id);
  };

  return (
    <Dialog>
      <DialogTrigger
        className={`w-full flex items-center justify-center gap-2 text-nowrap dark:bg-white bg-black shadow-lg active:mt-[14px] active:bg-sky-500 mt-3 shadow-gray-700 hover:dark:shadow-sky-700 hover:dark:bg-sky-400 hover:bg-sky-600 hover:shadow-sky-800 p-3 rounded-2xl dark:text-black text-white transition-all duration-300 ${
          project?.premium_design ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {dict?.premium_design}
        {project?.premium_design && <Check className="text-green-700" />}
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="mb-1">{dict?.premium_design}</DialogTitle>
          <DialogDescription className="text-sm dark:text-white truncate max-w-[600px]">
            {dict?.you_need_loom_to_add_premium_design}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center max-h-[100px]">
          <Meteors number={25} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="custom"
              className="w-full rounded-2xl"
              onClick={payForProjectHandler}
            >
              {isLoading ? <Spinner className="w-6 h-6" /> : dict?.add}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
