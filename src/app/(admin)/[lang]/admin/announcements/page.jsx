"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils/utils";
import BlurFade from "@/components/ui/blur-fade";
import { useGetAnnouncements } from "@/lib/hooks/useAdmin";
import { Bell, Plus, Calendar, TrendingUp } from "lucide-react";
import EditAnnouncementModal from "./_components/EditAnnouncementModal";
import DeleteAnnouncementModal from "./_components/DeleteAnnouncementModal";
import CreateAnnouncementModal from "./_components/CreateAnnouncementModal";

const typeBadgeColors = {
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  success: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  warning:
    "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  error: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
};

export default function Announcements() {
  const { data, isLoading } = useGetAnnouncements();
  const announcements = data?.announcements || data || [];
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [deletingAnnouncement, setDeletingAnnouncement] = useState(null);

  if (isLoading) {
    return (
      <div className="w-full h-full px-4 py-6 overflow-y-scroll max-h-[calc(100vh-6rem)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-4 py-6 overflow-y-scroll max-h-[calc(100vh-6rem)]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <BlurFade delay={0.1}>
          <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Announcements
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Manage site-wide announcements and notifications
                </p>
              </div>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Announcement
              </button>
            </div>
          </div>
        </BlurFade>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements
            .sort((a, b) => (b.priority || 0) - (a.priority || 0))
            .map((announcement, index) => (
              <BlurFade key={announcement.id} delay={0.2 + index * 0.1}>
                <div className="group bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        typeBadgeColors[announcement.type] || typeBadgeColors.info
                      }`}
                    >
                      {announcement.type?.toUpperCase()}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-semibold text-gray-600 dark:text-gray-400">
                        Priority: {announcement.priority || 0}
                      </span>
                      {announcement.is_active ? (
                        <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded text-xs font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-500/10 text-gray-600 dark:text-gray-400 rounded text-xs font-semibold">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {announcement.title}
                  </h3>

                  {/* Message */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {announcement.message}
                  </p>

                  {/* Link */}
                  {announcement.link && (
                    <div className="mb-4">
                      <a
                        href={announcement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {announcement.link_text || announcement.link} →
                      </a>
                    </div>
                  )}

                  {/* Dates */}
                  <div className="space-y-2 mb-4 text-xs text-gray-600 dark:text-gray-400">
                    {announcement.start_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>Start: {formatDate(announcement.start_date)}</span>
                      </div>
                    )}
                    {announcement.end_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>End: {formatDate(announcement.end_date)}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setEditingAnnouncement(announcement)}
                      className="flex-1 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingAnnouncement(announcement)}
                      className="flex-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </BlurFade>
            ))}
        </div>

        {/* Empty State */}
        {announcements.length === 0 && (
          <BlurFade delay={0.2}>
            <div className="bg-gray-50 dark:bg-gray-800/60 backdrop-blur-xl border-2 border-gray-200/60 dark:border-gray-700/50 rounded-2xl p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                No announcements yet. Create your first announcement!
              </p>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-semibold shadow-lg transition-all"
              >
                Create Announcement
              </button>
            </div>
          </BlurFade>
        )}
      </div>

      {/* Modals */}
      <CreateAnnouncementModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      {editingAnnouncement && (
        <EditAnnouncementModal
          open={!!editingAnnouncement}
          onClose={() => setEditingAnnouncement(null)}
          announcement={editingAnnouncement}
        />
      )}
      {deletingAnnouncement && (
        <DeleteAnnouncementModal
          open={!!deletingAnnouncement}
          onClose={() => setDeletingAnnouncement(null)}
          announcement={deletingAnnouncement}
        />
      )}
    </div>
  );
}
