"use client";

import { useGetProjects } from "@/lib/hooks/useProjects";
import { MagicCard } from "@/components/ui/magic-card";
import { Skeleton } from "@/components/ui/skeleton";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Briefcase,
  Euro,
  Calendar,
  Eye,
  Check,
  Clock,
  Rocket,
  CheckCircle2,
  XCircle,
  Sparkles,
  FolderKanban,
} from "lucide-react";

export default function ProjectsList({ dict }) {
  const { data, isLoading } = useGetProjects();
  const { projects } = data || {};
  const { theme } = useTheme();

  const getStatusIcon = (status) => {
    if (status === "completed")
      return <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />;
    if (status === "ongoing")
      return <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    if (status === "demo_ready")
      return <Eye className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
    if (status === "cancelled")
      return <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />;
    return <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
  };

  if (isLoading) {
    return (
      <div className="w-full h-full p-4 md:p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-4 py-6 overflow-y-scroll max-h-[calc(100vh-6rem)]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Gradient */}
        <BlurFade delay={0.1}>
          <div className="bg-gray-100 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 dark:shadow-2xl dark:shadow-transparent">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {dict?.title || "Projects"}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" />
                  {dict?.subtitle || "Track and manage your projects"}
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-sm">
                  {projects?.length || 0} Project{projects?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Projects Grid */}
        {projects?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects?.map((project, index) => (
              <BlurFade key={project?.id} delay={0.2 + index * 0.1}>
                <MagicCard
                  gradientOpacity={0.8}
                  gradientColor={theme === "dark" ? "#262626" : "#e9e9e9"}
                  className="rounded-3xl flex flex-col justify-between p-6 h-full bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-300 dark:border-gray-700/50 shadow-xl shadow-gray-300/60 dark:shadow-none hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-1"
                  additionalClassName="flex flex-col justify-between h-full"
                >
                  <div className="space-y-4 flex-1">
                    {/* Header: ID + Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-900 rounded-xl">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          #{project?.id}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border backdrop-blur-sm ${
                          project?.status === "completed"
                            ? "bg-green-500/10 border-green-500/20"
                            : project?.status === "ongoing"
                            ? "bg-blue-500/10 border-blue-500/20"
                            : project?.status === "demo_ready"
                            ? "bg-cyan-500/10 border-cyan-500/20"
                            : project?.status === "cancelled"
                            ? "bg-red-500/10 border-red-500/20"
                            : "bg-yellow-500/10 border-yellow-500/20"
                        }`}
                      >
                        {getStatusIcon(project?.status)}
                        <span
                          className={`text-xs font-medium capitalize ${
                            project?.status === "completed"
                              ? "text-green-600 dark:text-green-400"
                              : project?.status === "ongoing"
                              ? "text-blue-600 dark:text-blue-400"
                              : project?.status === "demo_ready"
                              ? "text-cyan-600 dark:text-cyan-400"
                              : project?.status === "cancelled"
                              ? "text-red-600 dark:text-red-400"
                              : "text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {project?.status === "demo_ready"
                            ? dict?.statuses?.demo_ready
                            : project?.status}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold line-clamp-2 min-h-[56px]">
                      {project?.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {project?.description}
                    </p>

                    {/* Price & Payment Status */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border border-emerald-500/10 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                          <Euro className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-lg font-bold">€{project?.price}</span>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl ${
                          project?.paid
                            ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                            : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                        }`}
                      >
                        {project?.paid ? (
                          <span className="flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            {dict?.statuses?.paid}
                          </span>
                        ) : (
                          dict?.statuses?.unpaid
                        )}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                      <div className="p-1.5 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-lg">
                        <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {formatDate(project?.created_at)}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/dashboard/projects/${project?.id}`}
                    className="w-full mt-4"
                  >
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                      <Eye className="w-4 h-4 mr-2" />
                      {dict?.view_project || "View Project"}
                    </Button>
                  </Link>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        ) : (
          <BlurFade delay={0.2}>
            <div className="bg-gray-100 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-12 text-center shadow-xl shadow-gray-200/50 dark:shadow-2xl dark:shadow-transparent">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center mb-6 mx-auto">
                <Briefcase className="w-12 h-12 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {dict?.no_projects || "No projects yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {dict?.no_projects_description ||
                  "Your accepted requests will appear here as projects"}
              </p>
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
