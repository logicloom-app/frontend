"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncement } from "@/services/adminServices";
import { useToast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteAnnouncementModal({ open, onClose, announcement }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-announcements"] });
      toast({
        description: "Announcement deleted successfully",
        className: "rounded-2xl",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error || "Failed to delete announcement",
        className: "rounded-2xl",
      });
    },
  });

  const handleDelete = () => {
    if (announcement?.id) {
      deleteMutation.mutate(announcement.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:rounded-3xl max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <DialogTitle>Delete Announcement</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to delete this announcement? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {announcement && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-white mb-1">
              {announcement.title}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {announcement.message}
            </p>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-2xl"
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="rounded-2xl"
          >
            {deleteMutation.isPending ? (
              <Spinner className="w-6 h-6" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

