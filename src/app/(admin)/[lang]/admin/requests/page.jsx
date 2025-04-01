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

  return (
    <div className="flex flex-col gap-2 p-6 w-full h-[calc(100vh-7rem)] overflow-y-auto">
      {requests?.map((request) => (
        <div
          key={request?.id}
          className="flex flex-col md:flex-row justify-between gap-4 p-4 rounded-3xl bg-background"
        >
          <div className="flex flex-col gap-2 p-4 rounded-2xl border-2 border-gray-500/50">
            <div className="flex items-center justify-between gap-2 w-full">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div>#{request?.id}</div>
                  <div className="max-w-[700px] text-sm">{request?.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div>User ID:</div>
                  <div>{request?.user_id}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <div>Status:</div>
                  <div
                    className={`capitalize ${
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
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[900px]">
              {request?.description}
            </p>

            <div className="flex items-center gap-2">
              <div className="text-gray-500 dark:text-gray-400">File:</div>
              <Button
                variant="ghost"
                onClick={() => handleDownload(request?.user_id, request?.file_path)}
                className="rounded-3xl"
              >
                Download: {getFileNameFromPath(request?.file_path)}
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm mb-2">
              <div className="flex items-center gap-2">
                <div className="text-gray-500 dark:text-gray-400">Created at:</div>
                <div>{formatDate(request?.created_at)}</div>
              </div>
              .
              <div className="flex items-center gap-2">
                <div className="text-gray-500 dark:text-gray-400">Updated at:</div>
                <div>{formatDate(request?.updated_at)}</div>
              </div>
            </div>

            {request?.message && (
              <div className="flex flex-col items-start gap-2 text-sm bg-gray-500/10 p-4 rounded-2xl">
                <div className="text-nowrap">Developer's Message:</div>
                <div className="max-w-[700px]">{request?.message}</div>
              </div>
            )}
          </div>

          <div className="flex items-start gap-1">
            <AdminCreateProject request={request} />
            <AdminUpdateRequest request={request} />
            <AdminDeleteRequest request={request} />
          </div>
        </div>
      ))}
    </div>
  );
}
