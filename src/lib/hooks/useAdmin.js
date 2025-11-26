import {
  adminAdditionalRequest,
  adminGetProjectById,
  adminGetProjects,
  getLoomPricing,
  getPayments,
  getRequests,
  getUserPayments,
  getUsers,
  getWebsitePackages,
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/services/adminServices";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () =>
  useQuery({
    queryKey: ["get-users"],
    queryFn: getUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetLoomPricing = () =>
  useQuery({
    queryKey: ["get-loom-pricing"],
    queryFn: getLoomPricing,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetPayments = () =>
  useQuery({
    queryKey: ["get-payments"],
    queryFn: getPayments,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetUserPayments = (userId) =>
  useQuery({
    queryKey: ["get-user-payments", userId],
    queryFn: () => getUserPayments(userId),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAdminGetRequests = () =>
  useQuery({
    queryKey: ["get-requests"],
    queryFn: getRequests,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAdminGetProjects = () =>
  useQuery({
    queryKey: ["get-all-projects"],
    queryFn: adminGetProjects,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAdminGetProjectById = (projectId) =>
  useQuery({
    queryKey: ["admin-get-project-by-id", projectId],
    queryFn: () => adminGetProjectById(projectId),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAdminGetAdditionalRequests = (projectId) =>
  useQuery({
    queryKey: ["admin-get-additional-requests", projectId],
    queryFn: () => adminAdditionalRequest(projectId),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetWebsitePackages = () =>
  useQuery({
    queryKey: ["get-website-packages"],
    queryFn: getWebsitePackages,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetAnnouncements = () =>
  useQuery({
    queryKey: ["get-announcements"],
    queryFn: getAnnouncements,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetAnnouncementById = (id) =>
  useQuery({
    queryKey: ["get-announcement", id],
    queryFn: () => getAnnouncementById(id),
    retry: false,
    refetchOnWindowFocus: true,
    enabled: !!id,
  });
