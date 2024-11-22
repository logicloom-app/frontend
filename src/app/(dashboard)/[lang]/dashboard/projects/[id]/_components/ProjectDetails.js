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
import AcceptDialog from "./AcceptDialog";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/utils/utils";
import SupportSubDialog from "./SupportSubDialog";
import { Skeleton } from "@/components/ui/skeleton";
import AdditionalRequest from "./AdditionalRequest";
import PremiumDesignDialog from "./PremiumDesignDialog";
import PayForProjectDialog from "./PayForProjectDialog";
import PriorityTicketDialog from "./PriorityTicketDialog";
import { useGetProjectById } from "@/lib/hooks/useProjects";

export default function ProjectDetails({ dict }) {
  const params = useParams();
  const { id } = params;

  const { data, isLoading } = useGetProjectById(id);
  const { project } = data || {};

  //  Change it
  if (isLoading) {
    return <Skeleton className="w-full h-[calc(100vh-7rem)]" />;
  }

  return (
    <div className="w-full h-full p-6 flex lg:flex-row flex-col gap-6 justify-between overflow-auto">
      <div className="flex flex-col gap-4 min-h-[300px] xl:min-w-[500px]">
        <div>
          <div className="flex items-center gap-2 md:text-2xl text-xl font-bold mb-4">
            <h2 className="">{dict?.project_details_for}</h2>

            <Link
              href={`/dashboard/requests`}
              className="underline hover:text-sky-500 transition-colors duration-300"
            >
              {dict?.request} #{project?.request_id}
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
              <h5>{dict?.developers_comment}</h5>
            </div>

            {project?.comment ? (
              <p className="text-sm">{project?.comment}</p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dict?.no_comment_yet}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="text-sky-500" />
              <h5>{dict?.tech_stack}</h5>
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
              <h5>{dict?.project_demo}</h5>
            </div>

            <div>
              {project?.demo_status === "ready" ? (
                <div className="text-sm">
                  <div className="flex items-center gap-1">
                    <div className="text-gray-500 dark:text-gray-400">
                      {dict?.demo_message}:
                    </div>
                    <div>{project?.demo_message}</div>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="text-gray-500 dark:text-gray-400">
                      {dict?.demo_url}:
                    </div>
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
                  {dict?.demo_is_not_ready_yet}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-zinc-800/50 p-6 rounded-3xl flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-lg">
            <h3 className="font-bold">{dict?.price}:</h3>
            <p className="">€{project?.price}</p>
            <span
              className={`${
                project?.paid ? "text-green-500" : "text-red-500"
              } text-sm`}
            >
              {project?.paid ? dict?.statuses?.paid : dict?.statuses?.unpaid}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h5 className="text-gray-500 dark:text-gray-400">{dict?.status}:</h5>
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
              {project?.status === "demo_ready"
                ? dict?.statuses?.demo_ready
                : project?.status}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <h5 className="text-gray-500 dark:text-gray-400">{dict?.created_at}:</h5>
            <p className="">{formatDate(project?.created_at)}</p>
          </div>

          <div className="flex items-center gap-2">
            <h5 className="text-gray-500 dark:text-gray-400">{dict?.updated_at}:</h5>
            <p className="">{formatDate(project?.updated_at)}</p>
          </div>

          {project?.support_expires_at && (
            <div className="flex items-center gap-2">
              <h5 className="text-gray-500 dark:text-gray-400">
                {dict?.support_expires_at}:
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
        <div className="flex items-center gap-2">
          {!project?.user_accepted ? (
            <AcceptDialog project={project} dict={dict} />
          ) : (
            <div className="w-full">
              {!project?.paid && (
                <PayForProjectDialog project={project} dict={dict} />
              )}

              <div className="w-full flex flex-col lg:flex-row gap-2 xl:gap-4 mt-2">
                <div className="w-full flex flex-col gap-2">
                  <PremiumDesignDialog project={project} dict={dict} />
                  <PriorityTicketDialog project={project} dict={dict} />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <SupportSubDialog project={project} dict={dict} />
                  <AdditionalRequest project={project} dict={dict} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
