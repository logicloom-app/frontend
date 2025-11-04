"use client";

import {
  ArrowUpFromDot,
  Code2,
  MessageCircleCode,
  SearchCheck,
  Sparkles,
  Euro,
  Calendar,
  Clock,
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
import { usePageTracking } from "@/lib/hooks/useAnalytics";
import { useGetProjectById } from "@/lib/hooks/useProjects";

export default function ProjectDetails({ dict }) {
  const params = useParams();
  const { id } = params;

  const { data, isLoading } = useGetProjectById(id);
  const { project } = data || {};

  usePageTracking(`Project Detail: ${project?.title || id}`);

  //  Change it
  if (isLoading) {
    return <Skeleton className="w-full h-[calc(100vh-7rem)]" />;
  }

  return (
    <div className="w-full h-full p-4 md:p-6 overflow-auto max-h-[calc(100vh-10rem)]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              {dict?.project_details_for}
            </h2>
            <Link
              href={`/dashboard/requests`}
              className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300 flex items-center gap-1"
            >
              {dict?.request} #{project?.request_id}
            </Link>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-2">{project?.title}</h3>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {project?.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column: Project Info */}
          <div className="flex flex-col gap-4 h-full">
            {/* Developer's Comment */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl h-full p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-yellow-500/10 rounded-full">
                  <MessageCircleCode className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h5 className="font-semibold">{dict?.developers_comment}</h5>
              </div>

              {project?.comment ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {project?.comment}
                </p>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  {dict?.no_comment_yet}
                </p>
              )}
            </div>

            {/* Tech Stack */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl h-full p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-cyan-500/10 rounded-full">
                  <Code2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h5 className="font-semibold">{dict?.tech_stack}</h5>
              </div>

              <div className="flex flex-wrap gap-2">
                {project?.tech_stack.map((tech, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Project Demo */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl h-full p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-emerald-500/10 rounded-full">
                  <SearchCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h5 className="font-semibold">{dict?.project_demo}</h5>
              </div>

              {project?.demo_status === "ready" ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {dict?.demo_message}:
                    </p>
                    <p className="text-sm">{project?.demo_message}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {dict?.demo_url}:
                    </p>
                    <Link
                      href={project?.demo_link}
                      target="_blank"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      {project?.demo_link}
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {dict?.demo_is_not_ready_yet}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Project Details & Actions */}
          <div className="flex flex-col gap-4 h-full">
            {/* Project Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl h-full p-6 border border-gray-200 dark:border-gray-700">
              {/* Price & Payment */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <Euro className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {dict?.price}
                  </p>
                  <p className="text-2xl font-bold">€{project?.price}</p>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    project?.paid
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}
                >
                  {project?.paid ? dict?.statuses?.paid : dict?.statuses?.unpaid}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {dict?.status}:
                </span>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${
                    project?.status === "pending"
                      ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                      : project?.status === "ongoing"
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : project?.status === "demo_ready"
                      ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                      : project?.status === "completed"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}
                >
                  {project?.status === "demo_ready"
                    ? dict?.statuses?.demo_ready
                    : project?.status}
                </span>
              </div>

              {/* Dates */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">
                    {dict?.created_at}:
                  </span>
                  <span className="font-medium">
                    {formatDate(project?.created_at)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">
                    {dict?.updated_at}:
                  </span>
                  <span className="font-medium">
                    {formatDate(project?.updated_at)}
                  </span>
                </div>

                {project?.support_expires_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">
                      {dict?.support_expires_at}:
                    </span>
                    <span className="font-medium">
                      {formatDate(project?.support_expires_at)}
                    </span>
                  </div>
                )}
              </div>

              {/* Features */}
              {(project?.premium_design || project?.priority_ticket) && (
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {project?.premium_design && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-full">
                      <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">
                        Premium
                      </span>
                    </div>
                  )}
                  {project?.priority_ticket && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full">
                      <ArrowUpFromDot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        Priority
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl h-full p-6 border border-gray-200 dark:border-gray-700">
              {!project?.user_accepted ? (
                <AcceptDialog project={project} dict={dict} />
              ) : (
                <div className="w-full">
                  {!project?.paid && (
                    <PayForProjectDialog project={project} dict={dict} />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <PremiumDesignDialog project={project} dict={dict} />
                    <PriorityTicketDialog project={project} dict={dict} />
                    <SupportSubDialog project={project} dict={dict} />
                    <AdditionalRequest project={project} dict={dict} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
