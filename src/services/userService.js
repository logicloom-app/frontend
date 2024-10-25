import http from "./httpService";
import useGetToken from "@/lib/hooks/useGetToken";

export async function getUser() {
  const { value } = await useGetToken();

  if (!value) return null;

  return http
    .get("/user", {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
    .then(({ data }) => data);
}
