import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SendRequestForm({ dict }) {
  return (
    <Dialog>
      <DialogTrigger className="rounded-2xl px-10 py-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">
        {dict?.sendRequest}
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{dict?.sendRequest}</DialogTitle>
          <DialogDescription>
            Send a request to the admin to get a project.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
