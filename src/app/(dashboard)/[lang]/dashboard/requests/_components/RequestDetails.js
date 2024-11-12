import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { formatDate } from "@/lib/utils/utils";
import Link from "next/link";

export default function RequestDetails({ request, dict }) {
  return (
    <Dialog>
      <DialogTrigger className="rounded-full">
        <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-400/20 transition duration-300">
          <Eye />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="mb-1">{dict?.dialogTitle}</DialogTitle>
          <DialogDescription className="text-sm dark:text-white">
            {request?.title}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between gap-2 text-gray-800 dark:text-gray-400">
            <div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{dict?.createdAt}</span>
                {formatDate(request?.created_at)}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{dict?.updatedAt}</span>
                {formatDate(request?.updated_at)}
              </div>
            </div>

            <div className="flex gap-2">
              <label className="text-sm text-gray-500">{dict?.status}</label>
              <div
                className={`text-sm uppercase font-semibold ${
                  request?.status === "pending"
                    ? "text-yellow-500"
                    : request?.status === "accepted"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {request?.status}
              </div>
            </div>
          </div>

          {request?.message && (
            <div className="text-sm bg-red-100 dark:bg-red-400/10 text-red-700 dark:text-red-300 p-3 rounded-2xl">
              <span className="font-medium">{dict?.message}:</span>{" "}
              {request?.message}
            </div>
          )}

          {request?.status === "accepted" && (
            <div className="text-sm bg-green-100 dark:bg-green-400/10 text-green-700 dark:text-green-300 p-3 rounded-2xl">
              <span className="font-medium">{dict?.message}:</span>{" "}
              {dict?.acceptedMessage}{" "}
              <Link href="/dashboard/projects" className="underline">
                {dict?.projects}
              </Link>
            </div>
          )}

          <div className="text-sm p-3 bg-gray-100 dark:bg-gray-400/10 text-gray-700 dark:text-gray-300 rounded-2xl">
            {request?.description}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
