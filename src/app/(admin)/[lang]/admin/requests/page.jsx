"use client";

import AdminDeleteRequest from "./_components/AdminDeleteRequest";
import AdminUpdateRequest from "./_components/AdminUpdateRequest";
import AdminCreateProject from "./_components/AdminCreateProject";
import { adminDownloadRequest } from "@/services/adminServices";
import { useAdminGetRequests } from "@/lib/hooks/useAdmin";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils/utils";
import BlurFade from "@/components/ui/blur-fade";
import {
  FolderInput,
  Download,
  User,
  Calendar,
  MessageSquare,
  Sparkles,
  FileText,
} from "lucide-react";

const getFileNameFromPath = (filePath) => {
  if (!filePath) return "";
  return filePath.split("/").pop();
};

export default function AdminRequests() {
  const { data, isLoading } = useAdminGetRequests();
  const { requests } = data || {};
  const { toast } = useToast();

  const { mutate: downloadRequest } = useMutation({
    mutationFn: async ({ userId, fileName }) => {
      const response = await adminDownloadRequest(userId, fileName);
      return response;
    },
    onSuccess: (response) => {
      toast({
        description: "Request downloaded successfully",
        className: "rounded-2xl",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "request_file";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {},
  });

  const handleDownload = (userId, filePath) => {
    const fileName = getFileNameFromPath(filePath);
    downloadRequest({ userId, fileName });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full p-4 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 md:p-8 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Gradient */}
        <BlurFade delay={0.1}>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  Project Requests
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <FolderInput className="w-4 h-4" />
                  Review and manage project requests from users
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-sm">
                  {requests?.length || 0} Request{requests?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Requests List */}
        <div className="space-y-4">
          {requests?.map((request, index) => (
            <BlurFade key={request?.id} delay={0.2 + index * 0.05}>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="flex flex-col lg:flex-row justify-between gap-4 p-6">
                  {/* Main Content */}
                  <div className="flex-1 space-y-4">
                    {/* Header with ID, Title, Status */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold">
                            #{request?.id}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {request?.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <User className="w-4 h-4" />
                          <span>User ID: {request?.user_id}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          request?.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : request?.status === "accepted"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {request?.status?.charAt(0).toUpperCase() +
                          request?.status?.slice(1)}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {request?.description}
                      </p>
                    </div>

                    {/* File Download */}
                    <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                      <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-blue-700 dark:text-blue-400 flex-1">
                        Attached File
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleDownload(request?.user_id, request?.file_path)
                        }
                        className="flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-xs">
                          {getFileNameFromPath(request?.file_path)}
                        </span>
                      </Button>
                    </div>

                    {/* Timestamps */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>Created: {formatDate(request?.created_at)}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>Updated: {formatDate(request?.updated_at)}</span>
                      </div>
                    </div>

                    {/* Developer's Message */}
                    {request?.message && (
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span className="text-sm font-semibold text-purple-700 dark:text-purple-400">
                            Developer's Message
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {request?.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex lg:flex-col items-start gap-2">
                    <AdminCreateProject request={request} />
                    <AdminUpdateRequest request={request} />
                    <AdminDeleteRequest request={request} />
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Empty State */}
        {requests?.length === 0 && (
          <BlurFade delay={0.2}>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-12 text-center">
              <FolderInput className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No requests yet. Waiting for user submissions!
              </p>
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
