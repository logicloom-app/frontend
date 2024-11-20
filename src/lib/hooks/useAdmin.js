import {
  adminDownloadRequest,
  getLoomPricing,
  getPayments,
  getRequests,
  getUserPayments,
  getUsers,
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
