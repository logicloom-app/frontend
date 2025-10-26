import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils/utils";
import { Eye, Calendar, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function RequestDetails({ request, dict }) {
  const getStatusIcon = () => {
    if (request?.status === "accepted") {
      return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
    } else if (request?.status === "rejected") {
      return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
    }
    return <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
  };

  const getStatusColor = () => {
    if (request?.status === "accepted") return "text-green-600 dark:text-green-400";
    if (request?.status === "rejected") return "text-red-600 dark:text-red-400";
    return "text-yellow-600 dark:text-yellow-400";
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="flex-1">
        <button className="w-full rounded-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors">
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">{dict?.view}</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:rounded-3xl max-w-[700px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl mb-1">{dict?.dialogTitle}</DialogTitle>
              <DialogDescription className="text-sm font-medium">
                {request?.title}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="w-full flex flex-col gap-4 mt-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {dict?.status}
            </span>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span
                className={`text-sm font-semibold uppercase ${getStatusColor()}`}
              >
                {request?.status === "accepted"
                  ? dict?.accepted
                  : request?.status === "rejected"
                  ? dict?.rejected
                  : dict?.pending}
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {dict?.createdAt}
                </p>
                <p className="text-sm font-medium">
                  {formatDate(request?.created_at)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-2xl border border-purple-100 dark:border-purple-900/30">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {dict?.updatedAt}
                </p>
                <p className="text-sm font-medium">
                  {formatDate(request?.updated_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Message for rejected */}
          {request?.message && (
            <div className="text-sm bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-2xl">
              <span className="font-semibold block mb-1">{dict?.message}:</span>
              <span>{request?.message}</span>
            </div>
          )}

          {/* Message for accepted */}
          {request?.status === "accepted" && (
            <div className="text-sm bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-4 rounded-2xl">
              <span className="font-semibold">{dict?.message}: </span>
              {dict?.acceptedMessage}{" "}
              <Link
                href="/dashboard/projects"
                className="underline font-semibold hover:text-green-800 dark:hover:text-green-200"
              >
                {dict?.projects}
              </Link>
            </div>
          )}

          {/* Description */}
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
              {dict?.description || "Description"}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {request?.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
