import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XCircle, AlertCircle } from "lucide-react";

export default function RequestRejectedDialog({ dict, request }) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
        <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
        <span className="text-xs font-medium text-red-600 dark:text-red-400">
          {dict?.rejected || "Rejected"}
        </span>
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-500/10 rounded-full">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle className="text-2xl">{dict?.rejected}</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                {dict?.rejectedDescription}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div className="relative">
            <div className="absolute top-3 left-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-sm bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 pl-12 rounded-2xl">
              <span className="font-semibold block mb-1">{dict?.message}:</span>
              <span className="text-gray-700 dark:text-gray-300">
                {request?.message}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
