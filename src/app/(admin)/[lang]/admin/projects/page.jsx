"use client";

import { useAdminGetProjects } from "@/lib/hooks/useAdmin";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function AdminProjects() {
  const { data, isLoading } = useAdminGetProjects();
  const { projects } = data || {};
  const { theme } = useTheme();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (projects?.length === 0) {
    return <div>No projects</div>;
  }

  return (
    <div className="h-[calc(100vh-7rem)] overflow-y-auto relative w-full p-2 md:p-4 lg:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-6 w-full justify-items-center py-6 md:py-0 md:pb-6">
        {projects?.map((project) => (
          <MagicCard
            key={project?.id}
            gradientOpacity={0.8}
            gradientColor={theme === "dark" ? "#262626" : "#e9e9e9"}
            className="rounded-3xl flex flex-col justify-between p-4 lg:p-6 h-72"
            additionalClassName="flex flex-col justify-between h-full"
          >
            <div className="h-full mb-2">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-bold">{project?.title}</h5>
              </div>

              <div className="flex items-center justify-end mb-2">
                <div
                  className={`text-xs md:text-sm px-2 py-1 rounded-lg ${
                    project?.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/50 dark:text-yellow-400"
                      : project?.status === "ongoing"
                      ? "bg-blue-500/20 text-blue-700 dark:bg-blue-500/50 dark:text-blue-400"
                      : project?.status === "demo_ready"
                      ? "bg-cyan-500/20 text-cyan-700 dark:bg-cyan-500/50 dark:text-cyan-400"
                      : project?.status === "completed"
                      ? "bg-green-500/20 text-green-700 dark:bg-green-500/50 dark:text-green-400"
                      : project?.status === "cancelled"
                      ? "bg-red-500/20 text-red-700 dark:bg-red-500/50 dark:text-red-400"
                      : ""
                  }`}
                >
                  Status:{" "}
                  <span className="font-bold capitalize">
                    {project?.status === "demo_ready"
                      ? "demo ready"
                      : project?.status}
                  </span>
                </div>
              </div>

              <p className="text-sm md:font-thin max-h-[90px] overflow-hidden dark:text-gray-200">
                {project?.description}
              </p>
            </div>

            <div className="">
              <div className="flex items-center gap-2">
                <span>Price: €{project?.price}</span>

                <div>
                  {project?.paid ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <span className="text-red-500">Unpaid</span>
                  )}
                </div>
              </div>
              <Link href={`/admin/projects/${project?.id}`} className="w-full">
                <Button variant="custom" className="w-full">
                  View project
                </Button>
              </Link>
            </div>
          </MagicCard>
        ))}
      </div>
    </div>
  );
}
