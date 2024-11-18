"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAdditionalRequests,
  getProjectById,
  getProjects,
  getRequestById,
  getRequests,
} from "@/services/ProjectService";

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

export const useGetAdditionalRequests = (projectId, userId) =>
  useQuery({
    queryKey: ["get-additional-requests", projectId, userId],
    queryFn: () => getAdditionalRequests(projectId, userId),
    retry: false,
    refetchOnWindowFocus: true,
  });
