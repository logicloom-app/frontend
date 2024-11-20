import { getLoomPricing, getUsers } from "@/services/adminServices";
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
