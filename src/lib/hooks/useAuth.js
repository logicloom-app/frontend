import { getUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: true,
  });
