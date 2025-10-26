"use client";

import { useGetProjects } from "@/lib/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import Link from "next/link";
import { formatDate } from "@/lib/utils/utils";

export default function ProjectsList({ dict }) {
  const { data, isLoading } = useGetProjects();
  const { projects } = data || {};

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
      <div className="w-full h-full p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-10 w-48" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-64 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 md:p-6 overflow-auto">
      <div className="max-w-7xl md:px-4 mx-auto scrollarea overflow-y-scroll max-h-[calc(100vh-10rem)] min-h-[calc(100vh-10rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent pb-1">
              {dict?.title || "Projects"}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {projects?.length || 0} {dict?.total || "total projects"}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        {projects?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects?.map((project, index) => (
              <BlurFade key={project?.id} delay={0.1 + index * 0.05} inView>
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 relative group h-full flex flex-col">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
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

                  {/* Project ID */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    #{project?.id}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 min-h-[56px]">
                    {project?.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-grow">
                    {project?.description}
                  </p>

                  {/* Price & Payment Status */}
                  <div className="flex items-center gap-2 mb-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                    <Euro className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-semibold">€{project?.price}</span>
                    <span
                      className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
                        project?.paid
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
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
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {dict?.created_at}: {formatDate(project?.created_at)}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/dashboard/projects/${project?.id}`}
                    className="w-full mt-auto"
                  >
                    <Button className="w-full rounded-full">
                      <Eye className="w-4 h-4 mr-2" />
                      {dict?.view_project}
                    </Button>
                  </Link>
                </div>
              </BlurFade>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center mb-4">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
              {dict?.no_projects || "No projects yet"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Your accepted requests will appear here as projects
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
