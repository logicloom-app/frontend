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
import { Trash2, AlertTriangle } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { deleteRequest } from "@/services/ProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteRequest({ request, dict }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isLoading, mutateAsync: mutateDeleteRequest } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: (data) => {
      toast({
        description: "Request deleted successfully",
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

  const deleteHandler = async () => {
    await mutateDeleteRequest(request?.id);
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="flex-1"
        disabled={request?.status !== "pending"}
      >
        {request?.status === "pending" && (
          <button className="w-full rounded-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">{dict?.delete}</span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-500/10 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">
                {dict?.deleteDialogTitle} #{request?.id}?
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1">
                {dict?.deleteWarning}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700 mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {dict?.requestTitle}:
          </p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {request?.title}
          </p>
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-2xl">
              {dict?.cancel}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
            onClick={deleteHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner className="w-5 h-5" />
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                {dict?.delete}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
