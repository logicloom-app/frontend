import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MailQuestion } from "lucide-react";

export default function RequestRejectedDualog({ dict, request }) {
  return (
    <Dialog>
      <DialogTrigger className="text-red-500 flex items-center gap-2">
        {dict?.rejected} <MailQuestion size={20} />
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{dict?.rejected}</DialogTitle>
          <DialogDescription>{dict?.rejectedDescription}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="text-sm bg-red-100 dark:bg-red-400/10 text-red-700 dark:text-red-300 p-3 rounded-2xl">
            <span className="font-medium">{dict?.message}: {request?.message}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
