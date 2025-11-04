"use client";

import { useAdminGetProjects } from "@/lib/hooks/useAdmin";
import { MagicCard } from "@/components/ui/magic-card";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  FolderKanban,
  Euro,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminProjects() {
  const { data, isLoading } = useAdminGetProjects();
  const { projects } = data || {};
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="w-full h-full px-4 py-6 overflow-y-scroll max-h-[calc(100vh-6rem)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (projects?.length === 0) {
    return (
      <div className="w-full h-full px-4 py-6 overflow-y-scroll max-h-[calc(100vh-6rem)]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-white/20 dark:border-gray-700/50 rounded-2xl p-12 text-center">
            <FolderKanban className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects yet. Create your first project!
            </p>
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
          <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Projects
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" />
                  Manage and monitor all your projects
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-sm">
                  {projects?.length} Project{projects?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects?.map((project, index) => (
            <BlurFade key={project?.id} delay={0.2 + index * 0.1}>
              <MagicCard
                gradientOpacity={0.8}
                gradientColor={theme === "dark" ? "#262626" : "#e9e9e9"}
                className="rounded-3xl flex flex-col justify-between p-6 h-80 bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
                additionalClassName="flex flex-col justify-between h-full"
              >
                <div className="h-full mb-4">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">
                      {project?.title}
                    </h5>
                    <div
                      className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap ${
                        project?.status === "pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : project?.status === "ongoing"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : project?.status === "demo_ready"
                          ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
                          : project?.status === "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : project?.status === "cancelled"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : ""
                      }`}
                    >
                      {project?.status === "demo_ready"
                        ? "Demo Ready"
                        : project?.status?.charAt(0).toUpperCase() +
                          project?.status?.slice(1)}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {project?.description}
                  </p>

                  {/* Price & Payment Status */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        €{project?.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {project?.paid ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                            Paid
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                          <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                            Unpaid
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* View Button */}
                <Link href={`/admin/projects/${project?.id}`} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold">
                    View Project
                  </Button>
                </Link>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  );
}
