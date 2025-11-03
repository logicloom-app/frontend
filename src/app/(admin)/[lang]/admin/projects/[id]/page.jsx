"use client";

import {
  ArrowUpFromDot,
  Code2,
  MessageCircleCode,
  SearchCheck,
  Sparkles,
  Euro,
  CheckCircle2,
  XCircle,
  Calendar,
  ArrowLeft,
  ExternalLink,
  FolderKanban,
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
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";

export default function AdminProjectDetails() {
  const params = useParams();
  const { id } = params;

  const { data, isLoading } = useAdminGetProjectById(id);
  const { project } = data || {};

  if (isLoading) {
    return (
      <div className="w-full h-full p-4 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 md:p-8 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button & Header */}
        <BlurFade delay={0.1}>
          <div className="flex items-center gap-4 mb-2">
            <Link href="/admin/projects">
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Projects</span>
              </Button>
            </Link>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FolderKanban className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                    {project?.title}
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project?.description}
                </p>
                <Link
                  href={`/admin/requests`}
                  className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  <span>Related to Request #{project?.request_id}</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
              <AdminDeleteProjectDialog project={project} />
            </div>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Developer's Comment */}
            <BlurFade delay={0.2}>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                    <MessageCircleCode className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Developer's Comment
                  </h3>
                </div>
                {project?.comment ? (
                  <p className="text-sm text-gray-700 dark:text-gray-300 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    {project?.comment}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No comment added yet
                  </p>
                )}
              </div>
            </BlurFade>

            {/* Tech Stack */}
            <BlurFade delay={0.3}>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Tech Stack
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project?.tech_stack?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </BlurFade>

            {/* Project Demo */}
            <BlurFade delay={0.4}>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                    <SearchCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Project Demo
                  </h3>
                </div>

                {project?.demo_status === "ready" ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          Demo Message:
                        </span>
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {project?.demo_message}
                      </p>
                    </div>
                    <a
                      href={project?.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Demo</span>
                    </a>
                  </div>
                ) : (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      ⏳ Demo is not ready yet
                    </p>
                  </div>
                )}
              </div>
            </BlurFade>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="space-y-6">
            {/* Price & Payment */}
            <BlurFade delay={0.2}>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Euro className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      €{project?.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project?.paid ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          Paid
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                          Unpaid
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Status
                  </p>
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold ${
                      project?.status === "pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : project?.status === "ongoing"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : project?.status === "demo_ready"
                        ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
                        : project?.status === "completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : project?.status === "canceled"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : ""
                    }`}
                  >
                    {project?.status === "demo_ready"
                      ? "Demo Ready"
                      : project?.status?.charAt(0).toUpperCase() +
                        project?.status?.slice(1)}
                  </span>
                </div>

                <hr className="border-gray-200 dark:border-gray-700 my-4" />

                {/* Timestamps */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {formatDate(project?.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Updated: {formatDate(project?.updated_at)}</span>
                  </div>
                  {project?.support_expires_at && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Support Expires: {formatDate(project?.support_expires_at)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Premium Features */}
                {(project?.premium_design || project?.priority_ticket) && (
                  <>
                    <hr className="border-gray-200 dark:border-gray-700 my-4" />
                    <div className="flex items-center gap-3">
                      {project?.premium_design && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                          <span className="text-xs text-cyan-700 dark:text-cyan-400 font-semibold">
                            Premium
                          </span>
                        </div>
                      )}
                      {project?.priority_ticket && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                          <ArrowUpFromDot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                            Priority
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </BlurFade>

            {/* Actions */}
            <BlurFade delay={0.3}>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl space-y-3">
                <AdminAdditionalRequests project={project} />
                <AdminUpdateProjectStatus project={project} />
                <AdminUpdateProject project={project} />
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </div>
  );
}
