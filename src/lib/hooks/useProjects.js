"use client";

import {
  getProjectById,
  getProjects,
  getRequestById,
  getRequests,
} from "@/services/ProjectService";
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

export const useGetProjects = () =>
  useQuery({
    queryKey: ["get-projects"],
    queryFn: getProjects,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetProjectById = (id) =>
  useQuery({
    queryKey: ["get-project-by-id", id],
    queryFn: () => getProjectById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
