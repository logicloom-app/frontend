"use client";

import { useQuery } from "@tanstack/react-query";
import { useGetUser } from "@/lib/hooks/useAuth";
import {
  Users,
  FolderKanban,
  FileText,
  DollarSign,
  TrendingUp,
  Activity,
  Package,
  Mail,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import BlurFade from "@/components/ui/blur-fade";

export default function AdminPage() {
  const { data: userData } = useGetUser();
  const { lang } = useParams();
  const user = userData?.user;

  // Mock stats - replace with actual API calls
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      link: `/${lang}/admin/users`,
    },
    {
      title: "Active Projects",
      value: "156",
      change: "+8.2%",
      icon: FolderKanban,
      color: "from-purple-500 to-pink-500",
      link: `/${lang}/admin/projects`,
    },
    {
      title: "Blog Posts",
      value: "89",
      change: "+23.1%",
      icon: FileText,
      color: "from-emerald-500 to-teal-500",
      link: `/${lang}/admin/blog/posts`,
    },
    {
      title: "Revenue",
      value: "€45.2K",
      change: "+18.7%",
      icon: DollarSign,
      color: "from-orange-500 to-yellow-500",
      link: `/${lang}/admin/payments`,
    },
  ];

  const quickActions = [
    {
      title: "Manage Requests",
      description: "View and handle project requests",
      icon: Mail,
      link: `/${lang}/admin/requests`,
      color: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20",
    },
    {
      title: "Send Files",
      description: "Upload and send files to users",
      icon: Package,
      link: `/${lang}/admin/send-file`,
      color:
        "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20",
    },
    {
      title: "Loom Pricing",
      description: "Configure Loom token prices",
      icon: TrendingUp,
      link: `/${lang}/admin/loom`,
      color:
        "bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="w-full h-full p-4 md:p-8 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <BlurFade delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Welcome back, Admin
              </h1>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Here's what's happening with your platform today
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-sm">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </BlurFade>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <BlurFade key={stat.title} delay={0.2 + index * 0.1}>
              <Link href={stat.link}>
                <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 p-6 hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-1">
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                      {stat.title}
                    </h3>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>

        {/* Quick Actions */}
        <BlurFade delay={0.6}>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Link key={action.title} href={action.link}>
                  <div
                    className={`group ${action.color} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <action.icon className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Activity Overview */}
        <BlurFade delay={0.8}>
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                {
                  action: "New project request",
                  user: "john@example.com",
                  time: "2 minutes ago",
                },
                {
                  action: "Payment received",
                  user: "sarah@example.com",
                  time: "15 minutes ago",
                },
                {
                  action: "New blog post published",
                  user: "Admin",
                  time: "1 hour ago",
                },
                {
                  action: "User registered",
                  user: "mike@example.com",
                  time: "2 hours ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.user}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
