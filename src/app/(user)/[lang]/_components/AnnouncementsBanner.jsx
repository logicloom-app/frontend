"use client";

import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { getAnnouncements } from "@/services/announcementService";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Link from "next/link";

const typeConfig = {
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-900/50",
    textColor: "text-blue-900 dark:text-blue-100",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-900/50",
    textColor: "text-green-900 dark:text-green-100",
    iconColor: "text-green-600 dark:text-green-400",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    borderColor: "border-yellow-200 dark:border-yellow-900/50",
    textColor: "text-yellow-900 dark:text-yellow-100",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-900/50",
    textColor: "text-red-900 dark:text-red-100",
    iconColor: "text-red-600 dark:text-red-400",
  },
};

export default function AnnouncementsBanner() {
  const { data, isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: getAnnouncements,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const [dismissedIds, setDismissedIds] = useState([]);

  // Load dismissed announcements from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("dismissedAnnouncements");
    if (stored) {
      try {
        setDismissedIds(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing dismissed announcements:", error);
      }
    }
  }, []);

  // Ensure announcements is always an array
  const announcements = Array.isArray(data?.announcements)
    ? data.announcements
    : Array.isArray(data)
    ? data
    : [];

  // Filter out dismissed announcements
  const activeAnnouncements = Array.isArray(announcements)
    ? announcements.filter(
        (announcement) => announcement?.id && !dismissedIds.includes(announcement.id)
      )
    : [];

  // Get the highest priority announcement
  const topAnnouncement =
    activeAnnouncements.length > 0
      ? activeAnnouncements.sort((a, b) => (b.priority || 0) - (a.priority || 0))[0]
      : null;

  const handleDismiss = (id) => {
    const newDismissed = [...dismissedIds, id];
    setDismissedIds(newDismissed);
    localStorage.setItem("dismissedAnnouncements", JSON.stringify(newDismissed));
  };

  if (isLoading || !topAnnouncement) {
    return null;
  }

  const config = typeConfig[topAnnouncement.type] || typeConfig.info;
  const IconComponent = config.icon;

  return (
    <div
      className={`w-full border-b ${config.borderColor} ${config.bgColor} transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-3 max-w-screen-2xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <IconComponent className={`w-5 h-5 ${config.iconColor} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${config.textColor} line-clamp-2`}>
                <span className="font-bold">{topAnnouncement.title}:</span>{" "}
                {topAnnouncement.message}
              </p>
            </div>
            {topAnnouncement.link && topAnnouncement.link_text && (
              <Link
                href={topAnnouncement.link}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${config.iconColor} border ${config.borderColor} hover:opacity-80 transition-opacity whitespace-nowrap`}
              >
                {topAnnouncement.link_text}
              </Link>
            )}
          </div>
          <button
            onClick={() => handleDismiss(topAnnouncement.id)}
            className={`p-1 ${config.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
