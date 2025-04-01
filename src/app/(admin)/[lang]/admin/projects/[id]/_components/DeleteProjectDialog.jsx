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
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { adminDeleteProject } from "@/services/adminServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AdminDeleteProjectDialog({ project }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { isLoading, mutateAsync: mutateDeleteProject } = useMutation({
    mutationFn: adminDeleteProject,
    onSuccess: (data) => {
      toast({
        description: "Project deleted successfully",
        className: "rounded-2xl",
      });
      queryClient.invalidateQueries({ queryKey: ["get-all-projects"] });
      router.push("/admin/projects");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Something went wrong",
        className: "rounded-2xl",
      });
    },
  });

  const deleteHandler = async () => {
    await mutateDeleteProject(project?.id);
  };

  return (
    <Dialog>
      <DialogTrigger className="rounded-full">
        <div className="p-2 rounded-full text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-400/20 transition duration-300">
          <X />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">Delete project {project?.id} ?</DialogTitle>
          <DialogDescription className="text-sm dark:text-white truncate max-w-[600px]">
            <span className="text-gray-500">Title:</span> {project?.title}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="destructive"
              className="w-full rounded-2xl"
              onClick={deleteHandler}
            >
              {isLoading ? <Spinner className="w-6 h-6" /> : "Delete"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
