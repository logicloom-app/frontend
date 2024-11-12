"use client";

import { getRequestById, getRequests } from "@/services/ProjectService";
import { useQuery } from "@tanstack/react-query";

export const useGetRequests = () =>
  useQuery({
    queryKey: ["get-requests"],
    queryFn: getRequests,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetRequestById = (id) =>
  useQuery({
    queryKey: ["get-request-by-id", id],
    queryFn: () => getRequestById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
