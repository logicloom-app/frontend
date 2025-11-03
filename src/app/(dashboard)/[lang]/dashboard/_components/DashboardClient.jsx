"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Meteors from "@/components/ui/meteors";
import Spinner from "@/components/ui/Spinner";
import { formatDate } from "@/lib/utils/utils";
import { useGetUser } from "@/lib/hooks/useAuth";
import BlurFade from "@/components/ui/blur-fade";
import { useGetProjects } from "@/lib/hooks/useProjects";
import { useGetPayments } from "@/lib/hooks/usePayments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Folder, FolderInput, Euro, ArrowRight, Sparkles } from "lucide-react";

export default function DashboardClient({ lang, dict }) {
  const { data, error, isLoading } = useGetUser();
  const { user } = data || {};
  const { data: projectsData } = useGetProjects();
  const { data: paymentsData } = useGetPayments();

  const projects = projectsData?.projects || [];
  const payments = paymentsData?.payments || [];

  const completedProjects = projects.filter((p) => p.status === "completed").length;
  const totalPayments = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full h-full overflow-auto max-h-[calc(100vh-10rem)]">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <BlurFade delay={0.1} inView>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent pb-1 leading-tight">
              {dict?.welcome}, {user?.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {dict?.joined}: {formatDate(user?.created_at)}
            </p>
          </div>
        </BlurFade>

        {/* User Info Card */}
        <BlurFade delay={0.2} inView>
          <div className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-6 md:p-8 mb-6 shadow-xl shadow-gray-200/50 dark:shadow-2xl dark:shadow-transparent relative overflow-hidden">
            {isLoading ? (
              <div className="h-32 flex items-center justify-center">
                <Spinner className="w-10 h-10" />
              </div>
            ) : (
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                  <Avatar className="w-20 h-20 border-4 border-blue-500/20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="font-bold text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {user?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                      <h2 className="text-2xl font-bold">{user?.name}</h2>
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      {user?.email}
                    </p>
                    {user?.phone_number && (
                      <p className="text-gray-600 dark:text-gray-400">
                        {user?.phone_number}
                      </p>
                    )}
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl text-center">
                    <div className="text-sm opacity-90">LOOM Balance</div>
                    <div className="text-3xl font-bold">{user?.loom_balance}</div>
                  </div>
                </div>

                <Link
                  href={`/${lang}/loom`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                  {dict?.buyLooms}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
            <Meteors number={15} />
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <BlurFade delay={0.3} inView>
            <div className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg shadow-gray-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Folder className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Projects
                  </p>
                  <p className="text-2xl font-bold">{projects.length}</p>
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <div className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg shadow-gray-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <FolderInput className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Completed
                  </p>
                  <p className="text-2xl font-bold">{completedProjects}</p>
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.5} inView>
            <div className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg shadow-gray-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Euro className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Payments
                  </p>
                  <p className="text-2xl font-bold">€{totalPayments}</p>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Quick Actions */}
        <BlurFade delay={0.6} inView>
          <div className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 dark:shadow-2xl dark:shadow-transparent">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={`/${lang}/dashboard/requests`}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 rounded-2xl transition-all duration-300 border border-blue-500/20 dark:border-blue-500/30"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <FolderInput className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">{dict?.sendRequest}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </Link>

              <Link
                href={`/${lang}/dashboard/projects`}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-cyan-500/10 hover:from-green-500/20 hover:to-cyan-500/20 rounded-2xl transition-all duration-300 border border-green-500/20 dark:border-green-500/30"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Folder className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">View Projects</span>
                </div>
                <ArrowRight className="w-5 h-5 text-green-600 dark:text-green-400" />
              </Link>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
