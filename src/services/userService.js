import http from "./httpService";
import useGetToken from "@/lib/hooks/useGetToken";

export async function getUser() {
  const token = await useGetToken();

  return http
    .get("/user", {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })
    .then(({ data }) => data);
}
