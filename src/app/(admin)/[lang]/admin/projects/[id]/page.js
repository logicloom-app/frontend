"use client";

import {
  ArrowUpFromDot,
  Code2,
  MessageCircleCode,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/utils/utils";
import { useAdminGetProjectById } from "@/lib/hooks/useAdmin";
import AdminUpdateProject from "./_components/AdminUpdateProject";
import AdminDeleteProjectDialog from "./_components/DeleteProjectDialog";
import AdminUpdateProjectStatus from "./_components/AdminUpdateProjectStatus";
import AdminAdditionalRequests from "./_components/AdminAdditionalRequests";

export default function AdminProjectDetails() {
  const params = useParams();
  const { id } = params;

  const { data, isLoading } = useAdminGetProjectById(id);
  const { project } = data || {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full p-6 flex lg:flex-row flex-col gap-6 justify-between overflow-auto">
      <div className="flex flex-col gap-4 min-h-[300px] xl:min-w-[500px]">
        <div>
          <div className="flex items-center gap-2 md:text-2xl text-xl font-bold mb-4">
            <h2 className="">Project details for</h2>

            <Link
              href={`/admin/requests`}
              className="underline hover:text-sky-500 transition-colors duration-300"
            >
              Request #{project?.request_id}
            </Link>
          </div>

          <h4 className="md:text-lg text-base">{project?.title}</h4>

          <p className="text-sm text-gray-500 dark:text-gray-400 xl:max-w-[800px] md:max-w-[500px]">
            {project?.description}
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-zinc-800/50 p-4 rounded-3xl w-full h-full flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircleCode className="text-yellow-500" />
              <h5>Developers comment</h5>
            </div>

            {project?.comment ? (
              <p className="text-sm">{project?.comment}</p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No comment yet
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="text-sky-500" />
              <h5>Tech stack</h5>
            </div>

            <div className="flex flex-wrap gap-2">
              {project?.tech_stack.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gray-200 dark:bg-zinc-700/50 px-2 py-1 rounded-lg"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <SearchCheck className="text-emerald-500" />
              <h5>Project demo</h5>
            </div>

            <div>
              {project?.demo_status === "ready" ? (
                <div className="text-sm">
                  <div className="flex items-center gap-1">
                    <div className="text-gray-500 dark:text-gray-400">
                      Demo message:
                    </div>
                    <div>{project?.demo_message}</div>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="text-gray-500 dark:text-gray-400">Demo url:</div>
                    <div>
                      <Link
                        href={project?.demo_link}
                        target="_blank"
                        className="underline hover:text-sky-500 transition-colors duration-300"
                      >
                        {project?.demo_link}
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  Demo is not ready yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-zinc-800/50 p-6 rounded-3xl flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-lg">
              <h3 className="font-bold">Price:</h3>
              <p className="">€{project?.price}</p>
              <span
                className={`${
                  project?.paid ? "text-green-500" : "text-red-500"
                } text-sm`}
              >
                {project?.paid ? "Paid" : "Unpaid"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-gray-500 dark:text-gray-400">Status:</h5>
              <p
                className={`text-xs md:text-base px-2 py-1 rounded-lg capitalize ${
                  project?.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/50 dark:text-yellow-400"
                    : project?.status === "ongoing"
                    ? "bg-blue-500/20 text-blue-700 dark:bg-blue-500/50 dark:text-blue-400"
                    : project?.status === "demo_ready"
                    ? "bg-cyan-500/20 text-cyan-700 dark:bg-cyan-500/50 dark:text-cyan-400"
                    : project?.status === "completed"
                    ? "bg-green-500/20 text-green-700 dark:bg-green-500/50 dark:text-green-400"
                    : project?.status === "canceled"
                    ? "bg-red-500/20 text-red-700 dark:bg-red-500/50 dark:text-red-400"
                    : ""
                }`}
              >
                {project?.status === "demo_ready" ? "Demo ready" : project?.status}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-gray-500 dark:text-gray-400">Created at:</h5>
              <p className="">{formatDate(project?.created_at)}</p>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-gray-500 dark:text-gray-400">Updated at:</h5>
              <p className="">{formatDate(project?.updated_at)}</p>
            </div>
            {project?.support_expires_at && (
              <div className="flex items-center gap-2">
                <h5 className="text-gray-500 dark:text-gray-400">
                  Support expires at:
                </h5>
                <p className="">{formatDate(project?.support_expires_at)}</p>
              </div>
            )}
            <div className="flex items-center gap-2 mt-2">
              {project?.premium_design && (
                <Sparkles className="dark:text-cyan-300 text-cyan-500" />
              )}
              {project?.priority_ticket && (
                <ArrowUpFromDot className="dark:text-emerald-300 text-emerald-500" />
              )}
            </div>
          </div>

          <AdminDeleteProjectDialog project={project} />
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-full">
            <AdminAdditionalRequests project={project} />
          </div>
          <div className="flex items-center gap-2 w-full">
            <AdminUpdateProjectStatus project={project} />
            <AdminUpdateProject project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
